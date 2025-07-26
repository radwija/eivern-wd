import { LinkButton } from '@/components/buttons/link-button';
import EventCard, { EventCardProps } from '@/components/cards/event-card';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, InertiaPageProps } from '@/types';
import { UserRoleEnum } from '@/types/enum';
import { Head, usePage } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface IndexPageProps extends InertiaPageProps {
    events: EventCardProps[];
}

const Index = () => {
    const { auth, events = [] } = usePage<IndexPageProps>().props;
    const canPost = auth.user.role === UserRoleEnum.ADMIN || auth.user.role === UserRoleEnum.ORGANIZATION_UKM;

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Events', href: '/events' }];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Events" />
            <main className="px-4 py-6">
                <Heading
                    title={'Events'}
                    description={'View the complete list of Events.'}
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
                {/* FIX: Lakukan map pada 'events' dari props, bukan 'datas' */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
                    {events.map((event) => (
                        <EventCard key={event.id} {...event} />
                    ))}
                </div>
            </main>
        </AppLayout>
    );
};

export default Index;
