import { create } from "zustand";
import { api } from "@/api";

interface Message {
    role: string;
    content: string;
    name: string;
}

interface AIStore {
    messages: Message[];
    fetchMessagesFromLocal: (id: string, videoTitle: string) => Message[];
    saveMessagesToLocal: (id: string, messages: Message[]) => void;
    getAiResponse: (message: string, id: string, transcript: string, title: string) => Promise<string>;
    clearAndSetLocalMessagesById: (id: string, videoTitle: string) => void;
    loading: boolean;
}

interface AiChat {
    model: string;
    history: Message[];
}

export const useAiStore = create<AIStore>((set, get) => ({
    messages: [],
    loading: false,
    clearAndSetLocalMessagesById: (id, videoTitle) => {
        localStorage.setItem(id, JSON.stringify([{ role: "assistant", content: `Im here to help you with \`${videoTitle}\``, name: "" }]));
        set({ messages: [{ role: "assistant", content: `Im here to help you with \`${videoTitle}\``, name: "" }] });
    },
    fetchMessagesFromLocal: (id, videoTitle) => {
        const messages = localStorage.getItem(id);
        if (messages) {
            const data = JSON.parse(messages);
            set({ messages: data });
            return data;
        }
        get().clearAndSetLocalMessagesById(id, videoTitle);
        return [];
    },
    saveMessagesToLocal: (id, messages) => {
        localStorage.setItem(id, JSON.stringify(messages));
    },
    getAiResponse: async (message, id, transcript, title) => {
        const systemPrompt = `You are a helpful and knowledgeable study assistant AI. You are given the full transcript of a YouTube educational video. Your job is to help students learn and understand the content of that video.
Video Title: ${title}

Transcript:
${transcript}

Instructions:
- Always base your responses strictly on the transcript provided.
- Do NOT make up facts that are not in the transcript.
- Use simple, clear, and student-friendly language.
- You can explain topics from the video, answer questions based on the video content, summarize sections, and break down complex ideas step-by-step.
- Do NOT refer to any external sources or information.
- If a user asks a question that is not addressed in the transcript, politely respond that there is not enough information in the video to answer it.

Be concise, educational, and supportive at all times.`
        set({ loading: true });
        const oldMessages = get().fetchMessagesFromLocal(id, title);

        let messagesForLocal = [{ role: "user", content: message, name: "" }];
        if (oldMessages) {
            const oldMessagesWithName = oldMessages.map(msg => ({
                ...msg,
                name: msg.name || ""
            }));
            messagesForLocal = [...oldMessagesWithName, { role: "user", content: message, name: "" }];
        }
        set({ messages: messagesForLocal });
        const historyWithNames: Message[] = [];
        historyWithNames.push({ role: "system", content: systemPrompt, name: "" });
        if (oldMessages) {
            oldMessages.forEach(msg => {
                historyWithNames.push({
                    role: msg.role,
                    content: msg.content,
                    name: ""
                });
            });
        }
        historyWithNames.push({
            role: "user",
            content: message,
            name: ""
        });
        const payload: AiChat = {
            model: "gemma2-9b-it",
            history: historyWithNames
        }
        try {
            const res = await api.post("/ai", payload);
            if (res.status === 200) {
                const newMessagesForLocal = [...messagesForLocal, { role: "assistant", content: res.data.message, name: "" }];
                set({ messages: newMessagesForLocal });
                get().saveMessagesToLocal(id, newMessagesForLocal);
            } else {
                const newMessagesForLocal = [...messagesForLocal, { role: "assistant", content: "I'm sorry, I couldn't generate a response.", name: "" }];
                set({ messages: newMessagesForLocal });
                get().saveMessagesToLocal(id, newMessagesForLocal);
            }
            set({ loading: false });
            return res.data.message;
        } catch (error) {
            console.log(error);
            const newMessagesForLocal = [...messagesForLocal, { role: "assistant", content: "I'm sorry, I couldn't generate a response.", name: "" }];
            set({ messages: newMessagesForLocal });
            get().saveMessagesToLocal(id, newMessagesForLocal);
            return "I'm sorry, I couldn't generate a response.";
        }
        finally {
            set({ loading: false });
        }
    }
}));


