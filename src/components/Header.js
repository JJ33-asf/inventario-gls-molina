import Link from 'next/link'

export default function Header() {
  return (
    <header style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 20px',
      backgroundColor: '#0033A0',
      color: 'white'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <img src="/logo-gls.png" alt="GLS MOLINA" width="60" />
        <h2>GLS MOLINA Inventario</h2>
      </div>
      <nav style={{ display: 'flex', gap: '20px' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>Inventario</Link>
        <Link href="/historial" style={{ color: 'white', textDecoration: 'none' }}>Historial</Link>
        <Link href="/login" style={{ color: 'white', textDecoration: 'none' }}>Salir</Link>
      </nav>
    </header>
  )
}
