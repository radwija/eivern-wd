import { Message, SharedData } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Send } from 'lucide-react';
import { useEffect, useState } from 'react';

interface IndexProps {
    messages: Message[];
    chat_group_id: number;
}

const Index = ({ messages, chat_group_id }: IndexProps) => {
    const { auth } = usePage<SharedData>().props;
    const userId = auth.user.id;
    const [content, setContent] = useState<string>();

    useEffect(() => {
        // @ts-expect-error ignore
        window.Echo.private(`chat.${chat_group_id}`).listen('MessageSent', (event) => {
            console.log(event);
        });
    }, []);

    const handleSubmit = () => {
        router.post(route('socials.store'), {
            content: content,
            chat_group_id: chat_group_id,
        });
    };

    return (
        <main className="flex h-screen w-full items-center justify-center px-56 py-20">
            <div className="w-full rounded-md border-1 shadow-md">
                <div className="flex max-h-[70vh] flex-1 flex-col gap-2 overflow-y-auto rounded-xl p-4">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.user_id === userId ? 'justify-end' : 'justify-start'}`}>
                            <div
                                key={idx}
                                className={`max-w-xs self-end rounded-xl ${msg.user_id === userId ? 'bg-blue-500' : 'bg-slate-400'} px-4 py-2 text-white`}
                            >
                                {msg.user_id !== userId && <h1 className="font-semibold">{msg.user.name}</h1>}
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
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <button onClick={handleSubmit}>
                            <Send className="text-black" size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Index;
