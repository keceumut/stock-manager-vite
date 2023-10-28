import { useState } from "react";
import Modal from "./Modal";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import NewPurchaseForm from "../assets/forms/NewPurchaseForm";
import { useQuery } from "@tanstack/react-query";
import { getProducts, newPurchase } from "../Services/products";

export default function AddPurchase() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const {
    status,
    error,
    data: products,
  } = useQuery({
    queryKey: ["products", "form-select-data"],
    queryFn: () => getProducts({}),
  });
  const { postStatus, postError, mutate } = useMutation({
    mutationFn: newPurchase,
    onSuccess: (newProduct) => {
      queryClient.invalidateQueries(["products"]);
      setOpen(false);
    },
  });

  function onSubmit(e) {
    mutate(e);
  }

  return (
    <>
      <button
        className="button-secondary mb-4 ml-3"
        onClick={() => setOpen(true)}
      >
        Add Purchase
      </button>
      <Modal open={open} setOpen={setOpen}>
        <NewPurchaseForm onSubmit={onSubmit} results={products} />
      </Modal>
    </>
  );
}
