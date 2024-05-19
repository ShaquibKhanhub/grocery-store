import Global from "@/app/_utils/Global";
import React from "react";
import TopCategoryList from "../_components/TopCategoryList";
import ProductList from "@/app/_components/ProductList";

const ProductCategory = async ({ params }) => {
  const categoryList = await Global.getCategoryList();
  const productList = await Global.getProductsByCategory(params.categoryName);
//   console.log(productList);
  return (
    <div>
      <h2 className="p-4 bg-primary text-white font-bold text-3xl text-center">
        {params.categoryName}
      </h2>
      <TopCategoryList categoryList={categoryList} selectedCategory={params.categoryName} />
    <div className="p-5 md:p-10">
    <ProductList productList={productList} />
    </div>
    </div>
  );
};

export default ProductCategory;
