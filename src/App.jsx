import React, { useState, useEffect, useRef } from 'react'
import Wheel from './components/Wheel'
import NameList from './components/NameList'
import Timer from './components/Timer'
import GroupSelector from './components/GroupSelector'
import Settings from './components/Settings'
import GroupAssignmentModal from './components/GroupAssignmentModal'
import GroupMembers from './components/GroupMembers'

function App() {
  const [names, setNames] = useState(() => {
    const saved = localStorage.getItem('wheelNames')
    return saved ? JSON.parse(saved) : []
  })
  
  const [groups, setGroups] = useState(() => {
    const saved = localStorage.getItem('wheelGroups')
    return saved ? JSON.parse(saved) : []
  })
  
  const [currentGroupId, setCurrentGroupId] = useState(null)
  const [timerDuration, setTimerDuration] = useState(30)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showAssignmentModal, setShowAssignmentModal] = useState(false)
  const [currentWinner, setCurrentWinner] = useState(null)
  const [autoStartTimer, setAutoStartTimer] = useState(false)
  const [timerAutoStartCounter, setTimerAutoStartCounter] = useState(0)
  const [excludePickedMembers, setExcludePickedMembers] = useState(false)
  const lastProcessedWinner = useRef(null)
  const hasInitialized = useRef(false)

  const currentGroup = groups.find(g => g.id === currentGroupId) || (groups[0] || null)

  // Get all names that have been picked (either in groups or marked as picked in the main list)
  const getAllPickedNames = () => {
    const allPickedNames = new Set()
    
    // If there are groups, get picked names from groups
    if (groups.length > 0) {
      groups.forEach(group => {
        group.names.forEach(name => {
          allPickedNames.add(name.text)
        })
      })
    }
    
    // Also check names that are marked as picked in the main list (for no-group mode)
    names.forEach(name => {
      if (name.picked) {
        allPickedNames.add(name.text)
      }
    })
    
    return allPickedNames
  }

  // Get available names for the wheel (excluding picked ones if option is enabled)
  const getAvailableNames = () => {
    if (!excludePickedMembers) {
      return names
    }
    const pickedNames = getAllPickedNames()
    return names.filter(n => !pickedNames.has(n.text))
  }

  const handleGroupChange = (groupId) => {
    setCurrentGroupId(groupId)
  }

  const handleAddGroup = (groupName) => {
    // Check for duplicate group names
    const groupExists = groups.some(g => g.name.toLowerCase() === groupName.toLowerCase())
    if (groupExists) {
      alert('A group with this name already exists!')
      return
    }
    
    const newGroup = {
      id: Date.now().toString(),
      name: groupName,
      names: []
    }
    const updatedGroups = [...groups, newGroup]
    setGroups(updatedGroups)
    setCurrentGroupId(newGroup.id)
  }

  const handleDeleteGroup = (groupId) => {
    const newGroups = groups.filter(g => g.id !== groupId)
    setGroups(newGroups)
    if (currentGroupId === groupId) {
      setCurrentGroupId(newGroups.length > 0 ? newGroups[0].id : null)
    }
  }

  const handleAddName = (name) => {
    // Check for duplicates
    const nameExists = names.some(n => n.text.toLowerCase() === name.toLowerCase())
    if (nameExists) {
      alert('This name already exists!')
      return
    }
    setNames([...names, { id: Date.now().toString(), text: name, color: getRandomColor(), picked: false }])
  }

  const handleDeleteName = (nameId) => {
    setNames(names.filter(n => n.id !== nameId))
  }

  const handleUpdateName = (nameId, newText) => {
    // Check for duplicates
    const nameExists = names.some(n => n.id !== nameId && n.text.toLowerCase() === newText.toLowerCase())
    if (nameExists) {
      alert('This name already exists!')
      return
    }
    setNames(names.map(n => n.id === nameId ? { ...n, text: newText } : n))
  }

  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8C471', '#82E0AA',
      '#F1948A', '#7FB3D3', '#D7BDE2', '#A9DFBF', '#F9E79F'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  const handleWinner = (winner) => {
    // Prevent duplicate processing
    if (lastProcessedWinner.current === winner) {
      return
    }
    lastProcessedWinner.current = winner
    
    setCurrentWinner(winner)
    // Only show modal if there are groups
    if (groups.length > 0) {
      setShowAssignmentModal(true)
    } else {
      // If no groups, mark the winner as picked if exclude option is enabled
      if (excludePickedMembers) {
        setNames(names.map(n => 
          n.text === winner ? { ...n, picked: true } : n
        ))
      }
      
      // If auto-start timer, trigger it
      if (autoStartTimer) {
        // Increment counter to trigger the timer
        setTimerAutoStartCounter(prev => prev + 1)
      }
    }
  }

  const handleAssignToGroup = (groupId) => {
    if (!groupId) {
      alert('Please select a group first!')
      return
    }
    
    // Check if winner already exists in ANY group
    const winnerInAnyGroup = groups.some(g => 
      g.names.some(n => n.text === currentWinner)
    )
    
    if (winnerInAnyGroup) {
      const existingGroup = groups.find(g => 
        g.names.some(n => n.text === currentWinner)
      )
      if (existingGroup.id === groupId) {
        alert('This person is already in this group!')
      } else {
        alert(`This person is already in group "${existingGroup.name}"!`)
      }
      return
    }
    
    // Remove from current group if they're switching groups
    // Add winner to the selected group
    const updatedGroups = groups.map(group => {
      if (group.id === groupId) {
        return {
          ...group,
          names: [...group.names, {
            id: Date.now().toString(),
            text: currentWinner,
            color: getRandomColor(),
            picked: true
          }]
        }
      }
      return group
    })
    setGroups(updatedGroups)
    
    // Clear the last processed winner to allow new spins
    lastProcessedWinner.current = null
    
    // Close modal
    setShowAssignmentModal(false)
    setCurrentWinner(null)
    
    // If auto-start timer is enabled, trigger it
    if (autoStartTimer) {
      // Increment counter to trigger the timer
      setTimeout(() => setTimerAutoStartCounter(prev => prev + 1), 100)
    }
  }

  const handleSkipAssignment = () => {
    // Clear the last processed winner to allow new spins
    lastProcessedWinner.current = null
    
    // Close modal
    setShowAssignmentModal(false)
    setCurrentWinner(null)
    
    // If auto-start timer is enabled, trigger it
    if (autoStartTimer) {
      // Increment counter to trigger the timer
      setTimeout(() => setTimerAutoStartCounter(prev => prev + 1), 100)
    }
  }

  const saveToLocalStorage = () => {
    localStorage.setItem('wheelNames', JSON.stringify(names))
    localStorage.setItem('wheelGroups', JSON.stringify(groups))
  }

  // Set initial group ID when groups are loaded
  useEffect(() => {
    if (!hasInitialized.current) {
      if (groups.length > 0 && currentGroupId === null) {
        setCurrentGroupId(groups[0].id)
      }
      hasInitialized.current = true
    }
  }, [groups.length, currentGroupId])

  useEffect(() => {
    saveToLocalStorage()
  }, [names, groups])

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-center mb-8 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
          🎡 Wheel of Fate
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Wheel and Timer */}
          <div className="lg:col-span-2 space-y-6">
            <Wheel 
              names={getAvailableNames().map(n => n.text)}
              isSpinning={isSpinning}
              setIsSpinning={setIsSpinning}
              onWinner={handleWinner}
            />
            <Timer duration={timerDuration} autoStartTrigger={timerAutoStartCounter} />
          </div>

          {/* Right: Controls */}
          <div className="space-y-6">
            <GroupSelector
              groups={groups}
              currentGroupId={currentGroupId}
              onGroupChange={handleGroupChange}
              onAddGroup={handleAddGroup}
              onDeleteGroup={handleDeleteGroup}
            />

            <GroupMembers
              groups={groups}
              currentGroupId={currentGroupId}
            />
            
            <NameList
              names={names}
              onAddName={handleAddName}
              onDeleteName={handleDeleteName}
              onUpdateName={handleUpdateName}
            />

            <Settings 
              timerDuration={timerDuration}
              setTimerDuration={setTimerDuration}
              autoStartTimer={autoStartTimer}
              setAutoStartTimer={setAutoStartTimer}
              excludePickedMembers={excludePickedMembers}
              setExcludePickedMembers={setExcludePickedMembers}
              groups={groups}
              names={names}
              setGroups={setGroups}
              setNames={setNames}
            />
          </div>
        </div>
      </div>

      {showAssignmentModal && (
        <GroupAssignmentModal
          isOpen={showAssignmentModal}
          winner={currentWinner}
          groups={groups}
          onAssign={handleAssignToGroup}
          onSkip={handleSkipAssignment}
        />
      )}
    </div>
  )
}

export default App

