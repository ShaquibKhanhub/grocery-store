import React from "react";
import ProductItem from "./ProductItem";
const ProductList = ({ productList }) => {
  // console.log(productList);
  return (
    <div className="mt-10">
      <h2 className="text-green-600 font-bold text-2xl">
        Our Popular Products
      </h2>
      <div className=" grid  grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-6 grid-cols-1-mobile">
        {productList?.map(
          (product, ind) =>
            ind <= 8 && <ProductItem key={ind} product={product} />
        )}
      </div>
    </div>
  );
};

export default ProductList;
