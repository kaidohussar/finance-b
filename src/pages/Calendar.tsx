import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Calendar: React.FC = () => {
  const { t } = useTranslation();

  const events = [
    {
      name: 'Team Standup',
      date: 'March 15, 2024',
      confirmed: 8,
      pending: 2,
      frequency: 'daily',
      endDate: 'December 31, 2024',
    },
    {
      name: 'Sprint Planning',
      date: 'March 18, 2024',
      confirmed: 12,
      pending: 3,
      frequency: 'bi-weekly',
      endDate: 'June 30, 2024',
    },
    {
      name: 'Product Review',
      date: 'March 20, 2024',
      confirmed: 5,
      pending: 1,
      frequency: 'weekly',
      endDate: 'March 20, 2025',
    },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('calendar.title')}</h1>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2>{t('calendar.today')}</h2>
        </div>
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">
              <Trans
                i18nKey="calendar.reminder"
                values={{ eventName: 'Team Standup', time: '15 minutes' }}
                components={{ strong: <strong />, em: <em /> }}
              />
            </div>
          </div>
        </div>
        <div className="setting-item" style={{ marginTop: '0.5rem' }}>
          <div className="setting-info">
            <div className="setting-description">
              <Trans
                i18nKey="calendar.conflict"
                values={{ conflictingEvent: 'Design Review' }}
                components={{ link: <a href="#event" /> }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('calendar.upcoming')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('calendar.title')}</th>
                <th>{t('calendar.attendees', { confirmed: '', pending: '' }).includes('confirmed') ? 'Attendees' : 'Attendees'}</th>
                <th>{t('calendar.recurring', { frequency: '', endDate: '' }).includes('Repeats') ? 'Schedule' : 'Schedule'}</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={index}>
                  <td>
                    <div className="setting-label">
                      <Trans
                        i18nKey="calendar.eventCreated"
                        values={{ eventName: event.name, date: event.date }}
                        components={{ strong: <strong />, em: <em /> }}
                      />
                    </div>
                  </td>
                  <td>
                    <Trans
                      i18nKey="calendar.attendees"
                      values={{ confirmed: event.confirmed, pending: event.pending }}
                      components={{ strong: <strong />, em: <em /> }}
                    />
                  </td>
                  <td>
                    <Trans
                      i18nKey="calendar.recurring"
                      values={{ frequency: event.frequency, endDate: event.endDate }}
                      components={{ em: <em />, strong: <strong /> }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-description">
              <Trans
                i18nKey="calendar.noEvents"
                values={{ date: 'March 16, 2024' }}
                components={{ strong: <strong /> }}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calendar;
