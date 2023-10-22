export default function ProductList({ productList }) {
  return (
    <>
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
      </table>
      <tbody>
        {productList?.map((product) => {
          return (
            <tr key={product.productId}>
              <td>{product.productId}</td>
              <td>{product.name}</td>
              <td>{product.tags}</td>
              <td>{product.cost}</td>
              <td>{product.salePrice}</td>
              <td>{product.stock}</td>
              <td>
                <a href={`/products/${product.productId}`}>Details</a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </>
  );
}
