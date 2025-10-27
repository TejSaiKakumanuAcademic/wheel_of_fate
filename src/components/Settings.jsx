import React from 'react'
import * as XLSX from 'xlsx'

function Settings({ timerDuration, setTimerDuration, autoStartTimer, setAutoStartTimer, excludePickedMembers, setExcludePickedMembers, groups }) {

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(groups)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Groups')
    XLSX.writeFile(wb, 'wheel-of-fate-data.xlsx')
  }

  const handleImport = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })
        const sheet = workbook.Sheets[workbook.SheetNames[0]]
        const json = XLSX.utils.sheet_to_json(sheet)
        if (json.length > 0) {
          // Handle imported data
          console.log('Imported data:', json)
          alert('Import functionality would update the groups here')
        }
      }
      reader.readAsArrayBuffer(file)
    }
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

