import Category from "@/components/Category";
import PageSelector from "@/components/PageSelector";
import { Suspense } from "react";

const ProductPage = async () => {
  return (
    <Suspense>
      <Category />
      <PageSelector />
    </Suspense>
  );
};
export default ProductPage;
