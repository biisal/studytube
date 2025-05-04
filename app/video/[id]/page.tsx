"use client"

import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ThumbsUp,
  ThumbsDown,
  Share2,
  Download,
  MoreHorizontal,
  ChevronDown,
  Heart,
  Book
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useStudyStore } from "@/hooks/store/use-study";
import ChatComponent from "@/components/chat";
import { videoData } from "@/dummy";
import VideoNotFound from "@/components/video-not-found";

export default function VideoPage() {
  const params = useParams();
  const videoId = params.id;
  const [isMobile, setIsMobile] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const { isStudyMode, toggleStudyMode } = useStudyStore();
  const shortsContainerRef = useRef<HTMLDivElement>(null);
  const videoDetails = videoData.find((video) => video.id === videoId);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const actionButtonStyle = `flex items-center gap-1 ${isStudyMode ? 'opacity-20' : 'bg-zinc-800 hover:bg-zinc-700'} rounded-full px-3 py-2 flex-shrink-0`
  if (!videoDetails) {
    return (
      <VideoNotFound />
    );
  }
  return (
    <div className="pt-[30px] pb-8 px-2 lg:px-28">

      <div className="hidden">
        Current Video ID: {videoId}
      </div>
      <div className="flex flex-col lg:flex-row lg:items-start gap-4 max-w-[1850px] mx-auto">
        <div className="lg:max-w-[calc(100%-426px)] w-full ">
          <div className="relative aspect-video bg-zinc-900 overflow-hidden mb-3 mx-auto px-4 lg:px-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoDetails.embedId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>

          <h1 className="text-xl md:text-2xl font-bold mb-3 px-4 lg:px-0">{videoDetails.title}</h1>


          <div className="flex flex-col md:flex-row md:items-center flex-wrap justify-between gap-4 py-3 px-4 lg:px-0">
            <div className="flex items-center gap-3">
              <Image
                src={videoDetails.channel.avatar}
                alt={videoDetails.channel.name}
                width={40}
                height={40}
                className="rounded-full"
              />

              <div>
                <div className="flex items-center gap-1">
                  <h3 className="font-medium">{videoDetails.channel.name}</h3>
                  {videoDetails.channel.verified && (
                    <div className="text-zinc-400 text-sm">✓</div>
                  )}
                </div>
                <p className="text-zinc-400 text-xs">{videoDetails.channel.subscribers} subscribers</p>
              </div>
              <button className="flex items-center gap-2 bg-white text-black font-medium rounded-full px-4 py-2 text-sm">
                Subscribe
              </button>
            </div>


            <div className="overflow-x-auto w-full md:w-auto no-scrollbar mt-3">
              <div className="flex items-center gap-2 min-w-max pb-2">
                <button onClick={toggleStudyMode} className={`flex text-sm  items-center gap-1 cursor-pointer rounded-full px-3 py-2 flex-shrink-0 ${isStudyMode ? 'bg-zinc-700 font-medium' : 'bg-zinc-800 hover:bg-zinc-700 glow-bg'}`}>
                  <span><Book size={16} className="mr-1 text-zinc-300" /></span>  {isStudyMode ? 'Exit Study Mode' : 'Study Mode'}
                </button>
                <button className={actionButtonStyle}>
                  <ThumbsUp size={16} />
                  <span className="text-sm">{videoDetails.likes}</span>
                  <span className="text-zinc-400">|</span>
                  <ThumbsDown size={16} />
                </button>
                <button className={actionButtonStyle}>
                  <Share2 size={16} />
                  <span className="text-sm">Share</span>
                </button>
                <button className={actionButtonStyle}>
                  <Download size={16} />
                  <span className="text-sm">Download</span>
                </button>
                <button className={actionButtonStyle}>
                  <Heart size={16} className="mr-1" />
                  <span className="text-sm">Thanks</span>
                </button>
                <button className={actionButtonStyle}>
                  <MoreHorizontal size={16} />
                </button>
              </div>
            </div>
          </div>

          {!isStudyMode && (
            <>
              <div
                className={`bg-zinc-800 rounded-xl p-3 mb-6 ${isDescriptionExpanded ? '' : 'cursor-pointer'}`}
                onClick={() => !isDescriptionExpanded && setIsDescriptionExpanded(true)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm font-bold">{videoDetails.views}</span>
                    <span className="text-white text-sm font-bold">{videoDetails.timestamp}</span>
                  </div>
                </div>
                <div className={`${isDescriptionExpanded ? '' : 'line-clamp-2'}`}>
                  <p className="mb-2">{videoDetails.description}</p>
                  {isDescriptionExpanded && (
                    <div className="mt-4 text-zinc-400">
                      <p>Tags: #RamBhajan #AgamTheBand #SiddharthSharma</p>
                    </div>
                  )}
                </div>

                {!isDescriptionExpanded ? (
                  <button className="text-zinc-400 text-sm font-medium mt-1">
                    Show more
                  </button>
                ) : (
                  <button
                    className="text-zinc-400 text-sm font-medium mt-3 flex items-center gap-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDescriptionExpanded(false);
                    }}
                  >
                    Show less <ChevronDown className="transform rotate-180" size={16} />
                  </button>
                )}
              </div>

              <div className="bg-zinc-800/30 rounded-xl p-3 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-lg">1.2K Comments</h3>
                  <button className="text-zinc-400">
                    <ChevronDown size={20} />
                  </button>
                </div>


                {!isMobile && (
                  <div className="flex gap-3">
                    <Image
                      src="https://i.pravatar.cc/100?img=1"
                      alt="User avatar"
                      width={40}
                      height={40}
                      className="rounded-full object-cover  h-10 w-10"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm">@user123</span>
                        <span className="text-zinc-400 text-sm">2 days ago</span>
                      </div>
                      <p>Great video! The Explanation was very helpful.</p>
                      <div className="flex items-center gap-3 mt-2">
                        <button className="flex items-center gap-1 text-zinc-400">
                          <ThumbsUp size={14} />
                          <span>423</span>
                        </button>
                        <button className="flex items-center gap-1 text-zinc-400">
                          <ThumbsDown size={14} />
                        </button>
                        <button className="text-zinc-400 text-sm">Reply</button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>)
          }
        </div>

        {!isStudyMode ? (

          <div className={`${isMobile ? 'w-full px-4' : 'w-[402px]'} flex-shrink-0`}>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-3 no-scrollbar">
              {["All", "From Agam Aggarwal", "Hindi Music", "Bhakti", "Related", "Recently uploaded", "Watched"].map((category, index) => (
                <div
                  key={index}
                  className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap cursor-pointer ${index === 0 ? 'bg-white text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}>
                  {category}
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-red-600">●</span>Shorts
              </h3>
              <div className="relative group">
                <button
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    if (shortsContainerRef.current) {
                      shortsContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>

                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/70 hover:bg-black/90 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => {
                    if (shortsContainerRef.current) {
                      shortsContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                    }
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>

                <div ref={shortsContainerRef} className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
                  {[
                    {
                      id: "short1",
                      thumbnail: "https://i.ytimg.com/vi/DfFwn8UA2UI/oardefault.jpg",
                      title: "Kohli bhaiya to fas gya aaj",
                      views: "3.5M views"
                    },
                    {
                      id: "short2",
                      thumbnail: "https://i.ytimg.com/vi/8upiF-8nfhA/oar2.jpg",
                      title: "The using keyword in C# is awesome",
                      views: "48k views"
                    },
                    {
                      id: "short3",
                      thumbnail: "https://i.ytimg.com/vi/MrKOcXO3FJ0/oardefault.jpg",
                      title: "Which Programming Languages Are the Fastest? | 1 Billion Loops: Which Language Wins?",
                      views: "832K views"
                    },
                    {
                      id: "short4",
                      thumbnail: "https://i.ytimg.com/vi/Dbyz5XjQer4/oardefault.jpg",
                      title: "Top 3 Skills every Data Scientist must have 🔥",
                      views: "178K views"
                    }
                  ].map(short => (
                    <Link href={`/shorts/${short.id}`} key={short.id} className="cursor-pointer flex-shrink-0 w-[150px]">
                      <div className="relative aspect-[9/16] rounded-xl overflow-hidden mb-1">
                        <Image
                          src={short.thumbnail}
                          alt={short.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h4 className="font-medium text-sm line-clamp-2">{short.title}</h4>
                      <p className="text-zinc-400 text-xs">{short.views}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {videoData.filter(video => video.id !== videoId).map((video) => (
                <Link href={`/video/${video.id}`} key={video.id} className="flex gap-2">
                  <div className="relative w-40 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={video.thumbnail}
                      alt={video.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                    <p className="text-zinc-400 text-xs mt-1">{video.channel.name}</p>
                    <p className="text-zinc-400 text-xs">{video.views} • {video.timestamp}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ) :
          <ChatComponent
            className={isMobile ? 'w-full h-[60vh]' : 'w-[420px] h-[80vh]'}
            videoDetails={videoDetails}
          />
        }
      </div>
    </div>
  );
}
