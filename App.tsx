
import React, { useState, useMemo } from 'react';
import { SlideNavProps } from './types';
import { 
  IntroSlide, 
  AboutSlide, 
  ProgramsSlide, 
  EventsSlide, 
  SystemsSlide, 
  ResourceHubSlide,
  SalesforceGlossarySlide,
  FormsSlide, 
  MentoringSlide, 
  TrainingSlide, 
  QuizSlide, 
  FaqSlide,
  Sidebar,
  ChecklistSlide
} from './components/SlideComponents';

const App: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showGlossary, setShowGlossary] = useState(false);

  const contentSlides = useMemo(() => [
    { title: 'אודות יוניסטרים', component: AboutSlide, icon: 'info' },
    { title: 'תכניות יוניסטרים', component: ProgramsSlide, icon: 'rocket_launch' },
    { title: 'אירועים מרכזיים', component: EventsSlide, icon: 'emoji_events' },
    { title: 'מערכות יוניסטרים', component: SystemsSlide, icon: 'dns' },
    { title: 'ארגז כלים', component: ResourceHubSlide, icon: 'construction' },
    { title: 'טפסים ומסמכים', component: FormsSlide, icon: 'description' },
    { title: 'ליווי ומנטורינג', component: MentoringSlide, icon: 'groups' },
    { title: 'הכשרות והדרכה', component: TrainingSlide, icon: 'school' },
    { title: 'שאלות נפוצות', component: FaqSlide, icon: 'help_outline' },
    { title: 'מבחן ידע מסכם', component: QuizSlide, icon: 'quiz' },
    { title: 'צ\'קליסט סיום', component: ChecklistSlide, icon: 'checklist_rtl' },
  ], []);

  const slides = useMemo(() => [
    (props: SlideNavProps) => <IntroSlide {...props} />,
    ...contentSlides.map(slide => slide.component),
  ], [contentSlides]);

  const handleNext = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1));
  };

  const handlePrev = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0));
  };
  
  const handleStart = () => {
    setCurrentSlide(1);
  };

  const handleHome = () => {
    if (showGlossary) setShowGlossary(false);
    setCurrentSlide(0);
  };

  const handleNavigate = (slideIndex: number) => {
    if (showGlossary) setShowGlossary(false);
    if (slideIndex >= 0 && slideIndex < slides.length) {
      setCurrentSlide(slideIndex);
    }
  };
  
  const handleShowGlossary = () => setShowGlossary(true);

  let ComponentToRender;
  let navProps: SlideNavProps;

  if (showGlossary) {
    ComponentToRender = SalesforceGlossarySlide;
    navProps = {
      onNext: () => {},
      onPrev: () => setShowGlossary(false),
      onStart: handleStart,
      onHome: handleHome,
      onNavigate: handleNavigate,
      onShowGlossary: handleShowGlossary,
      isFirst: false,
      isLast: true, // No "Next" button
      currentSlide: contentSlides.findIndex(s => s.component === SystemsSlide) + 1, // Set to 'Systems' slide index for context
      totalSlides: slides.length
    };
  } else {
    ComponentToRender = slides[currentSlide];
    navProps = {
      onNext: handleNext,
      onPrev: handlePrev,
      onStart: handleStart,
      onHome: handleHome,
      onNavigate: handleNavigate,
      onShowGlossary: handleShowGlossary,
      isFirst: currentSlide === 0,
      isLast: currentSlide === slides.length - 1,
      currentSlide,
      totalSlides: slides.length
    };
  }

  return (
      <div className="bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen w-full font-sans">
          <div className="w-full max-w-screen-2xl h-screen mx-auto flex flex-row">
              {currentSlide > 0 && !showGlossary && (
                  <Sidebar 
                      slides={contentSlides.map(s => ({ title: s.title, icon: s.icon }))}
                      currentSlide={currentSlide}
                      onNavigate={handleNavigate}
                      onHome={handleHome}
                  />
              )}
              <div className="relative flex-grow flex items-center justify-center p-4 overflow-hidden">
                   {ComponentToRender && <ComponentToRender {...navProps} />}
              </div>
          </div>
      </div>
  );
};

export default App;
