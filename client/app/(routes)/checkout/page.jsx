"use client";

import Global from "@/app/_utils/Global";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ArrowBigRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const Checkout = () => {
  const user = JSON.parse(sessionStorage.getItem("user"));
  const jwt = sessionStorage.getItem("jwt");
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [address, setAddress] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);

  const deliveryCharge = 15;
  const taxRate = 0.09;

  useEffect(() => {
    if (!jwt) {
      router.push("/sign-in");
    }
  }, [jwt, router]);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount;
    });

    const calculatedSubTotal = total.toFixed(2);
    setSubTotal(calculatedSubTotal);

    const calculatedTax = (total * taxRate).toFixed(2);
    const calculatedTotalAmount = (
      total +
      parseFloat(calculatedTax) +
      deliveryCharge
    ).toFixed(2);
    setTotalAmount(calculatedTotalAmount);
  }, [cartItemList]);

  const getCartItems = async () => {
    const cartItemList_ = await Global.getCartItem(user?.id, jwt);
    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const calculateTotalAmount = () => {
    const total = parseFloat(subTotal);
    const tax = total * taxRate;
    const totalAmount = total + tax + deliveryCharge;
    return totalAmount.toFixed(2);
  };

  const onApprove = (data) => {
    console.log(data);
    const payload = {
      data: {
        paymentId: data.paymentId,
        totalOrderAmount: totalAmount,
        username: username,
        email: email,
        phone: phone,
        zip: zip,
        address: address,
        orderItemList: cartItemList,
        userId: user.id,
      },
    };
    Global.createOrder(payload, jwt).then((res) => {
      toast("Order Places Successfully!");
      cartItemList.forEach((item, ind) => {
     
        Global.deleteCartItem(item.id,jwt).then((res) => {});
      });
      router.replace("/order-confirmation");
    });
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        Checkout
      </h2>
      <div className="p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-3 py-8">
        <div className="md:col-span-2 mx-20">
          <h2 className="font-bold text-3xl">Billing Details</h2>

          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Name"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-10 mt-3">
            <Input
              placeholder="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <Input placeholder="Zip" onChange={(e) => setZip(e.target.value)} />
          </div>

          <div className="mt-3">
            <Input
              placeholder="Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>

        <div className="mx-10 border">
          <h2 className="p-3 bg-gray-200 font-bold text-center">
            Total Cart ({totalCartItem})
          </h2>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="font-bold flex justify-between">
              Subtotal: <span>${subTotal}</span>
            </h2>
            <hr />

            <h2 className="flex justify-between">
              Delivery: <span>${deliveryCharge.toFixed(2)}</span>
            </h2>
            <h2 className="flex justify-between">
              Tax (9%):
              <span>${(parseFloat(subTotal) * taxRate).toFixed(2)}</span>
            </h2>
            <hr />
            <h2 className="font-bold flex justify-between">
              Total: <span>${totalAmount}</span>
            </h2>
            {/* <Button onClick={() => onApprove({ paymentId: 123 })}>
              Payment
            </Button> */}
            {totalAmount > 15 && (
              <PayPalButtons
                disabled={!(username && email && address && zip)}
                style={{ layout: "horizontal" }}
                onApprove={onApprove}
                createOrder={(data, actions) => {
                  const totalAmount = calculateTotalAmount();

                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: totalAmount,
                          currency_code: "USD",
                        },
                      },
                    ],
                  });
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
