import ProductsContainer from "@/components/products/ProductsContainer";

//searchParams is a special prop we have access to in server components, it helps us get the search params as object
function ProductsPage({searchParams}:{searchParams:{layout?:string; search?:string}}) {
  // console.log(searchParams); 

  const layout = searchParams.layout || 'grid';
  const search = searchParams.search || '';

  return (
    <ProductsContainer layout={layout} search={search} />
  )
}
export default ProductsPage