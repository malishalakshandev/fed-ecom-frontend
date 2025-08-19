import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useCreateOrderMutation } from "@/lib/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const shippingAddressFormSchema = z.object({
  line_1: z.string().min(1).max(50),
  line_2: z.string().min(1).max(50).optional(),
  city: z.string().min(1).max(50),
  phone: z.string().min(1).max(15),
});

function ShippingAddressForm() {

  const form = useForm({
    resolver: zodResolver(shippingAddressFormSchema),
    defaultValues: {
      line_1: "",
      line_2: "",
      city: "",
      phone: "",
    },
  });

  const cart = useSelector((state) => state.cart.cartItems);
  
  const [ createOrder, { isLoading }] = useCreateOrderMutation();
  const navigate = useNavigate();

  async function onSubmit(values) {
    try {
      const response = await createOrder({
        shippingAddress: values,
        orderItems: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      }).unwrap();

      navigate(`/shop/payment?orderId=${response.orderId}`);

    } catch (error) {
      console.log(error);
    }
  }


  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-6">
          <FormField
            control={form.control}
            name="line_1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 1</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: 13 A Main street" {...field} />
                </FormControl>
                <FormDescription>
                  This is the address line 1
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="line_2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address Line 2</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Main road" {...field} />
                </FormControl>
                <FormDescription>
                  This is the address line 2
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Colombo" {...field} />
                </FormControl>
                <FormDescription>
                  This is the city
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: +94771234567" {...field} />
                </FormControl>
                <FormDescription>
                  This is the phone number
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </Form>
  );

}

export default ShippingAddressForm;