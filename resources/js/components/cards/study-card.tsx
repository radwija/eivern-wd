import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { MessageCircleMore, Send } from 'lucide-react';
import React, { useState } from 'react';

interface User {
    name: string;
    avatarUrl?: string;
}

interface Comment {
    id: number;
    user: User;
    text: string;
    date: string;
}

export interface Study {
    id: number;
    title: string;
    description: string;
    image?: string[];
    user: User;
    date: string;
    active: boolean;
    comments: Comment[];
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + ' tahun yang lalu';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' bulan yang lalu';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' hari yang lalu';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' jam yang lalu';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' menit yang lalu';
    return Math.floor(seconds) + ' detik yang lalu';
}

const UserAvatar: React.FC<{ user: User }> = ({ user }) => (
    <img
        className="h-10 w-10 rounded-full bg-gray-300 object-cover"
        src={user.avatarUrl}
        alt={user.name}
        onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/40x40/E2E8F0/4A5568?text=${user.name.charAt(0)}`;
        }}
    />
);

const ItemImageDisplay: React.FC<{ images?: string[]; title: string }> = ({ images, title }) => {
    if (!images || images.length === 0) return null;

    if (images.length > 1) {
        return (
            <Carousel className="w-full">
                <CarouselContent>
                    {images.map((img, index) => (
                        <CarouselItem key={index}>
                            <Card className="border-none bg-transparent shadow-none">
                                <CardContent className="flex aspect-video items-center justify-center p-0">
                                    <img
                                        src={img}
                                        alt={`${title} - gambar ${index + 1}`}
                                        className="h-full w-full rounded-lg object-cover"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/1600x900/cccccc/ffffff?text=Gagal+Muat';
                                        }}
                                    />
                                </CardContent>
                            </Card>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        );
    }

    return (
        <img
            src={images[0]}
            alt={title}
            className="w-full rounded-lg object-cover"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1600x900/cccccc/ffffff?text=Gagal+Muat';
            }}
        />
    );
};

const StudyCard: React.FC<{ study: Study; onCommentIconClick: () => void }> = ({ study, onCommentIconClick }) => {
    return (
        <div className="mx-auto my-6 w-full max-w-2xl overflow-hidden rounded-xl border bg-white shadow-lg dark:bg-gray-800">
            <div className="space-y-4 p-3 sm:space-y-6 sm:p-6">
                <div className="flex items-start gap-4">
                    <div className="relative flex-shrink-0">
                        <UserAvatar user={study.user} />
                        <span
                            className={`absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-800 ${
                                study.active ? 'bg-green-500' : 'bg-red-500'
                            }`}
                        />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white">{study.title}</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {study.user.name} | {formatTimeAgo(study.date)}
                        </p>
                    </div>
                </div>
                <p className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">{study.description}</p>
                <ItemImageDisplay images={study.image} title={study.title} />
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <MessageCircleMore
                        className="cursor-pointer transition-colors hover:text-gray-800 dark:hover:text-white"
                        onClick={onCommentIconClick}
                    />
                    <span>{study.comments.length}</span>
                </div>
            </div>
        </div>
    );
};

const CommentSection: React.FC<{ comments: Comment[] }> = ({ comments }) => {
    return (
        <>
            <SheetHeader className="p-6">
                <SheetTitle>Diskusi & Komentar</SheetTitle>
                <SheetDescription>Lihat semua komentar atau ajukan pertanyaan di sini.</SheetDescription>
            </SheetHeader>
            <div className="flex-1 overflow-y-auto px-6 py-2">
                <div className="space-y-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="flex items-start gap-4">
                            <UserAvatar user={comment.user} />
                            <div className="flex-1 space-y-3 rounded-lg bg-gray-100 p-4 sm:space-y-0 dark:bg-gray-700">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                    <p className="font-semibold text-gray-900 dark:text-white">{comment.user.name}</p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{formatTimeAgo(comment.date)}</p>
                                </div>
                                <p className="mt-2 text-gray-700 dark:text-gray-300">{comment.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="border-t bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
                <div className="flex gap-2">
                    <Input placeholder="Tulis komentar..." />
                    <Button>
                        <Send />
                    </Button>
                </div>
            </div>
        </>
    );
};

export const StudyCardWithComments: React.FC<{ study: Study }> = ({ study }) => {
    const [isCommentSectionOpen, setIsCommentSectionOpen] = useState(false);

    return (
        <>
            <StudyCard study={study} onCommentIconClick={() => setIsCommentSectionOpen(true)} />
            <Sheet open={isCommentSectionOpen} onOpenChange={setIsCommentSectionOpen}>
                <SheetContent side="right" className="flex w-full flex-col p-0 sm:max-w-lg">
                    <CommentSection comments={study.comments} />
                </SheetContent>
            </Sheet>
        </>
    );
};

export default StudyCardWithComments;
