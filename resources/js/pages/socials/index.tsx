import { Message, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import axios from 'axios';
import { Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface IndexProps {
    messages: Message[];
    chat_group_id: number;
}

const Index = ({ messages, chat_group_id }: IndexProps) => {
    const { auth } = usePage<SharedData>().props;
    const userId = auth.user.id;
    const [content, setContent] = useState<string>('');
    const [messagesState, setMessagesState] = useState<Message[]>(messages);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messagesState]);

    useEffect(() => {
        // @ts-expect-error ignore
        const channel = window.Echo.private(`chat.${chat_group_id}`).listen('MessageSent', (event: Message) => {
            setMessagesState((prev) => [...prev, event]);
        });

        return () => {
            channel.stopListening('MessageSent');
        };
    }, [chat_group_id]);

    const handleSubmit = async () => {
        try {
            await axios.post(route('socials.store'), {
                content,
                chat_group_id,
            });
            setContent('');
        } catch (error) {
            console.error('Gagal kirim pesan:', error);
        }
    };

    return (
        <main className="flex h-screen w-full items-center justify-center px-56 py-20">
            <div className="w-full rounded-md border-1 shadow-md">
                <div className="flex max-h-[70vh] flex-1 flex-col gap-2 overflow-y-auto rounded-xl p-4">
                    {messagesState.map((msg, idx) => (
                        <div key={idx} ref={bottomRef} className={`flex ${msg.user_id === userId ? 'justify-end' : 'justify-start'}`}>
                            <div
                                key={idx}
                                className={`max-w-xs self-end rounded-xl ${msg.user_id === userId ? 'bg-blue-500' : 'bg-slate-400'} px-4 py-2 text-white`}
                            >
                                {msg.user_id !== userId && <h1 className="font-semibold">{msg.user?.name}</h1>}
                                {msg.content}
                            </div>
                        </div>
                    ))}
                </div>
                <div className="px-1 py-1">
                    <div className="flex w-full items-center justify-between gap-2 rounded-full border-2 px-4 py-2">
                        <input
                            type="text"
                            placeholder="Type your messages"
                            className="w-full active:border-0"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button onClick={handleSubmit} disabled={!content}>
                            <Send className="" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Index;
