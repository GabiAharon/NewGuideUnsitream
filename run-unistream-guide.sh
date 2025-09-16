#!/bin/bash

# מדריך העובד החדש - יוניסטרים 
# Unistream New Employee Guide Runner (Linux/Mac)

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

show_menu() {
    clear
    echo -e "${CYAN}=========================================================${NC}"
    echo -e "${YELLOW}   מדריך העובד החדש - יוניסטרים ${NC}"
    echo -e "${YELLOW}   Unistream New Employee Guide Runner${NC}"
    echo -e "${CYAN}=========================================================${NC}"
    echo ""
    echo -e "${GREEN}אנא בחרו פעולה / Please select an action:${NC}"
    echo ""
    echo -e "${WHITE}1. הפעלה מקומית (Development) - פתיחת שרת פיתוח מקומי${NC}"
    echo -e "${WHITE}2. בנייה (Build) - יצירת גרסת ייצור${NC}"
    echo -e "${WHITE}3. תצוגה מקדימה (Preview) - הצגת גרסת הייצור${NC}"
    echo -e "${WHITE}4. התקנת תלויות (Install Dependencies)${NC}"
    echo -e "${WHITE}5. ניקוי והתקנה מחדש (Clean Install)${NC}"
    echo -e "${WHITE}6. פתיחת דפדפן לכתובת מקומית${NC}"
    echo -e "${WHITE}7. בדיקת סטטוס (Check Status)${NC}"
    echo -e "${WHITE}8. יציאה (Exit)${NC}"
    echo ""
}

start_dev() {
    echo -e "${YELLOW}מפעיל שרת פיתוח...${NC}"
    echo -e "${YELLOW}Starting development server...${NC}"
    echo ""
    echo -e "${GREEN}השרת יפעל בכתובת: http://localhost:5173${NC}"
    echo -e "${GREEN}Server will run at: http://localhost:5173${NC}"
    echo ""
    echo -e "${RED}לעצירת השרת לחצו Ctrl+C${NC}"
    echo -e "${RED}Press Ctrl+C to stop the server${NC}"
    echo ""
    
    if ! npm run dev; then
        echo -e "${RED}שגיאה בהפעלת השרת / Error starting server${NC}"
        read -p "לחצו Enter להמשך / Press Enter to continue"
    fi
}

build_production() {
    echo -e "${YELLOW}בונה גרסת ייצור...${NC}"
    echo -e "${YELLOW}Building production version...${NC}"
    echo ""
    
    if npm run build; then
        echo ""
        echo -e "${GREEN}הבנייה הושלמה! הקבצים נמצאים בתיקיית docs${NC}"
        echo -e "${GREEN}Build completed! Files are in the docs folder${NC}"
    else
        echo -e "${RED}שגיאה בבנייה / Build error${NC}"
    fi
    
    echo ""
    read -p "לחצו Enter להמשך / Press Enter to continue"
}

start_preview() {
    echo -e "${YELLOW}מפעיל תצוגה מקדימה של גרסת הייצור...${NC}"
    echo -e "${YELLOW}Starting preview of production build...${NC}"
    echo ""
    echo -e "${GREEN}השרת יפעל בכתובת: http://localhost:4173${NC}"
    echo -e "${GREEN}Server will run at: http://localhost:4173${NC}"
    echo ""
    echo -e "${RED}לעצירת השרת לחצו Ctrl+C${NC}"
    echo -e "${RED}Press Ctrl+C to stop the server${NC}"
    echo ""
    
    if ! npm run preview; then
        echo -e "${RED}שגיאה בהפעלת התצוגה המקדימה / Error starting preview${NC}"
        read -p "לחצו Enter להמשך / Press Enter to continue"
    fi
}

install_deps() {
    echo -e "${YELLOW}מתקין תלויות...${NC}"
    echo -e "${YELLOW}Installing dependencies...${NC}"
    echo ""
    
    if npm install; then
        echo ""
        echo -e "${GREEN}ההתקנה הושלמה!${NC}"
        echo -e "${GREEN}Installation completed!${NC}"
    else
        echo -e "${RED}שגיאה בהתקנה / Installation error${NC}"
    fi
    
    echo ""
    read -p "לחצו Enter להמשך / Press Enter to continue"
}

clean_install() {
    echo -e "${YELLOW}מנקה ומתקין מחדש...${NC}"
    echo -e "${YELLOW}Cleaning and reinstalling...${NC}"
    echo ""
    
    if [ -d "node_modules" ]; then
        rm -rf node_modules
        echo -e "${CYAN}node_modules נמחק / node_modules deleted${NC}"
    fi
    
    if [ -f "package-lock.json" ]; then
        rm package-lock.json
        echo -e "${CYAN}package-lock.json נמחק / package-lock.json deleted${NC}"
    fi
    
    if npm install; then
        echo ""
        echo -e "${GREEN}הניקוי וההתקנה הושלמו!${NC}"
        echo -e "${GREEN}Clean installation completed!${NC}"
    else
        echo -e "${RED}שגיאה בניקוי/התקנה / Clean install error${NC}"
    fi
    
    echo ""
    read -p "לחצו Enter להמשך / Press Enter to continue"
}

open_browser() {
    echo -e "${YELLOW}פותח דפדפן...${NC}"
    echo -e "${YELLOW}Opening browser...${NC}"
    echo ""
    
    # Try different browsers/commands for different OS
    if command -v xdg-open > /dev/null; then
        xdg-open "http://localhost:5173"
    elif command -v open > /dev/null; then
        open "http://localhost:5173"
    elif command -v start > /dev/null; then
        start "http://localhost:5173"
    else
        echo -e "${RED}לא ניתן לפתוח דפדפן אוטומטית / Cannot open browser automatically${NC}"
        echo -e "${CYAN}אנא פתחו ידנית: http://localhost:5173${NC}"
        echo -e "${CYAN}Please open manually: http://localhost:5173${NC}"
    fi
    
    echo -e "${CYAN}אם השרת לא רץ, השתמשו באפשרות 1 קודם${NC}"
    echo -e "${CYAN}If server is not running, use option 1 first${NC}"
    
    echo ""
    read -p "לחצו Enter להמשך / Press Enter to continue"
}

check_status() {
    echo -e "${YELLOW}בודק סטטוס...${NC}"
    echo -e "${YELLOW}Checking status...${NC}"
    echo ""
    
    # Check if Node.js is installed
    if command -v node > /dev/null; then
        NODE_VERSION=$(node --version)
        echo -e "${GREEN}✓ Node.js מותקן / Node.js installed: $NODE_VERSION${NC}"
    else
        echo -e "${RED}✗ Node.js לא מותקן / Node.js not installed${NC}"
    fi
    
    # Check if npm is available
    if command -v npm > /dev/null; then
        NPM_VERSION=$(npm --version)
        echo -e "${GREEN}✓ npm זמין / npm available: $NPM_VERSION${NC}"
    else
        echo -e "${RED}✗ npm לא זמין / npm not available${NC}"
    fi
    
    # Check if package.json exists
    if [ -f "package.json" ]; then
        echo -e "${GREEN}✓ package.json קיים / package.json exists${NC}"
    else
        echo -e "${RED}✗ package.json לא קיים / package.json missing${NC}"
    fi
    
    # Check if node_modules exists
    if [ -d "node_modules" ]; then
        echo -e "${GREEN}✓ node_modules קיים / node_modules exists${NC}"
    else
        echo -e "${RED}✗ node_modules לא קיים / node_modules missing${NC}"
    fi
    
    # Check if docs folder exists
    if [ -d "docs" ]; then
        echo -e "${GREEN}✓ תיקיית docs קיימת / docs folder exists${NC}"
    else
        echo -e "${RED}✗ תיקיית docs לא קיימת / docs folder missing${NC}"
    fi
    
    echo ""
    read -p "לחצו Enter להמשך / Press Enter to continue"
}

# Make script executable
chmod +x "$0"

# Main execution loop
while true; do
    show_menu
    read -p "הזינו מספר / Enter number (1-8): " choice
    
    case $choice in
        1) start_dev ;;
        2) build_production ;;
        3) start_preview ;;
        4) install_deps ;;
        5) clean_install ;;
        6) open_browser ;;
        7) check_status ;;
        8) 
            echo ""
            echo -e "${GREEN}תודה שהשתמשתם במדריך יוניסטרים!${NC}"
            echo -e "${GREEN}Thank you for using the Unistream Guide!${NC}"
            echo ""
            exit 0
            ;;
        *)
            echo -e "${RED}בחירה לא חוקית / Invalid choice${NC}"
            sleep 2
            ;;
    esac
done
