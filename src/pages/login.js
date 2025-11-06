import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const handleLogin = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError('Correo o contraseña incorrectos')
    else window.location.href = '/'
  }

  return (
    <div style={{ textAlign: 'center', marginTop: 100 }}>
      <img src="/logo-gls.png" alt="GLS MOLINA" width="200" />
      <h2>GLS MOLINA Inventario</h2>
      <form onSubmit={handleLogin}>
        <input
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ margin: '5px', padding: '8px' }}
        /><br/>
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ margin: '5px', padding: '8px' }}
        /><br/>
        <button type="submit" style={{ padding: '8px 16px' }}>Iniciar sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  )
}
