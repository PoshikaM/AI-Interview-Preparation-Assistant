import { useState, useRef, useEffect } from "react";
import api from "../api";
import MarkdownRenderer from "./MarkdownRenderer";

function AskQuestion({ chatHistory, setChatHistory, resumeUploaded, jdUploaded }) {
  const [question, setQuestion] = useState("");
  const [isSending, setIsSending] = useState(false);
  const chatBottomRef = useRef(null);

  const isLocked = !resumeUploaded || !jdUploaded;

  // Suggestions to display when history is empty and chat is unlocked
  const suggestions = [
    "What are the main gaps in my resume?",
    "Suggest key skills I should add",
    "How should I describe my experience?",
    "What is the most critical requirement?"
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory, isSending]);

  const handleSend = async (textToSend) => {
    if (isLocked) return;

    const query = textToSend || question;
    if (!query.trim() || isSending) return;

    if (!textToSend) {
      setQuestion("");
    }

    // 1. Add user message
    const userMsg = { id: crypto.randomUUID(), sender: "user", text: query };
    setChatHistory((prev) => [...prev, userMsg]);
    setIsSending(true);

    // 2. Add placeholder AI loading message
    const aiLoadingId = crypto.randomUUID() + 1;
    setChatHistory((prev) => [
      ...prev,
      { id: aiLoadingId, sender: "ai", text: "", isLoading: true },
    ]);

    try {
      const response = await api.post("/ask", { question: query });
      
      const answerText = response.data.answer || response.data.error || "No response received";
      
      // 3. Update the loading message with actual answer
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.id === aiLoadingId
            ? { ...msg, text: answerText, isLoading: false }
            : msg
        )
      );
    } catch (error) {
      console.error(error);
      setChatHistory((prev) =>
        prev.map((msg) =>
          msg.id === aiLoadingId
            ? {
                ...msg,
                text: "Failed to reach AI Coach. Please make sure the backend server is running and both Resume and Job Description are uploaded.",
                isLoading: false,
                isError: true,
              }
            : msg
        )
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLocked) {
      handleSend();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-history">
        {isLocked ? (
          <div className="chat-welcome locked-welcome" style={{ margin: "auto 0", opacity: 0.65 }}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            <p style={{ fontWeight: "700", color: "var(--text-primary)", fontSize: "14px" }}>AI Coach is Locked</p>
            <p style={{ fontSize: "12px", marginTop: "4px" }}>Please upload both your Resume and the Job Description above to unlock the AI Interview Coach Q&A.</p>
          </div>
        ) : chatHistory.length === 0 ? (
          <div className="chat-welcome">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: "12px" }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            <p style={{ fontWeight: "600", color: "var(--text-primary)" }}>Ask the AI Prep Coach</p>
            <p>Ask anything about how your resume matches the job description, request interview tips, or get project ideas to fill key gaps.</p>
          </div>
        ) : (
          chatHistory.map((msg) => (
            <div 
              key={msg.id} 
              className={`chat-bubble ${msg.sender} ${msg.isLoading ? "ai-loading" : ""} ${msg.isError ? "error" : ""}`}
            >
              {msg.isLoading ? (
                <div className="typing-dots">
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                  <div className="typing-dot"></div>
                </div>
              ) : msg.sender === "ai" ? (
                <MarkdownRenderer content={msg.text} />
              ) : (
                msg.text
              )}
            </div>
          ))
        )}
        <div ref={chatBottomRef} />
      </div>

      {!isLocked && chatHistory.length === 0 && (
        <div className="suggestion-chips">
          {suggestions.map((s, idx) => (
            <button 
              key={idx} 
              className="chip-btn"
              onClick={() => handleSend(s)}
              disabled={isSending}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chat-input-wrapper">
        <input
          type="text"
          className="chat-input"
          placeholder={isLocked ? "Upload files above to unlock chat..." : "Ask a follow-up question..."}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isSending || isLocked}
        />
        <button 
          className="chat-send-btn" 
          onClick={() => handleSend()}
          disabled={!question.trim() || isSending || isLocked}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  );
}

export default AskQuestion;