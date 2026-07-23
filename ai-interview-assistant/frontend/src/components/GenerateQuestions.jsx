import api from "../api";

function GenerateQuestions({ isGenerating, setIsGenerating, setQuestions, setActiveTab, resumeUploaded, jdUploaded }) {
  const generate = async () => {
    setIsGenerating(true);
    setActiveTab("questions");
    setQuestions("");

    try {
      const response = await api.post("/generate-questions");
      setQuestions(
        response.data.questions ||
        response.data.error ||
        "No response received"
      );
    } catch (error) {
      console.error(error);
      setQuestions("Failed to generate questions. Please make sure both resume and job description are uploaded successfully and the backend is running.");
    } finally {
      setIsGenerating(false);
    }
  };

  const isDisabled = isGenerating || !resumeUploaded || !jdUploaded;

  return (
    <button 
      className="btn btn-secondary" 
      onClick={generate}
      disabled={isDisabled}
      title={
        !resumeUploaded || !jdUploaded 
          ? "Please upload both resume and job description to generate questions" 
          : "Generate targeted technical & behavioral mock questions"
      }
    >
      {isGenerating ? (
        <>
          <div className="spinner"></div>
          Generating Questions...
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
          Generate Questions
        </>
      )}
    </button>
  );
}

export default GenerateQuestions;