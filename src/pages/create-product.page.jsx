import CreateProductForm from "@/components/CreateProductForm";
import FullPageSpinner from "@/components/FullPageSpinner";
import { Button } from "@/components/ui/button";
import { useGetAllCategoriesQuery, useGetAllColorsQuery } from "@/lib/api";
import { useMemo } from "react";

function CreateProductPage() {

    const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
    const { data: colors, isLoading: isColorsLoading, refetch: refetchColors } = useGetAllColorsQuery();

    const memoCategories = useMemo(() => {
        console.log("memoCategories recalculated");
        return categories || [];
    }, [categories]);

    const memoColors = useMemo(() => {
        console.log("memoColors recalculated");
        return colors || [];
    }, [colors]);

    if (isCategoriesLoading || isColorsLoading) {
        return <FullPageSpinner />
    }


    return (
        <main className="px-16 min-h-screen py-8">
           <h2 className="text-4xl font-bold">Create Product</h2>
            <CreateProductForm categories={memoCategories} colors={memoColors} refetchColors={refetchColors} />
        </main>
    );
}

export default CreateProductPage;