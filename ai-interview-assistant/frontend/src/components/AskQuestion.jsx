import { useState } from "react";
import api from "../api";

function AskQuestion() {

  const [question, setQuestion] =
    useState("");

  const [answer, setAnswer] =
    useState("");

  const ask = async () => {

    const response =
      await api.post(
        "/ask",
        {
          question
        }
      );

      setAnswer(
        response.data.answer ||
        response.data.error ||
        "No response received"
      );
  };

  return (
    <div>

      <input
        value={question}
        onChange={(e) =>
          setQuestion(
            e.target.value
          )
        }
      />

      <button
        onClick={ask}
      >
        Ask
      </button>

      <pre>
        {answer}
      </pre>

    </div>
  );
}

export default AskQuestion;