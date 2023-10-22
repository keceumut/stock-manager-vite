import { useForm } from "react-hook-form";

export default function LoginForm({ onSubmit }) {
  const { register, unregister, handleSubmit } = useForm();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="Username" {...register("email")}></input>
      <input
        placeholder="Password"
        type="password"
        {...register("password")}
      ></input>
      <button className="button text-sm" type="submit">
        Login
      </button>
    </form>
  );
}
