import { Textarea } from '@/components/buttons/text-area';
import FormField from '@/components/form-field/form-field';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Trash2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

interface EventsProps {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    phone_number: string;
    image: string;
}

const Create = () => {
    const { data, setData, post, errors, reset } = useForm<Required<EventsProps>>({
        title: '',
        description: '',
        start_date: '',
        end_date: '',
        phone_number: '',
        image: '',
    });

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState('');

    const handleImageClick = (url: string) => {
        setSelectedImage(url);
    };
    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setFileName(selectedFile.name);

        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result;
            if (typeof result === 'string') {
                setPreviewUrl(result);
                setData('image', result);
            }
        };
        reader.readAsDataURL(selectedFile);
    };

    const handleRemoveImage = () => {
        setFile(null);
        setFileName('');
        setPreviewUrl(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <main>
            <Head title="Create Lost Item" />
            <div className="flex h-screen items-center justify-center">
                <form>
                    <h1 className="text-2xl font-bold">Create Event</h1>
                    {previewUrl && (
                        <div className="space-y-2">
                            <Label htmlFor="image">{'Preview'}</Label>
                            <div className="relative max-w-[12rem] space-y-2">
                                <img
                                    src={previewUrl}
                                    alt="Preview"
                                    className="w-full cursor-pointer rounded-md object-cover"
                                    onClick={() => handleImageClick(previewUrl)}
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    className="absolute top-2 right-2 cursor-pointer"
                                    onClick={handleRemoveImage}
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        </div>
                    )}
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
                                required
                                ref={fileInputRef}
                                onChange={handleFile}
                            />
                        </label>
                        <InputError message={errors.image} />
                    </div>

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
                        <Label htmlFor="reason">description</Label>
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
                        placeholder="Input the phone number"
                        id="phone_number"
                        required
                        label="phone_number"
                        onChange={(e) => setData('phone_number', e.target.value)}
                        error={errors.phone_number}
                    />
                    <FormField
                        type="date"
                        value={data.start_date}
                        id="start_date"
                        required
                        label={'Start Date'}
                        placeholder={'Choose event hilight start date'}
                        onChange={(e) => setData('start_date', e.target.value)}
                        error={errors.end_date}
                    />
                    <FormField
                        type="date"
                        value={data.end_date}
                        id="end_date"
                        required
                        label={'End Date'}
                        placeholder={'Choose event hilight end date'}
                        onChange={(e) => setData('end_date', e.target.value)}
                        error={errors.end_date}
                    />
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
