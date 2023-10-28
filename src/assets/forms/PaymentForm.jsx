import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import SearchDropdown from "../../Components/SearchDropdown";
import Calendar from "../../Components/Calendar";
import { paymentMethods } from "../../configs/paymentMethods";
export default function PaymentForm({ customer, onSubmit }) {
  const { register, unregister, handleSubmit, getValues, setValue } = useForm();
  const [fieldGroup, setFieldGroup] = useState([0]);

  useEffect(() => {
    setValue("customer", customer?._id);
  }, []);

  function addField(e) {
    e.preventDefault();
    setValue(`tags.${fieldGroup.length}`, "");
    setFieldGroup([...fieldGroup, fieldGroup.length]);
  }

  function removeField(fieldIndex) {
    const temp = getValues("tags");
    const tempArray = temp.filter((item) => {
      return item !== temp[fieldIndex];
    });
    unregister("tags");
    setValue("tags", tempArray);
    const updatedArray = fieldGroup.filter((item) => {
      return item !== fieldGroup[fieldIndex];
    });
    setFieldGroup(updatedArray);
  }
  function handlePaymentChange(e, fieldIndex) {
    console.log(e);
    setValue(`payment.${fieldIndex}.paymentType`, e);
  }
  function handleCalendarChange(e) {
    console.log(e);
    setValue(`paymentDate`, e);
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
      <p className="mb-3">Please enter payment information.</p>
      <div className="input-group">
        <label for="payment-date" className="input-label">
          Payment Date
        </label>
        <Calendar onChange={handleCalendarChange} />
        {fieldGroup.map((fieldItem, fieldIndex) => {
          return (
            <div className="relative mb-3 group">
              <SearchDropdown
                options={paymentMethods}
                onChange={(e) => handlePaymentChange(e, fieldIndex)}
                showSelectedOption={true}
              />
              <label for="paymentAmount">Payment</label>
              <input
                className="mb-3"
                id="paymentAmount"
                placeholder="Amount"
                {...register(`payment.${fieldIndex}.paymentAmount`)}
              ></input>
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
          Add New Method
        </button>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
