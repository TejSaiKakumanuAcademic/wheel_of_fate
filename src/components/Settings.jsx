import React from 'react'
import * as XLSX from 'xlsx'

function Settings({ timerDuration, setTimerDuration, autoStartTimer, setAutoStartTimer, excludePickedMembers, setExcludePickedMembers, groups, names, setGroups, setNames }) {

  const handleExport = () => {
    // Create workbook with multiple sheets
    const wb = XLSX.utils.book_new()
    
    // Export wheel names (without picked status)
    const namesData = names.map(name => ({
      Name: name.text
    }))
    const wsNames = XLSX.utils.json_to_sheet(namesData)
    XLSX.utils.book_append_sheet(wb, wsNames, 'Wheel Names')
    
    // Export groups with their members
    const groupsData = []
    groups.forEach(group => {
      if (group.names.length === 0) {
        // If group is empty, still add a row with the group name
        groupsData.push({
          'Group Name': group.name,
          'Member Name': ''
        })
      } else {
        group.names.forEach(member => {
          groupsData.push({
            'Group Name': group.name,
            'Member Name': member.text
          })
        })
      }
    })
    const wsGroups = XLSX.utils.json_to_sheet(groupsData)
    XLSX.utils.book_append_sheet(wb, wsGroups, 'Groups')
    
    // Download the file
    XLSX.writeFile(wb, `wheel-of-fate-${new Date().toISOString().split('T')[0]}.xlsx`)
    alert('✅ Data exported successfully!')
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (!file) {
      return
    }

    // Warn user before importing
    const hasExistingData = names.length > 0 || groups.length > 0
    if (hasExistingData) {
      const confirmImport = window.confirm(
        '⚠️ WARNING: Importing will DELETE ALL existing data!\n\n' +
        `Current data:\n` +
        `- ${names.length} name(s) in wheel\n` +
        `- ${groups.length} group(s)\n\n` +
        'This action cannot be undone.\n\n' +
        'TIP: Export your current data first as a backup!\n\n' +
        'Do you want to continue?'
      )
      
      if (!confirmImport) {
        // Reset file input so user can select again
        event.target.value = ''
        return
      }
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        
        let importedNames = []
        let importedGroups = []
        
        // Import wheel names if sheet exists
        if (workbook.SheetNames.includes('Wheel Names')) {
          const wsNames = workbook.Sheets['Wheel Names']
          const namesJson = XLSX.utils.sheet_to_json(wsNames)
          importedNames = namesJson.map((row, index) => ({
            id: `imported-${Date.now()}-${index}`,
            text: row.Name || row.name || '',
            color: getRandomColor(),
            picked: false  // Always start as not picked on import
          })).filter(n => n.text !== '')
        }
        
        // Import groups if sheet exists
        if (workbook.SheetNames.includes('Groups')) {
          const wsGroups = workbook.Sheets['Groups']
          const groupsJson = XLSX.utils.sheet_to_json(wsGroups)
          
          // Group the data by group name
          const groupsMap = new Map()
          groupsJson.forEach(row => {
            const groupName = row['Group Name'] || row.name || ''
            const memberName = row['Member Name'] || row.member || ''
            
            if (groupName) {
              if (!groupsMap.has(groupName)) {
                groupsMap.set(groupName, [])
              }
              if (memberName) {
                groupsMap.get(groupName).push(memberName)
              }
            }
          })
          
          // Convert to groups array
          importedGroups = Array.from(groupsMap.entries()).map(([groupName, members], index) => ({
            id: `imported-group-${Date.now()}-${index}`,
            name: groupName,
            names: members.map((memberName, memberIndex) => ({
              id: `imported-member-${Date.now()}-${index}-${memberIndex}`,
              text: memberName,
              color: getRandomColor(),
              picked: true
            }))
          }))
        }
        
        // Clear all existing data and set imported data
        setNames(importedNames)
        setGroups(importedGroups)
        
        alert(
          '✅ Data imported successfully!\n\n' +
          `Imported:\n` +
          `- ${importedNames.length} name(s)\n` +
          `- ${importedGroups.length} group(s)`
        )
      } catch (error) {
        console.error('Import error:', error)
        alert(
          '❌ Error importing file!\n\n' +
          'Please make sure:\n' +
          '- File is a valid Excel file (.xlsx or .xls)\n' +
          '- Sheet names are "Wheel Names" and/or "Groups"\n' +
          '- Column headers match the expected format\n\n' +
          'Error: ' + error.message
        )
      }
    }
    
    reader.onerror = () => {
      alert('❌ Error reading file. Please try again.')
    }
    
    reader.readAsArrayBuffer(file)
    
    // Reset the file input so the same file can be imported again
    event.target.value = ''
  }
  
  const getRandomColor = () => {
    const colors = [
      '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
      '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8C471', '#82E0AA',
      '#F1948A', '#7FB3D3', '#D7BDE2', '#A9DFBF', '#F9E79F'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 space-y-4">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">⚙️ Settings</h3>
      
      <div>
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Timer Duration (seconds):
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="range"
            min="5"
            max="120"
            value={timerDuration}
            onChange={(e) => setTimerDuration(Number(e.target.value))}
            className="flex-1"
          />
          <input
            type="number"
            min="5"
            max="120"
            value={timerDuration}
            onChange={(e) => {
              const value = Number(e.target.value)
              if (value >= 5 && value <= 120) {
                setTimerDuration(value)
              }
            }}
            className="w-20 px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none text-center font-bold"
          />
          <span className="text-gray-600 font-semibold">s</span>
        </div>
      </div>

      <div className="border-t pt-4 space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">
            Auto-start timer after picking winner
          </span>
          <input
            type="checkbox"
            checked={autoStartTimer}
            onChange={(e) => setAutoStartTimer(e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
          />
        </label>
        
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-semibold text-gray-700">
            Exclude picked members from wheel
          </span>
          <input
            type="checkbox"
            checked={excludePickedMembers}
            onChange={(e) => setExcludePickedMembers(e.target.checked)}
            className="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary"
          />
        </label>
      </div>

      <div className="border-t pt-4 space-y-2">
        <label className="block text-sm font-semibold mb-2 text-gray-700">
          Export/Import Data:
        </label>
        <button
          onClick={handleExport}
          className="btn-secondary w-full"
        >
          📥 Export to Excel
        </button>
        
        <label className="block">
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleImport}
            className="hidden"
          />
          <span className="btn-primary w-full block text-center cursor-pointer">
            📤 Import from Excel
          </span>
        </label>
      </div>

      <div className="text-xs text-gray-500 text-center pt-2">
        Data is automatically saved to your browser's local storage
      </div>
    </div>
  )
}

export default Settings

