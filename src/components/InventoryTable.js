export default function InventoryTable({ materiales }) {
  return (
    <table
      border="1"
      cellPadding="5"
      cellSpacing="0"
      width="100%"
      style={{ borderCollapse: 'collapse', marginTop: '15px' }}
    >
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
  )
}
