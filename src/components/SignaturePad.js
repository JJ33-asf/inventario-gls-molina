import { useRef, useState } from 'react'

export default function SignaturePad({ onSave }) {
  const canvasRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  function startDrawing(e) {
    setIsDrawing(true)
    const ctx = canvasRef.current.getContext('2d')
    ctx.beginPath()
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
  }

  function draw(e) {
    if (!isDrawing) return
    const ctx = canvasRef.current.getContext('2d')
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY)
    ctx.strokeStyle = '#0033A0'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  function stopDrawing() {
    setIsDrawing(false)
  }

  function limpiar() {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    onSave(null)
  }

  function guardarFirma() {
    const dataUrl = canvasRef.current.toDataURL('image/png')
    onSave(dataUrl)
  }

  return (
    <div style={{ marginTop: 10 }}>
      <p>Firma del cliente:</p>
      <canvas
        ref={canvasRef}
        width={300}
        height={120}
        style={{ border: '1px solid #ccc' }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />
      <div style={{ marginTop: 5, display: 'flex', gap: 10 }}>
        <button onClick={guardarFirma}>Guardar firma</button>
        <button onClick={limpiar}>Limpiar</button>
      </div>
    </div>
  )
}
