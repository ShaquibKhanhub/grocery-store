"use client";

import Global from "@/app/_utils/Global";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2Icon, LoaderIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loader, setLoader] = useState(false);
  const router = useRouter();

  // if user is already sigIn redirect to homepage
  useEffect(() => {
    const jwt = sessionStorage.getItem("jwt");
    if (jwt) router.push("/");
  }, []);

  const onSignIn = () => {
    setLoader(true);
    Global.signIn(email, password).then(
      (res) => {
        const user = res.data.user;
        const jwt = res.data.jwt;

        sessionStorage.setItem("user", JSON.stringify(user));
        sessionStorage.setItem("jwt", jwt);
        toast("Login Successfully");
        router.push("/");
        setLoader(false);
      },
      (e) => {
        console.log(e);

        toast(e?.response?.data?.error?.message);
        setLoader(false);
      }
    );
  };
  return (
    <div className="flex items-baseline justify-center my-20">
      <div className="flex flex-col items-center justify-center p-10 bg-slate-100 border-gray-200">
        <Image src={"/logo.png"} width={200} height={200} alt="logo" />
        <h2 className="font-bold text-3xl">Sign In to Account</h2>
        <h2 className="text-gray-500">
          Enter your Email and Password to Sign In
        </h2>
        <div className=" flex flex-col w-full gap-5 mt-7">
          <Input
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className=""
          />
          <Input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            className=""
            type="password"
          />
          <Button disabled={!(email || password)} onClick={() => onSignIn()}>
            {loader ? <LoaderIcon className="animate-spin" /> : "Sign In"}
          </Button>
          <p>
            Don't have an account ?{" "}
            <Link href={"/create-account"} className="text-blue-500">
              Click here to create new account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
