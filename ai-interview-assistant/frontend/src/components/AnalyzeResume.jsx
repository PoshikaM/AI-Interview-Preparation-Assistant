import api from "../api";

function AnalyzeResume({ isAnalyzing, setIsAnalyzing, setResult, setActiveTab, resumeUploaded, jdUploaded }) {
  const analyze = async () => {
    setIsAnalyzing(true);
    setActiveTab("analysis");
    setResult("");

    try {
      const response = await api.post("/analyze");
      setResult(
        response.data.analysis ||
        response.data.error ||
        "No response received"
      );
    } catch (error) {
      console.error(error);
      setResult("Failed to analyze resume. Please make sure both resume and job description are uploaded successfully and the backend is running.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const isDisabled = isAnalyzing || !resumeUploaded || !jdUploaded;

  return (
    <button 
      className="btn btn-primary" 
      onClick={analyze}
      disabled={isDisabled}
      title={
        !resumeUploaded || !jdUploaded 
          ? "Please upload both resume and job description to analyze" 
          : "Analyze resume match and identify profile gaps"
      }
    >
      {isAnalyzing ? (
        <>
          <div className="spinner"></div>
          Analyzing Resume...
        </>
      ) : (
        <>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          Analyze Resume
        </>
      )}
    </button>
  );
}

export default AnalyzeResume;