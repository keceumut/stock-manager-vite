import { useForm } from "react-hook-form";
import {motion} from 'framer-motion'
import { fadeIn } from "../../configs/framerConfig";

export default function LoginForm({ onSubmit }) {
  const { register, unregister, handleSubmit } = useForm();
  
  return (
    <motion.div 
      variants={fadeIn("down", 0.3, 0, 0.4, 15)}
      initial="hidden"
      whileInView={"show"}
      exit={{
        opacity: 0,
        y:-15,
        transition:{
          duration:0.4,
          ease:"easeInOut",
          delay:0
        }
      }}
      
      viewport={{ once: true, amount: 0.7 }} className="absolute top-[150%] lg:left-[-50%] md:w-[324px]  bg-primary-200 px-4 py-6 rounded-xl shadow-xl">
        <p className="text-sm text-center mb-4">Login using ID and Password.</p>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder="Username" {...register("email")}></input>
          <input
            placeholder="Password"
            type="password"
            {...register("password")}
          ></input>
          <div className="w-full flex justify-end">
            <button className="button-secondary p-2 w-[6rem] text-sm" type="submit">
              Login
            </button>
          </div>
          
      </form>
      </motion.div>   
  );
}
