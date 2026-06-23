import { useState } from "react";
import api from "../api";

function UploadJD() {

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const uploadJD = async () => {

    if (!file) {
      alert("Please select a JD file");
      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    try {

      const response = await api.post(
        "/upload-jd",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setMessage(
        response.data.message
      );

    } catch (error) {

      console.error(error);

      setMessage(
        "Failed to upload JD"
      );
    }
  };

  return (
    <div>

      <h2>Upload Job Description</h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadJD}
      >
        Upload JD
      </button>

      <p>{message}</p>

    </div>
  );
}

export default UploadJD;