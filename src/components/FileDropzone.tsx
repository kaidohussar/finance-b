import React, { useRef, useState } from 'react';
import { Upload, File as FileIcon, X } from 'lucide-react';
import './FileDropzone.css';

interface FileDropzoneProps {
  onFileSelected?: (file: File) => void;
  accept?: string;
}

const formatSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
};

const FileDropzone: React.FC<FileDropzoneProps> = ({ onFileSelected, accept }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  const acceptFile = (next: File) => {
    setFile(next);
    onFileSelected?.(next);
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.files?.[0];
    if (next) acceptFile(next);
    e.target.value = '';
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDragging) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const next = e.dataTransfer.files?.[0];
    if (next) acceptFile(next);
  };

  const handleRemove = () => {
    setFile(null);
  };

  return (
    <div className="file-dropzone-wrapper">
      <div
        className={`file-dropzone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleBrowse}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleBrowse();
          }
        }}
      >
        <Upload size={32} className="file-dropzone-icon" />
        <div className="file-dropzone-title">
          Drag &amp; drop a file here
        </div>
        <div className="file-dropzone-subtitle">
          or <span className="file-dropzone-link">browse files</span> to upload
        </div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="file-dropzone-input"
          onChange={handleInputChange}
        />
      </div>

      {file && (
        <div className="file-dropzone-selected">
          <FileIcon size={18} />
          <div className="file-dropzone-selected-info">
            <div className="file-dropzone-selected-name">{file.name}</div>
            <div className="file-dropzone-selected-size">{formatSize(file.size)}</div>
          </div>
          <button
            type="button"
            className="file-dropzone-remove"
            onClick={handleRemove}
            aria-label="Remove file"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
};

export default FileDropzone;
