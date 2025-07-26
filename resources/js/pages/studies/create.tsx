import { Textarea } from '@/components/buttons/text-area';
import FormField from '@/components/form-field/form-field';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { Trash2, UploadCloud } from 'lucide-react';
import { useRef, useState } from 'react';

interface StudiesProps {
    title: string;
    description: string;
    phone_number: string;
    image: string;
}

const Create = () => {
    const { data, setData, post, errors, reset } = useForm<Required<StudiesProps>>({
        title: '',
        description: '',
        phone_number: '',
        image: '',
        category: 'study',
    });

    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState<string>('');
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post(route('threads.store'));
};

    return (
        <main>
            <Head title="Create Lost Item" />
            <div className="flex h-screen items-center justify-center">
                <form onSubmit={handleSubmit} >
                    <h1 className="text-2xl font-bold">Create Study Thread</h1>
            
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
