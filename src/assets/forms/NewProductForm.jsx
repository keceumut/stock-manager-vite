import { useState } from "react";
import { useForm } from "react-hook-form";
import {GrClose} from 'react-icons/gr'
export default function AddProductForm({ onSubmit }) {
  const { register, unregister, handleSubmit, getValues, setValue } = useForm();
  const [fieldGroup, setFieldGroup] = useState([0]);

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
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
      <p className="mb-3">Please enter new product information.</p>
      <div className="input-group">
        <label for="product-id" className="input-label">
          Product Id
        </label>
        <input
          className="input mb-3"
          id="product-id"
          placeholder="Product Id"
          {...register("productId")}
        ></input>
      </div>
      <div className="input-group">
        <label for="product-name" className="input-label">Product Name</label>
        <input
          className="mb-3"
          id="product-name"
          placeholder="Product Name"
          {...register("name")}
        ></input>
      </div>
      <div className="input-group">
        <label for="tags" className="input-label">Tags</label>

        {fieldGroup.map((fieldItem, fieldIndex) => {
          return (
            <div key={fieldIndex} className="relative mb-3 group">
              <input
                className=" w-full"
                id="tags"
                placeholder="Tag"
                {...register(`tags.${fieldIndex}`)}
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
        <button onClick={(e) => addField(e)} className="button-secondary bg-primary-300 text-sm">
          Add New Tag
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
