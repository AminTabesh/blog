import { Provider } from "react-redux";
import store from "./store/store";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Register";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PostPage from './pages/PostPage'

function App() {
  const queryClient = new QueryClient();

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<PageNotFound />} />
            <Route path="posts/:id" element={<PostPage />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
