import { LinkButton } from '@/components/buttons/link-button';
import EventCard, { EventCardProps } from '@/components/cards/event-card';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaPageProps } from '@/types';
import { UserRoleEnum } from '@/types/enum';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const Index = () => {
    const { auth } = usePage<InertiaPageProps>().props;
    const canPost = auth.user.role === UserRoleEnum.ADMIN || auth.user.role === UserRoleEnum.ORGANIZATION_UKM;

    const datas: EventCardProps[] = [
        {
            id: 1,
            title: 'Tech Conference 2025',
            description: 'Join us for the annual Tech Conference where industry leaders share insights on the latest trends in technology.',
            price: 200000,
            organizer_id: 1,
            organizer: { name: 'Progress' },
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
            start_date: '2025-08-23T10:00:00Z',
            end_date: '2025-08-25T18:00:00Z',
        },
        {
            id: 2,
            title: 'Tech Conference 2025',
            description: 'Join us for the annual Tech Conference where industry leaders share insights on the latest trends in technology.',
            price: 200000,
            organizer_id: 1,
            organizer: { name: 'Eivern' },
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
            start_date: '2025-08-23T10:00:00Z',
            end_date: '2025-08-25T18:00:00Z',
        },
        {
            id: 3,
            title: 'Tech Conference 2025',
            description: 'Join us for the annual Tech Conference where industry leaders share insights on the latest trends in technology.',
            price: 200000,
            organizer_id: 1,
            organizer: { name: 'Progress' },
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
            start_date: '2025-08-23T10:00:00Z',
            end_date: '2025-08-25T18:00:00Z',
        },
        {
            id: 4,
            title: 'Tech Conference 2025',
            description: 'Join us for the annual Tech Conference where industry leaders share insights on the latest trends in technology.',
            price: 200000,
            organizer_id: 1,
            organizer: { name: 'Progress' },
            image: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
            start_date: '2025-08-23T10:00:00Z',
            end_date: '2025-08-25T18:00:00Z',
        },
    ];
    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Events', href: '/events' }];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <main className="px-4 py-6">
                <Heading
                    title={'Studies'}
                    description={'View the complete list of Studies.'}
                    action={
                        canPost && (
                            <div className="flex gap-2">
                                <LinkButton href={route('events.create')} variant="default" size="default">
                                    <Plus /> Create Event
                                </LinkButton>
                            </div>
                        )
                    }
                />
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {datas.map((data) => (
                        <EventCard key={data.id} {...data} />
                    ))}
                </div>{' '}
            </main>
        </AppLayout>
    );
};

export default Index;
