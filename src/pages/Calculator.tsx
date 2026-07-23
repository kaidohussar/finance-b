import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import './Pages.css';
import SliderInput from '../components/SliderInput';

const Calculator: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [loanAmount, setLoanAmount] = useState(25000);
  const [loanTermYears, setLoanTermYears] = useState(5);
  const [interestRate, setInterestRate] = useState(6.5);

  const currency = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0,
      }),
    [i18n.language]
  );

  const currencyExact = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        style: 'currency',
        currency: 'USD',
      }),
    [i18n.language]
  );

  const percentFormat = useMemo(
    () =>
      new Intl.NumberFormat(i18n.language, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
      }),
    [i18n.language]
  );

  const { monthlyPayment, totalPaid, totalInterest } = useMemo(() => {
    const months = loanTermYears * 12;
    const monthlyRate = interestRate / 100 / 12;
    const payment =
      monthlyRate === 0
        ? loanAmount / months
        : (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
    return {
      monthlyPayment: payment,
      totalPaid: payment * months,
      totalInterest: payment * months - loanAmount,
    };
  }, [loanAmount, loanTermYears, interestRate]);

  const principalShare = (loanAmount / totalPaid) * 100;

  return (
    <main className="page-content">
      <div className="page-header">
        <h1>{t('pages.calculator.title')}</h1>
        <p className="page-subtitle">{t('pages.calculator.subtitle')}</p>
      </div>

      <div className="calculator-layout">
        <div className="content-section calculator-panel">
          <h2>{t('pages.calculator.detailsTitle')}</h2>
          <SliderInput
            label={t('pages.calculator.loanAmount')}
            value={loanAmount}
            min={1000}
            max={500000}
            step={1000}
            onChange={setLoanAmount}
            formatValue={(v) => currency.format(v)}
          />
          <SliderInput
            label={t('pages.calculator.loanTerm')}
            value={loanTermYears}
            min={1}
            max={30}
            step={1}
            onChange={setLoanTermYears}
            formatValue={(v) => t('pages.calculator.years', { count: v })}
          />
          <SliderInput
            label={t('pages.calculator.interestRate')}
            value={interestRate}
            min={0}
            max={15}
            step={0.1}
            onChange={setInterestRate}
            formatValue={(v) => `${percentFormat.format(v)}%`}
          />
        </div>

        <div className="content-section calculator-panel">
          <h2>{t('pages.calculator.resultsTitle')}</h2>
          <div className="calculator-monthly">
            <span className="calculator-monthly-label">
              {t('pages.calculator.monthlyPayment')}
            </span>
            <span className="calculator-monthly-value">
              {currencyExact.format(monthlyPayment)}
            </span>
          </div>

          <div
            className="calculator-breakdown-bar"
            role="img"
            aria-label={`${t('pages.calculator.principal')} / ${t('pages.calculator.totalInterest')}`}
          >
            <div
              className="calculator-breakdown-principal"
              style={{ width: `${principalShare}%` }}
            />
          </div>
          <div className="calculator-breakdown-legend">
            <span className="calculator-legend-item">
              <span className="calculator-legend-dot principal" />
              {t('pages.calculator.principal')}
            </span>
            <span className="calculator-legend-item">
              <span className="calculator-legend-dot interest" />
              {t('pages.calculator.totalInterest')}
            </span>
          </div>

          <div className="calculator-result-rows">
            <div className="calculator-result-row">
              <span>{t('pages.calculator.principal')}</span>
              <span>{currency.format(loanAmount)}</span>
            </div>
            <div className="calculator-result-row">
              <span>{t('pages.calculator.totalInterest')}</span>
              <span>{currency.format(totalInterest)}</span>
            </div>
            <div className="calculator-result-row calculator-result-total">
              <span>{t('pages.calculator.totalPaid')}</span>
              <span>{currency.format(totalPaid)}</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Calculator;
