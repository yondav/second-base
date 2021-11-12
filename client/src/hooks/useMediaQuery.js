import { useEffect, useState } from 'react';

export default function useMediaQuery() {
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const updateMedia = () => {
    window.innerWidth > 768 ? setIsMobile(false) : setIsMobile(true);
    window.innerWidth > 768 && window.innerWidth < 992
      ? setIsTablet(true)
      : setIsTablet(false);
    window.innerWidth > 992 ? setIsDesktop(true) : setIsDesktop(false);
  };

  useEffect(() => {
    window.addEventListener('resize', updateMedia);
    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  return { isMobile, isTablet, isDesktop };
}
