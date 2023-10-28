import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import SearchDropdown from "../../Components/SearchDropdown";
import Calendar from "../../Components/Calendar";

export default function NewPurchaseForm({ onSubmit, results }) {
  const { register, unregister, handleSubmit, getValues, setValue } = useForm();
  const productOptions = [];
  const [fieldGroup, setFieldGroup] = useState([0]);
  const totalPriceDepends = ["totalPrice", "amount", "divide", "purchasePrice"];
  const purchasePriceDepends = [
    "purchasePrice",
    "amount",
    "multiply",
    "totalPrice",
  ];
  const amountDepends = ["purchasePrice", "amount", "multiply", "totalPrice"];

  results?.forEach((item) => {
    productOptions.push({ value: item, label: item.name });
  });

  function addField(e) {
    e.preventDefault();
    setValue(`items.${fieldGroup.length}.productId`, "");
    setFieldGroup([...fieldGroup, fieldGroup.length]);
  }

  function removeField(fieldIndex) {
    const tempArray = temp.filter((item) => {
      return item !== temp[fieldIndex];
    });
    const updatedArray = fieldGroup.filter((item) => {
      return item !== fieldGroup[fieldIndex];
    });
    setFieldGroup(updatedArray);
  }

  function handleProductChange(e, fieldIndex) {
    console.log(e);
    setValue(`items.${fieldIndex}.productId`, e.productId);
  }

  function handleCalendarChange(e) {
    console.log(e);
  }

  function calcDepend(depends, index) {
    console.log("test");
    const value1 = getValues(`items.${index}.${depends[0]}`);
    const value2 = getValues(`items.${index}.${depends[1]}`);
    console.log(value1, value2);
    switch (depends[2]) {
      case "divide":
        setValue(`items.${index}.${depends[3]}`, value1 / value2);
        break;
      case "multiply":
        setValue(`items.${index}.${depends[3]}`, value1 * value2);
        break;
      default:
        break;
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
      <p className="mb-3">Please enter purchase information.</p>
      <div className="input-group">
        <label for="receipt-number" className="input-label">
          Receipt Number
        </label>
        <input
          className="input mb-3"
          id="receipt-number"
          placeholder="Receipt Number"
          {...register("receiptNumber")}
        ></input>
      </div>
      <div className="input-group">
        <label for="receipt-date" className="input-label">
          Receipt Date
        </label>
        <Calendar onChange={handleCalendarChange} />
      </div>

      <div className="input-group">
        <label for="products" className="input-label">
          Products
        </label>

        {fieldGroup.map((fieldItem, fieldIndex) => {
          return (
            <div
              key={`productItems${fieldIndex}`}
              className="relative mb-3 group flex"
            >
              <div className="input-group">
                <label for="amount" className="input-label">
                  Product
                </label>
                <SearchDropdown
                  options={productOptions}
                  onChange={(e) => handleProductChange(e, fieldIndex)}
                  showSelectedOption={true}
                />
              </div>
              <div className="input-group">
                <label for="amount" className="input-label">
                  Amount
                </label>
                <input
                  className="mb-3"
                  id="amount"
                  placeholder="Amount"
                  {...register(`items.${fieldIndex}.amount`)}
                  onKeyUp={() => calcDepend(amountDepends, fieldIndex)}
                ></input>
              </div>
              <div className="input-group">
                <label for="cost" className="input-label">
                  Cost
                </label>
                <input
                  className="mb-3"
                  id="cost"
                  placeholder="Cost"
                  {...register(`items.${fieldIndex}.purchasePrice`)}
                  onKeyUp={() => calcDepend(purchasePriceDepends, fieldIndex)}
                ></input>
              </div>
              <div className="input-group">
                <label for="total-cost" className="input-label">
                  Total Cost
                </label>
                <input
                  className="mb-3"
                  id="total-cost"
                  placeholder="Total Cost"
                  {...register(`items.${fieldIndex}.totalPrice`)}
                  onKeyUp={() => calcDepend(totalPriceDepends, fieldIndex)}
                ></input>
              </div>

              <button
                className="absolute right-0 top-0 bg-primary-300 hover:bg-accent-300 w-[10%] transition-colors min-h-[100%] border-gray-700 border-2 border-opacity-25 rounded-r-lg font-bold hover:text-primary-100"
                onClick={() => removeField(fieldIndex)}
              >
                <GrClose className="mx-auto" />
              </button>
            </div>
          );
        })}
        <button
          onClick={(e) => addField(e)}
          className="button-secondary bg-primary-300 text-sm"
        >
          Add New Product
        </button>
      </div>
      <div className="w-full flex justify-end mt-6">
        <button className="button-secondary text-sm" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
