import { createContext, useState } from "react";

export type Talent = { allocated: boolean };

export type Path = {
  name: string;
  talents: Array<Talent>;
};

export type CalculatorState = {
  pointsSpent: number;
  paths: Array<Path>;
};

type CalculatorContext = {
  calculatorState: CalculatorState;
  setCalculatorState: React.Dispatch<React.SetStateAction<CalculatorState>>;
};

const initCalculator = {
  pointsSpent: 0,
  paths: [
    {
      name: "talent path 1",
      talents: [
        {
          allocated: false,
        },
        {
          allocated: false,
        },
        {
          allocated: false,
        },
        {
          allocated: false,
        },
      ],
    },
    {
      name: "talent path 2",
      talents: [
        {
          allocated: false,
        },
        {
          allocated: false,
        },
        {
          allocated: false,
        },
        {
          allocated: false,
        },
      ],
    },
  ],
};

export const CalculatorContext = createContext<CalculatorContext>({} as CalculatorContext);

// export const useCalculatorState = () => useContext(CalculatorContext);

export const CalculatorProvider = ({ children }: { children: React.ReactNode }) => {
  const [calculatorState, setCalculatorState] = useState<CalculatorState>(initCalculator);

  return (
    <CalculatorContext.Provider value={{ calculatorState, setCalculatorState }}>
      {children}
    </CalculatorContext.Provider>
  );
};
