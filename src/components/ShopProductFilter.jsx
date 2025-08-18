import z from "zod";
import { Form, FormField, FormItem, FormLabel } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";


const filterProductFormSchema = z.object({
  categorySlug: z.string().min(1),
  colorId: z.string().min(1),
  priceSort: z.string().min(1),
});

const ShopProductFilter = ({ categories, colors, filterValues, onFilterValuesChange }) => {

    // Filter Product form
    const filterProductForm = useForm({
        resolver: zodResolver(filterProductFormSchema),
        defaultValues: { ...filterValues }
    });

    // Sync form values when filterValues prop changes
    useEffect(() => {
        filterProductForm.reset({ ...filterValues });
    }, [filterValues]);
    
    return(
        <Form {...filterProductForm}>
            <form>
                <div className="flex gap-2 justify-end">
                    {/* filter by category */}
                    <div className="">
                        <FormField
                            control={filterProductForm.control}
                            name="categorySlug"
                            render={({ field }) => (
                                <FormItem>
                                {/* <FormLabel>Product Colour</FormLabel> */}
                                    <Select 
                                        value={field.value} // 5. set final value to this select to sync properly with form values
                                        onValueChange={(value) => { // trigger when use change value
                                            field.onChange(value); // 1. update local form state
                                            onFilterValuesChange({  // 4. notify parent immediately 
                                                [field.name]: value // 2. send only the changed field
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter by category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>All Categories</SelectItem>
                                            {categories?.map((category) => (
                                                <SelectItem key={category._id} value={category.slug}>
                                                {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>    
                    
                    {/* filter by color */}
                    <div className="">
                        <FormField
                            control={filterProductForm.control}
                            name="colorId"
                            render={({ field }) => (
                                <FormItem>
                                {/* <FormLabel>Product Colour</FormLabel> */}
                                    <Select 
                                        value={field.value} // 5. set final value to this select to sync properly with form values
                                        onValueChange={(value) => { // trigger when use change value
                                            field.onChange(value);  // 1. update local form state
                                            onFilterValuesChange({  // 4. notify parent immediately
                                                [field.name]: value // 2. send only the changed field
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Filter by color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>All Colors</SelectItem>
                                            {colors?.map((color) => (
                                                <SelectItem key={color._id} value={color._id} className="flex items-center gap-2">
                                                    <span>{color.colorName}</span> 
                                                    <div className="border-3 rounded-[50px] bg-gray-500 w-[25px] h-[25px]"  style={{ backgroundColor: color.colorHexCode }}></div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* filter by price     */}
                    <div className="">
                        <FormField
                            control={filterProductForm.control}
                            name="priceSort"
                            render={({ field }) => (
                                <FormItem>
                                {/* <FormLabel>Product Colour</FormLabel> */}
                                    <Select 
                                    value={field.value} // 5. set final value to this select to sync properly with form values
                                        onValueChange={(value) => { // trigger when use change value
                                            field.onChange(value); // 1. update local form state
                                            onFilterValuesChange({  // 4. notify parent immediately
                                                [field.name]: value // 2. send only the changed field
                                            });
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Sort by price" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value={null}>Default</SelectItem>
                                            <SelectItem value="asc">Low - High</SelectItem>
                                            <SelectItem value="desc">High - Low</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
            </form>
        </Form>
    );

}

export default ShopProductFilter;