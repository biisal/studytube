import Image from "next/image";
import Link from "next/link";

const VideoNotFound = () => {
    return (<div className="flex flex-col items-center justify-center"><Image src="https://www.youtube.com/img/desktop/unavailable/unavailable_video_dark_theme.png" alt="Not Found" width={500} height={500} />
        <p className="text-xl">This video isn&apos;t available any more</p>
        <Link href="/" className="bg-transparent text-blue-500 mt-2 border-zinc-500 border-2 font-bold rounded-full px-6 py-2 inline-block transition-colors">Go to Home</Link>
    </div>);
}

export default VideoNotFound;