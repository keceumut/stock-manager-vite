import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext, useEffect, useState } from "react";
import { signIn, userAuthenticate } from "../Services/user";
import { AppContext } from "../configs/AppContext";
import LoginForm from "../assets/forms/loginForm";

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const { jwtToken, setJwtToken } = useContext(AppContext);
  const { status, error, mutate } = useMutation({
    mutationFn: userAuthenticate,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (data) => {
      console.log(data);
      setJwtToken(null);
    },
  });

  useEffect(() => {
    mutate(jwtToken);
  }, []);

  if (status === "pending") return "Login";

  return (
    <div className="relative z-10">
      {!jwtToken ? (
        <>
          <button onClick={() => setIsOpen(!isOpen)}>Login</button>
          {isOpen ? (
            <div className="absolute">
              <LoginModal setIsOpen={setIsOpen} />
            </div>
          ) : null}{" "}
        </>
      ) : (
        "Home"
      )}
    </div>
  );
}

function LoginModal({ setIsOpen }) {
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
  return <LoginForm onSubmit={handleLogin} />;
}
