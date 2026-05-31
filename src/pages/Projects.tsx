import React, { useRef, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import NewProjectModal, {
  type NewProjectData,
} from '../components/NewProjectModal';
import './Pages.css';

interface Project {
  name: string;
  creator: string;
  status: string;
  completed: number;
  total: number;
  collaborators: number;
  deadline: string;
  overdueDays: number;
}

const initialProjects: Project[] = [
  {
    name: 'Website Redesign',
    creator: 'Sarah Johnson',
    status: 'In Progress',
    completed: 12,
    total: 20,
    collaborators: 5,
    deadline: 'April 15, 2024',
    overdueDays: 0,
  },
  {
    name: 'Mobile App Launch',
    creator: 'Michael Brown',
    status: 'Planning',
    completed: 3,
    total: 15,
    collaborators: 8,
    deadline: 'June 1, 2024',
    overdueDays: 0,
  },
  {
    name: 'API Integration',
    creator: 'David Wilson',
    status: 'Overdue',
    completed: 7,
    total: 10,
    collaborators: 3,
    deadline: 'March 1, 2024',
    overdueDays: 14,
  },
];

const formatDeadline = (iso: string) => {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

const Projects: React.FC = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [isModalOpen, setModalOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimerRef = useRef<number | undefined>(undefined);

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout(toastTimerRef.current);
    toastTimerRef.current = window.setTimeout(() => setToast(null), 2800);
  };

  const handleCreateProject = (data: NewProjectData) => {
    const newProject: Project = {
      name: data.name,
      creator: 'You',
      status: data.status,
      completed: 0,
      total: data.totalTasks,
      collaborators: data.collaborators,
      deadline: formatDeadline(data.deadline),
      overdueDays: 0,
    };
    setProjects((prev) => [newProject, ...prev]);
    setModalOpen(false);
    showToast(t('projects.modal.successToast', { name: data.name }));
  };

  const recentUpdates = [
    { projectName: 'Website Redesign', userName: 'Sarah Johnson', type: 'created' },
    { projectName: 'API Integration', userName: 'David Wilson', status: 'On Hold', type: 'statusUpdate' },
  ];

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('projects.title')}</h1>
        <button
          className="btn btn-primary"
          style={{ marginTop: '0.5rem' }}
          onClick={() => setModalOpen(true)}
        >
          {t('projects.create')}
        </button>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2>{t('projects.title')}</h2>
          <button className="btn btn-secondary">{t('projects.archive')}</button>
        </div>

        <div className="settings-group">
          {projects.map((project, index) => (
            <div key={index} className="setting-item" style={{ flexDirection: 'column', alignItems: 'stretch', gap: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div className="setting-label">{project.name}</div>
                <span className={`status-badge ${project.status === 'Overdue' ? 'inactive' : 'active'}`}>
                  {project.status}
                </span>
              </div>
              <div className="setting-description">
                <Trans
                  i18nKey="projects.progress"
                  values={{ completed: project.completed, total: project.total }}
                  components={{ strong: <strong /> }}
                />
              </div>
              <div style={{ width: '100%', height: '6px', backgroundColor: '#e5e7eb', borderRadius: '3px' }}>
                <div
                  style={{
                    width: `${project.total > 0 ? (project.completed / project.total) * 100 : 0}%`,
                    height: '100%',
                    backgroundColor: project.overdueDays > 0 ? '#ef4444' : '#3b82f6',
                    borderRadius: '3px',
                  }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#666' }}>
                <span>
                  <Trans
                    i18nKey="projects.collaborators"
                    values={{ count: project.collaborators }}
                    components={{ strong: <strong /> }}
                  />
                </span>
                <span>
                  <Trans
                    i18nKey="projects.deadline"
                    values={{ date: project.deadline }}
                    components={{ strong: <strong /> }}
                  />
                </span>
              </div>
              {project.overdueDays > 0 && (
                <div style={{ color: '#ef4444', fontSize: '0.875rem' }}>
                  <Trans
                    i18nKey="projects.overdue"
                    values={{ days: project.overdueDays }}
                    components={{ em: <em />, link: <a href="#update" /> }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="content-section">
        <h2>Recent Updates</h2>
        <div className="settings-group">
          {recentUpdates.map((update, index) => (
            <div key={index} className="setting-item">
              <div className="setting-info">
                <div className="setting-description">
                  {update.type === 'created' ? (
                    <Trans
                      i18nKey="projects.projectCreated"
                      values={{ projectName: update.projectName, userName: update.userName }}
                      components={{ strong: <strong />, link: <a href="#user" /> }}
                    />
                  ) : (
                    <Trans
                      i18nKey="projects.statusUpdate"
                      values={{ status: update.status, userName: update.userName }}
                      components={{ em: <em />, strong: <strong /> }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && (
        <NewProjectModal
          onClose={() => setModalOpen(false)}
          onCreate={handleCreateProject}
        />
      )}

      {toast && <div className="success-toast">{toast}</div>}
    </main>
  );
};

export default Projects;
