import { addToCart } from "@/lib/features/cartSlice";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const BasicProductCard = (props) => {


    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleOpenSingleProductPage = (productId) => {
        navigate(`/shop/products/${productId}`);
    }

    return(
        <>
            {/* product item card */}
            <div className="border rounded-2xl pb-3">
                {/* product image (clickable) */}
                <div 
                    className="h-64 sm:h-72 md:h-80 lg:h-96 hover:cursor-pointer"
                    onClick={() => handleOpenSingleProductPage(props.product._id)}>
                    <img
                        src={props.product.image}
                        alt={props.product.name}
                        className="rounded-2xl w-full h-full object-cover"
                    />
                </div>

                {/* product details */}
                <div className="mt-2 mx-[8px]">
                    {/* product name and color */}
                    <div className="flex justify-between items-center">
                        <div className="flex-3">
                            <span className="text-lg sm:text-[20px] md:text-[22px] lg:text-[23px]">{props.product.name}</span>
                        </div>
                        <div className="flex flex-1 justify-end gap-x-1">
                            <div className="border-3 rounded-[50px] bg-gray-500 w-[25px] h-[25px]"  style={{ backgroundColor: props.product.colorId.colorHexCode }}></div>
                        </div>
                    </div>

                    {/* product price */}
                    <div className="flex justify-between items-center">
                        <div className="flex-1">
                            <span className="text-base sm:text-lg md:text-xl">${props.product.price}</span>
                        </div>
                    </div>

                

                    {/* add to cart button */}
                    <div className="mt-2">
                        <Button 
                            className={"w-full rounded-2xl cursor-pointer"} 
                            onClick={() => 
                            dispatch(
                                addToCart({
                                    _id: props.product._id,
                                    name: props.product.name, 
                                    price: props.product.price,
                                    image: props.product.image
                                })
                            )}>Add To Cart
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );

}

export default BasicProductCard;

