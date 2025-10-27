import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

function Timer({ duration, autoStartTrigger }) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsRunning(false)
            playAlertSound()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    } else {
      clearInterval(intervalRef.current)
    }

    return () => clearInterval(intervalRef.current)
  }, [isRunning, timeLeft])

  useEffect(() => {
    // Trigger whenever the counter changes (and is not 0)
    if (autoStartTrigger > 0) {
      // When auto-starting, always reset to full duration
      setTimeLeft(duration)
      setIsRunning(true)
    }
  }, [autoStartTrigger, duration])

  const playAlertSound = () => {
    // Create a beep sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5)

    oscillator.start(audioContext.currentTime)
    oscillator.stop(audioContext.currentTime + 0.5)
  }

  const handleStart = () => {
    setTimeLeft(duration)
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleResume = () => {
    if (timeLeft && timeLeft > 0) {
      setIsRunning(true)
    } else {
      setTimeLeft(duration)
      setIsRunning(true)
    }
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(null)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = timeLeft ? (timeLeft / duration) * 100 : 100

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">⏱️ Timer</h3>
      
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="80"
              stroke="#E5E7EB"
              strokeWidth="16"
              fill="none"
            />
            <motion.circle
              cx="96"
              cy="96"
              r="80"
              stroke="#4ECDC4"
              strokeWidth="16"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 1 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.3 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              key={timeLeft}
              animate={{ scale: [1, 1.2, 1] }}
              className="text-5xl font-bold text-primary"
            >
              {timeLeft !== null ? formatTime(timeLeft) : formatTime(duration)}
            </motion.div>
          </div>
        </div>

        <div className="flex gap-2">
          {!isRunning && timeLeft === null && (
            <button onClick={handleStart} className="btn-primary">
              ▶️ Start
            </button>
          )}
          {isRunning && (
            <button onClick={handlePause} className="btn-secondary">
              ⏸️ Pause
            </button>
          )}
          {!isRunning && timeLeft !== null && timeLeft > 0 && (
            <>
              <button onClick={handleResume} className="btn-primary">
                ▶️ Resume
              </button>
              <button onClick={handleReset} className="btn-secondary">
                🔄 Reset
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Timer

