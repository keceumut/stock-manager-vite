import { useQuery } from "@tanstack/react-query";
import { getProducts, getProduct } from "../Services/products";
import ProductList from "../Components/ProductList";
import { useParams } from "react-router-dom";
import AddProduct from "../Components/AddProduct";
import SpinnerLarge from "../Components/Spinner";

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
        <Spinner size={8} />
      </div>
    );
  if (status === "error") return <h1>{JSON.stringify(error)}</h1>;
  return (
    <div>
      <a href="/products">{"<Back"}</a>
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
            <td>{product.tags}</td>
          </tr>
          <tr>
            <th>Product Cost</th>
            <td>{product.cost}</td>
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
  );
}
