import { useState } from "react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../Services/products";
import { getCustomers } from "../Services/customers";
import NewSalesForm from "../assets/forms/NewSalesForm";

export default function AddSale() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    customerStatus,
    customerError,
    data: customers,
  } = useQuery({
    queryKey: ["customers", "customer-select-data", 1],
    queryFn: () => getCustomers({ q: "" }),
  });

  const {
    productsStatus,
    productsError,
    data: products,
  } = useQuery({
    queryKey: ["products", "form-select-data"],
    queryFn: () => getProducts({}),
  });

  function onSubmit(e) {
    console.log(e);
  }

  return (
    <>
      <button
        className="button-secondary mb-4 ml-3"
        onClick={() => setOpen(true)}
      >
        New Sale
      </button>
      <Modal open={open} setOpen={setOpen}>
        <NewSalesForm
          onSubmit={onSubmit}
          productList={products}
          customerList={customers}
        />
      </Modal>
    </>
  );
}
