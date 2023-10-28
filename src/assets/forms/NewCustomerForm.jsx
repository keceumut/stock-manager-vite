import { useForm } from "react-hook-form";

export default function NewCustomerForm({ onSubmit }) {
  const { register, unregister, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mx-4">
      <p className="mb-3">Please enter new customer information.</p>
      <div className="input-group">
        <label for="firmName" className="input-label">
          Firm Name to be Displayed
        </label>
        <input
          className="input mb-3"
          id="firmName"
          placeholder="Firm Name"
          {...register("firmName")}
        ></input>
      </div>
      <div className="input-group">
        <label for="legal-name" className="input-label">
          Legal Name
        </label>
        <input
          className="mb-3"
          id="legal-name"
          placeholder="Legal Name"
          {...register("legalName")}
        ></input>
      </div>
      <div className="input-group">
        <label for="phone" className="input-label">
          Phone Number
        </label>
        <input
          className="mb-3"
          id="phone"
          placeholder="Phone Number"
          {...register("phone")}
        ></input>
      </div>
      <div className="input-group">
        <label for="email" className="input-label">
          Email
        </label>
        <input
          className="mb-3"
          id="email"
          placeholder="Email"
          {...register("email")}
        ></input>
      </div>
      <div className="input-group">
        <label for="discount" className="input-label">
          Discount
        </label>
        <input
          className="mb-3"
          id="discount"
          placeholder="Discount"
          {...register("discount")}
        ></input>
      </div>

      <div className="w-full flex justify-end mt-6">
        <button className="button-secondary text-sm" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}
