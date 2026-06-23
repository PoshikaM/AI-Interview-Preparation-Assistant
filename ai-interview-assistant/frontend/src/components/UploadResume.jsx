import { useState } from "react";
import api from "../api";

function UploadResume() {

  const [file, setFile] = useState(null);

  const uploadResume = async () => {

    const formData = new FormData();

    formData.append(
      "file",
      file
    );

    const response =
      await api.post(
        "/upload-resume",
        formData
      );

    alert(
      response.data.message
    );
  };

  return (
    <div>

      <h2>Upload Resume</h2>

      <input
        type="file"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={uploadResume}
      >
        Upload
      </button>

    </div>
  );
}

export default UploadResume;