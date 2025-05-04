"use client"

import Image from "next/image";
import { Menu, Search, Mic, Bell, User, Plus } from "lucide-react";
import Sidebar from "./sidebar";
import { useSidebar } from "@/context/SidebarContext";
import { useState, useEffect } from "react";
import { useStudyStore } from "@/hooks/store/use-study";

const Navbar = () => {
    const { toggleSidebar } = useSidebar();
    const [isMobile, setIsMobile] = useState(false);
    const { isStudyMode } = useStudyStore();
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 640);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <div className={`flex justify-between items-center bg-black text-white p-2 sticky top-0 z-50 ${isStudyMode ? "hidden" : ""}`}>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button
                        className="p-1.5 sm:p-2 rounded-full hover:bg-zinc-800"
                        onClick={toggleSidebar}
                    >
                        <Menu size={isMobile ? 18 : 20} />
                    </button>
                    <Image
                        src="https://www.gstatic.com/youtube/img/promos/growth/818168ea34225db83c9f18d5ccab7afda37e2abbcb8971ea761e1ec35e246213_122x56.webp"
                        width={isMobile ? 70 : 90}
                        height={isMobile ? 16 : 20}
                        alt="youtube logo"
                        className="block"
                    />
                </div>

                <div className="hidden sm:flex items-center gap-2 flex-1 justify-center max-w-3xl mx-4">
                    <div className="flex items-center w-full max-w-xl">
                        <input
                            type="text"
                            placeholder="Search"
                            className="bg-zinc-900 border border-zinc-700 rounded-l-full px-4 py-2 w-full focus:outline-none focus:border-blue-500 text-base"
                        />
                        <button className="bg-zinc-800 px-5 py-2.5 rounded-r-full border border-zinc-700 border-l-0">
                            <Search size={20} />
                        </button>
                    </div>
                    <button className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
                        <Mic size={20} />
                    </button>
                </div>

                <div className="flex-1 sm:hidden"></div>

                <div className="flex items-center gap-1 sm:gap-3">
                    {isMobile && (
                        <button className="p-1.5 rounded-full hover:bg-zinc-800">
                            <Search size={18} />
                        </button>
                    )}
                    {isMobile ? (
                        <button className="p-1.5 rounded-full hover:bg-zinc-800">
                            <Plus size={18} />
                        </button>
                    ) : (
                        <button className="hidden sm:flex items-center gap-1 bg-zinc-800/80 hover:bg-zinc-700 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium">
                            <span className="text-white text-lg sm:text-2xl pr-1 sm:pr-2">+</span>
                            <span className="hidden md:inline">Create</span>
                        </button>
                    )}
                    <button className="p-1.5 sm:p-2 rounded-full hover:bg-zinc-800">
                        <Bell size={isMobile ? 18 : 20} />
                    </button>
                    <button className="p-1.5 sm:p-2 rounded-full hover:bg-zinc-800">
                        <User size={isMobile ? 18 : 20} />
                    </button>
                </div>
            </div>

            <Sidebar />
        </>
    );
};

export default Navbar;