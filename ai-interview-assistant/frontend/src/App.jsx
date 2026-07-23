import { useState } from "react";
import UploadResume from "./components/UploadResume";
import UploadJD from "./components/UploadJD";
import AnalyzeResume from "./components/AnalyzeResume";
import GenerateQuestions from "./components/GenerateQuestions";
import AskQuestion from "./components/AskQuestion";
import MarkdownRenderer from "./components/MarkdownRenderer";

function App() {
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [resumeUploadMsg, setResumeUploadMsg] = useState("");
  
  const [jdFile, setJdFile] = useState(null);
  const [jdUploaded, setJdUploaded] = useState(false);
  const [jdUploadMsg, setJdUploadMsg] = useState("");
  
  const [activeTab, setActiveTab] = useState("analysis");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [questionsResult, setQuestionsResult] = useState("");
  
  const [chatHistory, setChatHistory] = useState([]);

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <div className="header-glow"></div>
        <div className="header-badge">AI Interview Assistant</div>
        <h1>Master Your Next Tech Interview</h1>
        <p>
          Bridge the gap between your profile and target roles. Upload your resume and the job description to receive deep match analysis, generate targeted mock questions, and chat with an AI coach.
        </p>
      </header>

      <div className="upload-grid">
        <UploadResume 
          file={resumeFile} 
          setFile={setResumeFile} 
          uploaded={resumeUploaded} 
          setUploaded={setResumeUploaded} 
          message={resumeUploadMsg} 
          setMessage={setResumeUploadMsg} 
        />
        <UploadJD 
          file={jdFile} 
          setFile={setJdFile} 
          uploaded={jdUploaded} 
          setUploaded={setJdUploaded} 
          message={jdUploadMsg} 
          setMessage={setJdUploadMsg} 
        />
      </div>

      <div className="action-deck">
        <AnalyzeResume 
          isAnalyzing={isAnalyzing} 
          setIsAnalyzing={setIsAnalyzing} 
          setResult={setAnalysisResult} 
          setActiveTab={setActiveTab} 
          resumeUploaded={resumeUploaded} 
          jdUploaded={jdUploaded} 
        />
        <GenerateQuestions 
          isGenerating={isGenerating} 
          setIsGenerating={setIsGenerating} 
          setQuestions={setQuestionsResult} 
          setActiveTab={setActiveTab} 
          resumeUploaded={resumeUploaded} 
          jdUploaded={jdUploaded} 
        />
      </div>

      <div className="workspace-grid">
        {/* Results Card */}
        <div className="glass-card tabs-container">
          <div className="tabs-header">
            <button 
              className={`tab-btn ${activeTab === 'analysis' ? 'active' : ''}`}
              onClick={() => setActiveTab('analysis')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              Match Analysis
            </button>
            <button 
              className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
              Mock Questions
            </button>
          </div>
          
          <div className="tab-pane">
            {activeTab === 'analysis' ? (
              <div className={`markdown-wrapper ${!analysisResult && !isAnalyzing ? 'empty' : ''}`}>
                {isAnalyzing ? (
                  <div className="skeleton-container">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line body-1"></div>
                    <div className="skeleton-line body-2"></div>
                    <div className="skeleton-line body-3"></div>
                    <div className="skeleton-line body-4"></div>
                  </div>
                ) : analysisResult ? (
                  <MarkdownRenderer content={analysisResult} />
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                    <span>Click "Analyze Resume" to view matching details and skill gaps.</span>
                  </>
                )}
              </div>
            ) : (
              <div className={`markdown-wrapper ${!questionsResult && !isGenerating ? 'empty' : ''}`}>
                {isGenerating ? (
                  <div className="skeleton-container">
                    <div className="skeleton-line title"></div>
                    <div className="skeleton-line body-1"></div>
                    <div className="skeleton-line body-2"></div>
                    <div className="skeleton-line body-3"></div>
                    <div className="skeleton-line body-4"></div>
                  </div>
                ) : questionsResult ? (
                  <MarkdownRenderer content={questionsResult} />
                ) : (
                  <>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                    <span>Click "Generate Mock Questions" to get tailored preparation prompts.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Q&A Assistant Card */}
        <div className="glass-card chat-card">
          <div className="card-title">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            AI Interview Coach
          </div>
          <AskQuestion 
            chatHistory={chatHistory} 
            setChatHistory={setChatHistory} 
            resumeUploaded={resumeUploaded} 
            jdUploaded={jdUploaded} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;