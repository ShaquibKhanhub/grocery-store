"use client";
import Global from "@/app/_utils/Global";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import moment from "moment";
import MyOrderItem from "./_components/MyOrderItem";

const MyOrder = () => {
  const jwt = sessionStorage.getItem("jwt");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const router = useRouter();
  const [order, setOrder] = useState([]);
  useEffect(() => {
    if (!jwt) router.replace("/");
    getMyOrder();
  }, []);

  const getMyOrder = async () => {
    const orderList = await Global.getMyOrder(user.id, jwt);
    setOrder(orderList);
    console.log(orderList);
  };

  return (
    <div>
      <h2 className="p-3 bg-primary text-xl font-bold text-center text-white">
        My Order
      </h2>
      <div className="py-8 mx-7 md:mx-20">
        <h2 className="text-3xl font-bold text-primary">Order History</h2>
        <div>
          {order.map((item, ind) => (
            <Collapsible key={ind} className="mt-2 ">
              <CollapsibleTrigger>
                <div className="border p-2 bg-slate-100 flex justify-evenly gap-24 w-full">
                  <h2>
                    <span className="font-bold mr-2"> Order Date:</span>
                    {moment(item?.createdAt).format("DD/MM/YYYY")}
                  </h2>
                  <h2>
                    <span className="font-bold mr-2">Total Amount :</span>
                    {item.totalOrderAmount}
                  </h2>

                  <h2>
                    <span className="font-bold mr-2"> Status :</span>
                    {item?.status}
                  </h2>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {item.orderItemList.map((order_, index) => (
                  <MyOrderItem key={index} order_={order_} />
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrder;
