import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';
import { useApi } from '../hooks/useApi';
import { getTeam } from '../utils/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Team: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error } = useApi(getTeam);

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
        <h1>{t('team.title')}</h1>
        <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>{t('team.invite')}</button>
      </div>

      <div className="content-section">
        <div className="setting-item">
          <div className="setting-info">
            <div className="setting-label">
              <Trans
                i18nKey="team.teamSize"
                values={{ count: data.members.length, departments: data.departments }}
                components={{ strong: <strong />, em: <em /> }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('team.title')}</h2>
        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.members.map((member, index) => (
                <tr key={index}>
                  <td>{member.name}</td>
                  <td>{member.email}</td>
                  <td>{member.role}</td>
                  <td><span className="status-badge active">{member.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('team.pending')}</h2>
        <div className="settings-group">
          {data.pendingInvites.map((invite, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <div className="setting-description">
                  {invite.expired ? (
                    <Trans
                      i18nKey="team.inviteExpired"
                      values={{ email: invite.email }}
                      components={{ strong: <strong />, link: <a href="#resend" /> }}
                    />
                  ) : (
                    <Trans
                      i18nKey="team.inviteSent"
                      values={{ email: invite.email }}
                      components={{ strong: <strong /> }}
                    />
                  )}
                </div>
              </div>
              {invite.expired && (
                <span className="status-badge inactive">Expired</span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Recent Activity</h2>
        <div className="settings-group">
          {data.recentActivity.map((activity, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <div className="setting-description">
                  {activity.type === 'joined' && (
                    <Trans
                      i18nKey="team.memberJoined"
                      values={{ userName: activity.userName }}
                      components={{ strong: <strong /> }}
                    />
                  )}
                  {activity.type === 'roleChanged' && (
                    <Trans
                      i18nKey="team.roleChanged"
                      values={{ userName: activity.userName, role: activity.role }}
                      components={{ strong: <strong />, em: <em /> }}
                    />
                  )}
                  {activity.type === 'removed' && (
                    <Trans
                      i18nKey="team.memberRemoved"
                      values={{ userName: activity.userName, adminName: activity.adminName }}
                      components={{ strong: <strong />, em: <em /> }}
                    />
                  )}
                  {activity.type === 'invited' && (
                    <Trans
                      i18nKey="team.inviteSent"
                      values={{ email: activity.email }}
                      components={{ strong: <strong /> }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Team;
