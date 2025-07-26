import { LinkButton } from '@/components/buttons/link-button';
import LostItemCard, { LostItem } from '@/components/cards/card-lost-items';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Thread } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

const Index = ({ threads }: { threads: Thread[] }) => {
    // const datas: LostItem[] = [
    //     {
    //         id: 1,
    //         title: 'Tumbler Hilang',
    //         description:
    //             'Saya menemukan sebuah tumbler yang tergeletak di meja perpustakaan, bagi siapapun yang merasa memiliki ini bisa hubungi saya.',
    //         image: ['img/tumbler.jpeg'],
    //         contact_name: 'Gus Maha',
    //         phone_number: '081234567890',
    //         user: {
    //             name: 'Gus Maha',
    //             avatarUrl: 'img/profile.png',
    //         },
    //         date: '2025-05-01T12:00:00Z',
    //         active: true,
    //     },

    //     {
    //         id: 2,
    //         title: 'Tumbler Hilang',
    //         description:
    //             'Saya menemukan sebuah tumbler yang tergeletak di meja perpustakaan, bagi siapapun yang merasa memiliki ini bisa hubungi saya.',
    //         image: ['img/tumbler.jpeg'],
    //         contact_name: 'Gus Maha',
    //         phone_number: '081234567890',
    //         user: {
    //             name: 'Gus Maha',
    //             avatarUrl: 'img/profile.png',
    //         },
    //         date: '2025-05-01T12:00:00Z',
    //         active: true,
    //     },
    //     {
    //         id: 3,
    //         title: 'Tumbler Hilang',
    //         description:
    //             'Saya menemukan sebuah tumbler yang tergeletak di meja perpustakaan, bagi siapapun yang merasa memiliki ini bisa hubungi saya.',
    //         image: ['img/tumbler.jpeg', 'img/tumbler.jpeg', 'img/tumbler.jpeg', 'img/tumbler.jpeg', 'img/tumbler.jpeg'],
    //         contact_name: 'Gus Maha',
    //         phone_number: '081234567890',
    //         user: {
    //             name: 'Gus Maha',
    //             avatarUrl: 'img/profile.png',
    //         },
    //         date: '2025-05-01T12:00:00Z',
    //         active: false,
    //     },
    // ];

    console.log(threads);

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Lost Items', href: '/lost-items' }];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lost Items" />
            <div className="px-2 py-2">
                <Heading
                    title={'Lost Items'}
                    description={'View the complete list of lost items.'}
                    action={
                        <div className="flex gap-2">
                            <LinkButton href={route('lost-items.create')} variant="default" size="default" className="mb-2 lg:mb-0">
                                <Plus />
                                Report Lost
                            </LinkButton>
                        </div>
                    }
                />
                {threads.map((data) => (
                    <LostItemCard key={data.id} item={data} />
                ))}
            </div>
        </AppLayout>
    );
};

export default Index;
