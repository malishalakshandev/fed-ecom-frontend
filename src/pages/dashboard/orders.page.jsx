import FullPageSpinner from "@/components/FullPageSpinner";
import { useGetOrdersQuery } from "@/lib/api";
import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useState } from "react";

const OrdersPage = () => {

    const { data: orders, isLoading, isError, error } = useGetOrdersQuery();
    const [ selectedOrder, setSelectedOrder ] = useState(null);
    const [ openDialog, setOpenDialog ] = useState(false);
    
    const handleViewOrderDetails = (order) => {
        setSelectedOrder(order);
        setOpenDialog(true);
    }
    
    if (isLoading) {
        return <FullPageSpinner />
    }

    console.log(orders);
    
    return(
        <section className="px-[64px] mt-[30px]">
            <h2 className="text-4xl font-bold">Orders</h2>

            <div className="mt-[40px]">
                <Table>
                    <TableHeader>
                        <TableRow>
                        <TableHead className="w-[100px]">#</TableHead>
                        <TableHead className="w-[100px]">Order Id</TableHead>
                        <TableHead className="w-[100px]">User Email</TableHead>
                        <TableHead className="text-center">Order Status</TableHead>
                        <TableHead className="text-center">Payment Method</TableHead>
                        <TableHead className="text-center">Created Date and Time</TableHead>
                        <TableHead className="text-center">Number of Items</TableHead>
                        <TableHead className="text-right">Order Amount ($)</TableHead>
                        <TableHead className="text-center">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {(orders || []).map((order, index) => (
                        <TableRow key={order._id} className="h-8">
                            <TableCell className="font-medium">{++index}</TableCell>
                            <TableCell className="font-medium">{order._id}</TableCell>
                            <TableCell className="font-medium">{order.userEmail}</TableCell>
                            <TableCell className="text-center">
                            <span
                                className={`px-2 py-1 rounded-full font-semibold text-[12px] ${
                                order.orderStatus === "PENDING" ? "bg-yellow-400 text-yellow-900" :
                                order.orderStatus === "FULFILLED" ? "bg-green-400 text-green-900" :
                                order.orderStatus === "SHIPPED" ? "bg-blue-400 text-blue-900" :
                                order.orderStatus === "CANCELLED" ? "bg-red-400 text-red-900" :
                                "bg-gray-300 text-gray-700"
                                }`}
                            >
                                {order.orderStatus}
                            </span>

                            </TableCell>
                            <TableCell className="text-center">
                            <span
                                className={`px-2 py-1 rounded-full font-semibold text-[12px] ${
                                order.paymentMethod === "CREDIT_CARD"
                                    ? "bg-purple-400 text-purple-900"
                                    : order.paymentMethod === "COD"
                                    ? "bg-orange-400 text-orange-900"
                                    : "bg-gray-300 text-gray-700"
                                }`}
                            >
                                {
                                order.paymentMethod === "CREDIT_CARD"
                                ? "CREDIT CARD"
                                : order.paymentMethod === "COD"
                                ? "COD"
                                : order.paymentMethod
                                }
                            </span>
                            </TableCell>
                            <TableCell className="text-center">{new Date(order.createdAt).toLocaleString()}</TableCell>
                            <TableCell className="text-center">{order.items.length}</TableCell>
                            <TableCell className="text-right">
                            {
                                order.items.reduce((total, item) => {
                                const price = item.productId.price || 0;
                                const quantity = item.quantity || 0;
                                return total + price * quantity;
                                }, 0).toFixed(2)
                            }
                            </TableCell>
                            <TableCell 
                            className="text-center"
                            onClick={ () => handleViewOrderDetails(order) }
                            >
                                <span className="bg-blue-400 px-[20px] py-[4px] rounded-2xl cursor-pointer font-semibold text-white hover:bg-blue-300">VIEW</span>
                            </TableCell>

                        </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* ✅ Dialog OUTSIDE the table */}
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogContent className="!max-w-[800px]">
                <DialogHeader>
                <DialogTitle>Order Details</DialogTitle>
                <DialogDescription>
                    Order ID: {selectedOrder?._id}
                </DialogDescription>
                </DialogHeader>

                {selectedOrder && (
                <div className="mt-4 space-y-3">
                    <p>
                    <strong>Status:</strong>
                    <span
                        className={`px-2 ml-2 py-1 rounded-full font-semibold text-[12px] ${
                        selectedOrder.orderStatus === "PENDING" ? "bg-yellow-400 text-yellow-900" :
                        selectedOrder.orderStatus === "FULFILLED" ? "bg-green-400 text-green-900" :
                        selectedOrder.orderStatus === "SHIPPED" ? "bg-blue-400 text-blue-900" :
                        selectedOrder.orderStatus === "CANCELLED" ? "bg-red-400 text-red-900" :
                        "bg-gray-300 text-gray-700"
                        }`}
                    >
                        {selectedOrder.orderStatus}
                    </span>
                    </p>
                    <p>
                    <strong>Payment:</strong>
                    <span
                        className={`px-2 ml-2 py-1 rounded-full font-semibold text-[12px] ${
                        selectedOrder.paymentMethod === "CREDIT_CARD"
                            ? "bg-purple-400 text-purple-900"
                            : selectedOrder.paymentMethod === "COD"
                            ? "bg-orange-400 text-orange-900"
                            : "bg-gray-300 text-gray-700"
                        }`}
                    >
                        {
                        selectedOrder.paymentMethod === "CREDIT_CARD"
                        ? "CREDIT CARD"
                        : selectedOrder.paymentMethod === "COD"
                        ? "COD"
                        : selectedOrder.paymentMethod
                        }
                    </span>
                    </p>
                    <p>
                    <strong>Created At:</strong>{" "}
                    {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>

                    <h3 className="font-semibold mt-4">Items:</h3>
                    <div className="border rounded-lg p-3 space-y-2 max-h-[250px] overflow-y-auto">
                    <table className="w-full">
                        <thead>
                        <tr>
                            <th className="border px-3 py-2 text-center">#</th>
                            <th className="border px-3 py-2 text-left">Product</th>
                            <th className="border px-3 py-2 text-center">Qty</th>
                            <th className="border px-3 py-2 text-right">Price ($)</th>
                            <th className="border px-3 py-2 text-right">Total Amount ($)</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            selectedOrder.items.map((item, i) => (
                            <tr key={item._id}>
                                <td className="border px-3 py-2 text-center">{++i}</td>
                                <td className="border px-3 py-2 text-left">{item.productId.name}</td>
                                <td className="border px-3 py-2 text-center">{item.quantity}</td>
                                <td className="border px-3 py-2 text-right">{item.productId.price.toFixed(2)}</td>
                                <td className="border px-3 py-2 text-right">{(item.productId.price * item.quantity).toFixed(2)}</td>
                            </tr>
                            ))
                        }
                        </tbody>
                    </table>
                    </div>

                    <div className="mt-4 font-bold text-right">
                    Grand Total: $ 
                    {
                        selectedOrder.items
                        .reduce((total, item) => total + (item.productId.price || 0) * (item.quantity || 0), 0)
                        .toFixed(2)
                    }
                    </div>
                </div>
                )}
            </DialogContent>
            </Dialog>

        </section>
    );
}

export default OrdersPage;