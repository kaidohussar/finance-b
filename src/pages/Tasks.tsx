import React, { useMemo, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { ChevronDown, Check, ArrowUpDown } from 'lucide-react';
import TaskActionsMenu from '../components/TaskActionsMenu';
import type { TaskAction } from '../components/TaskActionsMenu';
import {
  getTasks,
  completeTask,
  duplicateTask,
  deleteTask,
  editTask,
} from '../utils/api';
import type { InProgressTask } from '../utils/api';
import { useApi } from '../hooks/useApi';
import LoadingSpinner from '../components/LoadingSpinner';
import './Pages.css';

type Priority = 'Critical' | 'High' | 'Medium' | 'Low';

type SortKey = 'priority' | 'assignee' | 'progress' | 'name';

const priorityRank: Record<Priority, number> = {
  Critical: 0,
  High: 1,
  Medium: 2,
  Low: 3,
};

const Tasks: React.FC = () => {
  const { t } = useTranslation();
  const { data, loading, error, setData } = useApi(getTasks);
  const [sortKey, setSortKey] = useState<SortKey>('priority');
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout((showToast as any)._tid);
    (showToast as any)._tid = window.setTimeout(() => setToast(null), 2200);
  };

  const inProgress = data?.inProgress ?? [];

  const sortedInProgress = useMemo(() => {
    const tasks = [...inProgress];
    switch (sortKey) {
      case 'priority':
        return tasks.sort(
          (a, b) => priorityRank[a.priority] - priorityRank[b.priority]
        );
      case 'assignee':
        return tasks.sort((a, b) => a.assignee.localeCompare(b.assignee));
      case 'name':
        return tasks.sort((a, b) => a.name.localeCompare(b.name));
      case 'progress':
        return tasks.sort(
          (a, b) =>
            b.subtasksCompleted / b.subtasksTotal -
            a.subtasksCompleted / a.subtasksTotal
        );
      default:
        return tasks;
    }
  }, [inProgress, sortKey]);

  const sortLabels: Record<SortKey, string> = {
    priority: 'Priority',
    assignee: 'Assignee',
    progress: 'Progress',
    name: 'Name',
  };

  const handleTaskAction = async (task: InProgressTask, action: TaskAction) => {
    try {
      switch (action) {
        case 'complete': {
          const res = await completeTask(task.id);
          setData((prev) => ({ ...prev!, ...res }));
          showToast(`Marked "${task.name}" as complete`);
          break;
        }
        case 'edit':
          await editTask(task.id);
          showToast(`Opening editor for "${task.name}"`);
          break;
        case 'duplicate': {
          const res = await duplicateTask(task.id);
          setData((prev) => ({ ...prev!, ...res }));
          showToast(`Duplicated "${task.name}"`);
          break;
        }
        case 'delete': {
          const res = await deleteTask(task.id);
          setData((prev) => ({ ...prev!, ...res }));
          showToast(`Deleted "${task.name}"`);
          break;
        }
      }
    } catch {
      showToast(t('common.error', 'Failed to load'));
    }
  };

  if (loading || error || !data) {
    return (
      <main className="page-content">
        <div
          style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}
        >
          {loading ? (
            <LoadingSpinner />
          ) : (
            <span>{t('common.error', 'Failed to load')}</span>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('tasks.title')}</h1>
        <div
          style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '0.5rem',
            alignItems: 'center',
          }}
        >
          <button className="btn btn-primary">{t('tasks.addTask')}</button>

          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="task-sort-trigger" aria-label="Sort tasks">
                <ArrowUpDown size={14} />
                Sort: {sortLabels[sortKey]}
                <ChevronDown size={14} className="chevron" />
              </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="dropdown-menu-content"
                sideOffset={6}
                align="start"
              >
                <div className="dropdown-menu-label">Sort by</div>
                <DropdownMenu.RadioGroup
                  value={sortKey}
                  onValueChange={(v) => setSortKey(v as SortKey)}
                >
                  {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                    <DropdownMenu.RadioItem
                      key={key}
                      value={key}
                      className="dropdown-menu-radio-item"
                    >
                      <DropdownMenu.ItemIndicator className="dropdown-menu-item-indicator">
                        <Check size={14} />
                      </DropdownMenu.ItemIndicator>
                      {sortLabels[key]}
                    </DropdownMenu.RadioItem>
                  ))}
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <div className="metric-label">
            <Trans
              i18nKey="tasks.dueToday"
              values={{ count: data.dueToday }}
              components={{ strong: <strong /> }}
            />
          </div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('tasks.inProgress')}</div>
          <div className="metric-value">{inProgress.length}</div>
        </div>
        <div className="metric-card">
          <div className="metric-label">{t('tasks.completed')}</div>
          <div className="metric-value">{data.completed.length}</div>
        </div>
      </div>

      <div className="content-section">
        <div
          className="setting-item"
          style={{ backgroundColor: '#fef2f2', borderColor: '#fee2e2' }}
        >
          <div className="setting-info">
            <div className="setting-description" style={{ color: '#ef4444' }}>
              <Trans
                i18nKey="tasks.overdueTasks"
                values={{ count: data.overdue }}
                components={{ em: <em />, link: <a href="#review" /> }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>{t('tasks.inProgress')}</h2>
        <div className="settings-group">
          {sortedInProgress.map((task) => (
            <div key={task.id} className="task-row">
              <div
                className="setting-item"
                style={{
                  flexDirection: 'column',
                  alignItems: 'stretch',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
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
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span className="setting-description">
                    <Trans
                      i18nKey="tasks.subtasks"
                      values={{
                        completed: task.subtasksCompleted,
                        total: task.subtasksTotal,
                      }}
                      components={{ strong: <strong /> }}
                    />
                  </span>
                  <div
                    style={{
                      width: '120px',
                      height: '6px',
                      backgroundColor: '#e5e7eb',
                      borderRadius: '3px',
                    }}
                  >
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
              <div className="task-row-actions">
                <TaskActionsMenu
                  taskName={task.name}
                  onAction={(action) => handleTaskAction(task, action)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>{t('tasks.completed')}</h2>
        <div className="settings-group">
          {data.completed.map((task) => (
            <div key={task.id} className="setting-item">
              <div className="setting-info">
                <div className="setting-description">
                  <Trans
                    i18nKey="tasks.taskCompleted"
                    values={{
                      userName: task.userName,
                      taskName: task.taskName,
                    }}
                    components={{ strong: <strong />, em: <em /> }}
                  />
                </div>
              </div>
              <span className="status-badge active">
                {t('tasks.completed')}
              </span>
            </div>
          ))}
        </div>
      </div>

      {toast && <div className="task-toast">{toast}</div>}
    </main>
  );
};

export default Tasks;
