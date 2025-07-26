import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaPageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { Calendar, MapPin } from 'lucide-react';

// --- Tipe Data ---
interface EventDetails {
    id: number;
    title: string;
    description: string;
    price: number | null;
    organizer: { name: string };
    image_url: string | null;
    start_date: string;
    end_date: string | null;
}

interface ShowPageProps extends InertiaPageProps {
    event: EventDetails;
}

// --- Komponen Halaman Show ---
const Show = () => {
    const { event } = usePage<ShowPageProps>().props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Events', href: route('events.index') },
        { title: 'Event Details', href: route('events.show', event.id) },
    ];

    const formatPrice = (price: number | null): string => {
        if (!price) return 'Gratis';
        return `Rp ${price.toLocaleString('id-ID')}`;
    };

    const formatDate = (dateString: string | null): string => {
        if (!dateString) return '';
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={event.title} />
            <main className="px-4 py-6 md:px-6">
                <Heading title={event.title} description={`Diselenggarakan oleh ${event.organizer.name}`} />
                <div className="mx-auto max-w-4xl">
                    <div className="mt-6 overflow-hidden rounded-lg border bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
                        {/* Banner Gambar */}
                        <div className="aspect-video w-full bg-gray-200 dark:bg-gray-700">
                            <img
                                src={event.image_url || 'https://placehold.co/800x450/E2E8F0/4A5568?text=Event'}
                                alt={event.title}
                                className="h-full w-full object-cover"
                            />
                        </div>

                        <div className="p-6">
                            {/* Detail Utama */}
                            <div className="mb-6 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between dark:border-gray-600">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <Calendar className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                                        <span>{formatDate(event.start_date)}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                                        <MapPin className="h-5 w-5 flex-shrink-0 text-indigo-500" />
                                        <span>Lokasi Acara (Contoh)</span>
                                    </div>
                                </div>
                                <div className="w-full flex-shrink-0 rounded-md bg-indigo-100 p-3 text-center text-xl font-bold text-indigo-700 md:w-auto dark:bg-indigo-900/50 dark:text-indigo-300">
                                    {formatPrice(event.price)}
                                </div>
                            </div>

                            {/* Deskripsi */}
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                                <h2 className="text-xl font-semibold">Tentang Acara Ini</h2>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </AppLayout>
    );
};

export default Show;
