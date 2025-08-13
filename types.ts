export interface SlideNavProps {
  onNext: () => void;
  onPrev: () => void;
  onStart: () => void;
  onHome: () => void;
  onNavigate: (slideIndexOrName: number | string) => void;
  onShowGlossary: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentSlide: number;
  totalSlides: number;
}