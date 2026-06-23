import { useState } from "react";
import api from "../api";

function AnalyzeResume() {

  const [result, setResult] = useState("");

  const analyze = async () => {

    try {

      const response = await api.post(
        "/analyze"
      );

      console.log(response.data);

      setResult(
        response.data.analysis ||
        response.data.error ||
        "No response received"
      );

    } catch (error) {

      console.error(error);

      setResult(
        "Failed to analyze resume"
      );
    }
  };

  return (
    <div>

      <button onClick={analyze}>
        Analyze Resume
      </button>

      <pre>
        {result}
      </pre>

    </div>
  );
}

export default AnalyzeResume;