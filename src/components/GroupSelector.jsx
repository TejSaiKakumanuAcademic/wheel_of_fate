import React, { useState } from 'react'
import { motion } from 'framer-motion'

function GroupSelector({ groups, currentGroupId, onGroupChange, onAddGroup, onDeleteGroup }) {
  const [showAddForm, setShowAddForm] = useState(false)
  const [newGroupName, setNewGroupName] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredGroups = searchQuery
    ? groups.filter(group => group.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : groups

  const handleAddGroup = () => {
    if (newGroupName.trim()) {
      onAddGroup(newGroupName.trim())
      setNewGroupName('')
      setShowAddForm(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-gray-800">📁 Groups</h3>
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="🔍 Search groups..."
          className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
        />
      </div>
      
      {filteredGroups.length > 0 ? (
        <div className="mb-4">
          <select
            value={currentGroupId || ''}
            onChange={(e) => onGroupChange(e.target.value)}
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
          >
            {filteredGroups.map(group => (
              <option key={group.id} value={group.id}>
                {group.name} ({group.names.length} names)
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center text-gray-500">
          <p>No groups yet. Create one below! 👇</p>
        </div>
      )}

      {showAddForm ? (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-2"
        >
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddGroup()}
            placeholder="Group name..."
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
            autoFocus
          />
          <div className="flex gap-2">
            <button onClick={handleAddGroup} className="btn-primary flex-1">
              ✓ Add
            </button>
            <button
              onClick={() => {
                setShowAddForm(false)
                setNewGroupName('')
              }}
              className="btn-secondary"
            >
              ✕ Cancel
            </button>
          </div>
        </motion.div>
      ) : (
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary w-full"
        >
          ➕ New Group
        </button>
      )}

      {currentGroupId && groups.length > 0 && (
        <button
          onClick={() => onDeleteGroup(currentGroupId)}
          className="mt-2 w-full btn-secondary bg-red-500 hover:bg-red-600"
        >
          🗑️ Delete Group
        </button>
      )}
    </div>
  )
}

export default GroupSelector

