import { useGetAllCategoriesQuery, useGetAllColorsQuery, useGetFilteredProductsQuery } from "@/lib/api";
import { useParams } from "react-router";
import FullPageSpinner from "./FullPageSpinner";
import SimpleProductCard from "./SimpleProductCard";
import { Button } from "./ui/button";
import BasicProductCard from "./BasicProductCard";
import ShopProductFilter from "./ShopProductFilter";
import { useEffect, useState } from "react";

const ShopProducts = () => {

    const { categorySlug: navigationCategorySlug } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    
    const [ filterValues, setFilterValues ] = useState({
        categorySlug: navigationCategorySlug || "",
        colorId: "",
        priceSort: ""
    });

    const { data: categories, isLoading: isCategoriesLoading } = useGetAllCategoriesQuery();
    const { data: colors, isLoading: isColorsLoading } = useGetAllColorsQuery();
    const { data: productsResponse, isLoading: isProductsLoading, isError, error } = useGetFilteredProductsQuery({
            ...filterValues,
            page: currentPage,
            limit: 12
        },
        // { skip: !filterValues.categorySlug } // don’t fetch until ready
    );

    console.log('initialCategorySlug:', navigationCategorySlug);
    console.log('filterValues:', filterValues);
    console.log('productsResponse:', productsResponse);
    
    //when user clicks a category in navigation, reset other filters
    useEffect(() => {
        setFilterValues({
            categorySlug: navigationCategorySlug || "",
            colorId: "",
            priceSort: ""
        })
        setCurrentPage(1);
    },[navigationCategorySlug]);

    const handleFilterValuesChange = (newFormValues) => {
        setFilterValues((prev) => ({
            ...prev,            // get old filter values
            ...newFormValues    // update only changed values
        }));
        setCurrentPage(1); // reset page
    }

    const products = productsResponse?.data || [];
    const totalPages = productsResponse?.totalPages || 1;

    if (isProductsLoading || isCategoriesLoading || isColorsLoading) {
        return <FullPageSpinner />
    }
    
    return (
        <section
            className="my-[50px]"
        >

            {/* product filter & sort */}
            <ShopProductFilter 
                categories={categories} 
                colors={colors}
                filterValues={filterValues}
                onFilterValuesChange={handleFilterValuesChange} // pass callback
            />    

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4 md:gap-x-4 md:gap-y-12">
            {
            
                products.map((product) => {
                    return <BasicProductCard key={product._id} product={product} />
                })

            }
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center gap-2 mt-[50px]">
                <button
                    className={`py-[5px] px-[25px] text-white rounded-[20px] hover:cursor-pointer disabled:cursor-not-allowed
                        ${currentPage === 1 
                            ? "bg-[#9c9c9c] cursor-not-allowed" 
                            : "bg-[#171717] hover:bg-[#393939]"}`
                    }
                    disabled={currentPage === 1 || isProductsLoading} 
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                    Prev
                </button>

                <span className="px-[10px] flex justify-center items-center">{currentPage} / {totalPages}</span>

                <button
                    className={`py-[5px] px-[25px] text-white rounded-[20px] hover:cursor-pointer disabled:cursor-not-allowed
                        ${currentPage === totalPages 
                            ? "bg-[#9c9c9c] cursor-not-allowed" 
                            : "bg-[#171717] hover:bg-[#393939]"}`
                    }
                    disabled={currentPage === totalPages || isProductsLoading} 
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>



        </section>
    );
}

export default ShopProducts;