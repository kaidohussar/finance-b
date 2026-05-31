import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';
import './NewProjectModal.css';

export interface NewProjectData {
  name: string;
  description: string;
  status: 'Planning' | 'In Progress' | 'On Hold';
  deadline: string;
  totalTasks: number;
  collaborators: number;
}

interface Props {
  onClose: () => void;
  onCreate: (project: NewProjectData) => void;
}

const NewProjectModal: React.FC<Props> = ({ onClose, onCreate }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState<1 | 2>(1);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<NewProjectData['status']>('Planning');
  const [deadline, setDeadline] = useState('');
  const [totalTasks, setTotalTasks] = useState<string>('');
  const [collaborators, setCollaborators] = useState<string>('');

  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const validateStep1 = () => {
    const next: { [k: string]: string } = {};
    if (!name.trim()) next.name = t('projects.modal.errors.nameRequired');
    if (!status) next.status = t('projects.modal.errors.statusRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const validateStep2 = () => {
    const next: { [k: string]: string } = {};
    if (!deadline) next.deadline = t('projects.modal.errors.deadlineRequired');
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) setStep(2);
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  const handleCreate = () => {
    if (!validateStep2()) return;
    onCreate({
      name: name.trim(),
      description: description.trim(),
      status,
      deadline,
      totalTasks: Number(totalTasks) || 0,
      collaborators: Number(collaborators) || 1,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="new-project-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <div className="modal-header-title">
            <h2 id="new-project-modal-title">
              {t('projects.modal.title')}
            </h2>
            <div className="modal-step-indicator">
              {t('projects.modal.stepIndicator', { current: step, total: 2 })}
              {' · '}
              {step === 1
                ? t('projects.modal.step1Title')
                : t('projects.modal.step2Title')}
            </div>
          </div>
          <button
            className="modal-close"
            onClick={onClose}
            aria-label={t('projects.modal.close')}
            type="button"
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-progress">
          <div className="modal-progress-bar active" />
          <div className={`modal-progress-bar${step === 2 ? ' active' : ''}`} />
        </div>

        <div className="modal-body">
          {step === 1 && (
            <>
              <div className="form-group">
                <label htmlFor="np-name">
                  {t('projects.modal.fields.name')}
                  <span className="required">*</span>
                </label>
                <input
                  id="np-name"
                  type="text"
                  className={`form-input${errors.name ? ' has-error' : ''}`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t('projects.modal.placeholders.name')}
                  autoFocus
                />
                {errors.name && <div className="form-error">{errors.name}</div>}
              </div>

              <div className="form-group">
                <label htmlFor="np-description">
                  {t('projects.modal.fields.description')}
                  <span className="optional">
                    ({t('projects.modal.optional')})
                  </span>
                </label>
                <textarea
                  id="np-description"
                  className="form-textarea"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder={t('projects.modal.placeholders.description')}
                />
              </div>

              <div className="form-group">
                <label htmlFor="np-status">
                  {t('projects.modal.fields.status')}
                  <span className="required">*</span>
                </label>
                <select
                  id="np-status"
                  className={`form-select${errors.status ? ' has-error' : ''}`}
                  value={status}
                  onChange={(e) =>
                    setStatus(e.target.value as NewProjectData['status'])
                  }
                >
                  <option value="Planning">
                    {t('projects.modal.statuses.planning')}
                  </option>
                  <option value="In Progress">
                    {t('projects.modal.statuses.inProgress')}
                  </option>
                  <option value="On Hold">
                    {t('projects.modal.statuses.onHold')}
                  </option>
                </select>
                {errors.status && (
                  <div className="form-error">{errors.status}</div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="form-group">
                <label htmlFor="np-deadline">
                  {t('projects.modal.fields.deadline')}
                  <span className="required">*</span>
                </label>
                <input
                  id="np-deadline"
                  type="date"
                  className={`form-input${errors.deadline ? ' has-error' : ''}`}
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                />
                {errors.deadline && (
                  <div className="form-error">{errors.deadline}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="np-total-tasks">
                  {t('projects.modal.fields.totalTasks')}
                  <span className="optional">
                    ({t('projects.modal.optional')})
                  </span>
                </label>
                <input
                  id="np-total-tasks"
                  type="number"
                  min={0}
                  className="form-input"
                  value={totalTasks}
                  onChange={(e) => setTotalTasks(e.target.value)}
                  placeholder="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="np-collaborators">
                  {t('projects.modal.fields.collaborators')}
                  <span className="optional">
                    ({t('projects.modal.optional')})
                  </span>
                </label>
                <input
                  id="np-collaborators"
                  type="number"
                  min={1}
                  className="form-input"
                  value={collaborators}
                  onChange={(e) => setCollaborators(e.target.value)}
                  placeholder="1"
                />
              </div>
            </>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="btn btn-link"
            type="button"
            onClick={onClose}
          >
            {t('projects.modal.cancel')}
          </button>
          <div className="modal-footer-right">
            {step === 2 && (
              <button
                className="btn btn-secondary"
                type="button"
                onClick={handleBack}
              >
                {t('projects.modal.back')}
              </button>
            )}
            {step === 1 ? (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleNext}
              >
                {t('projects.modal.next')}
              </button>
            ) : (
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleCreate}
              >
                {t('projects.modal.createProject')}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProjectModal;
