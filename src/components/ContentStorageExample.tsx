import React from 'react';
import { useTranslation, Trans } from 'react-i18next';
import type { ContentRoot } from '../content/content-types';

/**
 * ContentStorageExample Component
 *
 * This component demonstrates how to use ContentStorage-managed translations
 * with full TypeScript type safety.
 */
const ContentStorageExample: React.FC = () => {
  const { t } = useTranslation();

  // Type-safe translation function
  const typedT = (key: keyof ContentRoot) => t(key);

  return (
    <div className="contentstorage-examples">
      <h1>ContentStorage Integration Examples</h1>

      {/* Example 1: Type-Safe Simple Translation */}
      <section>
        <h2>1. Type-Safe Simple Translation</h2>
        <p>
          {/* ✅ TypeScript knows these keys exist */}
          {typedT('header.title')}
        </p>
        <p>
          {/* ❌ Would show TypeScript error if key doesn't exist */}
          {/* typedT('header.invalid') */}
        </p>
        <code>
          <pre>{`const typedT = (key: keyof ContentRoot) => t(key);
typedT('header.title'); // ✅ Type-safe`}</pre>
        </code>
      </section>

      {/* Example 2: Autocomplete Demo */}
      <section>
        <h2>2. TypeScript Autocomplete</h2>
        <div>
          <p>Available keys from ContentStorage:</p>
          <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
            <li><code>{t('activity.title')}</code></li>
            <li><code>{t('chart.title')}</code></li>
            <li><code>{t('common.loading')}</code></li>
            <li><code>{t('header.title')}</code></li>
            <li><code>{t('sidebar.dashboard')}</code></li>
            <li><code>{t('stats.totalRevenue')}</code></li>
          </ul>
          <p>
            Type <code>typedT('</code> and see autocomplete suggestions!
          </p>
        </div>
      </section>

      {/* Example 3: Trans Component with ContentStorage */}
      <section>
        <h2>3. Trans Component with ContentStorage Content</h2>
        <div>
          <Trans
            i18nKey="header.welcomeMessage"
            values={{ userName: 'Developer', count: 5 }}
            components={{
              strong: <strong style={{ color: '#10B981' }} />,
              link: <a href="#notifications" style={{ color: '#3B82F6', textDecoration: 'underline' }} />
            }}
          />
        </div>
        <code>
          <pre>{`<Trans
  i18nKey="header.welcomeMessage"
  values={{ userName: 'Developer', count: 5 }}
  components={{
    strong: <strong />,
    link: <a href="#notifications" />
  }}
/>`}</pre>
        </code>
      </section>

      {/* Example 4: CDN vs Local Fallback */}
      <section>
        <h2>4. CDN with Local Fallback</h2>
        <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
          <p><strong>How it works:</strong></p>
          <ol>
            <li>App loads → ContentStorage plugin fetches from CDN</li>
            <li>If CDN succeeds → Uses fresh translations from CDN</li>
            <li>If CDN fails/slow → Falls back to bundled local files</li>
            <li>App always works, even offline!</li>
          </ol>

          <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p><strong>Current translation source:</strong></p>
            <p>Check browser console for i18n logs</p>
            <code>
              localStorage.getItem('selectedLanguage'): {localStorage.getItem('selectedLanguage') || 'none'}
            </code>
          </div>
        </div>
      </section>

      {/* Example 5: Variable Interpolation */}
      <section>
        <h2>5. Variable Interpolation from ContentStorage</h2>
        <div>
          <Trans
            i18nKey="stats.revenueDescription"
            values={{ percentage: 15.8 }}
            components={{ strong: <strong style={{ color: '#10B981' }} /> }}
          />
        </div>
        <div style={{ marginTop: '1rem' }}>
          <Trans
            i18nKey="stats.usersDescription"
            values={{ count: 342 }}
            components={{ em: <em style={{ color: '#F59E0B' }} /> }}
          />
        </div>
      </section>

      {/* Example 6: Activity Messages */}
      <section>
        <h2>6. Dynamic Activity Messages</h2>
        <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          {[
            { key: 'activity.newUser', values: { userName: 'Alice Smith' } },
            { key: 'activity.paymentReceived', values: { amount: '$5,280', company: 'TechCorp' } },
            { key: 'activity.userUpgrade', values: { userName: 'Bob Johnson' } },
          ].map((activity, idx) => (
            <div key={idx} style={{
              padding: '0.75rem',
              background: '#f9fafb',
              borderRadius: '6px',
              marginBottom: '0.5rem'
            }}>
              <Trans
                i18nKey={activity.key as keyof ContentRoot}
                values={activity.values}
                components={{
                  strong: <strong style={{ color: '#1f2937' }} />,
                  em: <em style={{ color: '#6b7280' }} />,
                  link: <a href="#details" style={{ color: '#3B82F6' }} />
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Example 7: Type-Safe Custom Hook */}
      <section>
        <h2>7. Type-Safe Custom Hook Pattern</h2>
        <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
          <p><strong>Create a type-safe translation hook:</strong></p>
          <code>
            <pre style={{ background: '#1f2937', color: '#10B981', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`// hooks/useTypedTranslation.ts
import { useTranslation } from 'react-i18next';
import { ContentRoot } from '../content/content-types';

export const useTypedTranslation = () => {
  const { t, ...rest } = useTranslation();

  return {
    t: (key: keyof ContentRoot, options?: any) => t(key, options),
    ...rest
  };
};

// Usage in component:
const { t } = useTypedTranslation();
t('header.title'); // ✅ Autocomplete + Type checking
t('invalid.key'); // ❌ TypeScript error`}
            </pre>
          </code>
        </div>
      </section>

      {/* Example 8: Testing ContentStorage Integration */}
      <section>
        <h2>8. Testing Integration Status</h2>
        <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '1rem', borderRadius: '8px' }}>
            <p><strong>✅ Integration Status</strong></p>
            <ul>
              <li>ContentStorage Core installed</li>
              <li>i18next plugin configured</li>
              <li>Types generated from ContentStorage CDN</li>
              <li>Local fallback files in place</li>
              <li>Trans component working with JSX</li>
            </ul>
          </div>

          <div style={{ background: '#eff6ff', border: '1px solid #93c5fd', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
            <p><strong>📋 Available Commands</strong></p>
            <ul>
              <li><code>npm run content:pull</code> - Pull from CDN</li>
              <li><code>npm run content:types</code> - Generate types</li>
              <li><code>npm run content:sync</code> - Pull + Generate</li>
              <li><code>npm run content:pull:draft</code> - Pull drafts</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Example 9: Benefits Summary */}
      <section>
        <h2>9. Key Benefits</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '8px' }}>
            <h3>🚀 CDN Delivery</h3>
            <p>Fast global delivery, reduced bundle size</p>
          </div>
          <div style={{ background: '#dbeafe', padding: '1rem', borderRadius: '8px' }}>
            <h3>🔒 Type Safety</h3>
            <p>TypeScript autocomplete & error checking</p>
          </div>
          <div style={{ background: '#d1fae5', padding: '1rem', borderRadius: '8px' }}>
            <h3>📴 Offline Ready</h3>
            <p>Local fallback always available</p>
          </div>
          <div style={{ background: '#fce7f3', padding: '1rem', borderRadius: '8px' }}>
            <h3>✏️ Easy Updates</h3>
            <p>Update content without redeploying</p>
          </div>
        </div>
      </section>

      {/* Example 10: Next Steps */}
      <section>
        <h2>10. Next Steps</h2>
        <div style={{ textAlign: 'left', maxWidth: '700px', margin: '0 auto' }}>
          <ol>
            <li>Run <code>npm run content:pull</code> to fetch latest translations</li>
            <li>Run <code>npm run content:types</code> to generate TypeScript types</li>
            <li>Use <code>typedT()</code> function for type-safe translations</li>
            <li>Use <code>&lt;Trans&gt;</code> component for rich JSX content</li>
            <li>Check <code>CONTENTSTORAGE_INTEGRATION.md</code> for complete docs</li>
          </ol>
        </div>
      </section>
    </div>
  );
};

export default ContentStorageExample;
