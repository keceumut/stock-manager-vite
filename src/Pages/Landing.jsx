import { motion } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BsClipboardData } from "react-icons/bs";
import { fadeIn } from "../configs/framerConfig";

const Landing = () => {
  return (
    <div
      name="about"
      id="about"
      className="flex justify-center items-center flex-col text-contrast pt-8"
    >
      {/* <p className="text-3xl text-white font-extralight mb-4 text-ds-white-md">About</p> */}
      <div className="relative text-center p-4 lg:p-6 container flex flex-col lg:flex-col items-center gap-6 min-h-[20rem]">
        <motion.h1
          variants={fadeIn("down", 0.3, 0.2, 0.9)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="text-5xl font-bold mb-2 sm:mb-4 z-10"
        >
          Welcome!
        </motion.h1>
        <motion.p
          variants={fadeIn("down", 0.3, 0.1, 0.9)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
        >
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          quidem reprehenderit dolore omnis consequuntur voluptas quaerat,
          praesentium voluptatum architecto exercitationem tempore ut recusandae
          expedita ipsa repellat enim, minus, distinctio laborum.{" "}
        </motion.p>
        <motion.p
          variants={fadeIn("down", 0.3, 0, 0.7)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="mb-1 sm:mb-4 z-10"
        >
          {" "}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid
          quidem reprehenderit dolore omnis consequuntur voluptas quaerat,
          praesentium voluptatum architecto exercitationem tempore ut.{" "}
        </motion.p>
        <motion.div
          variants={fadeIn("up", 0.3, 0, 0.9)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="w-full flex flex-col sm:flex-row justify-center items-center z-10 gap-4 sm:gap-8 mt-1 sm:mt-8"
        >
          <Link to="/products" className="button flex items-center">
            Go to charts <BsClipboardData className="inline ml-3" />
          </Link>
          <Link
            to="/"
            className="button-outlined flex items-center font-semibold"
          >
            See recents <FaChevronRight className="inline ml-3" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Landing;
