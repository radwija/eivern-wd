import { ButtonIcon } from '@/components/buttons/button-icon';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Calendar, MapPin, Phone } from 'lucide-react';

interface User {
    name: string;
}

interface EventDetailsProps {
    id: number;
    title: string;
    organizer_id: number;
    organizer?: User;
    description: string;
    image: string;
    price: number;
    start_date: string;
    end_date: string;
}

const Show: React.FC<EventDetailsProps> = ({ start_date, description, end_date, title, price, organizer, image }) => {
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Event Details', href: 'events' }];
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Event Details" />
            <main className="p-6">
                <Heading title={'Event Details'} description={'View the Event Details'} backButton={<ButtonIcon href={route('events.index')} />} />

                <div className="mx-auto max-w-6xl rounded-t-lg border-1 shadow-md">
                    {/* Banner Gambar */}
                    <div className="mb-4 aspect-video w-full overflow-hidden rounded-t-lg bg-gray-200">
                        <img src="https://via.placeholder.com/800x400" alt="Event Banner" className="h-full w-full object-cover" />
                    </div>

                    <div className="px-4 py-6 md:px-6">
                        {/* Info Event */}
                        <div className="mb-4 space-y-2">
                            <h1 className="text-2xl font-bold">{title}</h1>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <Calendar className="h-4 w-4" />
                                <span>{formatDate(start_date)}</span>
                                <span>•</span>
                                <MapPin className="h-4 w-4" />
                                <span>{organizer?.name}</span>
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <p className="mb-6 text-sm text-gray-700">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices luctus purus, vitae tincidunt justo ultricies
                            vel. Curabitur sodales porttitor dui nec mollis. Sed efficitur pretium leo, ac congue nibh pellentesque quis. Nullam
                            venenatis malesuada efficitur. Vestibulum ullamcorper ut purus vitae tincidunt. Maecenas mollis neque pulvinar nulla
                            congue pulvinar. Vestibulum sit amet arcu ante. Morbi ullamcorper ipsum at interdum semper. Morbi posuere fringilla
                            turpis, vel accumsan ex varius et. Nulla facilisi.
                        </p>

                        {/* Harga & Tombol */}
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <a
                                href="https://wa.me/6281234567890"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex w-fit items-center gap-2 rounded-lg bg-green-500 px-4 py-2 text-white transition-colors duration-200 hover:bg-green-600"
                            >
                                <Phone className="h-4 w-4" />
                                <span>Hubungi via WhatsApp</span>
                            </a>
                            <div className="w-fit rounded-md bg-green-100 px-4 py-2 text-lg font-semibold text-green-700">{formatPrice(price)}</div>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
};

export default Show;
