import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Confetti from './Confetti'

function Wheel({ names, isSpinning, setIsSpinning, onWinner }) {
  const rotationRef = useRef(0)
  const [winner, setWinner] = useState(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [currentRotation, setCurrentRotation] = useState(0)
  const hasTriggeredOnWinner = useRef(false)

  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8C471', '#82E0AA',
    '#F1948A', '#7FB3D3', '#D7BDE2', '#A9DFBF', '#F9E79F'
  ]

  const handleSpin = () => {
    if (names.length === 0 || isSpinning) return
    
    hasTriggeredOnWinner.current = false
    setWinner(null)
    setShowConfetti(false)
    setIsSpinning(true)

    const targetSlice = Math.floor(Math.random() * names.length)
    const sliceAngle = 360 / names.length
    
    console.log('=== SPIN DEBUG ===')
    console.log('Target slice:', targetSlice, '(' + names[targetSlice] + ')')
    console.log('Slice angle:', sliceAngle)
    console.log('Total slices:', names.length)
    
    // In the SVG, slice index 0 starts at -90° (top of wheel, 12 o'clock position)
    // The center of slice N is at: -90° + N * sliceAngle + sliceAngle/2
    const sliceCenterBeforeRotation = -90 + targetSlice * sliceAngle + sliceAngle / 2
    
    // The pointer is at the bottom (6 o'clock), which is at 90° in SVG coordinates
    // We want the slice center to end up at 90° (where the pointer is)
    // Rotation needed = 90 - sliceCenterBeforeRotation
    let targetRotationDeg = 90 - sliceCenterBeforeRotation
    
    // Normalize current rotation to 0-360
    const currentNormalizedRotation = ((rotationRef.current % 360) + 360) % 360
    
    // We want to reach targetRotationDeg from current position
    // But we need to add full rotations for the spin effect
    const extraRotations = 5 + Math.random() * 3
    
    // Calculate the final target considering where we currently are
    // We want: (currentRotation + deltaRotation) % 360 = targetRotationDeg % 360
    // So: deltaRotation = targetRotationDeg - currentNormalizedRotation + (extraRotations * 360)
    let deltaRotation = targetRotationDeg - currentNormalizedRotation + (extraRotations * 360)
    
    // If deltaRotation is negative, add 360 to make it positive
    if (deltaRotation < 0) {
      deltaRotation += 360
    }
    
    const totalRotation = rotationRef.current + deltaRotation
    
    console.log('Slice center before rotation:', sliceCenterBeforeRotation)
    console.log('Target rotation (mod 360):', targetRotationDeg)
    console.log('Current normalized rotation:', currentNormalizedRotation)
    console.log('Extra rotations:', extraRotations)
    console.log('Delta rotation:', deltaRotation)
    console.log('Total rotation:', totalRotation)
    console.log('Expected final (mod 360):', totalRotation % 360)
    console.log('===================')
    
    const spinDuration = 3000 + Math.random() * 2000
    const startTime = Date.now()
    const startRotation = rotationRef.current
    
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / spinDuration, 1)
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      const currentRotationValue = startRotation + (totalRotation - startRotation) * easeOutCubic
      
      rotationRef.current = currentRotationValue
      setCurrentRotation(currentRotationValue)
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        rotationRef.current = totalRotation
        setCurrentRotation(totalRotation)
        
        // Calculate which slice is actually at the pointer position
        const finalRotation = totalRotation % 360
        const normalizedRotation = ((finalRotation % 360) + 360) % 360
        
        console.log('=== FINAL POSITION ===')
        console.log('Final rotation (mod 360):', normalizedRotation)
        console.log('Pointer is at: 90°')
        
        // The pointer is at 90° (bottom)
        // We need to find which slice is at that position after rotation
        // After rotating by normalizedRotation, the original position that now sits at 90° is:
        const pointerAngle = 90
        const adjustedPointerAngle = (pointerAngle - normalizedRotation + 360) % 360
        
        // Slices start at -90° (top), slice 0 is from -90° to -90° + sliceAngle
        // Adjust for the -90° offset
        const angleFromStart = (adjustedPointerAngle + 90) % 360
        const actualSliceAtPointer = Math.floor(angleFromStart / sliceAngle) % names.length
        
        console.log('Adjusted pointer angle:', adjustedPointerAngle)
        console.log('Angle from start:', angleFromStart)
        console.log('Actual slice at pointer:', actualSliceAtPointer, '(' + names[actualSliceAtPointer] + ')')
        console.log('Target slice was:', targetSlice, '(' + names[targetSlice] + ')')
        console.log('Using actual slice as winner')
        console.log('=====================')
        
        // Use the actual slice at the pointer position as the winner
        setWinner(names[actualSliceAtPointer])
        setIsSpinning(false)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }
    
    animate()
  }

  useEffect(() => {
    if (winner && !isSpinning && !hasTriggeredOnWinner.current) {
      hasTriggeredOnWinner.current = true
      onWinner?.(winner)
    }
  }, [winner, isSpinning, onWinner])

  if (names.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] text-center">
        <p className="text-2xl text-gray-500 mb-4">📝 Add some names to get started!</p>
      </div>
    )
  }

  const sliceAngle = 360 / names.length

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-[500px] h-[500px]">
        {/* Pointer at bottom */}
        <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
          <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[35px] border-b-red-500"></div>
        </div>
        
        {/* Wheel Container */}
        <div 
          className="relative w-full h-full rounded-full overflow-hidden shadow-2xl"
          style={{
            transform: `rotate(${currentRotation}deg)`,
            transition: isSpinning ? 'none' : 'transform 0.1s ease-out'
          }}
        >
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 500 500"
          >
            {/* Draw each slice as a proper wedge */}
            {names.map((name, index) => {
              const startAngle = index * sliceAngle - 90 // Start at top
              const endAngle = (index + 1) * sliceAngle - 90
              
              const x1 = 250 + 250 * Math.cos(startAngle * Math.PI / 180)
              const y1 = 250 + 250 * Math.sin(startAngle * Math.PI / 180)
              const x2 = 250 + 250 * Math.cos(endAngle * Math.PI / 180)
              const y2 = 250 + 250 * Math.sin(endAngle * Math.PI / 180)
              
              const largeArc = sliceAngle > 180 ? 1 : 0
              
              return (
                <g key={index}>
                  <path
                    d={`M 250 250 L ${x1} ${y1} A 250 250 0 ${largeArc} 1 ${x2} ${y2} Z`}
                    fill={colors[index % colors.length]}
                    stroke="#fff"
                    strokeWidth="3"
                  />
                  
                  {/* Label */}
                  <text
                    x="250"
                    y="145"
                    fill="#000"
                    fontSize="20"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform={`rotate(${index * sliceAngle + sliceAngle / 2} 250 250)`}
                    style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}
                  >
                    {name}
                  </text>
                </g>
              )
            })}
            
            {/* Center circle */}
            <circle cx="250" cy="250" r="64" fill="#fff" stroke="#333" strokeWidth="4" />
          </svg>
          
          {/* Centered spin button */}
          <button
            onClick={handleSpin}
            disabled={names.length === 0 || isSpinning}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
                       w-32 h-32 rounded-full 
                       bg-white shadow-2xl z-20
                       flex items-center justify-center
                       hover:scale-110 active:scale-95
                       transition-transform duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
                       border-4 border-gray-300
                       font-bold text-xl"
          >
            {isSpinning ? (
              <span className="text-4xl animate-spin">🎡</span>
            ) : (
              <span className="text-4xl">🎯</span>
            )}
          </button>
        </div>
        
        {showConfetti && <Confetti />}
      </div>
      
      {winner && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="mt-6 p-6 bg-accent rounded-xl shadow-2xl text-center"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-2">🎉 Winner!</h2>
          <p className="text-4xl font-extrabold text-primary">{winner}</p>
        </motion.div>
      )}
    </div>
  )
}

export default Wheel
