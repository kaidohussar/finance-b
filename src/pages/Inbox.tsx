import React, { useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Inbox: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'unread' | 'starred'>('unread');

  const messages = [
    {
      id: 1,
      sender: 'Sarah Johnson',
      subject: 'Q1 Revenue Report',
      attachments: 3,
      replies: 5,
      unread: true,
    },
    {
      id: 2,
      sender: 'Michael Brown',
      subject: 'Sprint Planning Notes',
      attachments: 1,
      replies: 12,
      unread: true,
    },
    {
      id: 3,
      sender: 'Emily Davis',
      subject: 'Design Review Feedback',
      attachments: 0,
      replies: 8,
      unread: false,
    },
  ];

  const mentions = [
    { userName: 'David Wilson', channel: '#engineering' },
    { userName: 'Lisa Anderson', channel: '#design' },
  ];

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
          {messages.map((msg) => (
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
          {mentions.map((mention, index) => (
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
