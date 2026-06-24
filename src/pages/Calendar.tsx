import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';
import { useApi } from '../hooks/useApi';
import { getCalendar } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Calendar: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getCalendar);

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
              {data.events.map((event, index) => (
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
