import { Link } from '@inertiajs/react';
import { Calendar, Tag } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';

export interface EventCardProps {
    id: number;
    title: string;
    description: string;
    price: number | null;
    organizer: { name: string };
    image_url: string | null;
    start_date: string;
    end_date: string | null;
}

const formatPrice = (price: number | null): string => {
    if (!price) {
        return 'Gratis';
    }
    return `Rp ${price.toLocaleString('id-ID')}`;
};

const formatDate = (dateString: string | null): string | null => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
};

const EventCard: React.FC<EventCardProps> = ({ id, title, description, price, organizer, image_url, start_date, end_date }) => {
    const startDateFormatted = formatDate(start_date);
    const endDateFormatted = formatDate(end_date);

    return (
        <div className="flex h-full flex-col overflow-hidden rounded-lg border bg-white shadow-md transition-shadow duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            {/* Gambar Event */}
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={image_url || 'https://placehold.co/600x400/E2E8F0/4A5568?text=Event'}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>

            {/* Konten Kartu */}
            <div className="flex flex-1 flex-col p-4">
                {/* Judul */}
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h3>

                {/* Penyelenggara */}
                <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">{organizer.name}</p>

                {/* Deskripsi (dibatasi) */}
                <p className="mt-2 line-clamp-3 flex-grow text-sm text-gray-600 dark:text-gray-300">{description}</p>

                {/* Detail: Tanggal & Harga */}
                <div className="mt-4 space-y-2 border-t pt-4 text-sm text-gray-500 dark:border-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 flex-shrink-0" />
                        <span>
                            {startDateFormatted}
                            {endDateFormatted && startDateFormatted !== endDateFormatted ? ` - ${endDateFormatted}` : ''}
                        </span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Tag className="h-4 w-4 flex-shrink-0" />
                        <span className="font-semibold">{formatPrice(price)}</span>
                    </div>
                </div>
                <Link href={route('events.show', id)} className="mt-3">
                    <Button> Show Detail</Button>
                </Link>
            </div>
        </div>
    );
};

export default EventCard;
