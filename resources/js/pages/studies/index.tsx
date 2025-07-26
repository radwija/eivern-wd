import { LinkButton } from '@/components/buttons/link-button';
import StudyCard, { Study } from '@/components/cards/study-card';
import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Thread } from '@/types';
import { Head } from '@inertiajs/react';
import { Plus } from 'lucide-react';

interface UserProps {
    id: number;
    name: string;
    avatarUrl?: string;
}

// interface IndexPageProps {
//     threads: Thread[];
// }

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

const Index = ({ threads }: { threads: Thread[] }) => {
    // const datas: Study[] = [
    //     {
    //         id: 1,
    //         title: 'Diskusi Kelompok Kalkulus Lanjutan',
    //         description:
    //             'Mencari teman untuk belajar bersama materi integral lipat tiga dan aplikasinya. Rencana belajar setiap hari Selasa dan Kamis sore di perpustakaan pusat. Terbuka untuk semua mahasiswa dari jurusan apapun.\n\nFokus utama kita adalah menyelesaikan soal-soal dari buku referensi dan mempersiapkan diri untuk ujian akhir.',
    //         image: [
    //             'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    //             'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    //         ],
    //         user: { name: 'Ahmad Subarjo', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=A' },
    //         date: '2025-07-25T10:00:00Z',
    //         active: true,
    //         comments: [
    //             {
    //                 id: 1,
    //                 user: { name: 'Citra Lestari', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=C' },
    //                 text: 'Wah, kebetulan banget! Aku juga lagi butuh teman belajar buat materi ini. Boleh ikut gabung?',
    //                 date: '2025-07-25T11:30:00Z',
    //             },
    //             {
    //                 id: 2,
    //                 user: { name: 'Budi Prakoso', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=B' },
    //                 text: 'Selasa sore aku ada kelas, tapi kalau hari Kamis bisa. Apakah jadwalnya fleksibel?',
    //                 date: '2025-07-25T13:45:00Z',
    //             },
    //         ],
    //     },
    //     {
    //         id: 2,
    //         title: 'Diskusi Kelompok Kalkulus Lanjutan',
    //         description:
    //             'Mencari teman untuk belajar bersama materi integral lipat tiga dan aplikasinya. Rencana belajar setiap hari Selasa dan Kamis sore di perpustakaan pusat. Terbuka untuk semua mahasiswa dari jurusan apapun.\n\nFokus utama kita adalah menyelesaikan soal-soal dari buku referensi dan mempersiapkan diri untuk ujian akhir.',
    //         image: [
    //             'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    //             'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    //         ],
    //         user: { name: 'Ahmad Subarjo', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=A' },
    //         date: '2025-07-25T10:00:00Z',
    //         active: true,
    //         comments: [
    //             {
    //                 id: 1,
    //                 user: { name: 'Citra Lestari', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=C' },
    //                 text: 'Wah, kebetulan banget! Aku juga lagi butuh teman belajar buat materi ini. Boleh ikut gabung?',
    //                 date: '2025-07-25T11:30:00Z',
    //             },
    //             {
    //                 id: 2,
    //                 user: { name: 'Budi Prakoso', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=B' },
    //                 text: 'Selasa sore aku ada kelas, tapi kalau hari Kamis bisa. Apakah jadwalnya fleksibel?',
    //                 date: '2025-07-25T13:45:00Z',
    //             },
    //         ],
    //     },
    //     {
    //         id: 3,
    //         title: 'Diskusi Kelompok Kalkulus Lanjutan',
    //         description:
    //             'Mencari teman untuk belajar bersama materi integral lipat tiga dan aplikasinya. Rencana belajar setiap hari Selasa dan Kamis sore di perpustakaan pusat. Terbuka untuk semua mahasiswa dari jurusan apapun.\n\nFokus utama kita adalah menyelesaikan soal-soal dari buku referensi dan mempersiapkan diri untuk ujian akhir.',
    //         image: [
    //             'https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop',
    //             'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2071&auto=format&fit=crop',
    //         ],
    //         user: { name: 'Ahmad Subarjo', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=A' },
    //         date: '2025-07-25T10:00:00Z',
    //         active: false,
    //         comments: [
    //             {
    //                 id: 1,
    //                 user: { name: 'Citra Lestari', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=C' },
    //                 text: 'Wah, kebetulan banget! Aku juga lagi butuh teman belajar buat materi ini. Boleh ikut gabung?',
    //                 date: '2025-07-25T11:30:00Z',
    //             },
    //             {
    //                 id: 2,
    //                 user: { name: 'Budi Prakoso', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=B' },
    //                 text: 'Selasa sore aku ada kelas, tapi kalau hari Kamis bisa. Apakah jadwalnya fleksibel?',
    //                 date: '2025-07-25T13:45:00Z',
    //             },
    //             {
    //                 id: 2,
    //                 user: { name: 'Dian Putri', avatarUrl: 'https://placehold.co/40x40/E2E8F0/4A5568?text=B' },
    //                 text: 'Boleh ikut juga? Aku lagi butuh teman belajar untuk materi ini.',
    //                 date: '2025-07-25T13:50:00Z',
    //             },
    //         ],
    //     },
    // ];

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

    console.log(threads);

    const breadcrumbs: BreadcrumbItem[] = [{ title: 'Studies', href: route('studies.index') }];
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Studies" />
            <div className="grid grid-cols-1 gap-4 px-4 py-6 lg:grid-cols-2 xl:grid-cols-3">
                <div className="w-full xl:col-span-2">
                    <Heading
                        title={'Studies'}
                        description={'View the complete list of Studies.'}
                        action={
                            <div className="flex gap-2">
                                <LinkButton href={route('studies.create')} variant="default" size="default" className="mb-2 lg:mb-0">
                                    <Plus />
                                    Create Post
                                </LinkButton>
                            </div>
                        }
                    />
                    {threads.map((thread) => (
                        <StudyCard key={thread.id} study={thread} />
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
