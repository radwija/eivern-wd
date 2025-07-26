import { Textarea } from '@/components/buttons/text-area';
import FormField from '@/components/form-field/form-field';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Head, router, useForm } from '@inertiajs/react';
import { UploadCloud } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

interface LostItemsProps {
    title: string;
    description: string;
    category: string;
    contact_name: string;
    phone_number: string;
    images: File[] | null;
}

const Create = () => {
    const { data, setData, post, errors, reset } = useForm({
        title: '',
        description: '',
        category: 'lost-items',
        contact_name: '',
        phone_number: '',
        images: null,
    });

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState('');
    const [files, setFiles] = useState<File[]>([]);
    const [previews, setPreviews] = useState<string[]>([]);

    const handleImageClick = (url: string) => {
        setSelectedImage(url);
    };

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles);

        const newPreviews: string[] = [];
        selectedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === 'string') {
                    newPreviews.push(reader.result);
                    // pastikan update state setelah semua file dibaca
                    if (newPreviews.length === selectedFiles.length) {
                        setPreviews(newPreviews);
                    }
                }
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImage = () => {
        setFile(null);
        setFileName('');
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit: FormEventHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('category', 'lost-items');
        formData.append('contact_name', data.contact_name);
        formData.append('phone_number', data.phone_number);

        files.forEach((file) => {
            formData.append('images[]', file);
        });

        // Gunakan Inertia form submission manual
        router.post(route('threads.store'), formData, {
            forceFormData: true,
            onSuccess: () => {
                reset();
                setFiles([]);
                setPreviews([]);
            },
        });
    };

    return (
        <main>
            <Head title="Create Lost Item" />
            <div className="flex h-screen items-center justify-center">
                <form onSubmit={handleSubmit}>
                    <h1 className="text-2xl font-bold">Create Lost Item Page</h1>
                    <input type="hidden" id="category" value={'lost-items'} />
                    <FormField
                        type="text"
                        placeholder="Input the title"
                        id="title"
                        required
                        label="Title"
                        error={errors.title}
                        onChange={(e) => setData('title', e.target.value)}
                    />
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            placeholder={'Type your description...'}
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            required
                        />
                    </div>
                    <FormField
                        type="text"
                        placeholder="Input the contact name"
                        id="contact_name"
                        required
                        label="Contact Name"
                        onChange={(e) => setData('contact_name', e.target.value)}
                        error={errors.contact_name}
                    />
                    <FormField
                        type="text"
                        placeholder="Input the phone number"
                        id="phone_number"
                        required
                        label="Phone Number"
                        onChange={(e) => setData('phone_number', e.target.value)}
                        error={errors.phone_number}
                    />
                    <div className="col-span-2 space-y-2">
                        <Label htmlFor="image">Image</Label>
                        <label className="flex h-fit cursor-pointer items-center gap-2 truncate rounded-md border border-gray-300 px-4 py-2.5 hover:bg-gray-100 lg:max-w-[36rem] dark:hover:bg-zinc-900">
                            <UploadCloud className="h-5 w-5 dark:text-white" />
                            <span className="text-sm dark:text-white"> {fileName ? fileName : 'Choose image file'}</span>
                            <input
                                id="image"
                                type="file"
                                accept="image/png, image/gif, image/jpeg, image/jpg"
                                className="hidden"
                                multiple
                                ref={fileInputRef}
                                onChange={handleFile}
                            />
                        </label>
                        <InputError message={errors.image} />
                    </div>
                    {previews.length > 0 && (
                        <div className="space-y-2">
                            <Label htmlFor="image">Preview</Label>
                            <div className="flex flex-wrap gap-4">
                                {previews.map((url, index) => (
                                    <div key={index} className="relative max-w-[12rem] space-y-2">
                                        <img
                                            src={url}
                                            alt={`Preview ${index}`}
                                            className="w-full cursor-pointer rounded-md object-cover"
                                            onClick={() => handleImageClick(url)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="col-span-2 space-x-4 text-end">
                        {/* <LinkButton href={route('event-hilight-index')} variant="outline" size="lg">
                            Back
                        </LinkButton> */}
                        <Button type="submit" size="lg">
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default Create;
