import React, { useMemo, useState } from 'react';
import {
  Plus,
  Trash2,
  RotateCcw,
  Save,
  Wallet,
  PiggyBank,
  AlertTriangle,
} from 'lucide-react';
import './Pages.css';
import './BudgetPlanner.css';

type Period = 'monthly' | 'quarterly' | 'yearly';
type Template = 'conservative' | 'balanced' | 'aggressive' | 'custom';
type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY';
type ExpenseType = 'recurring' | 'variable' | 'oneTime';

interface Category {
  id: string;
  name: string;
  percent: number;
  color: string;
}

const CURRENCY_SYMBOL: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
};

const PALETTE = [
  '#3b82f6',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#14b8a6',
  '#64748b',
];

const TEMPLATES: Record<Exclude<Template, 'custom'>, Category[]> = {
  conservative: [
    { id: 'housing', name: 'Housing', percent: 35, color: '#3b82f6' },
    { id: 'food', name: 'Food', percent: 15, color: '#10b981' },
    { id: 'transport', name: 'Transport', percent: 10, color: '#f59e0b' },
    { id: 'savings', name: 'Savings', percent: 25, color: '#8b5cf6' },
    { id: 'leisure', name: 'Leisure', percent: 15, color: '#ec4899' },
  ],
  balanced: [
    { id: 'housing', name: 'Housing', percent: 30, color: '#3b82f6' },
    { id: 'food', name: 'Food', percent: 15, color: '#10b981' },
    { id: 'transport', name: 'Transport', percent: 15, color: '#f59e0b' },
    { id: 'savings', name: 'Savings', percent: 20, color: '#8b5cf6' },
    { id: 'leisure', name: 'Leisure', percent: 20, color: '#ec4899' },
  ],
  aggressive: [
    { id: 'housing', name: 'Housing', percent: 25, color: '#3b82f6' },
    { id: 'food', name: 'Food', percent: 10, color: '#10b981' },
    { id: 'transport', name: 'Transport', percent: 10, color: '#f59e0b' },
    { id: 'investments', name: 'Investments', percent: 35, color: '#14b8a6' },
    { id: 'leisure', name: 'Leisure', percent: 20, color: '#ec4899' },
  ],
};

const TEMPLATE_LABELS: Record<Template, { title: string; desc: string }> = {
  conservative: { title: 'Conservative', desc: 'Steady savings, low risk' },
  balanced: { title: 'Balanced', desc: 'Even spread across life areas' },
  aggressive: { title: 'Aggressive', desc: 'Heavy investing focus' },
  custom: { title: 'Custom', desc: 'Start from scratch' },
};

const formatCurrency = (amount: number, currency: Currency) => {
  const symbol = CURRENCY_SYMBOL[currency];
  return `${symbol}${amount.toLocaleString(undefined, {
    maximumFractionDigits: currency === 'JPY' ? 0 : 0,
  })}`;
};

const BudgetPlanner: React.FC = () => {
  const [income, setIncome] = useState(5000);
  const [currency, setCurrency] = useState<Currency>('USD');
  const [period, setPeriod] = useState<Period>('monthly');
  const [template, setTemplate] = useState<Template>('balanced');
  const [categories, setCategories] = useState<Category[]>(TEMPLATES.balanced);
  const [savingsGoal, setSavingsGoal] = useState(20);
  const [autoRebalance, setAutoRebalance] = useState(true);
  const [alerts, setAlerts] = useState(true);
  const [expenseFilters, setExpenseFilters] = useState<
    Record<ExpenseType, boolean>
  >({
    recurring: true,
    variable: true,
    oneTime: false,
  });
  const [newCategoryName, setNewCategoryName] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const periodMultiplier =
    period === 'monthly' ? 1 : period === 'quarterly' ? 3 : 12;
  const periodIncome = income * periodMultiplier;

  const totalAllocated = useMemo(
    () => categories.reduce((sum, c) => sum + c.percent, 0),
    [categories]
  );
  const remaining = 100 - totalAllocated;
  const overBudget = totalAllocated > 100;

  const showToast = (msg: string) => {
    setToast(msg);
    window.clearTimeout((showToast as any)._tid);
    (showToast as any)._tid = window.setTimeout(() => setToast(null), 2200);
  };

  const applyTemplate = (next: Template) => {
    setTemplate(next);
    if (next !== 'custom') {
      setCategories(TEMPLATES[next].map((c) => ({ ...c })));
    } else {
      setCategories([]);
    }
  };

  const updateCategoryPercent = (id: string, percent: number) => {
    setCategories((prev) => {
      const target = prev.find((c) => c.id === id);
      if (!target) return prev;
      const delta = percent - target.percent;
      if (!autoRebalance) {
        return prev.map((c) => (c.id === id ? { ...c, percent } : c));
      }
      const others = prev.filter((c) => c.id !== id);
      const othersTotal = others.reduce((s, c) => s + c.percent, 0);
      if (othersTotal <= 0) {
        return prev.map((c) => (c.id === id ? { ...c, percent } : c));
      }
      return prev.map((c) => {
        if (c.id === id) return { ...c, percent };
        const share = c.percent / othersTotal;
        const adjusted = Math.max(0, c.percent - delta * share);
        return { ...c, percent: Math.round(adjusted) };
      });
    });
    setTemplate('custom');
  };

  const updateCategoryColor = (id: string, color: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.id === id ? { ...c, color } : c))
    );
  };

  const removeCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setTemplate('custom');
  };

  const addCategory = () => {
    const name = newCategoryName.trim();
    if (!name) return;
    const id = `cat-${Date.now()}`;
    const color = PALETTE[categories.length % PALETTE.length];
    const fallbackPercent = Math.max(0, Math.min(10, remaining));
    setCategories((prev) => [
      ...prev,
      { id, name, percent: fallbackPercent, color },
    ]);
    setNewCategoryName('');
    setTemplate('custom');
  };

  const toggleExpenseFilter = (key: ExpenseType) => {
    setExpenseFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const resetPlan = () => {
    setIncome(5000);
    setCurrency('USD');
    setPeriod('monthly');
    setTemplate('balanced');
    setCategories(TEMPLATES.balanced.map((c) => ({ ...c })));
    setSavingsGoal(20);
    setAutoRebalance(true);
    setAlerts(true);
    setExpenseFilters({ recurring: true, variable: true, oneTime: false });
    showToast('Plan reset to defaults');
  };

  const savePlan = () => {
    showToast(`Plan saved — ${categories.length} categories tracked`);
  };

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>Budget Planner</h1>
        <p className="page-subtitle">
          Allocate your income across categories and track savings goals.
        </p>
      </div>

      <div className="content-section">
        <div className="bp-top-grid">
          <div className="form-group bp-no-margin">
            <label>Monthly income</label>
            <div className="bp-income-row">
              <select
                className="filter-select bp-currency-select"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as Currency)}
              >
                {(Object.keys(CURRENCY_SYMBOL) as Currency[]).map((c) => (
                  <option key={c} value={c}>
                    {CURRENCY_SYMBOL[c]} {c}
                  </option>
                ))}
              </select>
              <input
                type="number"
                min={0}
                step={100}
                className="form-input"
                value={income}
                onChange={(e) => setIncome(Number(e.target.value) || 0)}
              />
            </div>
          </div>

          <div className="form-group bp-no-margin">
            <label>Period</label>
            <div className="bp-segmented" role="tablist">
              {(['monthly', 'quarterly', 'yearly'] as Period[]).map((p) => (
                <button
                  key={p}
                  type="button"
                  role="tab"
                  aria-selected={period === p}
                  className={`bp-segmented-btn ${period === p ? 'active' : ''}`}
                  onClick={() => setPeriod(p)}
                >
                  {p[0].toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="bp-income-summary">
            <div className="bp-income-summary-label">
              <Wallet size={16} /> {period[0].toUpperCase() + period.slice(1)}{' '}
              income
            </div>
            <div className="bp-income-summary-value">
              {formatCurrency(periodIncome, currency)}
            </div>
          </div>
        </div>
      </div>

      <div className="content-section">
        <h2>Choose a starting template</h2>
        <div className="bp-template-grid">
          {(Object.keys(TEMPLATE_LABELS) as Template[]).map((key) => (
            <label
              key={key}
              className={`bp-template-card ${template === key ? 'active' : ''}`}
            >
              <input
                type="radio"
                name="template"
                value={key}
                checked={template === key}
                onChange={() => applyTemplate(key)}
              />
              <div className="bp-template-card-title">
                {TEMPLATE_LABELS[key].title}
              </div>
              <div className="bp-template-card-desc">
                {TEMPLATE_LABELS[key].desc}
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className="content-section">
        <div className="bp-section-header">
          <h2>Category allocation</h2>
          <div
            className={`bp-allocation-pill ${
              overBudget ? 'over' : remaining === 0 ? 'exact' : 'under'
            }`}
          >
            {overBudget ? (
              <>
                <AlertTriangle size={14} /> Over by {totalAllocated - 100}%
              </>
            ) : remaining === 0 ? (
              <>Fully allocated</>
            ) : (
              <>{remaining}% remaining</>
            )}
          </div>
        </div>

        <div className="bp-progress-track">
          {categories.map((c) => (
            <div
              key={c.id}
              className="bp-progress-segment"
              style={{
                width: `${Math.min(c.percent, 100)}%`,
                background: c.color,
              }}
              title={`${c.name}: ${c.percent}%`}
            />
          ))}
        </div>

        <div className="bp-categories">
          {categories.length === 0 && (
            <div className="bp-empty">
              No categories yet. Add one below to start planning.
            </div>
          )}
          {categories.map((c) => {
            const amount = (periodIncome * c.percent) / 100;
            return (
              <div key={c.id} className="bp-category-row">
                <div className="bp-category-head">
                  <span
                    className="bp-category-swatch"
                    style={{ background: c.color }}
                  />
                  <span className="bp-category-name">{c.name}</span>
                  <span className="bp-category-amount">
                    {formatCurrency(amount, currency)}
                  </span>
                  <span className="bp-category-percent">{c.percent}%</span>
                  <button
                    type="button"
                    className="bp-icon-btn"
                    aria-label={`Remove ${c.name}`}
                    onClick={() => removeCategory(c.id)}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={c.percent}
                  onChange={(e) =>
                    updateCategoryPercent(c.id, Number(e.target.value))
                  }
                  className="bp-slider"
                  style={{ accentColor: c.color }}
                />
                <div className="bp-color-picker" role="radiogroup">
                  {PALETTE.map((color) => (
                    <button
                      key={color}
                      type="button"
                      role="radio"
                      aria-checked={c.color === color}
                      aria-label={`Color ${color}`}
                      className={`bp-color-dot ${
                        c.color === color ? 'active' : ''
                      }`}
                      style={{ background: color }}
                      onClick={() => updateCategoryColor(c.id, color)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="bp-add-row">
          <input
            type="text"
            className="form-input"
            placeholder="New category name…"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addCategory();
            }}
          />
          <button
            type="button"
            className="btn btn-primary bp-add-btn"
            onClick={addCategory}
            disabled={!newCategoryName.trim()}
          >
            <Plus size={16} /> Add category
          </button>
        </div>
      </div>

      <div className="content-section">
        <h2>Savings & preferences</h2>

        <div className="settings-group">
          <div className="setting-item bp-savings-item">
            <div className="setting-info">
              <div className="setting-label">
                <PiggyBank
                  size={16}
                  style={{ verticalAlign: 'text-bottom', marginRight: 6 }}
                />
                Savings goal
              </div>
              <div className="setting-description">
                Target percentage of income set aside each period.
              </div>
              <input
                type="range"
                min={0}
                max={60}
                value={savingsGoal}
                onChange={(e) => setSavingsGoal(Number(e.target.value))}
                className="bp-slider bp-savings-slider"
              />
            </div>
            <div className="bp-savings-value">
              <div className="bp-savings-percent">{savingsGoal}%</div>
              <div className="bp-savings-amount">
                {formatCurrency(
                  (periodIncome * savingsGoal) / 100,
                  currency
                )}
              </div>
            </div>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Auto-rebalance categories</div>
              <div className="setting-description">
                Adjust other categories proportionally when one slider moves.
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={autoRebalance}
                onChange={(e) => setAutoRebalance(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item">
            <div className="setting-info">
              <div className="setting-label">Over-budget alerts</div>
              <div className="setting-description">
                Notify me when spending exceeds an allocation.
              </div>
            </div>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={alerts}
                onChange={(e) => setAlerts(e.target.checked)}
              />
              <span className="toggle-slider"></span>
            </label>
          </div>

          <div className="setting-item bp-filters-item">
            <div className="setting-info">
              <div className="setting-label">Track expense types</div>
              <div className="setting-description">
                Choose which expense kinds count toward this plan.
              </div>
            </div>
            <div className="bp-checkbox-group">
              {(
                [
                  ['recurring', 'Recurring'],
                  ['variable', 'Variable'],
                  ['oneTime', 'One-time'],
                ] as [ExpenseType, string][]
              ).map(([key, label]) => (
                <label key={key} className="bp-checkbox-pill">
                  <input
                    type="checkbox"
                    checked={expenseFilters[key]}
                    onChange={() => toggleExpenseFilter(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bp-actions">
        <button
          type="button"
          className="btn btn-secondary bp-action-btn"
          onClick={resetPlan}
        >
          <RotateCcw size={16} /> Reset to defaults
        </button>
        <button
          type="button"
          className="btn btn-primary bp-action-btn"
          onClick={savePlan}
          disabled={overBudget}
        >
          <Save size={16} /> Save plan
        </button>
      </div>

      {toast && <div className="task-toast">{toast}</div>}
    </main>
  );
};

export default BudgetPlanner;
