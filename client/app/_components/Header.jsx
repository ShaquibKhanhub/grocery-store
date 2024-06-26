"use client";

import { Button } from "@/components/ui/button";
import {
  CircleUserRound,
  LayoutGrid,
  LogOut,
  LogOutIcon,
  Search,
  ShoppingBag,
  ShoppingBasket,
} from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import Global from "../_utils/Global";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UpdateCartContext } from "../_context/UpdateCartContext";
import CartItemList from "./CartItemList";
import { toast } from "sonner";

const Header = () => {
  let user;
  let jwt;
  const { updateCart, setUpdateCart } = useContext(UpdateCartContext);
  const [categoryList, setCategoryList] = useState([]);
  const isLogged = sessionStorage.getItem("jwt") ? true : false;
  const router = useRouter();
  const [totalCartItem, setTotalCartItem] = useState(0);
  const [cartItemList, setCartItemList] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    cartItemList.forEach((item) => {
      total += item.amount;
    });
    setSubTotal(total.toFixed(2));
  }, [cartItemList]);
  /**
   * Get Category List
   */

  const getCategoryList = () => {
    Global.getCategory().then((res) => setCategoryList(res.data.data));
  };
  useEffect(() => {
    getCategoryList();
  }, []);

  useEffect(() => {
    getCartItems();
  }, [updateCart]);

  const onSignOut = () => {
    sessionStorage.clear();
    router.push("/sign-in");
  };

  /**
   *  Used to get Total Cart Item
   */
  const getCartItems = async () => {
    const cartItemList_ = await Global.getCartItem(user?.id, jwt);

    setTotalCartItem(cartItemList_?.length);
    setCartItemList(cartItemList_);
  };

  const onDeleteItem = (id) => {
    Global.deleteCartItem(id, jwt).then((res) => {
      toast("item removed!");
      getCartItems();
    });
  };

  if (typeof window !== "undefined") {
    user = window.JSON.parse(sessionStorage.getItem("user"));
  }

  if (typeof window !== "undefined") {
    jwt = window.sessionStorage.getItem("jwt");
  }

  return (
    <div className="p-5 shadow flex justify-between">
      <div className="flex items-center gap-8 ">
        <Link href="/" passHref>
          <Image
            src="/logo.png"
            alt="logo"
            width={150}
            height={100}
            className="cursor-pointer"
          />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <h2 className="hidden md:flex gap-2 items-center border rounded-full p-2 px-10 bg-slate-200 cursor-pointer">
              <LayoutGrid className="h-5 w-5" /> Category
            </h2>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Browse Category</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {categoryList?.map((cat, ind) => {
              const iconUrl = cat?.attributes?.icon?.data[0]?.attributes?.url;
              // console.log("url", iconUrl);
              const imageUrl =
                process.env.NEXT_PUBLIC_BACKEND_BASE_URL + iconUrl;
              // console.log("Complete URL for category " + ind + ":", imageUrl);
              return (
                <Link
                  href={`/products-category/${cat?.attributes?.name}`}
                  key={ind}
                >
                  <DropdownMenuItem
                    key={ind}
                    className="flex gap-4 items-center cursor-pointer"
                  >
                    <Image
                      src={imageUrl}
                      unoptimized={true}
                      alt="icon"
                      width={30}
                      height={30}
                    />
                    <h2 className="text-lg">{cat?.attributes?.name}</h2>
                  </DropdownMenuItem>
                </Link>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="md:flex gap-3 items-center border rounded-full p-2 px-5 hidden">
          <Search />
          <input type="text" placeholder="Search" className="outline-none " />
        </div>
      </div>
      <div className="flex gap-5 items-center">
        <Sheet>
          <SheetTrigger>
            <h2 className="flex gap-2 items-center text-lg">
              <ShoppingBasket size={27} />
              <span className="bg-primary text-white px-2 rounded-full">
                {totalCartItem}
              </span>
            </h2>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="bg-primary text-white font-bold text-lg p-2">
                My Cart
              </SheetTitle>
              <SheetDescription>
                <CartItemList
                  cartItemList={cartItemList}
                  onDeleteItem={onDeleteItem}
                />
              </SheetDescription>
            </SheetHeader>
            <SheetClose asChild>
              <div
                className="absolute w-[90%] bottom-6 flex flex-col 
       "
              >
                <h2 className="text-lg font-bold flex justify-between">
                  SubTotal <span>${subTotal}</span>
                </h2>
                <Button
                  onClick={() => router.push(jwt ? "/checkout" : "/sign-in")}
                >
                  Checkout
                </Button>
              </div>
            </SheetClose>
          </SheetContent>
        </Sheet>

        {!isLogged ? (
          <Link href={"/sign-in"}>
            <Button>Login</Button>
          </Link>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CircleUserRound className="h-11 w-11 bg-green-100 text-primary rounded-full p-2 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <Link href={"/my-order"}>
                <DropdownMenuItem>My Order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <LogOutIcon
                  className="cursor-pointer"
                  onClick={() => onSignOut()}
                  size={23}
                />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </div>
  );
};

export default Header;
