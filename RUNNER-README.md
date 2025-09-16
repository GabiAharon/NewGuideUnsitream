# מדריך העובד החדש - יוניסטרים
## Unistream New Employee Guide - Runner Scripts

### 📋 תיאור הפרויקט / Project Description

מדריך אינטראקטיבי לעובדים חדשים ביוניסטרים, כולל מצגות, מבחן ידע וצ'קליסט סיום. המדריך כתוב ב-React עם TypeScript ו-Tailwind CSS.

An interactive guide for new Unistream employees, including presentations, knowledge quiz, and completion checklist. Built with React, TypeScript, and Tailwind CSS.

### 🚀 הפעלה מהירה / Quick Start

#### Windows:
```bash
# הפעלת הסקריפט הראשי
./run-unistream-guide.bat

# או בPowerShell
./run-unistream-guide.ps1
```

#### Linux/Mac:
```bash
# הענקת הרשאות והפעלה
chmod +x run-unistream-guide.sh
./run-unistream-guide.sh
```

### 📁 קבצי הפעלה / Runner Files

1. **`run-unistream-guide.bat`** - סקריפט Windows Batch
2. **`run-unistream-guide.ps1`** - סקריפט PowerShell משופר
3. **`run-unistream-guide.sh`** - סקריפט Linux/Mac Bash

### 🛠️ אפשרויות זמינות / Available Options

כל הסקריפטים כוללים את האפשרויות הבאות:

#### 1. הפעלה מקומית (Development)
- מפעיל את שרת הפיתוח
- כתובת: `http://localhost:5173`
- תומך ב-Hot Reload

#### 2. בנייה (Build)
- יוצר גרסת ייצור
- קבצים נשמרים בתיקיית `docs/`
- מוכן להעלאה לשרת

#### 3. תצוגה מקדימה (Preview)
- מציג את גרסת הייצור
- כתובת: `http://localhost:4173`
- בדיקה לפני העלאה

#### 4. התקנת תלויות (Install Dependencies)
- מתקין את כל החבילות הנדרשות
- מפעיל `npm install`

#### 5. ניקוי והתקנה מחדש (Clean Install)
- מוחק `node_modules` ו-`package-lock.json`
- מתקין הכל מחדש
- פותר בעיות תלויות

#### 6. פתיחת דפדפן (Open Browser)
- פותח דפדפן בכתובת המקומית
- עובד עם שרתים פעילים

#### 7. בדיקת סטטוס (Check Status)
- בודק התקנת Node.js ו-npm
- מאמת קיום קבצים נדרשים
- מציג מידע על הפרויקט

### 📋 דרישות מערכת / System Requirements

- **Node.js** גרסה 16 ומעלה
- **npm** (מותקן עם Node.js)
- דפדפן מודרני התומך ב-ES6+

### 🔧 התקנה ראשונית / Initial Setup

1. **הורדת Node.js:**
   - Windows: https://nodejs.org/
   - Linux: `sudo apt install nodejs npm` או `sudo yum install nodejs npm`
   - Mac: `brew install node`

2. **בדיקת התקנה:**
   ```bash
   node --version
   npm --version
   ```

3. **התקנת תלויות:**
   ```bash
   npm install
   ```

### 🌐 הפעלה ידנית / Manual Execution

אם אתם מעדיפים להפעיל ללא הסקריפטים:

```bash
# פיתוח
npm run dev

# בנייה
npm run build

# תצוגה מקדימה
npm run preview
```

### 📂 מבנה הפרויקט / Project Structure

```
unistream-new-employee-guide/
├── src/
│   ├── App.tsx                 # קומפוננט ראשי
│   ├── components/
│   │   └── SlideComponents.tsx # כל השקפים
│   ├── types.ts               # הגדרות TypeScript
│   └── index.tsx              # נקודת כניסה
├── docs/                      # קבצי ייצור
├── run-unistream-guide.*      # סקריפטי הפעלה
├── package.json               # תלויות
├── vite.config.ts            # הגדרות Vite
└── index.html                # HTML ראשי
```

### 🎯 תכונות מיוחדות / Special Features

- **חוויית משתמש מותאמת RTL** עבור עברית
- **מעקב התקדמות** עם שמירה מקומית
- **מבחן אינטראקטיבי** עם משוב מיידי
- **צ'קליסט דינמי** לסיום התהליך
- **עיצוב רספונסיבי** לכל המכשירים
- **אנימציות חלקות** ו-transitions

### 🔍 פתרון בעיות / Troubleshooting

#### בעיות נפוצות:

1. **"command not found: npm"**
   - יש להתקין Node.js מחדש
   - בדקו שה-PATH מוגדר נכון

2. **"Cannot find module"**
   - הפעילו: `npm install`
   - אם לא עובד: `rm -rf node_modules && npm install`

3. **"Port already in use"**
   - הרגו תהליכים פעילים ביציאה
   - שנו יציאה ב-`vite.config.ts`

4. **בעיות הרשאות ב-Linux/Mac:**
   ```bash
   chmod +x run-unistream-guide.sh
   ```

### 📞 תמיכה / Support

לשאלות ותמיכה:
- **אימייל:** it@unistream.co.il
- **שקד תורג'מן:** shaked.t@unistream.co.il
- **ליהי סמו:** lihi.se@unistream.co.il

### 📄 רישיון / License

© 2024 Unistream. All rights reserved.

---

### 🚀 הערות למפתחים / Developer Notes

- הפרויקט משתמש ב-Vite לבנייה מהירה
- מערכת הנושאים ב-Tailwind CSS
- CDN dependencies לביצועים מוטבים
- Build מותאם ל-GitHub Pages

### 📊 סטטיסטיקות / Statistics

- **שקפים:** 13 שקפים אינטראקטיביים
- **שאלות מבחן:** 30+ שאלות מקיפות
- **סוגי תוכן:** טקסט, תמונות, וידאו, iframe
- **תמיכה בדפדפנים:** Chrome, Firefox, Safari, Edge

---

**בהצלחה עם המדריך החדש! 🎉**
**Good luck with the new guide! 🎉**
