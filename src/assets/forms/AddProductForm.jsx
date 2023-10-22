import { useState } from "react";
import { useForm } from "react-hook-form";

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
      <div className="input-group">
        <label for="product-id" className="input-label">
          Product Id
        </label>
        <input
          className="input"
          id="product-id"
          placeholder="Product Id"
          {...register("productId")}
        ></input>
      </div>
      <div className="input-group">
        <label className="input-label">Product Name</label>
        <input
          className="input"
          id="product-name"
          placeholder="Product Name"
          {...register("name")}
        ></input>
      </div>
      <div className="input-group">
        <label className="input-label">Tags</label>

        {fieldGroup.map((fieldItem, fieldIndex) => {
          return (
            <div className="relative mb-3">
              <input
                className="input w-[90%] rounded-r-none"
                placeholder="Tag"
                {...register(`tags.${fieldIndex}`)}
              ></input>
              <button
                className="absolute right-0 top-0 bg-primary-100 hover:bg-accent-300 w-[10%] transition-colors min-h-[100%] border-contrast-600 border-2 rounded-r-lg font-bold hover:text-primary-100"
                onClick={() => removeField(fieldIndex)}
              >
                X
              </button>
            </div>
          );
        })}
        <button onClick={(e) => addField(e)} className="button">
          Add New Tag
        </button>
      </div>
      <button className="button text-sm" type="submit">
        Add New Product
      </button>
    </form>
  );
}
