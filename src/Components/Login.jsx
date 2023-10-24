import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState, useRef } from "react";
import { signIn, userAuthenticate } from "../Services/user";
import { AppContext } from "../configs/AppContext";
import LoginForm from "../assets/forms/SignInForm";
import { AnimatePresence } from "framer-motion";

export default function Login() {
  const isOpenHook = useState(false);
  const [isOpen, setIsOpen] = isOpenHook;
  const { jwtToken, setJwtToken } = useContext(AppContext);

  //Modal
  const modalButtonRef = useRef();
  const modalRef = useRef();

  const { status, error, mutate } = useMutation({
    mutationFn: userAuthenticate,
    onSuccess: (data) => {
      if (!data.authenticated) {
        setJwtToken(null);
      }
    },
    onError: (data) => {
      console.log(data);
      setJwtToken(null);
    },
  });

  useEffect(() => {
    mutate(jwtToken);

    let handler = (e) => {
      if (
        !modalButtonRef.current?.contains(e.target) &&
        !modalRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleToggle = (e) => {
    e.preventDefault();
    setIsOpen((prevState) => !prevState);
  };
  if (status === "pending") return "Login";

  return (
    <div className="relative z-10">
      {!jwtToken ? (
        <>
          <button ref={modalButtonRef} onClick={handleToggle}>
            Login
          </button>
          <AnimatePresence>
            {isOpen && (
              <div ref={modalRef}>
                <LoginModal
                  modalButtonRef={modalButtonRef}
                  setIsOpen={setIsOpen}
                />
              </div>
            )}{" "}
          </AnimatePresence>
        </>
      ) : (
        "Home"
      )}
    </div>
  );
}

function LoginModal({ setIsOpen, modalButtonRef }) {
  const queryClient = useQueryClient();
  const { setJwtToken } = useContext(AppContext);
  const { status, error, mutate } = useMutation({
    mutationFn: signIn,
    onSuccess: (jwt) => {
      setJwtToken(jwt);
      localStorage.setItem("JWT", jwt);
      setIsOpen(false);
    },
  });

  function handleLogin(e) {
    mutate(e);
    console.log(e);
  }
  return (
    <LoginForm
      modalButtonRef={modalButtonRef}
      onSubmit={handleLogin}
      setIsOpen={setIsOpen}
    />
  );
}
