import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Files: React.FC = () => {
  const { t } = useTranslation();

  const recentFiles = [
    { name: 'Q1-Report.pdf', size: '2.4 MB', downloads: 12, sharedBy: 'Sarah Johnson', date: 'March 10, 2024' },
    { name: 'Brand-Assets.zip', size: '48 MB', downloads: 5, sharedBy: 'Michael Brown', date: 'March 8, 2024' },
    { name: 'Meeting-Notes.docx', size: '156 KB', downloads: 28, sharedBy: 'Emily Davis', date: 'March 12, 2024' },
  ];

  const sharedFiles = [
    { name: 'Design-Mockups.fig', size: '8.2 MB', sharedBy: 'David Wilson', date: 'March 5, 2024' },
    { name: 'API-Documentation.md', size: '320 KB', sharedBy: 'Lisa Anderson', date: 'March 7, 2024' },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('files.title')}</h1>
        <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>{t('files.upload')}</button>
      </div>

      <div className="content-section">
        <h2>{t('files.recent')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('files.title')}</th>
                <th>{t('files.fileSize', { size: '' }).replace('Size: ', '')}</th>
                <th>{t('files.downloadCount', { count: '' }).replace(' times', '')}</th>
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
