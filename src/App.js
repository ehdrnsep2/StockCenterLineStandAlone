import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import HomeRoot from "./pages/home";
import SettingRoot from "./pages/setting";

function App() {
  return (
    <>
      <Header />
      <div className="contents">
        <Routes>
          <Route path="/setting" element={<SettingRoot />}></Route>
          <Route path="*" element={<HomeRoot />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
