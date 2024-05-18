"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";

const Slider = ({ sliderList }) => {
  // console.log(sliderList);
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 3000,
        }),
      ]}
    >
      <CarouselContent>
        {sliderList?.map((slider, ind) => {
          const iconUrl = slider?.attributes?.image?.data[0]?.attributes?.url;
          // console.log("url", iconUrl);
          const imageUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL + iconUrl;
          // console.log("Complete URL for category " + ind + ":", imageUrl);
          return (
            <CarouselItem key={ind}>
              <Image
                src={
                  process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
                  slider?.attributes?.image?.data[0]?.attributes?.url
                }
                width={1000}
                height={400}
                alt="slider"
                className="w-full h-[180px] md:h-[400px] object-cover rounded-2xl"
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default Slider;
