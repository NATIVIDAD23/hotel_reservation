import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm, usePage } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/Components/InputError";

export function HeroSectionDialog({ hero = null, children, branches }) {
    const [open, setOpen] = useState(false);
    const { errors: pageErrors } = usePage().props;
    const { data, setData, post, put, processing, errors: formErrors, reset } = useForm({
        title: hero?.title || "",
        description: hero?.description || "",
        image_path: "",
    });

    const errors = { ...pageErrors, ...formErrors };

    const onSubmit = (e) => {
        e.preventDefault();
        if(hero) {
            put(route('hero.update', hero.id), {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                },

            });
        } else {
            post(route('admin.herosection.store'), {
                onSuccess: () => {
                    setOpen(false)
                    reset()
                },
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {hero ? "Update Hero Section" : "Create Hero Section"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            className={`mt-1 ${errors.title ? "border-red-500" : ""}`}
                            placeholder="Title"
                        />
                        <InputError message={errors.title} />
                    </div>

                    <div>
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={`mt-1 ${errors.description ? "border-red-500" : ""}`}
                            placeholder="Description"
                        />
                        <InputError message={errors.description} />
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e) => setData('image_path', e.target.files[0])}
                            className={`mt-1 ${errors.image_path ? "border-red-500" : ""}`}
                        />
                        <InputError message={errors.image_path} />
                    </div>


                    <div className="flex justify-end space-x-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                                setOpen(false)
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? "Saving..." : "Save"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
