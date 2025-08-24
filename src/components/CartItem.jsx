import { Card } from "@/components/ui/card";

function CartItem({ item }) {
  return (
    <Card className="p-4">
      <div className="flex flex-col items-center md:flex-row space-x-4">
        <img
          // src={item.product.image || "/placeholder.svg"}
          src={item.product.image}
          alt={item.product.name}
          className="w-16 h-16 object-cover rounded"
        />
        <div className="flex-1">
          <p className="font-medium">{item.product.name}</p>
          <p className="text-muted-foreground">${item.product.price}</p>
          <p className="text-sm">Quantity: {item.quantity}</p>
        </div>
      </div>
    </Card>
  );
}

export default CartItem;