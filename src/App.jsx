import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import OfertaPage from "./pages/OfertaPage";
import Main from "./pages/Main";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
        <Routes>
          <Route path="/offer" element={<OfertaPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
