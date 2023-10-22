import { FaExpandAlt } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { getLatestSales } from "../Services/sales";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";

const CustomerCard = ({ customer }) => {
  const {
    status,
    error,
    data: latestSales,
  } = useQuery({
    queryKey: [`latestSales for ${customer._id}`],
    queryFn: () => getLatestSales({ cid: customer._id, pageSize: 3 }),
  });

  const tabHook = useState(-1);

  const tabOpen = tabHook[0];

  return (
    <div
      className="text-left sm:mt-4 lg:mt-8 rounded-md bg-primary-200 p-6 shadow-xl"
      background={"blackAlpha.100"}
      key={customer._id}
      p={6}
    >
      <h1>
        <span className="font-semibold">Firm Name:</span>{" "}
        {customer.firmName || customer.name}
      </h1>
      <p>
        <span className="font-semibold">Legal Name:</span> {customer.legalName}
      </p>
      <p>
        <span className="font-semibold">Phone:</span> {customer.phone}
      </p>
      <p>
        <span className="font-semibold">Email:</span> {customer.email}
      </p>
      <div className="my-2 border-b-2 border-gray-400/25"></div>
      <p>
        <span className="font-semibold">Discount:</span>{" "}
        {customer.discount ? customer.discount : "N/A"}
      </p>
      <p>
        <span className="font-semibold">Debt:</span>{" "}
        {customer.debt ? customer.debt : "N/A"}
      </p>
      <div className="my-2 border-b-2 border-gray-400/25"></div>
      <p className="font-semibold mb-2">Recent purchases:</p>
      <div
        name="purchases"
        className="min-h-[285px] flex flex-col gap-3 justify-evenly"
      >
        {status === "success"
          ? latestSales.map((purchase, index) => {
              return (
                <ExpandableField
                  key={`expandableField${index}`}
                  isActive={index === tabOpen}
                  index={index}
                  tabHook={tabHook}
                  purchase={purchase}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default CustomerCard;

const ExpandableField = ({ purchase, tabHook, index, isActive }) => {
  const [isOpen, setIsOpen] = useState(false);
  const setTab = tabHook[1];
  const date = new Date(purchase.receiptDate);
  useEffect(() => {
    if (isActive === false) {
      setIsOpen(false);
    }
  }, [isActive]);
  const handleOpen = () => {
    if (isOpen) {
      setTab(-1);
    } else {
      setTab(index);
    }
    setIsOpen(true);
  };
  return (
    <motion.div
      onClick={() => handleOpen()}
      initial={false}
      className="cursor-pointer border-2 border-gray-400/20 p-2 rounded-lg"
    >
      <p className="underline">{purchase.receiptNumber}</p>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: "auto", overflow: "hidden" },
              collapsed: { opacity: 0, height: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] }}
          >
            <div p={2} bg="transparent">
              <p>- prd-6666 x 1 </p>
              <p>- {date.toDateString()} </p>
              <p>- Sum: {purchase.totalSum} </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
