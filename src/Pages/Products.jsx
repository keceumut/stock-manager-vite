import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "../Services/products";
import ProductList from "../Components/ProductList";
import { useParams } from "react-router-dom";
import AddProduct from "../Components/AddProduct";
import SpinnerLarge from "../Components/Spinner";
import Tag from '../Components/Tag'
export default function Products() {
  const {
    status,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () => getProducts({}),
  });

  if (status === "pending") return <SpinnerLarge />;
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  return (
    <>
      <div>
        <AddProduct />
      </div>
      <ProductList productList={products} />
    </>
  );
}

export function ShowProduct() {
  const { productId: pid } = useParams();
  const {
    status,
    error,
    data: product,
  } = useQuery({
    queryKey: ["product"],
    queryFn: () => getProduct(pid),
  });
  if (status === "pending")
    return (
      <div>
        <SpinnerLarge size={8} />
      </div>
    );
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  return (
    <div>
      <a href="/products">{"<Back"}</a>
      <div className="overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <table>
        <tbody>
          <tr>
            <th>Product Id</th>
            <td>{product.productId}</td>
          </tr>
          <tr>
            <th>Product Name</th>
            <td>{product.name}</td>
          </tr>
          <tr>
            <th>Product Tags</th>
            <td><div className='flex gap-1 items-center'>
                  {product.tags.length > 0 ? 
                  product.tags.map((tag, index) => {
                    return (<Tag key={index} tag={tag !== '' ? tag : null} type={'random'}/>)
                  }) : (
                    <button className='text-sm text-secondary-500/50 transition-colors hover:text-secondary-400'>+ Add tags</button>
                  )}
              </div></td>
          </tr>
          <tr>
            <th>Product Cost</th>
            <td>{product.cost ? product.cost : 'n/a'}</td>
          </tr>
          <tr>
            <th>Product Selling Price</th>
            <td>{product.salePrice}</td>
          </tr>
          <tr>
            <th>Product Stock</th>
            <td>{product.stock}</td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
  );
}
