"use client"

import { Home, Compass, PlaySquare, Clock, ThumbsUp, Flame, Music2, Gamepad2, Film, Newspaper, Lightbulb, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useSidebar } from "@/context/SidebarContext";
import { useState, useEffect } from "react";
import { useStudyStore } from "@/hooks/store/use-study";

const Sidebar = () => {
  const { isSidebarOpen: isOpen, toggleSidebar } = useSidebar();
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

  const mainLinks = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Compass, label: "Explore", href: "/explore" },
    { icon: PlaySquare, label: "Subscriptions", href: "/subscriptions" },
  ];

  const secondaryLinks = [
    { icon: Clock, label: "History", href: "/history" },
    { icon: PlaySquare, label: "Your videos", href: "/your-videos" },
    { icon: ThumbsUp, label: "Liked videos", href: "/liked-videos" },
  ];

  const exploreLinks = [
    { icon: Flame, label: "Trending", href: "/trending" },
    { icon: Music2, label: "Music", href: "/music" },
    { icon: Gamepad2, label: "Gaming", href: "/gaming" },
    { icon: Film, label: "Movies & TV", href: "/movies" },
    { icon: Newspaper, label: "News", href: "/news" },
    { icon: Lightbulb, label: "Learning", href: "/learning" },
    { icon: ShoppingBag, label: "Shopping", href: "/shopping" },
  ];

  const mobileSidebar = isOpen && isMobile && !isStudyMode && (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={toggleSidebar}
      />
      <div
        className="fixed top-[50px] left-0 h-[calc(100vh-50px)] w-64 bg-black text-white overflow-y-auto z-50"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="py-4">
          <div className="mb-4">
            {mainLinks.map((link, index) => (
              <Link href={link.href} key={index}>
                <div className="flex items-center px-4 py-3 hover:bg-zinc-800 justify-start">
                  <link.icon size={20} className="min-w-[20px]" />
                  <span className="ml-5">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-zinc-700 my-2 mx-4"></div>

          <div className="mb-4">
            {secondaryLinks.map((link, index) => (
              <Link href={link.href} key={index}>
                <div className="flex items-center px-4 py-3 hover:bg-zinc-800 justify-start">
                  <link.icon size={20} className="min-w-[20px]" />
                  <span className="ml-5">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="border-t border-zinc-700 my-2 mx-4"></div>

          <div>
            <h3 className="px-4 py-2 text-sm font-semibold text-zinc-400">EXPLORE</h3>
            {exploreLinks.map((link, index) => (
              <Link href={link.href} key={index}>
                <div className="flex items-center px-4 py-3 hover:bg-zinc-800">
                  <link.icon size={20} />
                  <span className="ml-5">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="px-4 py-4 text-xs text-zinc-400 mt-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Link href="#">About</Link>
              <Link href="#">Press</Link>
              <Link href="#">Copyright</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Creators</Link>
              <Link href="#">Advertise</Link>
              <Link href="#">Developers</Link>
            </div>
            <div className="mt-4">
              <p>© 2025 YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );

  const desktopSidebar = !isMobile && !isStudyMode && (
    <div
      className={`fixed top-[56px] left-0 h-[calc(100vh-56px)] bg-black text-white transition-all duration-300 ${isOpen ? "w-56" : "w-20"} overflow-y-auto scrollbar-hide z-40`}
    >
      <div className="py-4">
        <div className="mb-4">
          {mainLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <div className={`flex items-center px-4 py-3 hover:bg-zinc-800 ${isOpen ? "justify-start" : "justify-center"}`}>
                <link.icon size={20} className="min-w-[20px]" />
                {isOpen && <span className="ml-5">{link.label}</span>}
              </div>
            </Link>
          ))}
        </div>

        {isOpen && <div className="border-t border-zinc-700 my-2 mx-4"></div>}

        <div className="mb-4">
          {secondaryLinks.map((link, index) => (
            <Link href={link.href} key={index}>
              <div className={`flex items-center px-4 py-3 hover:bg-zinc-800 ${isOpen ? "justify-start" : "justify-center"}`}>
                <link.icon size={20} className="min-w-[20px]" />
                {isOpen && <span className="ml-5">{link.label}</span>}
              </div>
            </Link>
          ))}
        </div>

        {isOpen && <div className="border-t border-zinc-700 my-2 mx-4"></div>}

        {isOpen ? (
          <div>
            <h3 className="px-4 py-2 text-sm font-semibold text-zinc-400">EXPLORE</h3>
            {exploreLinks.map((link, index) => (
              <Link href="#" key={index}>
                <div className="flex items-center px-4 py-3 hover:bg-zinc-800">
                  <link.icon size={20} />
                  <span className="ml-5">{link.label}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div>
            {exploreLinks.slice(0, 4).map((link, index) => (
              <Link href="#" key={index}>
                <div className="flex items-center justify-center px-4 py-3 hover:bg-zinc-800">
                  <link.icon size={20} />
                </div>
              </Link>
            ))}
          </div>
        )}

        {isOpen && (
          <div className="px-4 py-4 text-xs text-zinc-400 mt-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Link href="#">About</Link>
              <Link href="#">Press</Link>
              <Link href="#">Copyright</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Creators</Link>
              <Link href="#">Advertise</Link>
              <Link href="#">Developers</Link>
            </div>
            <div className="mt-4">
              <p>© 2025 YouTube</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {mobileSidebar}
      {desktopSidebar}
    </>
  );
};

export default Sidebar;
