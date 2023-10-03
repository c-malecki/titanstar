import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Calculator from "./components/calculator/Calculator";

function App() {
  return (
    <div className="main-container">
      <h1>TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000</h1>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Calculator />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
