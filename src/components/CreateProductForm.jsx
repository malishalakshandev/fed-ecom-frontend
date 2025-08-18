import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

import { Input } from "./ui/input";
import { Button } from "./ui/button";

import { useCreateColorMutation, useCreateProductMutation, useGetAllColorsQuery } from "@/lib/api";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import ImageInput from "./ImageInput";
import { memo, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { Textarea } from "./ui/textarea";

const createProductFormSchema = z.object({
  categoryId: z.string().min(1),
  colorId: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(5).max(100),
  image: z.string().min(1),
  stock: z.number(),
  price: z.number().nonnegative(),
});

const createColorFormSchema = z.object({
  colorName: z.string().min(1, "Color name is required"),
  colorHexCode: z
    .string()
    .min(1, "Please pick a color")
    .regex(/^#([0-9A-Fa-f]{6})$/, "Invalid color format"), // Only valid hex codes
});

function CreateProductForm({ categories , colors, refetchColors }) {

    // Product form
    const form = useForm({
        resolver: zodResolver(createProductFormSchema),
        defaultValues: {
            categoryId: "",
            colorId: "",
            name: "",
            description: "",
            image: "",
            stock: "",
            price: "",
        },
    });

     // Color form (for dialog)
    const colorForm = useForm({
        resolver: zodResolver(createColorFormSchema),
        defaultValues: {
        colorName: "",
        colorHexCode: "", // empty until user picks
        },
    });

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [createProduct, { isLoading: isCreatingProduct, isSuccess: isProductCreated, isError: isProductError, error: productError }] = useCreateProductMutation();
    const [createColor, { isLoading: isCreatingColor, isSuccess: isColorCreated, isError: isColorError, error: colorError  }] = useCreateColorMutation();


    const onSubmit = async (values) => {
        
        try {
            // console.log(values);
            const result = await createProduct(values).unwrap();
            toast.success(result.message);
            form.reset();
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    const handleColorFormCancel = () => {
        colorForm.reset();
    }

    const onSubmitColor = async (values) => {
        try {
            const result = await createColor(values).unwrap();
            toast.success(result.message);
            colorForm.reset();
            setIsDialogOpen(false);
            refetchColors();
        } catch (error) {
            toast.error(error.data.message);
        }
    };

    return(
        
        <>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 mt-4 w-1/4">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Category</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                    {categories?.map((category) => (
                                        <SelectItem key={category._id} value={category._id}>
                                        {category.name}
                                        </SelectItem>
                                    ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-end gap-4">
                            {/* select color dropdown */}
                            <div>
                                <FormField
                                    control={form.control}
                                    name="colorId"
                                    render={({ field }) => (
                                        <FormItem>
                                        <FormLabel>Product Colour</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a colour" />
                                            </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                            {colors?.map((color) => (
                                                <SelectItem key={color._id} value={color._id} className="flex items-center gap-2">
                                                    <span>{color.colorName}</span> 
                                                    <div 
                                                        className="w-6 h-4 rounded border" 
                                                        style={{ backgroundColor: color.colorHexCode }} // dynamic hex color
                                                    />
                                                </SelectItem>
                                            ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            {/* add new color */}
                            <div>
                                {/* Button to open dialog */}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsDialogOpen(true)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-plus-icon lucide-circle-plus"><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                                    Add new
                                </Button>
                            </div>
                        </div>

                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Product Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Denim" {...field} />
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
                                <FormLabel>Product Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Enter product description" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Image</FormLabel>
                                <FormControl>
                                    <ImageInput onChange={field.onChange} value={field.value} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="stock"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Stock</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        placeholder="Enter stock quantity"
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(parseInt(e.target.value) || 0);
                                        }}
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
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input 
                                        type="number" 
                                        step="0.01" 
                                        placeholder="Enter product price" 
                                        {...field}
                                        onChange={(e) => {
                                            field.onChange(parseInt(e.target.value) || 0);
                                        }} 
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div>
                            <Button type="submit">Create Product</Button>
                        </div>

                </form>
            </Form>

            {/* Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new colour</DialogTitle>
                    <DialogDescription>
                    Add new color to list
                    </DialogDescription>
                </DialogHeader>

                <Form {...colorForm}>
                    <form onSubmit={colorForm.handleSubmit(onSubmitColor)} className="space-y-4">
                    <FormField
                        control={colorForm.control}
                        name="colorName"
                        render={({ field }) => (
                        <FormItem>
                            <FormLabel>Color Name</FormLabel>
                            <FormControl>
                            <Input placeholder="e.g. Sky Blue" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                        )}
                    />

                    {/* Color Picker */}
                    <FormField
                    control={colorForm.control}
                    name="colorHexCode"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Pick a Color</FormLabel>
                        <FormControl>
                            <input
                            type="color"
                            {...field}
                            className="h-10 w-16 p-1 border rounded"
                            />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />

                    <DialogFooter>
                        <DialogClose asChild>
                        <Button type="button" variant="outline" onClick={handleColorFormCancel}>
                            Cancel
                        </Button>
                        </DialogClose>
                        <Button type="submit" disabled={isCreatingColor}>
                            { isCreatingColor ? "Saving..." : "Save" }
                        </Button>
                    </DialogFooter>
                    </form>
                </Form>


                </DialogContent>
            </Dialog>

        </>
    );
}

export default memo(CreateProductForm);