import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Historial() {
  const [entregas, setEntregas] = useState([])
  const [busqueda, setBusqueda] = useState('')

  useEffect(() => {
    cargarHistorial()
  }, [])

  async function cargarHistorial() {
    const { data, error } = await supabase
      .from('entregas')
      .select(`
        id, fecha, cliente, materiales, firma_url
      `)
      .order('fecha', { ascending: false })
    if (error) console.error(error)
    else setEntregas(data)
  }

  const entregasFiltradas = entregas.filter(e =>
    e.cliente.toLowerCase().includes(busqueda.toLowerCase())
  )

  return (
    <div style={{ padding: 30 }}>
      <h1>Historial de Entregas</h1>
      <input
        type="text"
        placeholder="Buscar por cliente..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{ padding: '8px', marginBottom: '10px', width: '100%' }}
      />
      <table border="1" cellPadding="5" cellSpacing="0" width="100%">
        <thead>
          <tr style={{ backgroundColor: '#0033A0', color: 'white' }}>
            <th>Fecha</th>
            <th>Cliente</th>
            <th>Materiales</th>
            <th>Firma</th>
          </tr>
        </thead>
        <tbody>
          {entregasFiltradas.map((e) => (
            <tr key={e.id}>
              <td>{new Date(e.fecha).toLocaleDateString()}</td>
              <td>{e.cliente}</td>
              <td>{e.materiales}</td>
              <td>
                {e.firma_url ? (
                  <img src={e.firma_url} alt="firma" width="100" />
                ) : (
                  'Sin firma'
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
