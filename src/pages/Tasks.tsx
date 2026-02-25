import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import './Pages.css';

const Tasks: React.FC = () => {
  const { t } = useTranslation();

  const inProgressTasks = [
    { name: 'Update dashboard UI', assignee: 'Sarah Johnson', priority: 'High', subtasksCompleted: 3, subtasksTotal: 5 },
    { name: 'Fix payment gateway', assignee: 'Michael Brown', priority: 'Critical', subtasksCompleted: 1, subtasksTotal: 4 },
    { name: 'Write API docs', assignee: 'Emily Davis', priority: 'Medium', subtasksCompleted: 6, subtasksTotal: 8 },
  ];

  const completedTasks = [
    { taskName: 'Setup CI/CD pipeline', userName: 'David Wilson' },
    { taskName: 'Database migration', userName: 'Lisa Anderson' },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('tasks.title')}</h1>
        <button className="btn btn-primary" style={{ marginTop: '0.5rem' }}>{t('tasks.addTask')}</button>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">
            <Trans
              i18nKey="tasks.dueToday"
              values={{ count: 4 }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('tasks.inProgress')}</div>
          <div className="metric-value">{inProgressTasks.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('tasks.completed')}</div>
          <div className="metric-value">{completedTasks.length}</div>
        </div>
      </div>

      <div className="content-section">
        <div className="setting-item" style={{ backgroundColor: '#fef2f2', borderColor: '#fee2e2' }}>
          <div className="setting-info">
            <div className="setting-description" style={{ color: '#ef4444' }}>
              <Trans
                i18nKey="tasks.overdueTasks"
                values={{ count: 2 }}
                components={{ em: <em />, link: <a href="#review" /> }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('tasks.inProgress')}</h2>
        <div className="settings-group">
          {inProgressTasks.map((task, index) => (
            <div key={index} className="setting-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="setting-label">{task.name}</div>
                <span>
                  <Trans
                    i18nKey="tasks.priority"
                    values={{ level: task.priority }}
                    components={{ strong: <strong /> }}
                  />
                </span>
              </div>
              <div className="setting-description">
                <Trans
                  i18nKey="tasks.assigned"
                  values={{ userName: task.assignee }}
                  components={{ strong: <strong /> }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span className="setting-description">
                  <Trans
                    i18nKey="tasks.subtasks"
                    values={{ completed: task.subtasksCompleted, total: task.subtasksTotal }}
                    components={{ strong: <strong /> }}
                  />
                </span>
                <div style={{ width: '120px', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px' }}>
                  <div
                    style={{
                      width: `${(task.subtasksCompleted / task.subtasksTotal) * 100}%`,
                      height: '100%',
                      backgroundColor: '#3b82f6',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>{t('tasks.completed')}</h2>
        <div className="settings-group">
          {completedTasks.map((task, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <div className="setting-description">
                  <Trans
                    i18nKey="tasks.taskCompleted"
                    values={{ userName: task.userName, taskName: task.taskName }}
                    components={{ strong: <strong />, em: <em /> }}
                  />
                </div>
              </div>
              <span className="status-badge active">{t('tasks.completed')}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Tasks;
