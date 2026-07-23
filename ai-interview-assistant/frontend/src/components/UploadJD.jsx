import { useRef, useState } from "react";
import api from "../api";

function UploadJD({ file, setFile, uploaded, setUploaded, message, setMessage }) {
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  const validateFile = (selectedFile) => {
    if (!selectedFile) return false;

    // Strict check for PDF format
    const isPDF = selectedFile.type === "application/pdf" || selectedFile.name.toLowerCase().endsWith(".pdf");
    if (!isPDF) {
      setFile(null);
      setUploaded(false);
      setMessage("Only PDF format is supported.");
      return false;
    }

    // Size check (10MB limit)
    if (selectedFile.size > 10 * 1024 * 1024) {
      setFile(null);
      setUploaded(false);
      setMessage("File size exceeds 10MB limit.");
      return false;
    }

    setMessage("");
    return true;
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setUploaded(false);
      }
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0];
      if (validateFile(selectedFile)) {
        setFile(selectedFile);
        setUploaded(false);
      }
    }
  };

  const triggerFileSelect = () => {
    if (uploaded) return;
    fileInputRef.current.click();
  };

  const handleUpload = async (e) => {
    e.stopPropagation();
    if (!file) return;

    // Final safety check
    if (!validateFile(file)) return;

    setUploading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await api.post("/upload-jd", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setUploaded(true);
      setMessage(response.data.message || "Job description uploaded successfully!");
    } catch (error) {
      console.error(error);
      setUploaded(false);
      const errorMsg = error.response?.data?.error || "Failed to upload JD. Only PDF format is supported.";
      setMessage(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    setFile(null);
    setUploaded(false);
    setMessage("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatSize = (bytes) => {
    if (!bytes) return "";
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  return (
    <div className="glass-card">
      <div className="card-title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><polyline points="17 11 19 13 23 9"></polyline></svg>
        Upload Job Description
      </div>

      {!file ? (
        <div 
          className={`upload-zone ${isDragging ? "drag-active" : ""}`}
          onClick={triggerFileSelect}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
        >
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange}
            className="file-input-hidden"
            accept=".pdf"
          />
          <div className="upload-icon">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          </div>
          <p className="upload-text">Drag & drop JD file, or <span style={{ color: "var(--accent-primary)", fontWeight: "600" }}>browse</span></p>
          <p className="upload-subtext">Supports PDF up to 10MB</p>
        </div>
      ) : (
        <div className="file-preview">
          <div className="file-info">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-primary)", flexShrink: 0 }}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            <div style={{ minWidth: 0 }}>
              <div className="file-name-text">{file.name}</div>
              <div className="file-size-text">{formatSize(file.size)}</div>
            </div>
          </div>
          {!uploading && (
            <button className="remove-file-btn" onClick={handleRemove} title="Remove file">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
            </button>
          )}
        </div>
      )}

      {file && !uploaded && (
        <button 
          className="btn btn-primary" 
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <div className="spinner"></div>
              Uploading...
            </>
          ) : (
            <>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
              Upload JD
            </>
          )}
        </button>
      )}

      {message && (
        <div className={`status-banner ${uploaded ? "success" : "error"}`}>
          {uploaded ? (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><polyline points="20 6 9 17 4 12"></polyline></svg>
          ) : (
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          )}
          <span>{message}</span>
        </div>
      )}
    </div>
  );
}

export default UploadJD;