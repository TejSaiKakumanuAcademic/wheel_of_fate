import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

function GroupAssignmentModal({ isOpen, winner, groups, onAssign, onSkip }) {
  const [selectedGroupId, setSelectedGroupId] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGroups = groups.filter(group => 
    group.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedGroupId('')
      setSearchQuery('')
    }
  }, [isOpen])

  const handleAssign = () => {
    if (!selectedGroupId) {
      // No group selected, just skip
      onSkip()
      return
    }
    onAssign(selectedGroupId)
  }

  const handleSkip = () => {
    onSkip()
  }

  if (!isOpen) return null

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          handleSkip()
        }
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: isOpen ? 1 : 0.8, opacity: isOpen ? 1 : 0 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6"
      >
            <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">
              Assign to Group
            </h3>
            
            <div className="mb-4 text-center">
              <p className="text-lg text-gray-600 mb-2">Winner:</p>
              <p className="text-3xl font-bold text-primary">{winner}</p>
            </div>

            <div className="mb-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search groups..."
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
              />
            </div>

            <div className="max-h-48 overflow-y-auto mb-4 border-2 border-gray-200 rounded-lg">
              {filteredGroups.length > 0 ? (
                <div className="divide-y divide-gray-200">
                  {filteredGroups.map(group => (
                    <label
                      key={group.id}
                      className="flex items-center p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="group"
                        value={group.id}
                        checked={selectedGroupId === group.id}
                        onChange={(e) => setSelectedGroupId(e.target.value)}
                        className="mr-3"
                      />
                      <span className="flex-1 text-gray-800">{group.name}</span>
                      <span className="text-sm text-gray-500">({group.names.length})</span>
                    </label>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-gray-500">
                  No groups found
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAssign}
                disabled={!selectedGroupId}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ✓ Assign
              </button>
              <button
                onClick={handleSkip}
                className="btn-secondary flex-1"
              >
                Skip
              </button>
            </div>
          </motion.div>
    </motion.div>
  )
}

export default GroupAssignmentModal

