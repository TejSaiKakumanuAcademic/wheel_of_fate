# 📊 Import/Export Guide - Wheel of Fate

## Overview

The Wheel of Fate app includes Excel import/export functionality to easily backup, share, and manage your data across different sessions or devices.

---

## 📥 Export to Excel

### How to Export:

1. Scroll to the **Settings** section (⚙️ Settings)
2. Click the **"📥 Export to Excel"** button
3. An Excel file will be automatically downloaded with today's date in the filename
   - Format: `wheel-of-fate-2025-10-27.xlsx`

### What Gets Exported:

The exported Excel file contains **2 sheets**:

#### Sheet 1: "Wheel Names"
- Contains all names in your wheel pool
- Columns:
  - **Name**: The person's name

Example:
| Name |
|------|
| Alice |
| Bob |
| Charlie |

#### Sheet 2: "Groups"
- Contains all your groups and their members
- Columns:
  - **Group Name**: The group's name
  - **Member Name**: Name of the member in that group

Example:
| Group Name | Member Name |
|------------|-------------|
| Team A | Alice |
| Team A | David |
| Team B | Bob |
| Team B | Charlie |

### Use Cases for Export:

✅ **Backup your data** before clearing browser cache  
✅ **Share team assignments** with others  
✅ **Keep records** of past sessions  
✅ **Transfer data** to another device  
✅ **Report generation** for team assignments  

---

## 📤 Import from Excel

### How to Import:

1. Scroll to the **Settings** section (⚙️ Settings)
2. Click the **"📤 Import from Excel"** button
3. **Warning dialog appears** if you have existing data
4. Review the warning and click "OK" to proceed (or "Cancel" to abort)
5. Select an Excel file (`.xlsx` or `.xls`)
6. Your data will be loaded immediately

### What Happens on Import:

- ⚠️ **WARNING: Deletes ALL existing data** (names and groups)
- ⚠️ **Shows confirmation dialog** before proceeding
- ✅ Imports wheel names from "Wheel Names" sheet
- ✅ Imports groups and members from "Groups" sheet
- ✅ Automatically saves to localStorage
- ✅ Shows detailed import summary

### Supported File Formats:

- `.xlsx` (Excel 2007+)
- `.xls` (Legacy Excel)

### Creating Your Own Excel File:

You can create a custom Excel file to import! Just follow this structure:

#### Sheet 1: "Wheel Names"
```
Name
--------
Alice
Bob
Charlie
```

#### Sheet 2: "Groups"
```
Group Name | Member Name
-----------|------------
Team A     | Alice
Team A     | Bob
Team B     | Charlie
```

**Important Notes:**
- Sheet names must be exactly: "Wheel Names" and "Groups"
- Column headers must match exactly (case-sensitive)
- All imported names start as "not picked" (fresh start)
- Empty rows are automatically ignored

---

## 🔄 Common Workflows

### Workflow 1: Backup Before Clearing Data

```
1. Export to Excel → Save the file
2. Clear all names/groups in the app
3. Import the Excel file → Restore everything
```

### Workflow 2: Share with Team

```
1. Export your current setup
2. Send Excel file to colleague via email/Slack
3. Colleague imports the file
4. Both have identical setups!
```

### Workflow 3: Prepare Data in Excel

```
1. Create Excel file with all team names
2. Organize into groups
3. Import into the app
4. Ready to spin!
```

### Workflow 4: Weekly Reset

```
1. Export current week's data (for records)
2. Import the same file next week
3. All names automatically reset to "not picked"
4. Ready for a fresh round!
```

---

## 📝 Excel Template

### Download Template

You can create a template in Excel with this structure:

**wheel-of-fate-template.xlsx**

**Sheet: "Wheel Names"**
| Name |
|------|
| Person 1 |
| Person 2 |
| Person 3 |

**Sheet: "Groups"**
| Group Name | Member Name |
|------------|-------------|
| Group 1 | Person 1 |
| Group 2 | Person 2 |

---

## 🔧 Advanced Features

### Bulk Import Names

Instead of adding names one by one:

1. Create an Excel file with all names (just a "Name" column)
2. Leave Groups sheet empty (or delete it)
3. Import → All names loaded instantly!
4. All names start fresh (not picked)

### Pre-assign Groups

To start with pre-defined groups:

1. In Excel, list all groups and their members
2. Can leave "Wheel Names" sheet empty if you only need groups
3. Import → Groups are ready!

### Fresh Start with Same Names

- Export your current data
- Re-import it later for a fresh start
- All names will be "not picked" again
- Groups preserve their structure

---

## ⚠️ Important Notes

### Data Replacement Warning

**⚠️ CRITICAL: Import DELETES ALL current data!**

The app will show a warning dialog:
```
⚠️ WARNING: Importing will DELETE ALL existing data!

Current data:
- X name(s) in wheel
- Y group(s)

This action cannot be undone.

TIP: Export your current data first as a backup!

Do you want to continue?
```

**Best Practice:**
1. Click "📥 Export to Excel" first
2. Save the file as backup
3. Then import new file
4. You can always re-import your backup if needed

### Browser Compatibility

- ✅ Works in Chrome, Firefox, Safari, Edge
- ✅ Mobile browsers supported (file picker may look different)
- ✅ No internet connection needed (pure client-side)

### File Size Limits

- Practical limit: ~1000 names, ~100 groups
- Larger files may slow down browser
- Excel files are very efficient (small file sizes)

### Privacy & Security

- ✅ All processing is done locally in your browser
- ✅ No data uploaded to any server
- ✅ Excel files stay on your device
- ✅ Safe to use with sensitive names/groups

---

## 🐛 Troubleshooting

### "Error importing file" Message

**Possible causes:**
1. File is corrupted
2. Sheet names don't match exactly ("Wheel Names" and "Groups")
3. Column headers don't match
4. File format is not `.xlsx` or `.xls`

**Solutions:**
- Try exporting from the app first to see correct format
- Check sheet names and column headers
- Ensure file is a valid Excel file
- Try re-creating the file from scratch

### Import Doesn't Show My Data

**Check:**
- Did you use correct sheet names?
- Are column headers exact matches?
- Are there any typos in the headers?
- Is the file actually an Excel file (not CSV or PDF)?

### Export Button Doesn't Work

**Try:**
- Refresh the page
- Check if pop-up blocker is interfering
- Try a different browser
- Ensure JavaScript is enabled

### File Won't Download

**Solutions:**
- Check browser's download settings
- Disable pop-up blocker for this site
- Clear browser cache
- Check available disk space

---

## 💡 Tips & Tricks

### Quick Team Setup

Create a master Excel file with all team members and common groups. Import at the start of each session!

### Archive Old Sessions

Export with date in filename before clearing. Build a history folder:
```
wheel-of-fate-2025-10-20.xlsx
wheel-of-fate-2025-10-27.xlsx
wheel-of-fate-2025-11-03.xlsx
```

### Rotation Planning

Use Excel to plan multi-week rotations, then import each week's file when needed.

### Template Library

Create multiple templates for different scenarios:
- `daily-standup.xlsx`
- `code-review-rotation.xlsx`
- `on-call-schedule.xlsx`

### Combine with Other Tools

Export → Open in Excel → Create charts, add formulas, generate reports!

---

## 📖 Example Use Cases

### Use Case 1: Daily Standup

```
Setup:
- Import team members once
- Export after each standup
- Track who's been picked over time
- Use "Exclude picked members" option
```

### Use Case 2: Code Review Assignments

```
Setup:
- Groups = Different code areas (Frontend, Backend, etc.)
- Spin to pick reviewer
- Assign to appropriate group
- Export for documentation
```

### Use Case 3: Event Team Assignment

```
Setup:
- Create groups in Excel (Setup, Catering, AV, etc.)
- Import all volunteers
- Spin and assign to groups
- Export final assignments
```

---

## 🎯 Best Practices

1. **Regular Backups**: Export weekly or after major changes
2. **Clear Naming**: Use descriptive group names
3. **Version Control**: Date your exports for tracking
4. **Test Imports**: Test with small file first
5. **Clean Data**: Remove empty rows in Excel before importing

---

## 🆘 Need Help?

If you encounter issues:

1. Export your current data as backup
2. Try importing a simple test file
3. Check browser console for error messages
4. Verify Excel file format matches examples above
5. Try clearing browser cache and reloading

---

## Summary

| Feature | What It Does |
|---------|--------------|
| **Export** | Download all data as Excel file with 2 sheets |
| **Import** | Load data from Excel, replacing current data |
| **Format** | Standard Excel (.xlsx, .xls) |
| **Sheets** | "Wheel Names" + "Groups" |
| **Storage** | Imported data saved to localStorage |
| **Security** | All processing is local, no server upload |

The import/export feature makes it easy to backup, share, and manage your Wheel of Fate data efficiently! 🎉

