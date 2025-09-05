/** @format */

import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import router from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ModalProvider from "@/context/modal";
import ToastProvider from "@/context/toast";

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <ModalProvider>
        <ToastProvider>
          <QueryClientProvider client={queryClient}>
            <Suspense fallback={<>Loading...</>}>
              <RouterProvider router={router} />
            </Suspense>
          </QueryClientProvider>
        </ToastProvider>
      </ModalProvider>
    </Provider>
  );
}

export default App;
