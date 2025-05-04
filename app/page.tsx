import Image from "next/image";
import Link from "next/link";
import { videoData } from "@/dummy";


export default function Home() {
  return (
    <div className="p-4 md:p-6">
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {["All", "Music", "Gaming", "Live", "Podcasts", "Computer Programming", "Cooking", "Recently uploaded", "New to you"].map((category, index) => (
          <div
            key={index}
            className={`px-3 py-1.5 rounded-lg text-sm whitespace-nowrap cursor-pointer ${index === 0 ? 'bg-white text-black' : 'bg-zinc-800 hover:bg-zinc-700'}`}
          >
            {category}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {videoData.map((video) => (
          <Link href={`/video/${video.id}`} key={video.id} className="cursor-pointer">
            <div className="relative aspect-video rounded-xl overflow-hidden mb-2">
              <Image
                src={video.thumbnail}
                alt={video.title}
                fill
                className="object-cover"
              />
              <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-1 rounded">
                {video.duration}
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-9 h-9 rounded-full bg-zinc-600 flex-shrink-0 overflow-hidden">
                <Image
                  src={video.channel.avatar}
                  alt={video.channel.name}
                  width={36}
                  height={36}
                  className="rounded-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-medium text-sm line-clamp-2">{video.title}</h3>
                <p className="text-zinc-400 text-xs mt-1">{video.channel.name}</p>
                <p className="text-zinc-400 text-xs">{video.views} • {video.timestamp}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
