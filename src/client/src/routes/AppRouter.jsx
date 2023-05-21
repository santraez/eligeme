import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import InputValues from "../components/InputValues";
import ResultValues from "../components/ResultValues";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<InputValues />} />
        <Route path="/result/:id" element={<ResultValues />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;