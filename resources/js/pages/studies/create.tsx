import { Textarea } from '@/components/buttons/text-area';
import FormField from '@/components/form-field/form-field';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import React, { FormEvent } from 'react'; // Impor yang tidak perlu dihapus

// Tipe data untuk form disesuaikan
interface ThreadFormData {
    title: string;
    description: string;
    phone_number: string;
    category: string;
}

const Create = () => {
    // State useForm disederhanakan, dan 'processing' ditambahkan
    const { data, setData, post, errors, processing } = useForm<ThreadFormData>({
        title: '',
        description: '',
        phone_number: '',
        category: 'study', // Kategori di-hardcode sesuai kode asli Anda
    });

    // Fungsi untuk submit form
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        post(route('threads.store'));
    };

    return (
        <main>
            <Head title="Create Study Thread" />
            {/* Latar belakang abu-abu untuk kontras */}
            <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4 dark:bg-neutral-950">
                {/* Di sini kita buat tampilan seperti kartu menggunakan div dan Tailwind */}
                <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-md dark:bg-neutral-900">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold">Create Study Thread</h1>
                            <p className="text-gray-500 dark:text-gray-400">Fill in the details below.</p>
                        </div>

                        <FormField
                            id="title"
                            label="Title"
                            type="text"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            error={errors.title}
                            required
                        />

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                required
                                className="min-h-[120px]"
                            />
                        </div>

                        <div className="flex justify-end pt-2">
                            <Button type="submit" size="lg" disabled={processing}>
                                {processing ? 'Submitting...' : 'Submit'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
};

export default Create;