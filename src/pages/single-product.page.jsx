import FullPageSpinner from "@/components/FullPageSpinner";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { useGetProductByIdQuery } from "@/lib/api";
import { addToCart } from "@/lib/features/cartSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";

const SingleProductPage = () => {

    const { productId } = useParams();
    const dispatch = useDispatch();

    console.log('productId:', productId);
    const { data: product, isLoading, isError, error } = useGetProductByIdQuery(productId);

    console.log('product:', product);

    if (isLoading) {
        return <FullPageSpinner />
    }

    return (
        <section className="grid grid-cols-1 px-[15px] mt-[50px] max-md:mt-[35px] md:px-[64px] md:grid-cols-2 md:gap-x-6">
            
            {/* product image */}
            <div className="flex justify-end overflow-hidden rounded-[20px] max-md:order-2 max-md:mt-[40px] max-md:justify-center">
                <img
                    src={product?.image}
                    alt="Product"
                    className="w-[600px] h-[700px] object-cover rounded-[20px]"
                />
            </div>
            
            {/* product information */}
            <div className="max-md:order-1">
                
                {/* breadcrumb */}
                <div>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/">Home</BreadcrumbLink>
                            </BreadcrumbItem>
                            
                            <BreadcrumbSeparator />
                            
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                            </BreadcrumbItem>
                            
                            <BreadcrumbSeparator />
                            
                            <BreadcrumbItem>
                                <BreadcrumbPage>{product?.name}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>

                {/* product details */}
                <h1 className="text-[30px] font-semibold mt-[20px]">{product?.name}</h1>
                <h1 className="text-[20px] font-semibold text-gray-400">{product?.categoryId.name}</h1>
                <p className="text-lg text-gray-500">{product?.description}</p>

                <hr className="my-4 border-t border-gray-200 w-[50%]" />

                <p className="text-[30px] text-gray-600 mt-[10px]">${product?.price?.toFixed(2)}</p>
                
                <div 
                    className="flex gap-4">
                    <span className="">Color: </span>
                    <div className="border-3 rounded-[50px] bg-gray-500 w-[25px] h-[25px]"  style={{ backgroundColor: product.colorId.colorHexCode }}></div>
                </div>

                <hr className="my-4 border-t border-gray-200 w-[50%]" />

                <Button
                    className={"h-[45px] px-[40px] rounded-[50px] cursor-pointer"} 
                    onClick={() => 
                    dispatch(
                        addToCart({
                            _id: product._id,
                            name: product.name, 
                            price: product.price,
                            image: product.image
                        })
                    )}>Add To Cart
                </Button>

            </div>
        </section>
    );

}

export default SingleProductPage;