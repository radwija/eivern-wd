import { LinkButton } from '@/components/buttons/link-button';
import LostItemCard, { LostItem } from '@/components/cards/card-lost-items';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface UserProps {
    id: number;
    name: string;
    avatarUrl?: string;
}

const UserAvatar: React.FC<{ user: UserProps }> = ({ user }) => (
    <img
        className="h-10 w-10 rounded-full bg-gray-300 object-cover"
        src={user.avatarUrl}
        alt={user.name}
        onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/40x40/E2E8F0/4A5568?text=${user.name.charAt(0)}`;
        }}
    />
);

const Index = () => {
    const datas: LostItem[] = [
        {
            id: 1,
            title: 'Tumbler Hilang',
            description:
                'Saya menemukan sebuah tumbler yang tergeletak di meja perpustakaan, bagi siapapun yang merasa memiliki ini bisa hubungi saya.',
            image: ['img/tumbler.jpeg'],
            contact_name: 'Gus Maha',
            phone_number: '081234567890',
            user: {
                name: 'Gus Maha',
                avatarUrl: 'img/profile.png',
            },
            date: '2025-05-01T12:00:00Z',
            active: true,
        },

        {
            id: 2,
            title: 'Tumbler Hilang',
            description:
                'Saya menemukan sebuah tumbler yang tergeletak di meja perpustakaan, bagi siapapun yang merasa memiliki ini bisa hubungi saya.',
            image: ['img/tumbler.jpeg'],
            contact_name: 'Gus Maha',
            phone_number: '081234567890',
            user: {
                name: 'Gus Maha',
                avatarUrl: 'img/profile.png',
            },
            date: '2025-05-01T12:00:00Z',
            active: true,
        },
        {
            id: 3,
            title: 'Tumbler Hilang',
            description:
                'Saya menemukan sebuah tumbler yang tergeletak di meja perpustakaan, bagi siapapun yang merasa memiliki ini bisa hubungi saya.',
            image: ['img/tumbler.jpeg', 'img/tumbler.jpeg', 'img/tumbler.jpeg', 'img/tumbler.jpeg', 'img/tumbler.jpeg'],
            contact_name: 'Gus Maha',
            phone_number: '081234567890',
            user: {
                name: 'Gus Maha',
                avatarUrl: 'img/profile.png',
            },
            date: '2025-05-01T12:00:00Z',
            active: false,
        },
    ];

    const dataUser: UserProps[] = [
        { id: 1, name: 'Ahmad Subarjo', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop' },
        { id: 2, name: 'Citra Lestari', avatarUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop' },
        { id: 3, name: 'Budi Prakoso', avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop' },
        { id: 4, name: 'Rina Wijaya' },
        { id: 5, name: 'Eko Nugroho', avatarUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1887&auto=format&fit=crop' },
        { id: 6, name: 'Fitri Handayani' },
        { id: 7, name: 'Gus Durrahman', avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070&auto=format&fit=crop' },
        { id: 8, name: 'Hesti Puspita' },
        { id: 9, name: 'Indra Lesmana' },
        { id: 10, name: 'Joko Susilo', avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1887&auto=format&fit=crop' },
        { id: 11, name: 'Kartika Sari' },
        { id: 12, name: 'Lia Aminah', avatarUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1961&auto=format&fit=crop' },
    ];

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Lost Items', href: '/lost-items' }];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Lost Items" />
            <div className="grid grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-2 xl:grid-cols-3">
                <div className="w-full xl:col-span-2">
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
                    {datas.map((data) => (
                        <LostItemCard key={data.id} item={data} />
                    ))}
                </div>
                {/* user list */}
                <aside className="hidden lg:block">
                    <section className="fixed top-20 right-6 z-30 h-[85dvh] w-[22rem] overflow-y-auto rounded-xl border bg-white px-4 py-4 shadow-md dark:bg-neutral-900">
                        <div className="mb-2 flex items-center justify-between">
                            <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-100">Users List</h2>
                        </div>
                        <div className="">
                            {dataUser.map((user, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-gray-100 dark:hover:bg-neutral-800"
                                >
                                    <UserAvatar user={user} />
                                    <div>
                                        <p className="font-medium text-gray-800 dark:text-gray-200">{user.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </aside>
            </div>
        </AppLayout>
    );
};

export default Index;
