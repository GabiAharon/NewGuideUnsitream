@echo off
echo.
echo =========================================================
echo   מדריך העובד החדש - יוניסטרים 
echo   Unistream New Employee Guide Runner
echo =========================================================
echo.

:menu
echo אנא בחרו פעולה / Please select an action:
echo.
echo 1. הפעלה מקומית (Development) - פתיחת שרת פיתוח מקומי
echo 2. בנייה (Build) - יצירת גרסת ייצור
echo 3. תצוגה מקדימה (Preview) - הצגת גרסת הייצור
echo 4. התקנת תלויות (Install Dependencies)
echo 5. ניקוי והתקנה מחדש (Clean Install)
echo 6. פתיחת דפדפן לכתובת מקומית
echo 7. יציאה (Exit)
echo.

set /p choice="הזינו מספר / Enter number (1-7): "

if "%choice%"=="1" goto dev
if "%choice%"=="2" goto build
if "%choice%"=="3" goto preview
if "%choice%"=="4" goto install
if "%choice%"=="5" goto clean_install
if "%choice%"=="6" goto open_browser
if "%choice%"=="7" goto exit

echo בחירה לא חוקית / Invalid choice
goto menu

:dev
echo.
echo מפעיל שרת פיתוח...
echo Starting development server...
echo.
echo השרת יפעל בכתובת: http://localhost:5173
echo Server will run at: http://localhost:5173
echo.
echo לעצירת השרת לחצו Ctrl+C
echo Press Ctrl+C to stop the server
echo.
npm run dev
goto menu

:build
echo.
echo בונה גרסת ייצור...
echo Building production version...
echo.
npm run build
echo.
echo הבנייה הושלמה! הקבצים נמצאים בתיקיית docs
echo Build completed! Files are in the docs folder
echo.
pause
goto menu

:preview
echo.
echo מפעיל תצוגה מקדימה של גרסת הייצור...
echo Starting preview of production build...
echo.
echo השרת יפעל בכתובת: http://localhost:4173
echo Server will run at: http://localhost:4173
echo.
echo לעצירת השרת לחצו Ctrl+C
echo Press Ctrl+C to stop the server
echo.
npm run preview
goto menu

:install
echo.
echo מתקין תלויות...
echo Installing dependencies...
echo.
npm install
echo.
echo ההתקנה הושלמה!
echo Installation completed!
echo.
pause
goto menu

:clean_install
echo.
echo מנקה ומתקין מחדש...
echo Cleaning and reinstalling...
echo.
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
npm install
echo.
echo הניקוי וההתקנה הושלמו!
echo Clean installation completed!
echo.
pause
goto menu

:open_browser
echo.
echo פותח דפדפן...
echo Opening browser...
echo.
start http://localhost:5173
echo.
echo אם השרת לא רץ, השתמשו באפשרות 1 קודם
echo If server is not running, use option 1 first
echo.
pause
goto menu

:exit
echo.
echo תודה שהשתמשתם במדריך יוניסטרים!
echo Thank you for using the Unistream Guide!
echo.
pause
exit

