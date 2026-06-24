import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';
import { useApi } from '../hooks/useApi';
import { getInbox } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Inbox: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'unread' | 'starred'>('unread');
  const { data, loading, error } = useApi(getInbox);

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div className="page-state" style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          {loading ? <LoadingSpinner /> : <span>{t('common.error', 'Failed to load')}</span>}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('inbox.title')}</h1>
        <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>{t('inbox.compose')}</button>
      </div>

      <div className="content-section">
        <div className="section-header">
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button
              className={`btn ${activeTab === 'unread' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('unread')}
            >
              {t('inbox.unread')}
            </button>
            <button
              className={`btn ${activeTab === 'starred' ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setActiveTab('starred')}
            >
              {t('inbox.starred')}
            </button>
          </div>
        </div>

        <div className="settings-group">
          {data.messages.map((msg) => (
            <div key={msg.id} className="setting-item">
              <div className="setting-info">
                <div className="setting-label">
                  <Trans
                    i18nKey="inbox.newMessage"
                    values={{ senderName: msg.sender }}
                    components={{ strong: <strong /> }}
                  />
                </div>
                <div className="setting-description">
                  <Trans
                    i18nKey="inbox.replyTo"
                    values={{ subject: msg.subject }}
                    components={{ em: <em /> }}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', fontSize: '0.875rem', color: '#666' }}>
                {msg.attachments > 0 && (
                  <span>
                    <Trans
                      i18nKey="inbox.attachments"
                      values={{ count: msg.attachments }}
                      components={{ strong: <strong /> }}
                    />
                  </span>
                )}
                <span>
                  <Trans
                    i18nKey="inbox.threadCount"
                    values={{ count: msg.replies }}
                    components={{ em: <em /> }}
                  />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Mentions</h2>
        <div className="settings-group">
          {data.mentions.map((mention, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <div className="setting-description">
                  <Trans
                    i18nKey="inbox.mentionedYou"
                    values={{ userName: mention.userName, channel: mention.channel }}
                    components={{ strong: <strong />, link: <a href="#channel" /> }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-description" style={{ textAlign: 'center', padding: '2rem 0' }}>
              <Trans
                i18nKey="inbox.emptyState"
                components={{ link: <a href="#compose" /> }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Inbox;
