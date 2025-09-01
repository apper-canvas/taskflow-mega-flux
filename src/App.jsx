import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Layout from "@/components/organisms/Layout";
import TasksPage from "@/components/pages/TasksPage";
import ArchivePage from "@/components/pages/ArchivePage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TasksPage />} />
            <Route path="/category/:categoryId" element={<TasksPage />} />
            <Route path="/archive" element={<ArchivePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
      
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        toastStyle={{
          fontSize: "14px",
          fontFamily: "Inter, system-ui, sans-serif"
        }}
      />
    </>
  );
}

export default App;