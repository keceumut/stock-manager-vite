import Tag from "../Components/Tag";
import { BiChevronRight } from "react-icons/bi";
export default function ProductList({ productList }) {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table>
        <thead>
          <tr>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Tags</th>
            <th>Cost</th>
            <th>Selling Price</th>
            <th>Stock</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {productList?.map((product) => {
            return (
              <tr key={product.productId}>
                <td className="whitespace-nowrap">{product.productId}</td>
                <td>{product.name}</td>
                <td>
                  <div className="flex gap-1 items-center">
                    {product.tags.length > 0 ? (
                      product.tags.map((tag, index) => {
                        return (
                          <Tag
                            key={index}
                            tag={tag !== "" ? tag : null}
                            type={"random"}
                            productPage={false}
                          />
                        );
                      })
                    ) : (
                      <button className="text-sm text-secondary-500/50 transition-colors hover:text-secondary-400">
                        + Add tags
                      </button>
                    )}
                  </div>
                </td>
                <td>{product.purchasePrice ? product.purchasePrice : "n/a"}</td>
                <td>{product.salePrice}</td>
                <td>{product.stock}</td>
                <td className="whitespace-nowrap text-contrast-700">
                  <a
                    href={`/products/${product.productId}`}
                    className="hover:text-accent-500"
                  >
                    Details{" "}
                    <BiChevronRight className="inline my-auto" size={16} />
                  </a>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
