
import React, { useState, useMemo, useEffect } from 'react';
import type { SlideNavProps } from '../types';

// --- Layout & Helper Components ---

const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => (
  <span className={`material-icons ${className}`}>{name}</span>
);

const NavButton: React.FC<{ onClick: () => void; children: React.ReactNode; className?: string }> = ({ onClick, children, className }) => (
    <button
        onClick={onClick}
        className={`bg-white/10 hover:bg-white/20 border-none text-white px-8 py-3.5 rounded-full text-lg font-semibold cursor-pointer flex items-center transition-all duration-300 ease-in-out ${className}`}
    >
        {children}
    </button>
);

export const ProgressBar: React.FC<{ current: number; total: number; isFirst: boolean }> = ({ current, total, isFirst }) => {
  if (isFirst) return null;
  // Progress should start from slide 1, not 0 (intro).
  const progress = total > 1 ? ((current -1) / (total - 2)) * 100 : 0;
  return (
    <div className="w-full bg-white/20 h-2 absolute top-0 left-0 right-0 z-30">
      <div
        className="bg-pink-500 h-2 rounded-full transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

interface SidebarProps {
  slides: { title: string; icon: string }[];
  currentSlide: number;
  onNavigate: (index: number) => void;
  onHome: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ slides, currentSlide, onNavigate, onHome }) => {
    return (
        <aside className="w-72 bg-indigo-900/50 backdrop-blur-lg text-white p-6 flex-col flex-shrink-0 rounded-l-3xl shadow-2xl hidden lg:flex">
            <div className="flex items-center mb-8 cursor-pointer" role="button" onClick={onHome}>
                <img src="https://i.postimg.cc/C5WmBYVz/1.png" alt="Unistream Logo" className="w-16 h-auto" />
                <div className="mr-4">
                    <h2 className="text-xl font-bold">יוניסטרים</h2>
                    <p className="text-sm opacity-80">מדריך העובד</p>
                </div>
            </div>
            <nav className="flex-grow">
                <ul>
                    {slides.map((slide, index) => {
                        const slideIndexInNav = index + 1;
                        const isActive = currentSlide === slideIndexInNav;
                        return (
                            <li key={slide.title}>
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onNavigate(slideIndexInNav); }}
                                    className={`flex items-center p-4 my-1.5 rounded-xl text-lg transition-all duration-300 ${isActive ? 'bg-pink-500/30 text-white font-bold' : 'hover:bg-white/10 text-white/80'}`}
                                >
                                    <Icon name={slide.icon} className="ml-4 text-2xl" />
                                    {slide.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </nav>
            <div className="mt-auto text-center text-xs opacity-60">
                <p>&copy; {new Date().getFullYear()} Unistream. All rights reserved.</p>
            </div>
        </aside>
    );
};

const SlideLayout: React.FC<{ title: string; children: React.ReactNode; navProps: SlideNavProps; }> = ({ title, children, navProps }) => (
    <div className={`w-full h-full mx-auto bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col p-5 sm:p-10 text-white max-w-[1900px]`}>
        <ProgressBar current={navProps.currentSlide} total={navProps.totalSlides} isFirst={navProps.isFirst} />
        {!navProps.isFirst && (
            <button
                onClick={navProps.onHome}
                className="absolute top-6 left-6 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors duration-300"
                aria-label="חזרה לדף הבית"
            >
                <Icon name="home" />
            </button>
        )}
        <div className="absolute w-72 h-72 sm:w-96 sm:h-96 top-[-150px] left-[-150px] bg-white/5 rounded-full -z-0"></div>
        <div className="absolute w-48 h-48 sm:w-72 sm:h-72 bottom-[-100px] right-[-100px] bg-white/5 rounded-full -z-0"></div>
        <header className="flex flex-col items-center justify-center text-center mb-8 z-10 pt-4">
            <img src="https://i.postimg.cc/C5WmBYVz/1.png" alt="Unistream Logo" className="w-20 h-auto mb-5" />
            <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">{title}</h1>
        </header>
        <main className="flex-grow overflow-y-auto px-1 sm:px-4 z-10">
            {children}
        </main>
        <footer className="flex justify-between mt-8 z-10">
            {!navProps.isFirst ? (
                <NavButton onClick={navProps.onPrev}>
                    <Icon name="arrow_forward" className="me-2" />
                    קודם
                </NavButton>
            ) : <div></div>}
            {!navProps.isLast ? (
                <NavButton onClick={navProps.onNext}>
                    הבא
                    <Icon name="arrow_back" className="ms-2" />
                </NavButton>
            ) : <div></div>}
        </footer>
    </div>
);


const Socials: React.FC = () => {
    const socialLinks = [
        {
            name: 'LinkedIn',
            href: 'https://www.linkedin.com/company/unistream/posts/?feedView=all',
            icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        },
        {
            name: 'Facebook',
            href: 'https://www.facebook.com/unistream/?locale=he_IL',
            icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v2.385z"/></svg>
        },
        {
            name: 'TikTok',
            href: 'https://www.tiktok.com/@unistream_',
            icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.525.02c1.31-.02 2.61-.01 3.91.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>
        },
        {
            name: 'Instagram',
            href: 'https://www.instagram.com/unistream_/',
            icon: <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
        }
    ];

    return (
        <div className="absolute bottom-10 sm:bottom-10 left-0 right-0 z-10 text-center">
            <p className="text-lg font-semibold mb-4 opacity-80">עקבו אחרינו</p>
            <div className="flex justify-center items-center gap-6 sm:gap-10">
                {socialLinks.map(link => (
                    <a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Follow us on ${link.name}`}
                        className="text-white/70 hover:text-white hover:scale-110 transition-all duration-300"
                    >
                        <div className="w-6 h-6 sm:w-7 sm:h-7">
                            {link.icon}
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};


// --- Individual Slides ---

// 1. Intro Slide
export const IntroSlide: React.FC<SlideNavProps> = ({ onStart }) => (
    <div className="w-full h-full mx-auto bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-3xl overflow-hidden relative shadow-2xl flex flex-col items-center justify-center p-10 text-white text-center">
        <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 z-0"
            style={{ backgroundImage: 'url(https://i.postimg.cc/4x9nf3qt/image.png)' }}
        ></div>
        <div className="absolute w-72 h-72 top-[-100px] right-[-100px] bg-white/10 rounded-full z-10"></div>
        <div className="absolute w-48 h-48 bottom-[-50px] left-[-50px] bg-white/10 rounded-full z-10"></div>
        <div className="relative z-20 flex flex-col items-center justify-center">
            <img src="https://i.postimg.cc/C5WmBYVz/1.png" alt="Unistream Logo" className="w-56 h-auto drop-shadow-lg mb-10" />
            <h1 className="text-6xl font-extrabold mb-6 leading-tight bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">מדריך למנהלים חדשים</h1>
            <h2 className="text-3xl font-semibold mb-10 opacity-90">ברוכים הבאים ליוניסטרים!</h2>
            <p className="text-2xl leading-relaxed mb-10 opacity-80 max-w-2xl">
                המדריך המלא שיעזור לכם להכיר את הארגון, התכניות, המערכות והתהליכים שלנו
            </p>
            <button
                onClick={onStart}
                className="bg-pink-500 hover:bg-pink-600 text-white border-none px-6 py-3 sm:px-8 sm:py-4 text-lg sm:text-xl font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 mb-8 sm:mb-0"
            >
                בואו נתחיל
                <Icon name="arrow_forward" />
            </button>
        </div>
        <Socials />
    </div>
);

// 2. About Slide
const aboutSections = [
    { 
        icon: 'lightbulb', 
        title: 'החזון שלנו', 
        content: `יוניסטרים פועלת לפיתוח חשיבה יזמית, חדשנית וטכנולוגית בפריפריה בכדי להבטיח <span class="text-pink-400 font-semibold">שוויון הזדמנויות</span>, לצמצם פערים ולהפוך את הפריפריה למנוע צמיחה במדינת ישראל. באמצעות חינוך ליזמות, אנו מקדמים שינוי אישי, חברתי ולאומי המניע את הצמיחה של המשק העתידי ונועד להבטיח את השגשוג של החברה הישראלית כולה.`
    },
    { 
        icon: 'rocket_launch', 
        title: 'המשימה שלנו', 
        content: `יוניסטרים מעניקה קו זינוק שווה לבני ובנות נוער מכל רחבי הארץ ומכל המגזרים. אנו מכשירים אותם ליזמות עסקית וחברתית, ומספקים כלים, מיומנויות וביטחון עצמי כדי <span class="text-pink-400 font-semibold">לחלום בגדול</span>, להגשים את שאיפותיהם וליצור <span class="text-pink-400 font-semibold">Inclusive Start-Up Nation</span>.`
    },
    { 
        icon: 'stars', 
        title: 'ערכי הליבה', 
        content: 'הערכים המנחים את כל פעילותינו:', 
        values: [
            { icon: 'diversity_3', text: 'שוויון הזדמנויות' }, 
            { icon: 'psychology', text: 'חדשנות' }, 
            { icon: 'handshake', text: 'שותפות' }, 
            { icon: 'self_improvement', text: 'העצמה' }, 
            { icon: 'public', text: 'אחריות חברתית' }
        ] 
    },
    { 
        icon: 'insights', 
        title: 'הישגים מרכזיים', 
        content: `<ul class="list-none p-0">
                      <li class="mb-3">• פעילות בלמעלה מ-<span class="text-pink-400 font-semibold">22 מרכזי יזמות</span> ברחבי הארץ.</li>
                      <li class="mb-3">• הכשרת אלפי בני נוער מדי שנה <span class="text-white/80">מכל המגזרים</span> (יהודים, ערבים, דתיים, חילונים, דרוזים ובדואים).</li>
                      <li class="mb-3">• שותפויות אסטרטגיות עם אלפי אנשי עסקים והייטק בכירים מהארץ ומהעולם.</li>
                   </ul>` 
    }
];

export const AboutSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="אודות יוניסטרים" navProps={props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-10">
            {aboutSections.map(section => (
                <div key={section.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-7 hover:-translate-y-1 transition-transform duration-300">
                    <div className="flex items-center text-3xl font-bold mb-5 text-pink-400">
                        <Icon name={section.icon} className="me-4 text-4xl" />
                        {section.title}
                    </div>
                    <div className="text-xl leading-relaxed" dangerouslySetInnerHTML={{ __html: section.content }} />
                    {section.values && (
                        <div className="flex flex-wrap gap-4 mt-5">
                            {section.values.map(value => (
                                <div key={value.text} className="bg-pink-500/20 rounded-full px-5 py-2.5 text-lg font-semibold flex items-center">
                                    <Icon name={value.icon} className="me-2 text-xl" />
                                    {value.text}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        <div className="text-center mt-8">
            <a 
                href="https://unistream.co.il/%d7%9e%d7%98%d7%94-%d7%99%d7%95%d7%a0%d7%99%d7%a1%d7%98%d7%a8%d7%99%d7%9d/"
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center bg-pink-500 hover:bg-pink-600 text-white border-none px-8 py-4 text-xl font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-1"
            >
                <Icon name="groups" className="me-3" />
                הכירו את צוות מטה יוניסטרים
            </a>
        </div>
    </SlideLayout>
);

// 3. Programs Slide (was 4)
const programs = [
  { icon: 'rocket_launch', title: 'Edventure', subtitle: 'תכנית הדגל של יוניסטרים', details: 'תכנית תלת שנתית (ט\'-י"א) המכשירה בני נוער מהפריפריה ליזמות עסקית, חברתית וטכנולוגית.', years: ['Junior - שנה ראשונה', 'Senior - שנה שנייה', 'Expert - שנה שלישית'], features: [{ icon: 'business', text: 'הקמת סטארט-אפ' }, { icon: 'person', text: 'ליווי מנטורים' }, { icon: 'psychology', text: 'פיתוח מיומנויות' }], videos: [{ title: 'מהי תכנית Edventure?', url: 'https://youtu.be/xkPsJyc8DD8?si=Zp_emxtV9_erilzW' }, { title: 'מבנה השנים בתכנית', url: 'https://youtu.be/GcyvkQJEiDA?si=5rYp0rjOuviGY_lE' }] },
  { icon: 'lightbulb', title: 'StartUpNow (SUN)', subtitle: 'תכנית יזמות חד שנתית', details: 'תכנית המכשירה בני נוער ליזמות עסקית וחדשנות, כוללת פיתוח מיזם, ליווי מנטורים ופיתוח מיומנויות חשיבה יצירתית.', features: [{ icon: 'trending_up', text: 'חדשנות' }, { icon: 'emoji_objects', text: 'חשיבה יצירתית' }] },
  { icon: 'public', title: 'NFTE', subtitle: 'תכנית יזמות בינלאומית', details: 'תכנית יזמות חד שנתית בינלאומית הפועלת בישראל במסגרת יוניסטרים, מכשירה בני נוער ליזמות עסקית תוך רכישת מיומנויות וכישורי חיים.', features: [{ icon: 'language', text: 'בינלאומית' }, { icon: 'school', text: 'כישורי חיים' }] },
  { icon: 'flight_takeoff', title: 'NEXTREAM', subtitle: 'תכנית פיילוט לבוגרים', details: 'תכנית פיילוט המיועדת לבוגרי התכנית (שנה ד\'). הבוגרים עוברים הכשרה מקיפה ומשתלבים בהדרכת חניכי שנים א\'-ב\' במרכזים.', features: [{ icon: 'workspace_premium', text: 'הכשרת מדריכים' }, { icon: 'volunteer_activism', text: 'הדרכת חניכים' }] },
  { icon: 'speed', title: 'תכנית המאיץ (אקסלרטור)', subtitle: 'פיילוט לחניכי שנה ג\'', details: 'תכנית האצה בחסות קרן ההון סיכון Team8 בתל אביב. מטרת התכנית לעזור לחניכים להקפיץ את המיזמים שלהם לרמה הגבוהה ביותר.', features: [{ icon: 'attach_money', text: 'השקעות' }, { icon: 'storefront', text: 'שיווק ומכירות' }, { icon: 'groups', text: 'פאנל השקעות' }] },
  { icon: 'forum', title: 'מחליפים מילה', subtitle: 'פרויקט בשיתוף בית הנשיא', details: 'תכנית ייחודית המהווה תרגום מעשי לחזון הנשיא. התכנית משלבת פעילות חינוכית חדשנית עם בניית הסכמות בחברה הישראלית.', features: [{ icon: 'account_balance', text: 'בית הנשיא' }, { icon: 'diversity_3', text: 'דיאלוג חברתי' }] }
];

export const ProgramsSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="תכניות יוניסטרים" navProps={props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {programs.map(program => (
                <div key={program.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center me-5 flex-shrink-0">
                            <Icon name={program.icon} className="text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-pink-400">{program.title}</h3>
                            <p className="text-lg opacity-80">{program.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed flex-grow">{program.details}</p>
                    {program.years && (
                        <div className="flex flex-wrap gap-2.5 mt-3">
                            {program.years.map(year => (
                                <div key={year} className="bg-white/15 rounded-lg px-4 py-2 text-md font-semibold">{year}</div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-wrap gap-3 mt-4">
                        {program.features.map(feature => (
                            <div key={feature.text} className="bg-pink-500/20 rounded-full px-4 py-2 text-md font-semibold flex items-center">
                                <Icon name={feature.icon} className="me-2 text-lg" />
                                {feature.text}
                            </div>
                        ))}
                    </div>
                    {program.videos && program.videos.length > 0 && (
                        <div className="mt-auto pt-4 flex flex-col gap-2">
                            {program.videos.map(video => (
                                <a key={video.url} href={video.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-pink-500/50 hover:bg-pink-500/80 rounded-lg px-4 py-3 font-semibold text-md transition-all">
                                    <Icon name="play_circle_filled" className="me-2" />
                                    {video.title}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    </SlideLayout>
);

// 4. Events Slide (was 5)
const events = [
    { icon: 'gavel', title: 'ועדות GO NO GO', subtitle: "שנה א'", details: "אירועים המתקיימים במרץ-אפריל בהם חניכי יוניסטרים מציגים את המיזמים שלהם בפני מנהלים בכירים מחברות שונות.", features: [{icon: 'event', text: 'מרץ-אפריל'}, {icon: 'record_voice_over', text: 'הצגת מיזמים'}, {icon: 'feedback', text: 'משוב מקצועי'}], img: 'https://i.postimg.cc/R03wmGdC/1.png' },
    { icon: 'attach_money', title: 'פאנל השקעות', subtitle: "שנים ב'-ג'", details: "אירוע שיא לחניכי שנים ב' ו-ג' בתכנית Edventure, בו הם מציגים את המיזמים שלהם בפני משקיעים פוטנציאליים. האירוע מדמה גיוס הון אמיתי ומתקיים באנגלית.", features: [{icon: 'language', text: 'באנגלית'}, {icon: 'trending_up', text: 'סימולציית גיוס'}, {icon: 'groups', text: 'משקיעים'}], img: 'https://i.postimg.cc/zBKWbB49/2.png' },
    { icon: 'emoji_events', title: 'תחרות מיזם השנה', subtitle: "כלל השנים", details: "תחרות שנתית בה מתחרים כ-90 מיזמים של בני נוער על תואר המיזם הטוב ביותר. התחרות מחולקת לקטגוריות לפי שנת לימודים.", features: [{icon: 'military_tech', text: 'תחרות שנתית'}, {icon: 'category', text: 'קטגוריות'}, {icon: 'workspace_premium', text: 'הכרה ציבורית'}], videoUrl: 'https://www.youtube.com/embed/axG3zVVvjpM' }
];

export const EventsSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="אירועים מרכזיים" navProps={props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
             {events.map(event => (
                <div key={event.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center me-5 flex-shrink-0">
                            <Icon name={event.icon} className="text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-pink-400">{event.title}</h3>
                            <p className="text-lg opacity-80">{event.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed">{event.details}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {event.features.map(feature => (
                            <div key={feature.text} className="bg-pink-500/20 rounded-full px-4 py-2 text-md font-semibold flex items-center">
                                <Icon name={feature.icon} className="me-2 text-lg" />
                                {feature.text}
                            </div>
                        ))}
                    </div>
                    {event.img && <img src={event.img} alt={event.title} className="w-full h-64 object-cover rounded-xl mt-auto pt-4" />}
                    {event.videoUrl && <iframe
                        className="w-full h-48 rounded-xl mt-auto pt-4"
                        src={event.videoUrl}
                        title={event.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>}
                </div>
            ))}
        </div>
    </SlideLayout>
);


// 5. Systems Slide (was 6)
const systems = [
    { 
      icon: 'cloud', 
      title: 'Salesforce', 
      subtitle: 'מערכת לתיעוד מפגשים ומעקב נוכחות', 
      details: 'מערכת לתיעוד מפגשים, רישום ומעקב נוכחות חניכים. יש לעדכן בסוף כל יום או לכל המאוחר עד יום חמישי של אותו שבוע.', 
      features: [{icon: 'event_note', text: 'תיעוד מפגשים'}, {icon: 'how_to_reg', text: 'מעקב נוכחות'}, {icon: 'update', text: 'עדכון שבועי'}], 
      link: 'https://unistream.my.salesforce.com/', 
      img: 'https://i.postimg.cc/8PL55HbP/3.jpg',
      trainingLinks: [
        { title: 'סקירה כללית על המערכת', url: 'https://unistream1.sharepoint.com/sites/Unistream/SitePages/%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1--%D7%A1%D7%A8%D7%98%D7%95%D7%9F-%D7%94%D7%93%D7%A8%D7%9B%D7%94--%D7%A1%D7%A7%D7%99%D7%A8%D7%94-%D7%9B%D7%9C%D7%9C%D7%99%D7%AA-%D7%A9%D7%9C-%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA-%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1.aspx' },
        { title: 'רישום חניכים במערכת', url: 'https://drive.google.com/file/d/1HcJa6n_QY1I7WFs0w7QoTsjwXMsLLr9L/view?pli=1' },
        { title: 'Dashboards', url: 'https://unistream1.sharepoint.com/sites/Unistream/SitePages/%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1--dashboardes.aspx' },
        { title: 'דיווח מפגש', url: 'https://drive.google.com/file/d/16_U3NaI7VU4T-SYu2A9vKkqr1eajyjbE/view' },
        { title: 'דיווח על חניך שנשר', url: 'https://unistream1.sharepoint.com/sites/Unistream/SitePages/%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1--%D7%93%D7%99%D7%95%D7%95%D7%9A-%D7%A2%D7%9C-%D7%97%D7%A0%D7%99%D7%9A-%D7%A9%D7%A0%D7%A9%D7%A8.aspx' }
      ]
    },
    { icon: 'schedule', title: 'UNINET', subtitle: 'מערכת דיווחי שעות עבודה', details: 'מערכת דיווחי שעות עבודה - בה נדווח את שעות העבודה או בכל סיום יום או לכל המאוחר עד יום חמישי של אותו שבוע.', features: [{icon: 'receipt_long', text: 'חשבוניות הוצאות'}, {icon: 'directions_car', text: 'דיווח נסיעות'}, {icon: 'sick', text: 'אישורי מחלה'}, {icon: 'beach_access', text: 'אישורי חופשה'}], link: 'https://app.unistream.co.il/login', img: 'https://i.postimg.cc/mDQQtwnY/GONOGO5.jpg' },
    { icon: 'folder_shared', title: 'SharePoint', subtitle: 'מערכת ניהול תוכן ומסמכים', details: 'המערכת מספקת גישה לכלל מערכי התוכן, סילבוס, תכנית לימודים, סיכומי הכשרות, לומדות ואזור אישי להעלאת תוצרים.', features: [{icon: 'menu_book', text: 'מערכי תוכן'}, {icon: 'school', text: 'סילבוס ותכנית לימודים'}, {icon: 'summarize', text: 'סיכומי הכשרות'}, {icon: 'cloud_upload', text: 'העלאת תוצרים'}], link: 'https://unistream1.sharepoint.com/', img: 'https://i.postimg.cc/Y0Hz3VFD/GONOGO3.jpg' }
];

export const SystemsSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="מערכות יוניסטרים" navProps={props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {systems.map(system => (
                <div key={system.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center me-5 flex-shrink-0">
                            <Icon name={system.icon} className="text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-pink-400">{system.title}</h3>
                            <p className="text-lg opacity-80">{system.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed">{system.details}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {system.features.map(feature => (
                            <div key={feature.text} className="bg-pink-500/20 rounded-full px-4 py-2 text-md font-semibold flex items-center">
                                <Icon name={feature.icon} className="me-2 text-lg" />
                                {feature.text}
                            </div>
                        ))}
                    </div>
                    
                    {system.trainingLinks && (
                      <div className="mt-4 flex flex-col gap-3">
                          <h4 className="font-bold text-pink-400">מדריכים וסרטוני הדרכה:</h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {system.trainingLinks.map(link => (
                                  <a key={link.title} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg p-3 text-sm font-semibold transition-all">
                                      <Icon name="ondemand_video" className="me-2 text-lg"/>
                                      {link.title}
                                  </a>
                              ))}
                          </div>
                          <button onClick={props.onShowGlossary} className="inline-flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-lg p-3 text-sm font-semibold transition-all mt-1">
                              <Icon name="menu_book" className="me-2 text-lg"/>
                              פתח מילון מושגים של Salesforce
                          </button>
                      </div>
                    )}

                    <a href={system.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center bg-white/15 hover:bg-white/25 rounded-lg px-6 py-3 mt-4 font-semibold text-lg transition-all">
                        כניסה למערכת
                        <Icon name="login" className="ms-3" />
                    </a>
                    <img src={system.img} alt={system.title} className="w-full h-64 object-cover rounded-xl mt-auto pt-4" />
                </div>
            ))}
        </div>
    </SlideLayout>
);

// 6. Resource Hub Slide (was 7)
export const ResourceHubSlide: React.FC<SlideNavProps> = (props) => {
  interface ResourceItem {
    title: string;
    desc?: string;
    url?: string;
    onClick?: () => void;
  }

  const resources: Array<{
    category: string;
    icon: string;
    items: ResourceItem[];
  }> = [
    { 
      category: 'מערכות מרכזיות', 
      icon: 'dns',
      items: [
        { title: 'Salesforce', desc: 'כניסה למערכת תיעוד ונוכחות', url: 'https://unistream.my.salesforce.com/' },
        { title: 'UNINET', desc: 'כניסה למערכת דיווחי שעות', url: 'https://app.unistream.co.il/login' },
        { title: 'SharePoint', desc: 'מאגר התוכן והמסמכים הארגוני', url: 'https://unistream1.sharepoint.com/' },
      ]
    },
    {
      category: 'מדריכי וידאו (Salesforce)',
      icon: 'ondemand_video',
      items: [
        { title: 'סקירה כללית', url: 'https://unistream1.sharepoint.com/sites/Unistream/SitePages/%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1--%D7%A1%D7%A8%D7%98%D7%95%D7%9F-%D7%94%D7%93%D7%A8%D7%9B%D7%94--%D7%A1%D7%A7%D7%99%D7%A8%D7%94-%D7%9B%D7%9C%D7%9C%D7%99%D7%AA-%D7%A9%D7%9C-%D7%9E%D7%A2%D7%A8%D7%9B%D7%AA-%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1.aspx' },
        { title: 'רישום חניכים', url: 'https://drive.google.com/file/d/1HcJa6n_QY1I7WFs0w7QoTsjwXMsLLr9L/view?pli=1' },
        { title: 'Dashboards', url: 'https://unistream1.sharepoint.com/sites/Unistream/SitePages/%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1--dashboardes.aspx' },
        { title: 'דיווח מפגש', url: 'https://drive.google.com/file/d/16_U3NaI7VU4T-SYu2A9vKkqr1eajyjbE/view' },
        { title: 'דיווח נשירה', url: 'https://unistream1.sharepoint.com/sites/Unistream/SitePages/%D7%A1%D7%99%D7%99%D7%9C%D7%A1%D7%A4%D7%95%D7%A8%D7%A1--%D7%93%D7%99%D7%95%D7%95%D7%9A-%D7%A2%D7%9C-%D7%97%D7%A0%D7%99%D7%9A-%D7%A9%D7%A0%D7%A9%D7%A8.aspx' },
        { title: 'מילון מושגים', onClick: props.onShowGlossary },
      ]
    },
    { 
      category: 'קישורים שימושיים',
      icon: 'link',
      items: [
        { title: 'אתר משרדיה', desc: 'הזמנת ציוד משרדי', url: 'https://www.misradia.co.il/' },
        { title: 'אתר יוניסטרים הרשמי', desc: 'מידע על הארגון וחדשות', url: 'https://unistream.co.il/' },
      ]
    }
  ];

  return (
    <SlideLayout title="ארגז כלים וקישורים מהירים" navProps={props}>
      <div className="space-y-8">
        {resources.map(category => (
          <div key={category.category} className="bg-white/10 backdrop-blur-md rounded-2xl p-6">
            <h3 className="flex items-center text-3xl font-bold mb-5 text-pink-400">
              <Icon name={category.icon} className="me-4 text-4xl" />
              {category.category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map(item => (
                <a
                  key={item.title}
                  href={item.url || '#'}
                  onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined}
                  target={item.url ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="bg-white/10 p-5 rounded-xl flex flex-col justify-center text-center hover:bg-white/20 hover:-translate-y-1 transition-all duration-300"
                >
                  <p className="text-xl font-semibold">{item.title}</p>
                  {item.desc && <p className="text-sm opacity-80 mt-1">{item.desc}</p>}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
};


// 7. Salesforce Glossary Slide (was 8)
const glossaryData = [
  { he: 'חשבון', en: 'Account', desc: 'סוגים שונים של חשבונות: בית ספר, מרכז יזמות, חברה עסקית.' },
  { he: 'אנשים', en: 'Contact', desc: 'סוגים שונים של אנשים: תלמיד, בוגר, תורם, עובד יוניסטרים, מתנדב.' },
  { he: 'סוג התוכנית', en: 'Program', desc: 'סוגים של תכנית, לדוגמא: SUN או Edventure.' },
  { he: 'מחזור לימודים', en: 'Program Cycle', desc: 'מחזור שנתי/תלת שנתי של תוכנית.' },
  { he: 'תוכנית שנת לימודים', en: 'School year', desc: 'שנת לימודים בתכנית ספציפית.' },
  { he: 'חניכים במחזור', en: 'Cycle Participants', desc: 'השתתפות במחזור שנתי/תלת שנתי.' },
  { he: 'חניכים בשנת לימודים', en: 'Year Participants', desc: 'השתתפות בשנת הלימודים.' },
  { he: 'מפגשים', en: 'Meetings', desc: 'מפגשים המקושרים לשנת לימודים.' },
  { he: 'נוכחות במפגש', en: 'Attendance Meetings', desc: 'השתתפות במפגש.' },
  { he: 'יום חשיפה', en: 'Open Day', desc: 'יום חשיפה.' },
];

export const SalesforceGlossarySlide: React.FC<SlideNavProps> = (props) => (
  <SlideLayout title="מילון מושגים: Salesforce" navProps={props}>
    <p className="text-center text-xl mb-6 opacity-90">להלן רשימת המושגים המרכזיים במערכת Salesforce והסבר קצר על כל אחד מהם.</p>
    <div className="bg-white/10 rounded-2xl p-1 overflow-x-auto">
        <table className="w-full text-right min-w-[700px]">
            <thead className="border-b-2 border-white/20">
                <tr>
                    <th className="p-4 text-xl font-bold text-pink-400 w-1/4">שם בעברית</th>
                    <th className="p-4 text-xl font-bold text-pink-400 w-1/4">שם באנגלית</th>
                    <th className="p-4 text-xl font-bold text-pink-400 w-1/2">תיאור</th>
                </tr>
            </thead>
            <tbody>
                {glossaryData.map(item => (
                    <tr key={item.en} className="border-b border-white/10 last:border-none hover:bg-white/5">
                        <td className="p-4 font-semibold text-lg">{item.he}</td>
                        <td className="p-4 font-mono text-lg">{item.en}</td>
                        <td className="p-4 text-lg leading-relaxed">{item.desc}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  </SlideLayout>
);

// 8. Forms Slide (was 9)
const forms = [
  { icon: 'description', title: 'אמנת חניך', subtitle: 'מסמך יסוד המכיל מידע מפורט על הפעילות ביוניסטרים', details: 'מסמך יסוד המכיל מידע מפורט על הפעילות ביוניסטרים. חשוב לקרוא ולהכיר את המסמך לעומק כדי לתת מענה לשאלות הורים. זוהי תעודת הביטוח שלנו המכסה את כל היבטים המשפטיים של הפעילות.', features: [{icon: 'gavel', text: 'היבטים משפטיים'}, {icon: 'copyright', text: 'זכויות רוחניות'}, {icon: 'photo_camera', text: 'אישורי צילום'}], list: ['עקרונות וכללי תכנית "Edventure"', 'נהלים בנוגע לזכויות רוחניות', 'הנחיות לשימוש במידע אישי של החניכים', 'אישורי צילום והשתתפות באירועים'], img: 'https://i.postimg.cc/vHZWZQHZ/GONOGO.jpg' },
  { icon: 'healing', title: 'הצהרת בריאות', subtitle: 'טופס חובה להורים על מצבו הבריאותי של החניך', details: 'טופס חובה להורים בו הם מצהירים על מצבו הבריאותי של החניך. יש לוודא עדכון שוטף של ההצהרה במקרה של שינויים במצב הבריאותי של החניכים.', features: [{icon: 'medical_services', text: 'מעקב רפואי'}, {icon: 'coronavirus', text: 'אלרגיות'}, {icon: 'emergency', text: 'מצבים מסכני חיים'}], list: ['מעקב אחר מצבים רפואיים מיוחדים', 'זיהוי אלרגיות ומצבים מסכני חיים', 'הערכות מתאימה לפעילות השוטפת במרכזים', 'הערכות לאירועים מיוחדים'], img: 'https://i.postimg.cc/NGJKbRBQ/GONOGO2.jpg' }
];

export const FormsSlide: React.FC<SlideNavProps> = (props) => (
  <SlideLayout title="טפסים ומסמכים חשובים" navProps={props}>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {forms.map(form => (
        <div key={form.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
          <div className="flex items-center mb-4">
            <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center me-5 flex-shrink-0">
              <Icon name={form.icon} className="text-3xl" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-pink-400">{form.title}</h3>
              <p className="text-lg opacity-80">{form.subtitle}</p>
            </div>
          </div>
          <p className="text-lg leading-relaxed">{form.details}</p>
          <div className="flex flex-wrap gap-3 mt-4">
            {form.features.map(feature => (
              <div key={feature.text} className="bg-pink-500/20 rounded-full px-4 py-2 text-md font-semibold flex items-center">
                <Icon name={feature.icon} className="me-2 text-lg" />
                {feature.text}
              </div>
            ))}
          </div>
          <ul className="list-none mt-4 space-y-2 text-lg">
            {form.list.map(item => (
              <li key={item} className="flex items-start">
                <Icon name="check_circle" className="text-pink-400 me-3 mt-1 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <img src={form.img} alt={form.title} className="w-full h-64 object-cover rounded-xl mt-auto pt-4" />
        </div>
      ))}
    </div>
  </SlideLayout>
);


// 9. Mentoring Slide (was 10)
const mentors = [
    { icon: 'person', title: 'מלווה עסקי', subtitle: 'מנטור מקצועי לאורך כל התכנית', details: 'מנטור המלווה את הקבוצה לאורך כל שלוש שנות התכנית (במידה והחיבור טוב). תפקידו לספק ליווי מקצועי מתמשך ולתמוך בהתפתחות המיזם לאורך זמן.', features: [{icon: 'timeline', text: 'ליווי ארוך טווח'}, {icon: 'support_agent', text: 'תמיכה מקצועית'}, {icon: 'trending_up', text: 'פיתוח מיזם'}], img: 'https://i.postimg.cc/SKvPDZTW/image.png' },
    { icon: 'groups', title: 'עמית עסקי', subtitle: 'מומחה לנושא ספציפי', details: 'מנטור המגיע למפגש חד פעמי ממוקד בנושא ספציפי אותו מנהל.ת המרכז מרגיש.ה שיש לחזק או להעשיר. מאפשר להביא מומחיות ממוקדת בתחומים שונים לפי צרכי הקבוצה.', features: [{icon: 'event_available', text: 'מפגש חד פעמי'}, {icon: 'psychology', text: 'מומחיות ממוקדת'}, {icon: 'lightbulb', text: 'העשרת ידע'}], img: 'https://sfile.chatglm.cn/images-ppt/31774f08229f.jpeg' },
    { icon: 'rocket_launch', title: 'LevelUp', subtitle: 'זרוע כלכלית עצמאית', details: 'יחידה שפונה לקהל שאינו קהל הליבה של יוניסטרים במטרה לפתח זרוע כלכלית שאינה תלויה בפילנתרופיה. כיום אנו מעבירים בארץ הרצאות וסדנאות בנושא יזמות וטכנולוגיה לילדי עובדים בחברות הייטק, עובדים בחברות לאוטק וגימלאים.', features: [{icon: 'attach_money', text: 'עצמאות כלכלית'}, {icon: 'diversity_3', text: 'קהלים מגוונים'}, {icon: 'school', text: 'הרצאות וסדנאות'}], img: 'https://sfile.chatglm.cn/images-ppt/77eb826733e4.jpg' }
];

export const MentoringSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="ליווי ומנטורינג" navProps={props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {mentors.map(mentor => (
                <div key={mentor.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center me-5 flex-shrink-0">
                            <Icon name={mentor.icon} className="text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-pink-400">{mentor.title}</h3>
                            <p className="text-lg opacity-80">{mentor.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed flex-grow">{mentor.details}</p>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {mentor.features.map(feature => (
                            <div key={feature.text} className="bg-pink-500/20 rounded-full px-4 py-2 text-md font-semibold flex items-center">
                                <Icon name={feature.icon} className="me-2 text-lg" />
                                {feature.text}
                            </div>
                        ))}
                    </div>
                    <img src={mentor.img} alt={mentor.title} className="w-full h-64 object-cover rounded-xl mt-auto pt-4" />
                </div>
            ))}
        </div>
    </SlideLayout>
);


// 10. Training Slide (was 11)
const trainings = [
    { 
        icon: 'business_center', 
        title: 'הכשרת מנהלים', 
        subtitle: 'מפגש חודשי לפיתוח מיומנויות ניהול', 
        details: 'מפגש חודשי המתקיים במשרדי הארגון בראש העין. ההכשרות משלבות למידה תיאורטית יחד עם סימולציות ופרקטיקה, ונבנות בהתאם לסילבוס ולתכנית הלימודים השנתית.', 
        extraInfo: 'אנו מעודדים אתכם לקחת חלק פעיל בהעברת תכנים, להביא מעולמות התוכן שלכם ולהעשיר את שאר המנהלים. בנוסף, נשמח לשמוע מכם על תכנים שחסרים לכם ושיכולים לשפר את עבודתכם.',
        schedule: 'תדירות: חודשית | מיקום: משרדי הארגון בראש העין', 
        features: [{icon: 'settings', text: 'כלי ניהול'}, {icon: 'psychology', text: 'כישורים רכים'}, {icon: 'groups', text: 'עבודה עם נוער'}], 
        img: 'https://i.postimg.cc/8PjvMZ8R/Whats-App-Image-2025-08-12-at-23-40-10.jpg' 
    },
    { icon: 'update', title: 'מתחדדים', subtitle: 'הכשרה שבועית מקוונת', details: 'הכשרה שבועית המתקיימת בזום ועוסקת בשני נושאים מרכזיים: נושאים מתכנית הלימודים והכנה לאירועים קרובים. ההכשרה מספקת עדכונים שוטפים וכלים מעשיים לעבודה השוטפת.', schedule: 'תדירות: שבועית | מיקום: זום (מקוון)', features: [{icon: 'menu_book', text: 'תכנית לימודים'}, {icon: 'event_available', text: 'הכנה לאירועים'}, {icon: 'sync', text: 'עדכונים שוטפים'}], img: 'https://i.postimg.cc/J4Cr9XWw/2.jpg' },
    { icon: 'school', title: 'סילבוס ותכנית לימודים', subtitle: 'מסגרת תוכנית ההכשרה', details: 'כל הכשרות נבנות בהתאם לסילבוס ולתכנית הלימודים השנתית המתואמים עם צוות ההדרכה. התכנית מבטיחה רציפות ועקביות בהכשרת כלל המנהלים והמדריכים בארגון.', schedule: 'עדכון: שנתי | מיקום: מערכת SharePoint', features: [{icon: 'auto_stories', text: 'סילבוס'}, {icon: 'calendar_today', text: 'תכנית לימודים'}, {icon: 'summarize', text: 'סיכומי הכשרות'}], img: 'https://i.postimg.cc/mDLzDwNF/image.png' }
];

export const TrainingSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="הכשרות והדרכה" navProps={props}>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
            {trainings.map(training => (
                <div key={training.title} className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex flex-col hover:bg-white/15 hover:-translate-y-1 transition-all duration-300">
                    <div className="flex items-center mb-4">
                        <div className="bg-pink-500 w-16 h-16 rounded-full flex items-center justify-center me-5 flex-shrink-0">
                            <Icon name={training.icon} className="text-3xl" />
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-pink-400">{training.title}</h3>
                            <p className="text-lg opacity-80">{training.subtitle}</p>
                        </div>
                    </div>
                    <p className="text-lg leading-relaxed flex-grow">{training.details}</p>
                    {training.extraInfo && (
                        <blockquote className="mt-4 p-4 bg-pink-500/10 border-r-4 border-pink-400 text-lg italic">
                            {training.extraInfo}
                        </blockquote>
                    )}
                    <div className="flex items-center mt-4 bg-white/10 rounded-lg p-3">
                        <Icon name="event" className="text-pink-400 me-3 text-2xl" />
                        <span className="font-semibold">{training.schedule}</span>
                    </div>
                    <div className="flex flex-wrap gap-3 mt-4">
                        {training.features.map(feature => (
                            <div key={feature.text} className="bg-pink-500/20 rounded-full px-4 py-2 text-md font-semibold flex items-center">
                                <Icon name={feature.icon} className="me-2 text-lg" />
                                {feature.text}
                            </div>
                        ))}
                    </div>
                    <img src={training.img} alt={training.title} className="w-full h-64 object-cover rounded-xl mt-auto pt-4" />
                </div>
            ))}
        </div>
    </SlideLayout>
);


// 11. FAQ Slide (was 12)
const faqs = [
    { q: 'מתי אני פונה לליאור?', a: 'פנייה לליאור בנושאים הבאים: תקלות במבנה שלא נפתרו מול הרשות, אישור ספקים חדשים, תקציב שוטף ותקציב שופרסל, בעיות עם ציוד משרדי.', contact: [{type: 'email', value: 'operation@unistream.co.il'}, {type: 'phone', value: '054-3546108'}]},
    { q: 'איך אני מטפל/ת בתקלות במבנה?', a: 'פנייה ראשונית לרשות המקומית לתיקון התקלה. אם אין מענה לאחר שבוע - פנייה למנהל/ת האזור. מנהל/ת האזור יעדכן את מנהל/ת התפעול.', list: ['מזגן תקול', 'נזילות', 'בעיות חשמל', 'בעיות בדלתות או חלונות']},
    { q: 'איך מזמינים ציוד משרדי?', a: 'תקציב: 350 ₪ לחודשיים. הזמנה דרך אתר משרדיה. אין לקנות ציוד מחשוב וריהוט ללא אישור מנהל התפעול.', link: {text: 'לאתר משרדיה', url: 'https://www.misradia.co.il/?gad_source=1&gad_campaignid=1477504250&gbraid=0AAAAAD8gAn6gs_5YbP-9zmi1hP-QwHaYx&gclid=Cj0KCQjwqebEBhD9ARIsAFZMbfyOlrqI_1czDDt7RQbPO8ari1TVEeB4D-mvx_Svi200SFCIkm4MQD0aArg_EALw_wcB'} },
    { q: 'איך מטפלים בתקלות במכשיר תמי 4?', a: 'שליחת מייל למנהל התפעול ומנהל האזור עם: פירוט התקלה, כתובת מרכז היזמות, פרטי איש קשר לטכנאי, תיאום טכנאי בזמן נוכחות במרכז, עדכון בסוף הטיפול.'},
    { q: 'איך פותחים ספק חדש?', a: 'לספקים חדשים (מעל 250 ₪) נדרשים: אישור ניהול ספרים, אישור פרטי חשבון להעברה, אישור ניכוי מס במקור. יש לוודא מול מנהל/ת התפעול לפני פתיחת ספק חדש.', list: ['בדיקה מול מנהל/ת התפעול אם קיים כבר ספק דומה', 'קבלת אישור עקרוני לפתיחת ספק חדש', 'איסוף כל המסמכים הנדרשים מהספק']},
    { q: 'מה לגבי תקציב שופרסל?', a: 'תקציב חודשי עבור קניות למרכז היזמות, המתעדכן לפי כמות החניכים.', list: ['עד 30 חניכים - 800 ₪', '30-50 חניכים - 1000 ₪', 'מעל 50 חניכים - 1200 ₪']},
    { q: 'מדפסות, דיו וציוד מחשוב', a: 'עבור הזמנת דיו למדפסת או תקלות במחשבים יש לשלוח מייל לדורון (איש IT) עם העתק למנהלת התפעול ומנהל.ת האזור.', contact: [{type: 'email', value: 'it@unistream.co.il'}, {type: 'phone', value: '054-7366166'}]},
    { q: 'איפה אני מוצא סיכומי הכשרות והקלטות חשובות?', a: 'כל סיכומי ההכשרות וההקלטות החשובות נמצאים בשייר-פוינט של יוניסטרים.', link: {text: 'קישור למערכת SharePoint', url: 'https://unistream1.sharepoint.com/'} },
];

export const FaqSlide: React.FC<SlideNavProps> = (props) => (
    <SlideLayout title="שאלות נפוצות" navProps={props}>
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 hover:bg-white/15 transition-colors duration-300">
                    <div className="flex items-start mb-2">
                        <div className="bg-pink-500 w-10 h-10 rounded-full flex items-center justify-center me-4 flex-shrink-0">
                            <Icon name="help_outline" className="text-2xl" />
                        </div>
                        <h3 className="text-xl font-bold text-pink-400 mt-1">{faq.q}</h3>
                    </div>
                    <div className="pr-14 text-lg opacity-90">
                        <p>{faq.a}</p>
                        {faq.list && (
                            <ul className="list-none mt-2 space-y-1">
                                {faq.list.map(item => <li key={item} className="flex"><Icon name="arrow_left" className="text-pink-400 me-2" />{item}</li>)}
                            </ul>
                        )}
                        {faq.contact && (
                             <div className="flex items-center flex-wrap gap-x-6 gap-y-1 mt-2 text-md opacity-80">
                                {faq.contact.map(c => <span key={c.value} className="flex items-center"><Icon name={c.type} className="me-2"/>{c.value}</span>)}
                            </div>
                        )}
                        {faq.link && (
                            <a href={faq.link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center bg-white/15 hover:bg-white/25 rounded-lg px-4 py-2 mt-2 font-semibold text-md transition-all">
                                {faq.link.text}
                                <Icon name="launch" className="ms-2" />
                            </a>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </SlideLayout>
);


// 12. Quiz Slide (was 13)
const initialQuizQuestions = [
    { question: 'מהי תכנית הדגל של יוניסטרים?', options: ['StartUpNow (SUN)', 'Edventure', 'NFTE', 'LevelUp'], answer: 'Edventure' },
    { question: 'כמה שנים אורכת תכנית Edventure?', options: ['שנה אחת', 'שנתיים', 'שלוש שנים', 'ארבע שנים'], answer: 'שלוש שנים' },
    { question: 'מהו תפקידו של מלווה עסקי ביוניסטרים?', options: ['להגיע למפגש חד פעמי ממוקד בנושא ספציפי', 'ללוות את הקבוצה לאורך כל שלוש שנות התכנית', 'לנהל את המרכז', 'לספק שירותי IT'], answer: 'ללוות את הקבוצה לאורך כל שלוש שנות התכנית' },
    { question: 'מתי מתקיימים אירועי ועדות GO NO GO?', options: ['ינואר-פברואר', 'מרץ-אפריל', 'מאי-יוני', 'יולי-אוגוסט'], answer: 'מרץ-אפריל' },
    { question: 'מהי מטרתה של מערכת Salesforce ביוניסטרים?', options: ['דיווח שעות עבודה', 'תיעוד מפגשים ומעקב נוכחות חניכים', 'ניהול מסמכים', 'הזמנת ציוד משרדי'], answer: 'תיעוד מפגשים ומעקב נוכחות חניכים' },
    { question: 'איזה מהבאים אינו אחד מערכי הליבה של יוניסטרים?', options: ['שוויון הזדמנויות', 'חדשנות', 'רווחיות', 'אחריות חברתית'], answer: 'רווחיות' },
    { question: 'באיזו שפה מתקיים פאנל ההשקעות?', options: ['עברית', 'אנגלית', 'ערבית', 'רוסית'], answer: 'אנגלית' },
    { question: 'באיזו מערכת משתמשים לדיווח שעות עבודה?', options: ['Salesforce', 'SharePoint', 'UNINET', 'LevelUp'], answer: 'UNINET' },
    { question: 'מדוע חשוב שהורים ימלאו את טופס הצהרת הבריאות?', options: ['כדי להירשם לניוזלטר', 'כדי להצהיר על מצבו הבריאותי של החניך מטעמי בטיחות', 'כדי לקבל הנחה על התכנית', 'כדי להזמין מדים'], answer: 'כדי להצהיר על מצבו הבריאותי של החניך מטעמי בטיחות' },
    { question: 'היכן מתקיימת "הכשרת מנהלים" החודשית?', options: ['באופן מקוון בזום', 'במתנ"ס המקומי', 'במשרדי הארגון בראש העין', 'בכל חודש בחברת הייטק אחרת'], answer: 'במשרדי הארגון בראש העין' },
    { question: 'איזו תכנית היא תכנית יזמות בינלאומית הפועלת בישראל במסגרת יוניסטרים?', options: ['Edventure', 'NEXTREAM', 'NFTE', 'StartUpNow (SUN)'], answer: 'NFTE' },
    { question: 'מה תפקידו של "עמית עסקי"?', options: ['לספק ליווי ארוך טווח', 'לנהל את תקציב המרכז', 'להגיע למפגש חד-פעמי וממוקד בנושא ספציפי', 'להוביל את תכנית LevelUp'], answer: 'להגיע למפגש חד-פעמי וממוקד בנושא ספציפי' },
    { question: 'למי יש לפנות במקרה של תקלות IT כמו דיו למדפסת או תקלות מחשב?', options: ['ליאור (תפעול)', 'מנהל/ת האזור', 'דורון (IT)', 'המלווה העסקי'], answer: 'דורון (IT)' },
    { question: 'היכן ניתן למצוא מערכי תוכן, סילבוס וסיכומי הכשרות?', options: ['במערכת UNINET', 'במערכת Salesforce', 'במערכת SharePoint', 'באתר הציבורי'], answer: 'במערכת SharePoint' },
    { question: 'מהי המשימה המרכזית של יוניסטרים?', options: ['לספק פעילויות אחר הצהריים לכל הנוער', 'להכשיר בני נוער ליזמות עסקית, חברתית וטכנולוגית', 'לארגן תחרויות נוער בינלאומיות', 'לממן סטארט-אפים חדשים'], answer: 'להכשיר בני נוער ליזמות עסקית, חברתית וטכנולוגית' },
    { question: 'מה המטרה העיקרית של תכנית המאיץ (אקסלרטור)?', options: ['ללמד תכנות בסיסי', 'להקפיץ מיזמים קיימים לרמה הגבוהה ביותר', 'לגייס חניכים חדשים', 'לארגן ימי כיף'], answer: 'להקפיץ מיזמים קיימים לרמה הגבוהה ביותר' },
    { question: 'באיזה פרויקט יוניסטרים משתפת פעולה עם בית הנשיא?', options: ['NEXTREAM', 'NFTE', 'מחליפים מילה', 'Edventure'], answer: 'מחליפים מילה' },
    { question: 'למי פונים תחילה במקרה של תקלה במבנה המרכז (למשל, מזגן מקולקל)?', options: ['למנכ"ל יוניסטרים', 'לרשות המקומית', 'למנהל התפעול (ליאור)', 'למשרד החינוך'], answer: 'לרשות המקומית' },
    { question: 'מהו התקציב לחודשיים עבור ציוד משרדי בכל מרכז?', options: ['100 ₪', '250 ₪', '350 ₪', '500 ₪'], answer: '350 ₪' },
    { question: 'מה מהבאים הוא מסמך חובה שנדרש לקבל מספק חדש?', options: ['תעודת זהות', 'רישיון נהיגה', 'אישור ניהול ספרים', 'תעודת יושר'], answer: 'אישור ניהול ספרים' },
    { question: 'מהו תקציב שופרסל החודשי למרכז עם 32 חניכים?', options: ['800 ₪', '1000 ₪', '1200 ₪', 'אין תקציב קבוע'], answer: '1000 ₪' },
    { question: 'לאיזו אוכלוסייה מיועדת תכנית NEXTREAM?', options: ['חניכי שנה א\'', 'מנהלי מרכזים', 'מנטורים עסקיים', 'בוגרי תכניות יוניסטרים'], answer: 'בוגרי תכניות יוניסטרים' },
    { question: 'מהי התדירות של הכשרת "מתחדדים"?', options: ['יומית', 'שבועית', 'חודשית', 'שנתית'], answer: 'שבועית' },
    { question: 'מהי מטרת "אמנת החניך"?', options: ['לרשום את החניכים לטיול שנתי', 'לכסות את ההיבטים המשפטיים של הפעילות', 'לשמש כרטיס חבר', 'להזמין חולצות'], answer: 'לכסות את ההיבטים המשפטיים של הפעילות' },
    { question: 'מי הגוף שמאשר את הסילבוס ותכנית הלימודים השנתית?', options: ['ועד ההורים', 'החניכים עצמם', 'צוות ההדרכה של יוניסטרים', 'משרד החינוך'], answer: 'צוות ההדרכה של יוניסטרים' },
    { question: 'מהו אחד ההישגים המרכזיים של יוניסטרים?', options: ['הקמת אוניברסיטה', 'פעילות בלמעלה מ-22 מרכזי יזמות', 'שליחת אסטרונאוט לחלל', 'זכייה בפרס נובל'], answer: 'פעילות בלמעלה מ-22 מרכזי יזמות' },
    { question: 'מי קהל היעד העיקרי של יחידת LevelUp?', options: ['חניכי יוניסטרים בלבד', 'קהל שאינו קהל הליבה של יוניסטרים', 'פוליטיקאים', 'אסטרונאוטים'], answer: 'קהל שאינו קהל הליבה של יוניסטרים' },
    { question: 'מהם שני הנושאים המרכזיים בהכשרת "מתחדדים" השבועית?', options: ['בישול וספורט', 'נושאים מתכנית הלימודים והכנה לאירועים', 'חדשות ופוליטיקה', 'גיוס כספים ומכירות'], answer: 'נושאים מתכנית הלימודים והכנה לאירועים' },
    { question: 'מהו השלב האחרון בתהליך טיפול בתקלה במכשיר תמי 4?', options: ['להתעלם מהבעיה', 'לנסות לתקן לבד', 'לעדכן את מנהל התפעול בסוף הטיפול', 'לקנות מכשיר חדש'], answer: 'לעדכן את מנהל התפעול בסוף הטיפול' }
];

const initialQuizState = {
    answers: {} as Record<number, string>,
    attempts: {} as Record<number, string[]>,
    submitted: false,
    incorrectQuestions: [] as number[]
};

export const QuizSlide: React.FC<SlideNavProps> = (props) => {
    const [quizQuestions] = useState(initialQuizQuestions);
    const [answers, setAnswers] = useState(initialQuizState.answers);
    const [attempts, setAttempts] = useState(initialQuizState.attempts);
    const [submitted, setSubmitted] = useState(initialQuizState.submitted);
    const [incorrectQuestions, setIncorrectQuestions] = useState(initialQuizState.incorrectQuestions);

    const totalQuestions = quizQuestions.length;
    const isQuizFinished = useMemo(() => {
        return Object.keys(answers).length + Object.values(attempts).filter(a => a.length >= 2).length === totalQuestions;
    }, [answers, attempts, totalQuestions]);

    const handleSelect = (qIndex: number, option: string) => {
        if (answers[qIndex] || (attempts[qIndex] && attempts[qIndex].length >= 2) || submitted) return;

        const isCorrect = quizQuestions[qIndex].answer === option;

        if (isCorrect) {
            setAnswers(prev => ({ ...prev, [qIndex]: option }));
        } else {
            setAttempts(prev => ({
                ...prev,
                [qIndex]: [...(prev[qIndex] || []), option].filter((v, i, a) => a.indexOf(v) === i)
            }));
        }
    };
    
    const handleSubmit = () => {
        const incorrect = quizQuestions
            .map((_, index) => index)
            .filter(index => !answers[index]);
        
        setIncorrectQuestions(incorrect);
        setSubmitted(true);
    };

    const handleRestart = () => {
        setAnswers(initialQuizState.answers);
        setAttempts(initialQuizState.attempts);
        setSubmitted(initialQuizState.submitted);
        setIncorrectQuestions(initialQuizState.incorrectQuestions);
    };

    const renderQuiz = () => (
        <>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 text-center text-lg leading-relaxed">
               לכל שאלה 2 נסיונות מענה. אם תטעו פעמיים, השאלה תינעל. בסוף המבחן תוכלו לראות את התוצאות. בהצלחה!
            </div>
            <div className="space-y-6 mt-6">
                {quizQuestions.map((q, qIndex) => {
                    const isCorrectlyAnswered = !!answers[qIndex];
                    const currentAttempts = attempts[qIndex] || [];
                    const isLocked = currentAttempts.length >= 2;

                    return (
                        <div key={qIndex} className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 transition-all duration-300 ${isLocked ? 'opacity-60' : ''}`}>
                            <div className="flex items-start mb-4">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center me-5 flex-shrink-0 text-xl font-bold transition-colors duration-300 ${isCorrectlyAnswered ? 'bg-green-500' : isLocked ? 'bg-red-500' : 'bg-pink-500'}`}>
                                   {isCorrectlyAnswered ? <Icon name="check"/> : isLocked ? <Icon name="lock"/> : qIndex + 1}
                                </div>
                                <p className="text-xl font-semibold mt-2">{q.question}</p>
                            </div>
                            <div className="flex flex-col gap-3 pr-16">
                                {q.options.map((option, oIndex) => {
                                    const isSelectedCorrect = isCorrectlyAnswered && answers[qIndex] === option;
                                    const isSelectedIncorrect = currentAttempts.includes(option);
                                    const isDisabled = isCorrectlyAnswered || isLocked;
                                    
                                    let optionClass = 'bg-white/10';
                                    if(!isDisabled) optionClass += ' hover:bg-white/20';

                                    if (isSelectedCorrect) optionClass = 'bg-green-500/50 border-2 border-green-400';
                                    if (isSelectedIncorrect) optionClass = 'bg-red-500/50 border-2 border-red-400';
                                    
                                    return (
                                        <div key={oIndex} onClick={() => handleSelect(qIndex, option)} 
                                             className={`flex items-center rounded-xl p-4 transition-all duration-300 ${optionClass} ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}>
                                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center me-4 font-bold text-lg">{String.fromCharCode(1488 + oIndex)}</div>
                                            <span className="text-lg">{option}</span>
                                        </div>
                                    );
                                })}
                            </div>
                            {isLocked && !isCorrectlyAnswered && (
                                <div className="mt-4 pr-16 p-3 rounded-lg text-lg bg-red-500/20">
                                    <strong>שני נסיונות נוצלו. התשובה הנכונה היא:</strong>
                                    <p className="mt-1 opacity-90 font-semibold">{q.answer}</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div className="text-center mt-8">
                <button onClick={handleSubmit} className="bg-pink-500 hover:bg-pink-600 text-white border-none px-10 py-4 text-xl font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center gap-2 mx-auto disabled:bg-gray-500/50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:-translate-y-0 disabled:hover:bg-gray-500/50"
                 disabled={!isQuizFinished}
                >
                    הגש מבחן
                    <Icon name="check_circle" />
                </button>
            </div>
        </>
    );

    const renderResults = () => {
        if (incorrectQuestions.length > 0) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-center bg-white/10 rounded-2xl p-10">
                    <Icon name="error_outline" className="text-9xl text-red-400 mb-6" />
                    <h2 className="text-4xl font-extrabold mb-4">אופס, יש כמה טעויות...</h2>
                    <p className="text-2xl font-semibold mb-4">הציון הסופי: {totalQuestions - incorrectQuestions.length} / {totalQuestions}</p>
                    <p className="text-xl max-w-xl mb-6">כדי להשלים את הלומדה, יש להשיג ציון מושלם. אנא חזרו על החומר ונסו שוב.</p>
                     <div className="bg-red-500/10 p-4 rounded-lg w-full max-w-lg mb-6">
                        <h3 className="text-xl font-bold mb-2">שאלות שנענו לא נכון:</h3>
                        <ul className="text-left list-disc list-inside">
                            {incorrectQuestions.map(qIndex => <li key={qIndex}>{quizQuestions[qIndex].question}</li>)}
                        </ul>
                    </div>
                    <button onClick={handleRestart} className="bg-pink-500 hover:bg-pink-600 text-white border-none px-8 py-4 text-xl font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 mx-auto">
                        <Icon name="refresh" />
                        התחל את המבחן מחדש
                    </button>
                </div>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-center bg-white/10 rounded-2xl p-10">
                <Icon name={"sentiment_very_satisfied"} className="text-9xl text-green-400 mb-6 animate-pulse" />
                <h2 className="text-4xl font-extrabold mb-4">כל הכבוד!</h2>
                <p className="text-2xl font-semibold mb-4">סיימתם את המבחן בהצלחה!</p>
                <p className="text-6xl font-bold mb-4">{totalQuestions} <span className="text-4xl font-semibold opacity-80">/ {totalQuestions}</span></p>
                <p className="text-xl max-w-xl mb-8">כעת, לחצו על "הבא" כדי לעבור לשלב האחרון: צ'קליסט סיום.</p>
            </div>
        );
    };

    return (
        <SlideLayout title="מבחן ידע מסכם" navProps={props}>
            {submitted ? renderResults() : renderQuiz()}
        </SlideLayout>
    );
};

// 13. Checklist Slide (was 3)
const managers = [
  { name: 'גבי אהרון', title: 'מנהל איזור דרום', email: 'southern_region@unistream.co.il' },
  { name: 'ליהי סמו', title: 'מנהלת איזור מרכז', email: 'lihi.se@unistream.co.il' },
  { name: "שקד תורג'מן", title: 'מנהלת איזור צפון', email: 'shaked.t@unistream.co.il' },
  { name: 'נתי ברה', title: 'מנהל איזור צפון', email: 'northern_region@unistream.co.il' }
];

export const ChecklistSlide: React.FC<SlideNavProps> = (props) => {
  const checklistItems = useMemo(() => [
    { id: 'about', text: 'קראתי את שקף "אודות יוניסטרים" והבנתי את חזון הארגון.' },
    { id: 'programs', text: 'הכרתי את תכניות הליבה של יוניסטרים (Edventure, SUN, NFTE).' },
    { id: 'systems_access', text: 'וידאתי שיש לי גישה פעילה למערכות: Salesforce, UNINET, SharePoint.' },
    { id: 'systems_training', text: 'צפיתי בסרטוני ההדרכה על מערכת ה-Salesforce.' },
    { id: 'forms', text: 'הבנתי את חשיבות הטפסים "אמנת חניך" ו"הצהרת בריאות".' },
    { id: 'mentoring', text: 'הבנתי את ההבדל בין "מלווה עסקי" ל"עמית עסקי".' },
    { id: 'hr_processes', text: 'הכרתי את תהליך דיווח השעות, הזמנת ציוד וטיפול בתקלות.' },
    { id: 'quiz', text: 'סיימתי בהצלחה את מבחן הידע המסכם.' },
  ], []);

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(() => {
    try {
        const saved = localStorage.getItem('unistreamOnboardingChecklist');
        return saved ? JSON.parse(saved) : {};
    } catch (error) {
        console.error("Failed to parse checklist from localStorage", error);
        return {};
    }
  });

  const [selectedManager, setSelectedManager] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('unistreamOnboardingChecklist', JSON.stringify(checkedItems));
  }, [checkedItems]);

  const handleToggle = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };
  
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklistItems.length;
  const progress = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
  const allItemsChecked = completedCount === totalCount;

  const handleSendEmail = () => {
    if (selectedManager === null) return;
    const manager = managers[selectedManager];
    const subject = 'סיום לומדת עובד חדש';
    const body = `אהלן ${manager.name.split(' ')[0]},\n\nסיימתי את תהליך הקליטה וסימנתי את כל המשימות בצ'קליסט.\n\nאני מוכן/ה להתחיל!`;
    const mailtoLink = `mailto:${manager.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <SlideLayout title="צ'קליסט סיום" navProps={props}>
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center mb-6">
        <p className="text-xl leading-relaxed">
          זהו השלב האחרון! ודאו שכל המשימות הושלמו, ואז שלחו עדכון למנהל/ת שלכם.
          <br />
          ההתקדמות שלכם נשמרת אוטומטית בדפדפן זה.
        </p>
         <div className="w-full bg-white/20 h-4 rounded-full mt-4">
            <div className="bg-green-500 h-4 rounded-full transition-all duration-500 text-center text-sm font-bold flex items-center justify-center" style={{ width: `${progress}%` }}>
                {Math.round(progress)}%
            </div>
        </div>
      </div>
      <div className="space-y-4">
        {checklistItems.map(item => (
          <div
            key={item.id}
            onClick={() => handleToggle(item.id)}
            className={`flex items-center bg-white/10 rounded-xl p-5 cursor-pointer transition-all duration-300 hover:bg-white/20 ${checkedItems[item.id] ? 'opacity-60' : ''}`}
          >
            <div className="w-8 h-8 flex-shrink-0 rounded-full border-2 border-pink-400 flex items-center justify-center mr-5">
              {checkedItems[item.id] && <Icon name="check" className="text-pink-400 font-bold" />}
            </div>
            <span className={`text-xl ${checkedItems[item.id] ? 'line-through text-white/70' : ''}`}>{item.text}</span>
          </div>
        ))}
      </div>

      {allItemsChecked && (
        <div className="border-t-2 border-white/20 mt-8 pt-8">
            <div className="w-full max-w-3xl mx-auto text-center">
                <Icon name="verified" className="text-7xl text-green-400 mb-4 animate-bounce"/>
                <h3 className="text-3xl font-bold mb-4">מעולה! סיימת את כל המשימות.</h3>
                <p className="text-lg opacity-80 mb-6">כעת, בחרו את מנהל/ת האזור שלכם ולחצו על הכפתור כדי לשלוח להם עדכון במייל שסיימתם את תהליך הקליטה.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    {managers.map((manager, index) => (
                        <div 
                            key={index}
                            onClick={() => setSelectedManager(index)}
                            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 border-2 ${selectedManager === index ? 'bg-pink-500/30 border-pink-400' : 'bg-white/10 border-transparent hover:bg-white/20'}`}
                        >
                            <p className="font-bold text-lg">{manager.name}</p>
                            <p className="opacity-80">{manager.title}</p>
                        </div>
                    ))}
                </div>
                
                <button 
                    onClick={handleSendEmail}
                    disabled={selectedManager === null}
                    className="bg-green-500 hover:bg-green-600 text-white border-none px-8 py-4 text-xl font-bold rounded-full cursor-pointer transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl hover:-translate-y-1 flex items-center gap-3 mx-auto disabled:bg-gray-500/50 disabled:cursor-not-allowed disabled:shadow-none disabled:hover:-translate-y-0 disabled:hover:bg-gray-500/50"
                >
                    <Icon name="email" />
                    שלח עדכון סיום למנהל/ת האזור
                </button>
            </div>
        </div>
      )}
    </SlideLayout>
  );
};
