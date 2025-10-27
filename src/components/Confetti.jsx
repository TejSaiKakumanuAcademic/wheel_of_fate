import React, { useEffect } from 'react'

function Confetti() {
  useEffect(() => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#F7DC6F', '#BB8FCE']
    const confetti = []
    
    for (let i = 0; i < 50; i++) {
      setTimeout(() => {
        const confettiPiece = document.createElement('div')
        confettiPiece.className = 'confetti'
        confettiPiece.style.left = `${Math.random() * 100}%`
        confettiPiece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
        confettiPiece.style.animationDelay = `${Math.random() * 1}s`
        confettiPiece.style.width = `${5 + Math.random() * 5}px`
        confettiPiece.style.height = confettiPiece.style.width
        
        document.body.appendChild(confettiPiece)
        confetti.push(confettiPiece)
        
        setTimeout(() => {
          confettiPiece.remove()
        }, 3000)
      }, i * 50)
    }

    return () => {
      confetti.forEach(piece => piece.remove())
    }
  }, [])

  return null
}

export default Confetti

