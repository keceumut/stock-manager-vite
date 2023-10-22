import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Pages/Root";
import Products, { ShowProduct } from "./Pages/Products";
import Customers from "./Pages/Customers";
import Sales from "./Pages/Sales";
import Landing from "./Pages/Landing";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AppContext } from "./configs/AppContext";
import { useState } from "react";

function App() {
  const [jwtToken, setJwtToken] = useState("empty");
  const [currentTheme, setCurrentTheme] = useState();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        { path: "/products", element: <Products /> },
        { path: "/products/:productId", element: <ShowProduct /> },
        { path: "/customers", element: <Customers /> },
        { path: "/sales", element: <Sales /> },
        { path: "/landing", element: <Landing /> },
      ],
    },
  ]);
  return (
    <AppContext.Provider value={{ jwtToken, currentTheme, setJwtToken }}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools position="bottom-right" />
      </QueryClientProvider>
    </AppContext.Provider>
  );
}

export default App;
