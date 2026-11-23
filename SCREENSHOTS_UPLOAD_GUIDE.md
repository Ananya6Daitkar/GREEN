# 📸 Screenshot Upload Guide

## How to Add Actual PNG Screenshots to GitHub

The README.md now references actual screenshot files, but we need to upload the PNG image files. Follow these steps:

### Method 1: GitHub Web Interface (Easiest)

1. **Go to GitHub Repository**
   - https://github.com/Ananya6Daitkar/GREEN

2. **Create Screenshots Folder**
   - Click "Add file" → "Create new file"
   - Type: `screenshots/.gitkeep`
   - Click "Commit changes"

3. **Upload Each Screenshot**
   - Click "Add file" → "Upload files"
   - Drag and drop or select files:
     - `01-homepage.png` (Homepage hero with navigation)
     - `02-studio.png` (Optimization workspace - 3 column layout)
     - `03-designs.png` (Design explorer with design cards)
     - `04-impact.png` (Environmental intelligence with assumptions)
     - `05-demo.png` (Demo step 7 with 3D preview)
   
   - Click "Commit changes"

### Method 2: Git Command Line

```bash
# Navigate to repo
cd /Users/nalinee/Green\ hacks

# Create screenshots directory
mkdir -p screenshots

# Add screenshot images (save your PNG files there)
cp ~/Downloads/01-homepage.png screenshots/
cp ~/Downloads/02-studio.png screenshots/
cp ~/Downloads/03-designs.png screenshots/
cp ~/Downloads/04-impact.png screenshots/
cp ~/Downloads/05-demo.png screenshots/

# Add to git
git add screenshots/

# Commit
git commit -m "Add actual screenshot images"

# Push to GitHub
git push origin main
```

### Screenshot File Naming

| File | Description |
|------|-------------|
| `01-homepage.png` | Hero section with main headline and CTAs |
| `02-studio.png` | Three-column optimization workspace |
| `03-designs.png` | Design explorer with design cards |
| `04-impact.png` | Environmental intelligence with assumptions |
| `05-demo.png` | Demo page with 7-step progress and 3D preview |

### Expected Result

Once uploaded, the README.md will display:

```markdown
![Homepage - Hero Section](screenshots/01-homepage.png)
![Studio - Three-Column Optimization Interface](screenshots/02-studio.png)
![Design Explorer - Browse and Manage Designs](screenshots/03-designs.png)
![Environmental Intelligence - Impact Comparison](screenshots/04-impact.png)
![Demo - Step 7 Reveal with 3D Preview](screenshots/05-demo.png)
```

And GitHub will render the actual images inline in the README!

---

## Current README References

The README.md at the bottom already has image references ready:

```markdown
## 📸 **ACTUAL WEBSITE SCREENSHOTS** (Real Application)

### **Screen 1: Homepage Hero**
![Homepage - Hero Section](screenshots/01-homepage.png)

### **Screen 2: Studio - Optimization Workspace**
![Studio - Three-Column Optimization Interface](screenshots/02-studio.png)

### **Screen 3: Designs - Design Explorer**
![Design Explorer - Browse and Manage Designs](screenshots/03-designs.png)

### **Screen 4: Impact - Environmental Intelligence**
![Environmental Intelligence - Impact Comparison](screenshots/04-impact.png)

### **Screen 5: Demo - Guided 7-Step Walkthrough**
![Demo - Step 7 Reveal with 3D Preview](screenshots/05-demo.png)
```

## Judges Will See

✅ Real application screenshots in the README  
✅ All pages documented with descriptions  
✅ Full workflow from homepage → studio → results  
✅ Professional UI with actual colors and layouts  
✅ 3D preview and interactive demo shown  

---

**Status:** Ready for image upload. All Markdown references are in place.
