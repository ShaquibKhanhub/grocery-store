import { Button } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import Global from "./_utils/Global";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Footer from "./_components/Footer";

export default async function Home() {
  const categoryList = await Global.getCategoryList();
  const sliderList = await Global.getSlider();
  const productList = await Global.getAllProducts();
  return (
    <div className="p-5 md:p-10 px-16">
      {/* Slider */}
      <Slider sliderList={sliderList} />
      {/* CategoryList */}
      <CategoryList categoryList={categoryList} />

      {/* Product List */}
      <ProductList productList={productList} />

      {/* Banner */}
      <Image
        src={"/banner.png"}
        width={1000}
        height={300}
        alt="banner"
        className="w-full h-[400px] object-contain"
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
