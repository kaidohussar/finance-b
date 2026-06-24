import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import FileDropzone from '../components/FileDropzone';
import LoadingSpinner from '../components/LoadingSpinner';
import { getFiles, uploadFile } from '../utils/api';
import { useApi } from '../hooks/useApi';
import './Pages.css';

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
  return `${(bytes / 1024 / 1024 / 1024).toFixed(1)} GB`;
};

const Files: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error, setData } = useApi(getFiles);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const created = await uploadFile({
        name: file.name,
        size: formatFileSize(file.size),
      });
      setData((prev) => ({ ...prev!, recentFiles: [created, ...prev!.recentFiles] }));
    } finally {
      setUploading(false);
    }
  };

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div className="page-header">
          <h1>{t('files.title')}</h1>
        </div>
        {error ? (
          <div className="content-section">{t('common.error', 'Failed to load')}</div>
        ) : (
          <div
            className="content-section"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
            <LoadingSpinner />
          </div>
        )}
      </main>
    );
  }

  const { recentFiles, sharedFiles } = data;

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('files.title')}</h1>
      </div>

      <div className="content-section">
        <h2>{t('files.upload')}</h2>
        <FileDropzone onFileSelected={handleUpload} />
        {uploading && (
          <div
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px' }}
          >
            <LoadingSpinner size="small" />
            <span>{t('files.uploading', 'Uploading…')}</span>
          </div>
        )}
      </div>

      <div className="content-section">
        <h2>{t('files.recent')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('files.title')}</th>
                <th>
                  {t('files.fileSize', { size: '' }).replace('Size: ', '')}
                </th>
              </tr>
            </thead>
            <tbody>
              {recentFiles.map((file, index) => (
                <tr key={index}>
                  <td className="setting-label">{file.name}</td>
                  <td>
                    <Trans
                      i18nKey="files.fileSize"
                      values={{ size: file.size }}
                      components={{ strong: <strong /> }}
                    />
                  </td>
                  <td>
                    <Trans
                      i18nKey="files.downloadCount"
                      values={{ count: file.downloads }}
                      components={{ strong: <strong /> }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('files.shared')}</h2>
        <div className="settings-group">
          {sharedFiles.map((file, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <div className="setting-label">{file.name}</div>
                <div className="setting-description">
                  <Trans
                    i18nKey="files.sharedBy"
                    values={{ userName: file.sharedBy, date: file.date }}
                    components={{ strong: <strong />, em: <em /> }}
                  />
                </div>
              </div>
              <div>
                <Trans
                  i18nKey="files.fileSize"
                  values={{ size: file.size }}
                  components={{ strong: <strong /> }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="settings-group">
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-description">
                <Trans
                  i18nKey="files.expiringLink"
                  values={{ time: '2 hours' }}
                  components={{ em: <em />, link: <a href="#extend" /> }}
                />
              </div>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">
                <Trans
                  i18nKey="files.uploadSuccess"
                  values={{ fileName: 'Presentation.pptx' }}
                  components={{ strong: <strong /> }}
                />
              </div>
            </div>
          </div>
          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-description" style={{ color: '#ef4444' }}>
                <Trans
                  i18nKey="files.uploadFailed"
                  values={{ fileName: 'LargeVideo.mp4' }}
                  components={{ em: <em />, link: <a href="#retry" /> }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Files;
