import "./App.css";
import { CalculatorProvider } from "./context/CalculatorContext";
import Calculator from "./components/calculator/Calculator";

function App() {
  return (
    <CalculatorProvider>
      <div className="main-container">
        <h1>TitanStar Legends &#45; Rune Mastery Loadout Talent Calculator 9000</h1>
        <Calculator />
      </div>
    </CalculatorProvider>
  );
}

export default App;
