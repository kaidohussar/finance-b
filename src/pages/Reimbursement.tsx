import React, { useMemo, useState } from 'react';
import { useTranslation, Trans } from 'react-i18next';
import { submitReimbursement, type Reimbursement } from '../utils/api';
import './Pages.css';
import './Reimbursement.css';

const CATEGORIES = ['travel', 'meals', 'equipment', 'software', 'other'];

const ReimbursementPage: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenseDate, setExpenseDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<Reimbursement | null>(null);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: 'USD',
      }),
    [i18n.language]
  );

  const validate = () => {
    const next: { [k: string]: string } = {};
    if (!description.trim()) {
      next.description = t('reimbursement.errors.descriptionRequired');
    }
    const parsedAmount = Number(amount);
    if (!amount.trim()) {
      next.amount = t('reimbursement.errors.amountRequired');
    } else if (!Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      next.amount = t('reimbursement.errors.amountInvalid');
    }
    if (!category) {
      next.category = t('reimbursement.errors.categoryRequired');
    }
    if (!expenseDate) {
      next.expenseDate = t('reimbursement.errors.dateRequired');
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      const created = await submitReimbursement({
        description: description.trim(),
        amount: Number(amount),
        category,
        expenseDate,
        notes: notes.trim(),
      });
      setResult(created);
    } catch {
      setErrors({ submit: t('reimbursement.errors.submitFailed') });
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setDescription('');
    setAmount('');
    setCategory('');
    setExpenseDate('');
    setNotes('');
    setErrors({});
    setResult(null);
  };

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('reimbursement.title')}</h1>
        <p className="page-subtitle">{t('reimbursement.subtitle')}</p>
      </div>

      <div className="content-section reimbursement-panel">
        {!result ? (
          <>
            <h2>{t('reimbursement.form.title')}</h2>
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="rb-description">
                  {t('reimbursement.form.description')}
                  <span className="required">*</span>
                </label>
                <input
                  id="rb-description"
                  type="text"
                  className={`form-input${errors.description ? ' has-error' : ''}`}
                  placeholder={t('reimbursement.form.descriptionPlaceholder')}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                {errors.description && (
                  <div className="form-error">{errors.description}</div>
                )}
              </div>

              <div className="reimbursement-row">
                <div className="form-group">
                  <label htmlFor="rb-amount">
                    {t('reimbursement.form.amount')}
                    <span className="required">*</span>
                  </label>
                  <input
                    id="rb-amount"
                    type="number"
                    min="0"
                    step="0.01"
                    className={`form-input${errors.amount ? ' has-error' : ''}`}
                    placeholder={t('reimbursement.form.amountPlaceholder')}
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  {errors.amount && (
                    <div className="form-error">{errors.amount}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="rb-date">
                    {t('reimbursement.form.expenseDate')}
                    <span className="required">*</span>
                  </label>
                  <input
                    id="rb-date"
                    type="date"
                    className={`form-input${errors.expenseDate ? ' has-error' : ''}`}
                    value={expenseDate}
                    onChange={(e) => setExpenseDate(e.target.value)}
                  />
                  {errors.expenseDate && (
                    <div className="form-error">{errors.expenseDate}</div>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rb-category">
                  {t('reimbursement.form.category')}
                  <span className="required">*</span>
                </label>
                <select
                  id="rb-category"
                  className={`form-input${errors.category ? ' has-error' : ''}`}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">
                    {t('reimbursement.form.categoryPlaceholder')}
                  </option>
                  {CATEGORIES.map((key) => (
                    <option key={key} value={key}>
                      {t(`reimbursement.categories.${key}`)}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="form-error">{errors.category}</div>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="rb-notes">
                  {t('reimbursement.form.notes')}
                </label>
                <textarea
                  id="rb-notes"
                  className="form-input reimbursement-notes"
                  placeholder={t('reimbursement.form.notesPlaceholder')}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>

              {errors.submit && (
                <div className="form-error">{errors.submit}</div>
              )}

              <button type="submit" className="btn btn-primary" disabled={submitting}>
                {submitting
                  ? t('reimbursement.form.submitting')
                  : t('reimbursement.form.submit')}
              </button>
            </form>
          </>
        ) : (
          <div className="reimbursement-success">
            <div className="reimbursement-success-icon">✅</div>
            <h2>{t('reimbursement.success.title')}</h2>
            <p>
              <Trans
                i18nKey="reimbursement.success.message"
                values={{ reference: result.reference }}
                components={{ strong: <strong /> }}
              />
            </p>

            <div className="reimbursement-summary">
              <h3>{t('reimbursement.success.summaryTitle')}</h3>
              <div className="reimbursement-summary-row">
                <span>{t('reimbursement.form.description')}</span>
                <span>{result.description}</span>
              </div>
              <div className="reimbursement-summary-row">
                <span>{t('reimbursement.form.amount')}</span>
                <span>{currency.format(result.amount)}</span>
              </div>
              <div className="reimbursement-summary-row">
                <span>{t('reimbursement.form.category')}</span>
                <span>{t(`reimbursement.categories.${result.category}`)}</span>
              </div>
              <div className="reimbursement-summary-row">
                <span>{t('reimbursement.form.expenseDate')}</span>
                <span>{result.expenseDate}</span>
              </div>
              {result.notes && (
                <div className="reimbursement-summary-row">
                  <span>{t('reimbursement.form.notes')}</span>
                  <span>{result.notes}</span>
                </div>
              )}
              <div className="reimbursement-summary-row">
                <span>{t('reimbursement.success.status')}</span>
                <span>{t('reimbursement.success.statusValue')}</span>
              </div>
            </div>

            <button type="button" className="btn btn-primary" onClick={handleReset}>
              {t('reimbursement.success.submitAnother')}
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default ReimbursementPage;
