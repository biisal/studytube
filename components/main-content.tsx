"use client"

import { ReactNode, useState, useEffect } from 'react';
import { useSidebar } from '@/context/SidebarContext';
import { useStudyStore } from '@/hooks/store/use-study';

export default function MainContent({ children }: { children: ReactNode }) {
  const { isSidebarOpen } = useSidebar();
  const { isStudyMode } = useStudyStore();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <main className="min-h-screen">
      <div
        className={`transition-all duration-300 ${isStudyMode || isMobile ? 'pl-0' : isSidebarOpen ? 'pl-[224px]' : 'pl-[80px]'}`}
      >
        {children}
      </div>
    </main>
  );
}
