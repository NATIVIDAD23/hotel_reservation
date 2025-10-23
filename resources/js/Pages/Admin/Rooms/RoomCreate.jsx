import React, { useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import InputError from "@/Components/InputError";
import { Upload, Image as ImageIcon, Plus } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"

export default function RoomCreate({
    room_types,
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    room_type: "",
    room_number: "",
    room_price: "",
    description: "",
    images: [],
  });

  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    setData(e.target.name, e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setData("images", files);

    const filePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    post(route("admin.room.store"), {
      forceFormData: true,
      onSuccess: () => {
        reset();
        setPreviews([]);
      },
    });
  };

  return (
    <AuthenticatedLayout header="Create Room">
      <Head title="Create Room" />

      <div className="mx-auto space-y-6 py-6 px-4 sm:px-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Room Information
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Room Name *
                  </label>
                  <Input
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="e.g., Deluxe Ocean View"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <InputError message={errors.name} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Room Type *
                  </label>

                  <Select
                  name="room_type"
                  value={data.room_type}
                  onValueChange={handleChange}
                  className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                    <SelectLabel>Room Types</SelectLabel>
                    {room_types.map((room_type) => (
                        <SelectItem key={room_type.id} value={room_type.id}>
                        {room_type.name}
                        </SelectItem>
                    ))}
                    </SelectGroup>
                </SelectContent>
                </Select>
                  <InputError message={errors.room_type} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Room Number *
                  </label>
                  <Input
                    name="room_number"
                    value={data.room_number}
                    onChange={handleChange}
                    placeholder="e.g., 101, 202"
                    className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  />
                  <InputError message={errors.room_number} />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Room Price *
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <Input
                      name="room_price"
                      value={data.room_price}
                      onChange={handleChange}
                      placeholder="0.00"
                      type="number"
                      step="0.01"
                      className="pl-8 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  <InputError message={errors.room_price} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  value={data.description}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors min-h-[120px] resize-none"
                  placeholder="Describe the room features, amenities, and special details..."
                ></textarea>
                <InputError message={errors.description} />
              </div>

              {/* Image Upload Section */}
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">
                  Room Images
                </label>

                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 transition-colors duration-200">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center justify-center space-y-3"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Upload className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">
                        Click to upload images
                      </p>
                      <p className="text-gray-500 text-sm mt-1">
                        PNG, JPG, JPEG up to 10MB each
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Choose Files
                    </Button>
                  </label>
                </div>

                <InputError message={errors.images} />

                {/* Image Previews */}
                {previews.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      Preview ({previews.length} images selected)
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {previews.map((src, i) => (
                        <div
                          key={i}
                          className="relative group rounded-lg overflow-hidden border border-gray-200"
                        >
                          <img
                            src={src}
                            alt={`preview-${i}`}
                            className="w-full h-24 object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-4 border-t">
                <Button
                  type="submit"
                  disabled={processing}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg font-medium transition-colors duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Creating Room...
                    </div>
                  ) : (
                    "Create Room"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </AuthenticatedLayout>
  );
}
