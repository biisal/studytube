"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Trash } from 'lucide-react';
import { useAiStore } from '@/hooks/store/use-ai';
import ReactMarkdown from 'react-markdown';
import { VideoDetails } from '@/dummy';
import Image from 'next/image';

interface ChatComponentProps {
    className: string;
    videoDetails: VideoDetails;
}

const ChatComponent = ({ videoDetails, className }: ChatComponentProps) => {
    const [inputValue, setInputValue] = useState('');
    const { getAiResponse, loading, fetchMessagesFromLocal, messages, clearAndSetLocalMessagesById } = useAiStore();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);
    useEffect(() => {
        fetchMessagesFromLocal(videoDetails.id, videoDetails.title);
    }, [videoDetails.id, fetchMessagesFromLocal]); // eslint-disable-line

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSendMessage = async () => {
        if (inputValue.trim() === '') return;

        setInputValue('');

        try {
            const chatId = videoDetails.id;
            await getAiResponse(inputValue, chatId, videoDetails.transcript, videoDetails.title);
        } catch (error) {
            console.error('Error getting AI response:', error);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className={"bg-zinc-900 rounded-lg flex flex-col overflow-hidden border border-zinc-700 " + className}>
            <div className="flex items-center justify-between bg-zinc-800 px-4 py-3 border-b border-zinc-700">
                <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center mr-2">
                        <Image src="/gemini.svg" alt="Gemini" width={24} height={24} />
                    </div>
                    <div>
                        <h3 className="text-white font-medium">Gemini 2.5</h3>
                        <p className="text-xs text-zinc-400">Ask about the video</p>
                    </div>
                </div>
                <button className='bg-zinc-800 hover:bg-zinc-700 rounded-full p-2 hover:text-red-400 transition-colors cursor-pointer' onClick={() => { clearAndSetLocalMessagesById(videoDetails.id, videoDetails.title) }}><Trash size={16} /></button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message, index) => (
                    <div
                        key={index}
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[80%] prose prose-invert rounded-lg px-4 py-2 ${message.role === 'user' ? 'bg-blue-600 text-white' : 'bg-zinc-800 text-white'}`}
                        >
                            <ReactMarkdown>
                                {message.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className='w-full felx flex-col gap-6'>
                        <div className='loading w-[90%] mb-1.5'></div>
                        <div className='loading w-[50%] mb-1.5'></div>
                        <div className='loading w-[60%] mb-1.5'></div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 border-t border-zinc-700 bg-zinc-800">
                <div className="flex items-center bg-zinc-700 rounded-full overflow-hidden pl-4 pr-2">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask about this video..."
                        className="bg-transparent text-white w-full focus:outline-none resize-none py-2 max-h-20"
                        rows={1}
                    />
                    <button
                        onClick={handleSendMessage}
                        disabled={inputValue.trim() === '' || loading}
                        className={`ml-2 w-8 h-8 rounded-full flex items-center justify-center ${inputValue.trim() === '' || loading ? 'text-zinc-500 bg-zinc-600' : 'text-white bg-blue-600 hover:bg-blue-700'}`}
                    >
                        <Send size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatComponent;