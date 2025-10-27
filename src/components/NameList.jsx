import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function NameList({ names, onAddName, onDeleteName, onUpdateName }) {
  const [newName, setNewName] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editText, setEditText] = useState('')

  const handleAdd = () => {
    if (newName.trim()) {
      onAddName(newName.trim())
      setNewName('')
    }
  }

  const handleEdit = (name) => {
    setEditingId(name.id)
    setEditText(name.text)
  }

  const handleSaveEdit = (nameId) => {
    if (editText.trim()) {
      onUpdateName(nameId, editText.trim())
      setEditingId(null)
      setEditText('')
    }
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditText('')
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">📝 Names</h3>
      
      <div className="mb-4 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="Enter a name..."
          className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
        />
        <button onClick={handleAdd} className="btn-primary">
          ➕ Add
        </button>
      </div>

      <div className="max-h-96 overflow-y-auto space-y-2">
        <AnimatePresence>
          {names.map((name) => (
            <motion.div
              key={name.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
            >
              {editingId === name.id ? (
                <>
                  <input
                    type="text"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSaveEdit(name.id)
                      if (e.key === 'Escape') handleCancelEdit()
                    }}
                    className="flex-1 px-2 py-1 border border-gray-300 rounded focus:border-primary focus:outline-none"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(name.id)}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
                  >
                    ✓
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                  >
                    ✕
                  </button>
                </>
              ) : (
                <>
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: name.color }}
                  />
                  <span className="flex-1 text-gray-800">{name.text}</span>
                  <button
                    onClick={() => handleEdit(name)}
                    className="px-2 py-1 text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => onDeleteName(name.id)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded transition"
                  >
                    🗑️
                  </button>
                </>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {names.length === 0 && (
        <p className="text-gray-500 text-center py-8">No names added yet. Add some names to get started!</p>
      )}
    </div>
  )
}

export default NameList

