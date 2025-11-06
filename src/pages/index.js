import { useEffect, useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function Home() {
  const [materiales, setMateriales] = useState([])

  useEffect(() => {
    cargarMateriales()
  }, [])

  async function cargarMateriales() {
    const { data, error } = await supabase.from('materiales').select('*')
    if (error) console.error('Error al cargar materiales:', error)
    else setMateriales(data)
  }

  return (
    <div style={{ padding: 30 }}>
      <h1>Inventario actual</h1>
      <table border="1" cellPadding="5" cellSpacing="0" width="100%">
        <thead>
          <tr style={{ backgroundColor: '#0033A0', color: 'white' }}>
            <th>Material</th>
            <th>Categoría</th>
            <th>Stock</th>
          </tr>
        </thead>
        <tbody>
          {materiales.map((m) => (
            <tr key={m.id}>
              <td>{m.nombre}</td>
              <td>{m.categoria}</td>
              <td>{m.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
