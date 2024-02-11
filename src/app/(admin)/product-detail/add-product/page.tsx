/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React, { FC, useState } from 'react'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from '@/components/ui/use-toast';
import { fromTheme } from 'tailwind-merge';
import { log } from 'console';
interface AddProductPageProps {

}



const page: FC<AddProductPageProps> = ({ }) => {
    const router = useRouter();
    
    const formSchema = z.object({
        name: z.string({ required_error: "name required" }),
        description: z.string({required_error:"description required"}),
        price: z.string({required_error:"price required"}),
        rating: z.string({required_error:"rating required"}),
        image: z
            .custom<File>((v) => v instanceof File, {
                message: 'Image is required',
            }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });


    const [isLoading, setIsLoading] = useState(false);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("price", values.price);
        formData.append("rating", values.rating);
        formData.append("image", values.image);


        try {
            setIsLoading(true);
            const response = await fetch(`/api/products`, {
                method: "POST",
                body: formData,
            });
            console.log(response);
            router.push('/admin')
            return;


        } catch (error) {
            setIsLoading(false);
            toast({
                title: "Error",
                description: "An unexpected error occurred. Please try again.",

            });
            console.error(error);
        }

        console.log(values);

    };


    return (
        <div>
            <div className='mb-2'>Tambah Product</div>
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
                                    <Textarea placeholder="Masukkan deskripsi produk" {...field} />
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
                                    <Input type='number' placeholder="Masukkan harga" {...field} />
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
                                    <Input readOnly type='number' placeholder="Masukkan rating" {...field} max={5} min={0} maxLength={1}/>
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
                                                key={value}
                                                type="button"
                                                onClick={() => field.onChange(value.toString())}
                                                style={{
                                                    marginRight: '5px',
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



                    <FormField
                        control={form.control}
                        name="image"
                        render={({ field: { ref, name, onBlur, onChange } }) => (
                            <FormItem>
                                <FormLabel>Pilih gambar</FormLabel>
                                <FormControl>
                                    <Input type='file' placeholder="Pilih gambar" onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        onChange(e.target.files?.[0]);
                                        //setImagePreview(file ? URL.createObjectURL(file) : null);
                                    }} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


              

                    <Button>
                        Simpan
                    </Button>

                </form>
            </Form>
        </div>
    )
}

export default page;