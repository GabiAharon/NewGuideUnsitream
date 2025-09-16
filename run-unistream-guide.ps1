# מדריך העובד החדש - יוניסטרים 
# Unistream New Employee Guide Runner (PowerShell)

function Show-Menu {
    Clear-Host
    Write-Host "=========================================================" -ForegroundColor Cyan
    Write-Host "   מדריך העובד החדש - יוניסטרים " -ForegroundColor Yellow
    Write-Host "   Unistream New Employee Guide Runner" -ForegroundColor Yellow  
    Write-Host "=========================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "אנא בחרו פעולה / Please select an action:" -ForegroundColor Green
    Write-Host ""
    Write-Host "1. הפעלה מקומית (Development) - פתיחת שרת פיתוח מקומי" -ForegroundColor White
    Write-Host "2. בנייה (Build) - יצירת גרסת ייצור" -ForegroundColor White
    Write-Host "3. תצוגה מקדימה (Preview) - הצגת גרסת הייצור" -ForegroundColor White
    Write-Host "4. התקנת תלויות (Install Dependencies)" -ForegroundColor White
    Write-Host "5. ניקוי והתקנה מחדש (Clean Install)" -ForegroundColor White
    Write-Host "6. פתיחת דפדפן לכתובת מקומית" -ForegroundColor White
    Write-Host "7. בדיקת סטטוס (Check Status)" -ForegroundColor White
    Write-Host "8. יציאה (Exit)" -ForegroundColor White
    Write-Host ""
}

function Start-DevServer {
    Write-Host "מפעיל שרת פיתוח..." -ForegroundColor Yellow
    Write-Host "Starting development server..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "השרת יפעל בכתובת: http://localhost:5173" -ForegroundColor Green
    Write-Host "Server will run at: http://localhost:5173" -ForegroundColor Green
    Write-Host ""
    Write-Host "לעצירת השרת לחצו Ctrl+C" -ForegroundColor Red
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    Write-Host ""
    
    try {
        npm run dev
    }
    catch {
        Write-Host "שגיאה בהפעלת השרת / Error starting server" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

function Build-Production {
    Write-Host "בונה גרסת ייצור..." -ForegroundColor Yellow
    Write-Host "Building production version..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        npm run build
        Write-Host ""
        Write-Host "הבנייה הושלמה! הקבצים נמצאים בתיקיית docs" -ForegroundColor Green
        Write-Host "Build completed! Files are in the docs folder" -ForegroundColor Green
    }
    catch {
        Write-Host "שגיאה בבנייה / Build error" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "לחצו Enter להמשך / Press Enter to continue"
}

function Start-Preview {
    Write-Host "מפעיל תצוגה מקדימה של גרסת הייצור..." -ForegroundColor Yellow
    Write-Host "Starting preview of production build..." -ForegroundColor Yellow
    Write-Host ""
    Write-Host "השרת יפעל בכתובת: http://localhost:4173" -ForegroundColor Green
    Write-Host "Server will run at: http://localhost:4173" -ForegroundColor Green
    Write-Host ""
    Write-Host "לעצירת השרת לחצו Ctrl+C" -ForegroundColor Red
    Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
    Write-Host ""
    
    try {
        npm run preview
    }
    catch {
        Write-Host "שגיאה בהפעלת התצוגה המקדימה / Error starting preview" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
}

function Install-Dependencies {
    Write-Host "מתקין תלויות..." -ForegroundColor Yellow
    Write-Host "Installing dependencies..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        npm install
        Write-Host ""
        Write-Host "ההתקנה הושלמה!" -ForegroundColor Green
        Write-Host "Installation completed!" -ForegroundColor Green
    }
    catch {
        Write-Host "שגיאה בהתקנה / Installation error" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "לחצו Enter להמשך / Press Enter to continue"
}

function Clean-Install {
    Write-Host "מנקה ומתקין מחדש..." -ForegroundColor Yellow
    Write-Host "Cleaning and reinstalling..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        if (Test-Path "node_modules") {
            Remove-Item -Recurse -Force "node_modules"
            Write-Host "node_modules נמחק / node_modules deleted" -ForegroundColor Cyan
        }
        
        if (Test-Path "package-lock.json") {
            Remove-Item -Force "package-lock.json"
            Write-Host "package-lock.json נמחק / package-lock.json deleted" -ForegroundColor Cyan
        }
        
        npm install
        Write-Host ""
        Write-Host "הניקוי וההתקנה הושלמו!" -ForegroundColor Green
        Write-Host "Clean installation completed!" -ForegroundColor Green
    }
    catch {
        Write-Host "שגיאה בניקוי/התקנה / Clean install error" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "לחצו Enter להמשך / Press Enter to continue"
}

function Open-Browser {
    Write-Host "פותח דפדפן..." -ForegroundColor Yellow
    Write-Host "Opening browser..." -ForegroundColor Yellow
    Write-Host ""
    
    try {
        Start-Process "http://localhost:5173"
        Write-Host "אם השרת לא רץ, השתמשו באפשרות 1 קודם" -ForegroundColor Cyan
        Write-Host "If server is not running, use option 1 first" -ForegroundColor Cyan
    }
    catch {
        Write-Host "שגיאה בפתיחת הדפדפן / Error opening browser" -ForegroundColor Red
        Write-Host $_.Exception.Message -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "לחצו Enter להמשך / Press Enter to continue"
}

function Check-Status {
    Write-Host "בודק סטטוס..." -ForegroundColor Yellow
    Write-Host "Checking status..." -ForegroundColor Yellow
    Write-Host ""
    
    # Check if Node.js is installed
    try {
        $nodeVersion = node --version
        Write-Host "✓ Node.js מותקן / Node.js installed: $nodeVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ Node.js לא מותקן / Node.js not installed" -ForegroundColor Red
    }
    
    # Check if npm is available
    try {
        $npmVersion = npm --version
        Write-Host "✓ npm זמין / npm available: $npmVersion" -ForegroundColor Green
    }
    catch {
        Write-Host "✗ npm לא זמין / npm not available" -ForegroundColor Red
    }
    
    # Check if package.json exists
    if (Test-Path "package.json") {
        Write-Host "✓ package.json קיים / package.json exists" -ForegroundColor Green
    }
    else {
        Write-Host "✗ package.json לא קיים / package.json missing" -ForegroundColor Red
    }
    
    # Check if node_modules exists
    if (Test-Path "node_modules") {
        Write-Host "✓ node_modules קיים / node_modules exists" -ForegroundColor Green
    }
    else {
        Write-Host "✗ node_modules לא קיים / node_modules missing" -ForegroundColor Red
    }
    
    # Check if dist/docs folder exists
    if (Test-Path "docs") {
        Write-Host "✓ תיקיית docs קיימת / docs folder exists" -ForegroundColor Green
    }
    else {
        Write-Host "✗ תיקיית docs לא קיימת / docs folder missing" -ForegroundColor Red
    }
    
    Write-Host ""
    Read-Host "לחצו Enter להמשך / Press Enter to continue"
}

# Main execution
do {
    Show-Menu
    $choice = Read-Host "הזינו מספר / Enter number (1-8)"
    
    switch ($choice) {
        "1" { Start-DevServer }
        "2" { Build-Production }
        "3" { Start-Preview }
        "4" { Install-Dependencies }
        "5" { Clean-Install }
        "6" { Open-Browser }
        "7" { Check-Status }
        "8" { 
            Write-Host ""
            Write-Host "תודה שהשתמשתם במדריך יוניסטרים!" -ForegroundColor Green
            Write-Host "Thank you for using the Unistream Guide!" -ForegroundColor Green
            Write-Host ""
            exit 
        }
        default { 
            Write-Host "בחירה לא חוקית / Invalid choice" -ForegroundColor Red
            Start-Sleep -Seconds 2
        }
    }
} while ($true)
