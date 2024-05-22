"use client";

import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const CartItemList = ({ cartItemList, onDeleteItem }) => {
  //   console.log(cartItemList);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount * item.quantity;
    });
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);
  return (
    <div>
      <div className="h-[550px] overflow-auto">
        {cartItemList.map((item, ind) => (
          <div className="flex justify-between items-center p-2 mb-5">
            <div className="flex gap-6 items-center">
              <Image
                src={process.env.NEXT_PUBLIC_BACKEND_BASE_URL + item.image}
                width={90}
                height={90}
                alt={item.name}
                className="border p-2 object-contain"
              />
              <div>
                <h2 className="font-bold">{item.name}</h2>
                <h2>{item.quantity}</h2>
                <h2 className="text-lg font-bold">${item.amount}</h2>
              </div>
            </div>
            <TrashIcon
              className="  cursor-pointer"
              onClick={() => onDeleteItem(item.id)}
            />
          </div>
        ))}
      </div>

      <div
        className="absolute w-[90%] bottom-6 flex flex-col 
       "
      >
        <h2 className="text-lg font-bold flex justify-between">
          SubTotal <span>${subTotal}</span>
        </h2>
        <Button>View Cart</Button>
      </div>
    </div>
  );
};

export default CartItemList;
