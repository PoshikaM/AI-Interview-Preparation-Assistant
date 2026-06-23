import { useState } from "react";
import api from "../api";

function GenerateQuestions() {

  const [questions, setQuestions] =
    useState("");

  const generate = async () => {

    try {

      const response = await api.post(
        "/generate-questions"
      );

      console.log(response.data);

      setQuestions(
        response.data.questions ||
        response.data.error ||
        "No response received"
      );

    } catch (error) {

      console.error(error);

      setQuestions(
        "Failed to generate questions"
      );
    }
  };

  return (
    <div>

      <button onClick={generate}>
        Generate Questions
      </button>

      <pre>
        {questions}
      </pre>

    </div>
  );
}

export default GenerateQuestions;