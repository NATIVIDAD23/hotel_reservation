import { Button } from "@/Components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/Components/ui/dialog";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { useForm, usePage, router } from "@inertiajs/react";
import { useState } from "react";
import InputError from "@/Components/InputError";

export function RoomTypeDialog({ roomType = null, children, }) {
    const [open, setOpen] = useState(false);
    const { errors: pageErrors } = usePage().props;
    const { data, setData, post, put, processing, errors: formErrors, reset } = useForm({
        slug: roomType?.slug || "",
        name: roomType?.name || "",
        description: roomType?.description || "",
        image: "",
        amenities: roomType?.amenities?.join(", ") || "",
        rules: roomType?.rules?.join(", ") || "",
    });

    const errors = { ...pageErrors, ...formErrors };
    const onSubmit = (e) => {
        e.preventDefault();

        if (roomType) {
            put(route("admin.room.type.update", roomType.id), {
                onSuccess: () => {
                    setOpen(false);
                    reset();
                },
            });
        } else {
            post(
                route("admin.room.type.store"), {
                    onSuccess: () => {
                        setOpen(false);
                        reset();
                    },
                }
            );

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
                        {roomType ? "Update Room Type" : "Create Room Type"}
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-4">

                    <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData('slug', e.target.value)}
                            className={`mt-1 ${errors.slug ? "border-red-500" : ""}`}
                            placeholder="slug e.g: deluxe-suite"
                        />
                        <InputError message={errors.slug} />
                    </div>

                    <div>
                        <Label htmlFor="image">Image</Label>
                        <Input
                            id="image"
                            type="file"
                            onChange={(e) => setData('image', e.target.files[0])}
                            className={`mt-1 ${errors.image ? "border-red-500" : ""}`}
                        />
                        <InputError message={errors.image} />
                    </div>
                    <div>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={`mt-1 ${errors.name ? "border-red-500" : ""}`}
                            placeholder="name"
                        />
                        <InputError message={errors.name} />
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
                        <Label htmlFor="amenities">Amenities</Label>
                        <Textarea
                            id="amenities"
                            value={data.amenities}
                            onChange={(e) => setData('amenities', e.target.value)}
                            className={`mt-1 ${errors.amenities ? "border-red-500" : ""}`}
                            placeholder="amenities separated by comma. e.g: TV, AC, Wifi"
                        />

                        <InputError message={errors.amenities} />
                    </div>

                    <div>
                        <Label htmlFor="rules">Rules</Label>
                            <Textarea
                                id="rules"
                                value={data.rules}
                                onChange={(e) => setData('rules', e.target.value)}
                                className={`mt-1 ${errors.rules ? "border-red-500" : ""}`}
                                placeholder="Rules separated by comma. e.g: No Smoking, No Drinking"
                            />
                        <InputError message={errors.rules} />
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
