import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

// We wanna have that loading component only in the section where we are fetching the products, fort that we need to invoke the fetch only in FeaturedProducts component and not here
const HomePage = () => {
  return(
    <>
      <Hero/>
      <Suspense fallback={<LoadingContainer/>}>
        <FeaturedProducts/>
      </Suspense>
    </>
  )
};
export default HomePage;
