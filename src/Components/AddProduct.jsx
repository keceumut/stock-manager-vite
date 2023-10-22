import { useState } from "react";
import Modal from "./Modal";
import AddProductForm from "../assets/forms/addProductForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addProduct } from "../Services/products";

export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();
  const oldProducts = queryClient.getQueryData(["products"]);
  const { status, error, mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: (newProduct) => {
      oldProducts.push(newProduct);
      queryClient.setQueryData(["products"], oldProducts);
      setOpen(false);
    },
  });

  function onSubmit(e) {
    mutate(e);
    console.log(e);
  }
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} setOpen={setOpen}>
        <AddProductForm onSubmit={onSubmit} />
      </Modal>
    </>
  );
}
