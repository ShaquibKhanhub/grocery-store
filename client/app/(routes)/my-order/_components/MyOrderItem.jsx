import Image from "next/image";
import React from "react";

const MyOrderItem = ({ order_ }) => {
  //   console.log(order_);

  return (
    <div className="w-[60%]">
      <div className="grid grid-cols-5  mt-3 items-center ">
        <Image
          src={
            process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
            order_.product.data.attributes.images.data[0].attributes.url
          }
          width={80}
          height={80}
          alt="image"
          className="bg-gray-100 p-6 rounded-md border"
        />
        <div className="col-span-2">
          <h2>{order_.product.data.attributes.name}</h2>
          <h2>Item Price : ${order_.product.data.attributes.mrp}</h2>
        </div>
        <h2>Quantity: {order_.quantity}</h2>
        <h2>Price: {order_.amount}</h2>
      </div>
      <hr className="mt-3" />
    </div>
  );
};

export default MyOrderItem;
