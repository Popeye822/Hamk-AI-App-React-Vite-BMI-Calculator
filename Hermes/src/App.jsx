import { useEffect, useState } from "react";
import "./App.css";

function getCategory(bmi) {
  if (bmi < 18.5) {
    return {
      label: "Underweight",
      tip: "Try to maintain a balanced diet and monitor your nutrition.",
    };
  }
  if (bmi < 25) {
    return {
      label: "Normal weight",
      tip: "Great! Keep up your healthy lifestyle.",
    };
  }
  if (bmi < 30) {
    return {
      label: "Overweight",
      tip: "Consider regular exercise and balanced eating habits.",
    };
  }
  return {
    label: "Obesity",
    tip: "It may be helpful to review your lifestyle and seek health guidance if needed.",
  };
}

export default function App() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("bmi-app-data");
    if (saved) {
      const parsed = JSON.parse(saved);
      setHeight(parsed.height || "");
      setWeight(parsed.weight || "");
      setResult(parsed.result || null);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "bmi-app-data",
      JSON.stringify({ height, weight, result })
    );
  }, [height, weight, result]);

  const calculateBMI = () => {
    const h = parseFloat(height);
    const w = parseFloat(weight);

    if (!h || !w || h <= 0 || w <= 0) {
      alert("Please enter valid height and weight.");
      return;
    }

    const bmi = w / ((h / 100) * (h / 100));
    const rounded = bmi.toFixed(2);
    const category = getCategory(bmi);

    setResult({
      bmi: rounded,
      category: category.label,
      tip: category.tip,
    });
  };

  const resetFields = () => {
    setHeight("");
    setWeight("");
    setResult(null);
    localStorage.removeItem("bmi-app-data");
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Smart BMI Calculator</h1>
        <p className="subtitle">
          Enter your height and weight to calculate your Body Mass Index.
        </p>

        <div className="form-group">
          <label>Height (cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="e.g. 180"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="e.g. 78"
          />
        </div>

        <div className="button-row">
          <button onClick={calculateBMI}>Calculate</button>
          <button className="secondary" onClick={resetFields}>
            Reset
          </button>
        </div>

        {result && (
          <div className="result-box">
            <h2>Your BMI: {result.bmi}</h2>
            <p>
              <strong>Category:</strong> {result.category}
            </p>
            <p>
              <strong>Tip:</strong> {result.tip}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}