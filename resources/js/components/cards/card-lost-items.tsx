import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import React from 'react';

export interface LostItem {
    id: number;
    title: string;
    description: string;
    image: string[];
    user: {
        name: string;
        avatarUrl?: string;
    };
    contact_name: string;
    phone_number: string;
    date: string;
    active: boolean;
}

interface LostItemCardProps {
    item: LostItem;
}

function formatTimeAgo(dateString: string): string {
    const now = new Date();
    const past = new Date(dateString);
    const seconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        if (Math.floor(interval) > 10) return '1 dekade yang lalu';
        return Math.floor(interval) + ' tahun yang lalu';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' bulan yang lalu';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' hari yang lalu';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' jam yang lalu';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' menit yang lalu';
    }
    return Math.floor(seconds) + ' detik yang lalu';
}

const UserAvatar: React.FC<{ user: LostItem['user'] }> = ({ user }) => (
    <img
        className="h-10 w-10 rounded-full bg-gray-300 object-cover"
        src={user.avatarUrl}
        alt={user.name}
        onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/40x40/E2E8F0/4A5568?text=${user.name.charAt(0)}`;
        }}
    />
);

const ItemImageDisplay: React.FC<{ images: string[]; title: string }> = ({ images, title }) => {
    if (!images || images.length === 0) {
        return (
            <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-gray-200 dark:bg-gray-700">
                <p className="text-gray-500">Tidak ada gambar</p>
            </div>
        );
    }

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
            className="aspect-square w-full rounded-lg object-contain"
            onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://placehold.co/1600x900/cccccc/ffffff?text=Gagal+Muat';
            }}
        />
    );
};

const LostItemCard: React.FC<LostItemCardProps> = ({ item }) => {
    return (
        <div className="mx-auto my-6 max-w-2xl overflow-hidden rounded-xl border-1 bg-white shadow-lg dark:bg-gray-800">
            {/* Bagian Atas: Detail Teks */}
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <UserAvatar user={item.user} />
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className={`h-3 w-3 flex-shrink-0 rounded-full ${item.active === true ? 'bg-green-500' : 'bg-red-500'}`} />
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                            {item.user.name} | {formatTimeAgo(item.date)}
                        </p>
                    </div>
                </div>
                <p className="mt-4 text-gray-700 dark:text-gray-300">{item.description}</p>
                <div className="mt-6">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200">Contact</h4>
                    <p className="text-gray-600 dark:text-gray-400">
                        {item.contact_name}: {item.phone_number}
                    </p>
                </div>
            </div>

            {/* Bagian Bawah: Gambar atau Carousel */}
            <div className="px-6 pb-6">
                <ItemImageDisplay images={item.image} title={item.title} />
            </div>
        </div>
    );
};

export default LostItemCard;
