import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
import LanguageSelector from '../components/LanguageSelector';
import './Landing.css';

const Landing: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    { icon: '📊', key: 'analytics' },
    { icon: '🔒', key: 'security' },
    { icon: '⚡', key: 'performance' },
    { icon: '🌍', key: 'global' },
    { icon: '📱', key: 'mobile' },
    { icon: '🤝', key: 'support' },
  ];

  const testimonials = [
    { key: 'testimonial1', avatar: 'JD' },
    { key: 'testimonial2', avatar: 'SK' },
    { key: 'testimonial3', avatar: 'MR' },
  ];

  return (
    <div className="landing-page">
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <span className="logo-icon">💰</span>
            <span className="logo-text">FinanceB</span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">{t('landing.nav.features')}</a>
            <a href="#testimonials">{t('landing.nav.testimonials')}</a>
            <a href="#pricing">{t('landing.nav.pricing')}</a>
            <LanguageSelector />
            <Link to="/login" className="nav-login-btn">
              {t('landing.nav.login')}
            </Link>
          </div>
        </div>
      </nav>

      <section className="hero-section">
        <div className="hero-content">
          <h1>{t('landing.hero.title')}</h1>
          <p className="hero-subtitle">{t('landing.hero.subtitle')}</p>
          <div className="hero-actions">
            <Link to="/login" className="btn-hero-primary">
              {t('landing.hero.cta')}
            </Link>
            <a href="#features" className="btn-hero-secondary">
              {t('landing.hero.learnMore')}
            </a>
          </div>
          <p className="hero-note">{t('landing.hero.note')}</p>
        </div>
        <div className="hero-visual">
          <div className="hero-dashboard-preview">
            <div className="preview-header">
              <span className="preview-dot red" />
              <span className="preview-dot yellow" />
              <span className="preview-dot green" />
            </div>
            <div className="preview-content">
              <div className="preview-stat">
                <span className="preview-stat-label">{t('landing.hero.preview.revenue')}</span>
                <span className="preview-stat-value">$48,562</span>
                <span className="preview-stat-change up">+12.5%</span>
              </div>
              <div className="preview-stat">
                <span className="preview-stat-label">{t('landing.hero.preview.users')}</span>
                <span className="preview-stat-value">2,847</span>
                <span className="preview-stat-change up">+8.2%</span>
              </div>
              <div className="preview-chart">
                <div className="chart-bar" style={{ height: '40%' }} />
                <div className="chart-bar" style={{ height: '65%' }} />
                <div className="chart-bar" style={{ height: '45%' }} />
                <div className="chart-bar" style={{ height: '80%' }} />
                <div className="chart-bar" style={{ height: '55%' }} />
                <div className="chart-bar" style={{ height: '90%' }} />
                <div className="chart-bar" style={{ height: '70%' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section" id="features">
        <h2>{t('landing.features.title')}</h2>
        <p className="section-subtitle">{t('landing.features.subtitle')}</p>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.key} className="feature-card">
              <span className="feature-icon">{feature.icon}</span>
              <h3>{t(`landing.features.${feature.key}.title`)}</h3>
              <p>{t(`landing.features.${feature.key}.description`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="testimonials-section" id="testimonials">
        <h2>{t('landing.testimonials.title')}</h2>
        <p className="section-subtitle">{t('landing.testimonials.subtitle')}</p>
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.key} className="testimonial-card">
              <p className="testimonial-quote">
                "{t(`landing.testimonials.${item.key}.quote`)}"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{item.avatar}</div>
                <div>
                  <div className="testimonial-name">
                    {t(`landing.testimonials.${item.key}.name`)}
                  </div>
                  <div className="testimonial-role">
                    {t(`landing.testimonials.${item.key}.role`)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="pricing-section" id="pricing">
        <h2>{t('landing.pricing.title')}</h2>
        <p className="section-subtitle">{t('landing.pricing.subtitle')}</p>
        <div className="pricing-grid">
          <div className="pricing-card">
            <h3>{t('landing.pricing.starter.name')}</h3>
            <div className="pricing-price">
              <span className="price-amount">$9</span>
              <span className="price-period">/{t('landing.pricing.period')}</span>
            </div>
            <ul className="pricing-features">
              <li>{t('landing.pricing.starter.feature1')}</li>
              <li>{t('landing.pricing.starter.feature2')}</li>
              <li>{t('landing.pricing.starter.feature3')}</li>
            </ul>
            <Link to="/login" className="btn-pricing">
              {t('landing.pricing.cta')}
            </Link>
          </div>
          <div className="pricing-card popular">
            <div className="popular-badge">{t('landing.pricing.popular')}</div>
            <h3>{t('landing.pricing.pro.name')}</h3>
            <div className="pricing-price">
              <span className="price-amount">$29</span>
              <span className="price-period">/{t('landing.pricing.period')}</span>
            </div>
            <ul className="pricing-features">
              <li>{t('landing.pricing.pro.feature1')}</li>
              <li>{t('landing.pricing.pro.feature2')}</li>
              <li>{t('landing.pricing.pro.feature3')}</li>
              <li>{t('landing.pricing.pro.feature4')}</li>
            </ul>
            <Link to="/login" className="btn-pricing primary">
              {t('landing.pricing.cta')}
            </Link>
          </div>
          <div className="pricing-card">
            <h3>{t('landing.pricing.enterprise.name')}</h3>
            <div className="pricing-price">
              <span className="price-amount">$99</span>
              <span className="price-period">/{t('landing.pricing.period')}</span>
            </div>
            <ul className="pricing-features">
              <li>{t('landing.pricing.enterprise.feature1')}</li>
              <li>{t('landing.pricing.enterprise.feature2')}</li>
              <li>{t('landing.pricing.enterprise.feature3')}</li>
              <li>{t('landing.pricing.enterprise.feature4')}</li>
            </ul>
            <Link to="/login" className="btn-pricing">
              {t('landing.pricing.cta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>{t('landing.cta.title')}</h2>
        <p>
          <Trans
            i18nKey="landing.cta.description"
            components={{ strong: <strong /> }}
          />
        </p>
        <Link to="/login" className="btn-hero-primary">
          {t('landing.cta.button')}
        </Link>
      </section>

      <footer className="landing-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="logo-icon">💰</span>
            <span className="logo-text">FinanceB</span>
            <p>{t('landing.footer.description')}</p>
          </div>
          <div className="footer-links">
            <div className="footer-col">
              <h4>{t('landing.footer.product')}</h4>
              <a href="#features">{t('landing.nav.features')}</a>
              <a href="#pricing">{t('landing.nav.pricing')}</a>
            </div>
            <div className="footer-col">
              <h4>{t('landing.footer.company')}</h4>
              <a href="#about">{t('landing.footer.about')}</a>
              <a href="#contact">{t('landing.footer.contact')}</a>
            </div>
            <div className="footer-col">
              <h4>{t('landing.footer.legal')}</h4>
              <a href="#privacy">{t('landing.footer.privacy')}</a>
              <a href="#terms">{t('landing.footer.terms')}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>{t('landing.footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
