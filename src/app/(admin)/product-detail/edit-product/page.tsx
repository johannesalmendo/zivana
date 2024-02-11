/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { toast } from "@/components/ui/use-toast";

interface EditProductPageProps { }

const Editpage: FC<EditProductPageProps> = ({ }) => {
  const router = useRouter();
  // const [previewImg, setPreviewImg] = useState("");
  // const inputRef = useRef<HTMLInputElement>(null);

  const searchParams = useSearchParams();
  const product = searchParams.get("product");

  const decodedProduct = decodeURIComponent(product!);

  const originalObject = JSON.parse(decodedProduct);

  console.log("Original Object:", originalObject);

  const formSchema = z.object({
    name: z.string({ required_error: "name required" }),
    description: z.string({ required_error: "description required" }),
    price: z.string({ required_error: "price required" }),
    rating: z.string({ required_error: "rating required" }),
    image: z
      .custom<File>((v) => v instanceof File, {
        message: 'Image is required',
      }),


  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: originalObject.name,
      description: originalObject.description,
      price: originalObject.price.toString(),
      rating: originalObject.rating.toString(),
      image: originalObject.image.toString(),

    },
  });

  // const handleUploadFile = () => {
  //   inputRef.current?.click();
  // };

  // const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files) {
  //     setPreviewImg(URL.createObjectURL(e.target.files[0]));
  //     form.setValue('image', e.target.files[0].toString());

  //     console.log('IMAGE', previewImg);

  //   }
  // };
  // useEffect(() => {
  //   async function getImage() {
  //     form.getValues(originalObject.image);
  //     setPreviewImg(originalObject.image);
  //   }

  //   if (form.getValues(originalObject.image) !== "") {
  //     getImage();
  //   }
  // }, []);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("id", originalObject.id);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("rating", values.rating);

    // Conditionally append image data
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }
  
 
  
    try {
      const response = await fetch(`/api/products`, {
        method: "PUT",
        body: formData,
      });
      console.log(response);
      router.push("/admin");
      return;
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
      });
      console.error(error);
    }
  
    console.log(values);
  }
  
  return (
    <div>
      <div className="mb-2">Edit Produk</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Produk</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan nama produk" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Deskripsi</FormLabel>
                <FormControl>
                  {/* <Input placeholder="Enter your Description" {...field} /> */}
                  <Textarea
                    placeholder="Masukkan deskripsi produk"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Harga</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Masukkan harga" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating</FormLabel>
                <FormControl>
                  <Input type="number" readOnly placeholder="Masukkan rating" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div>
                    {[1, 2, 3, 4, 5].map((value) => (
                      <Button
                        defaultValue={field.value}
                        key={value}
                        type="button"
                        onClick={() => field.onChange(value.toString())}
                        style={{
                          marginRight: '5px',
                          background: field.value === value.toString() ? 'green' : 'black',
                          backgroundColor: field.value === value.toString() ? 'green' : 'black',
                        }}
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* <div className="inline-flex items-center gap-8">
            <div>
              {previewImg !== "" && (
                <Image
                  width={120}
                  height={120}
                  src={`/${previewImg}`}
                  alt={previewImg}
                />
              )}
            </div>
            <div
              className="px-10 py-6 border-2 border-dashed rounded-sm cursor-pointer border-bluePrimary w-max"
              onClick={handleUploadFile}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mx-auto mb-2 text-bluePrimary"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              <div className="text-center">
                <span className="font-medium text-bluePrimary">
                  Click to replace
                </span>{" "}
                <span className="text-gray-500">or drag and drop</span>
              </div>
              <div className="text-sm text-gray-600">
                PNG, JPG, JPEG (max. 400 x 400px)
              </div>
              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/jpg"
              />
            </div>
          </div> */}

          <FormField
            control={form.control}
            name="image"
            render={({ field: { ref, name, onBlur, onChange } }) => (
              <FormItem>
                <FormLabel>Pilih Gambar</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    placeholder="Pilih gambar"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      onChange(e.target.files?.[0]);
                      //setImagePreview(file ? URL.createObjectURL(file) : null);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

   

          <Button>Simpan</Button>
        </form>
      </Form>
    </div>
  );
};

export default Editpage;
