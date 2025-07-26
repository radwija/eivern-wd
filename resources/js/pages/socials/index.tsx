import { Send } from 'lucide-react';

const Index = () => {
    return (
        <main className="flex h-screen w-full items-center justify-center px-56 py-20">
            <div className="w-full rounded-md border-1 shadow-md">
                <div className="min-h-[80dvh] w-full"></div>
                <form className="px-1 py-1">
                    <div className="flex w-full items-center justify-between gap-2 rounded-full border-2 px-4 py-2">
                        <input type="text" placeholder="Type your messages" className="w-full active:border-0" />
                        <Send className="text-black" size={20} />
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Index;
