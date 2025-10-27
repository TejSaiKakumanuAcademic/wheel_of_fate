import React from 'react'
import { motion } from 'framer-motion'

function GroupMembers({ groups, currentGroupId }) {
  const currentGroup = groups.find(g => g.id === currentGroupId)

  if (!currentGroup || !currentGroup.names || currentGroup.names.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">👥 Group Members</h3>
      
      <div className="max-h-64 overflow-y-auto space-y-2">
        {currentGroup.names.map((name) => (
          <motion.div
            key={name.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
          >
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: name.color }}
            />
            <span className="flex-1 text-gray-800">{name.text}</span>
            {name.picked && (
              <span className="text-xs text-gray-500 bg-accent px-2 py-1 rounded">
                Picked
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <p className="text-sm text-gray-500 text-center mt-4">
        {currentGroup.names.length} member{currentGroup.names.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}

export default GroupMembers

