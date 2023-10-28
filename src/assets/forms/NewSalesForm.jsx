import { useForm } from "react-hook-form";
import Calendar from "../../Components/Calendar";
import SearchDropdown from "../../Components/SearchDropdown";
import { useEffect, useState } from "react";

export default function NewSalesForm({ customerList, productList, onSubmit }) {
  const { register, unregister, handleSubmit, getValues, setValue, watch } =
    useForm();
  const customerOptions = [];
  const productOptions = [];
  const [productInputs, setProductInputs] = useState([]);
  const [totalSum, setTotalSum] = useState(0);
  const watchField = watch();
  productList?.forEach((item) => {
    productOptions.push({ value: item, label: item.name });
  });
  customerList?.forEach((item) => {
    customerOptions.push({ value: item, label: item.name || item.firmName });
  });

  useEffect(() => {
    let sum = 0;
    watchField.items?.forEach((item) => {
      sum += (item.amount * item.salePrice * (100 - watchField.discount)) / 100;
    });
    setTotalSum(sum);
    setValue("totalSum", sum);
  }, [watchField]);
  function handleCalendarChange(e) {
    setValue("receiptDate", e);
  }
  function handleCustomerChange(e) {
    setValue("discount", e.value.discount);
    setValue("customer", e.value._id);
    setValue("customerName", e.value.name || e.value.firmName);
  }
  function handleProductChange(e) {
    const productObj = {
      pid: e._id,
      productId: e.productId,
      productName: e.name,
      salePrice: e.salePrice,
      customPrice: false,
    };
    setValue(`items.${productInputs.length}`, productObj);
    setProductInputs([...productInputs, productObj]);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
      <p className="mb-3">Please enter payment information.</p>
      <div className="input-group">
        <label for="receipNumber" className="input-label">
          Receipt Number
        </label>
        <input
          className="mb-3"
          id="receiptNumber"
          placeholder="Receipt Number"
          {...register(`receiptNumber`)}
        ></input>
      </div>
      <div className="input-group">
        <label for="payment-date" className="input-label">
          Payment Date
        </label>
        <Calendar onChange={handleCalendarChange} />
      </div>
      <div className="input-group">
        <label for="customer" className="input-label">
          Customer
        </label>
        <SearchDropdown
          options={customerOptions}
          onChange={(e) => handleCustomerChange(e)}
          showSelectedOption={true}
        />
      </div>
      <div className="input-group">
        <label for="discount" className="input-label">
          Discount
        </label>
        <input
          className="mb-3"
          id="discount"
          placeholder="Discount"
          {...register(`discount`)}
        ></input>
      </div>
      <table>
        <thead>
          <tr>
            <th>products</th>
            <th>amount</th>
            <th>Price</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
          {productInputs.map((product, productIndex) => {
            return (
              <tr>
                <td>{product.productName}</td>
                <td>
                  <input {...register(`items.${productIndex}.amount`)}></input>
                </td>
                <td>
                  <input
                    {...register(`items.${productIndex}.salePrice`)}
                  ></input>
                </td>
                <td>{product.amount * product.salePrice || 0}</td>
              </tr>
            );
          })}
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{totalSum}</td>
          </tr>
          <tr>
            <SearchDropdown
              options={productOptions}
              onChange={(e) => handleProductChange(e.value)}
            />
          </tr>
        </tbody>
      </table>
      <button type="submit">Submit</button>
    </form>
  );
}
