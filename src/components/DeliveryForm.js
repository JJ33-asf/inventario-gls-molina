import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import SignaturePad from './SignaturePad'

export default function DeliveryForm() {
  const [cliente, setCliente] = useState('')
  const [materiales, setMateriales] = useState('')
  const [foto, setFoto] = useState(null)
  const [firma, setFirma] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState('')

  async function guardarEntrega() {
    if (!cliente || !materiales) {
      setMensaje('Completa todos los campos')
      return
    }
    setGuardando(true)

    // Subir foto al almacenamiento (si hay)
    let fotoUrl = null
    if (foto) {
      const { data, error } = await supabase.storage
        .from('imagenes')
        .upload(`fotos/${Date.now()}-${foto.name}`, foto)
      if (data) {
        const { data: urlData } = supabase.storage
          .from('imagenes')
          .getPublicUrl(data.path)
        fotoUrl = urlData.publicUrl
      }
    }

    // Subir firma como imagen Base64
    let firmaUrl = null
    if (firma) {
      const base64Data = firma.replace(/^data:image\/png;base64,/, '')
      const fileName = `firmas/${Date.now()}.png`
      const { data, error } = await supabase.storage
        .from('imagenes')
        .upload(fileName, decodeBase64(base64Data), { contentType: 'image/png' })
      if (data) {
        const { data: urlData } = supabase.storage
          .from('imagenes')
          .getPublicUrl(data.path)
        firmaUrl = urlData.publicUrl
      }
    }

    const { error } = await supabase.from('entregas').insert({
      cliente,
      materiales,
      foto_url: fotoUrl,
      firma_url: firmaUrl,
      fecha: new Date()
    })

    setGuardando(false)
    if (error) setMensaje('Error al guardar')
    else {
      setMensaje('Entrega registrada correctamente ✅')
      setCliente('')
      setMateriales('')
      setFoto(null)
      setFirma(null)
    }
  }

  function decodeBase64(base64) {
    const binary = atob(base64)
    const array = new Uint8Array(binary.length)
    for (let i = 0; i < binary.length; i++) array[i] = binary.charCodeAt(i)
    return array
  }

  return (
    <div style={{ marginTop: 20 }}>
      <h2>Registrar nueva entrega</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: 400 }}>
        <input
          placeholder="Nombre del cliente"
          value={cliente}
          onChange={(e) => setCliente(e.target.value)}
        />
        <textarea
          placeholder="Materiales entregados"
          value={materiales}
          onChange={(e) => setMateriales(e.target.value)}
        />
        <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} />
        <SignaturePad onSave={setFirma} />
        <button onClick={guardarEntrega} disabled={guardando}>
          {guardando ? 'Guardando...' : 'Guardar entrega'}
        </button>
      </div>
      {mensaje && <p>{mensaje}</p>}
    </div>
  )
}
