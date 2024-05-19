import Image from "next/image";
import Link from "next/link";
import React from "react";

const TopCategoryList = ({ categoryList, selectedCategory }) => {
  //   console.log(categoryList);
  return (
    <div className="flex gap-5 mt-2 overflow-auto mx-7 md:mx-20 justify-center">
      {categoryList.map((cat, ind) => (
        <Link
          href={`/products-category/${cat?.attributes?.name}`}
          className={` flex flex-col items-center bg-green-50 gap-2 p-3 rounded-lg  group cursor-pointer
   hover:bg-green-200  w-[150px] min-w-[100px]
${selectedCategory === cat.attributes.name && "bg-green-600 text-white"}
    `}
        >
          <Image
            src={
              process.env.NEXT_PUBLIC_BACKEND_BASE_URL +
              cat?.attributes?.icon?.data[0]?.attributes?.url
            }
            alt="icon"
            width={50}
            height={50}
            className="group-hover:scale-125 transition-all ease-in-out"
          />
          <h2
            className={`text-green-800 group-hover:text-white ${
              selectedCategory === cat.attributes.name &&
              " text-white"
            } `}
          >
            {cat.attributes.name}
          </h2>
        </Link>
      ))}
    </div>
  );
};

export default TopCategoryList;
