import React from 'react';

interface User {
    name: string;
}

export type EventCardProps = {
    id: number;
    title: string;
    organizer_id: number;
    organizer?: User;
    description: string;
    image: string;
    price: number;
    start_date: string;
    end_date: string;
};

const EventCard: React.FC<EventCardProps> = ({ start_date, description, end_date, title, price, organizer, image }) => {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
        });
    };

    const formatPrice = (amount: number) => {
        return amount.toLocaleString('id-ID', {
            style: 'currency',
            currency: 'IDR',
            maximumFractionDigits: 0,
        });
    };
    return (
        <div className="w-full cursor-pointer overflow-hidden rounded-xl bg-white shadow-md transition-transform duration-300 ease-in-out hover:scale-[1.01]">
            <div className="relative flex h-36 items-start justify-start bg-gray-200">
                {image ? <img src={image} alt={title} className="h-full w-full object-cover" /> : <div className="h-full w-full bg-gray-300" />}
                <div className="absolute top-2 left-2 rounded-full bg-blue-500 px-2 py-1 text-xs font-medium text-white shadow">
                    {formatDate(start_date)}
                </div>
            </div>
            <div className="mb-10 space-y-1 px-4 py-3">
                <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold text-black">{title}</h3>
                    <div className="flex gap-2">
                        <p className="rounded-full bg-blue-500 px-2 py-1 text-xs text-white">{formatPrice(price)}</p>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-sm">{organizer?.name}</p>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
