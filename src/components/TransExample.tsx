import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

/**
 * TransExample Component
 *
 * This component demonstrates various ways to use the Trans component
 * from react-i18next for handling JSX in translations.
 */
const TransExample: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="trans-examples">
      <h2>Trans Component Examples</h2>

      {/* Example 1: Simple text with bold */}
      <section>
        <h3>1. Simple Text with Bold</h3>
        <p>
          <Trans
            i18nKey="stats.revenueDescription"
            values={{ percentage: 12.5 }}
            components={{
              strong: <strong />
            }}
          />
        </p>
      </section>

      {/* Example 2: Text with link */}
      <section>
        <h3>2. Text with Link Component</h3>
        <p>
          <Trans
            i18nKey="sidebar.upgrade.description"
            components={{
              strong: <strong />,
              link: <a href="/learn-more" className="custom-link" />
            }}
          />
        </p>
      </section>

      {/* Example 3: Multiple variables with formatting */}
      <section>
        <h3>3. Multiple Variables with Formatting</h3>
        <p>
          <Trans
            i18nKey="header.welcomeMessage"
            values={{
              userName: 'Alice Johnson',
              count: 5
            }}
            components={{
              strong: <strong style={{ color: '#10B981' }} />,
              link: <a href="/notifications" style={{ textDecoration: 'underline' }} />
            }}
          />
        </p>
      </section>

      {/* Example 4: Trans with custom React components */}
      <section>
        <h3>4. Trans with Custom Components</h3>
        <p>
          <Trans
            i18nKey="activity.paymentReceived"
            values={{
              amount: '$2,450',
              company: 'Acme Corp'
            }}
            components={{
              strong: <strong className="highlight-text" />,
              link: (
                <button
                  onClick={() => alert('Company clicked!')}
                  className="company-button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#3B82F6',
                    textDecoration: 'underline',
                    cursor: 'pointer'
                  }}
                />
              )
            }}
          />
        </p>
      </section>

      {/* Example 5: Trans with em and strong */}
      <section>
        <h3>5. Mixed Formatting (em + strong)</h3>
        <p>
          <Trans
            i18nKey="activity.userUpgrade"
            values={{ userName: 'Mike Chen' }}
            components={{
              strong: <strong />,
              em: <em style={{ color: '#F59E0B' }} />
            }}
          />
        </p>
      </section>

      {/* Example 6: Trans with date formatting */}
      <section>
        <h3>6. Trans with Date Variables</h3>
        <p>
          <Trans
            i18nKey="chart.description"
            values={{
              startDate: new Date('2024-01-01').toLocaleDateString(),
              endDate: new Date('2024-07-31').toLocaleDateString()
            }}
            components={{
              strong: <strong className="date-text" />
            }}
          />
        </p>
      </section>

      {/* Example 7: Trans with nested components */}
      <section>
        <h3>7. Nested Components Example</h3>
        <div>
          <Trans
            i18nKey="common.errorWithSupport"
            components={{
              link: (
                <a
                  href="mailto:support@example.com"
                  style={{
                    color: '#EF4444',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    borderBottom: '2px solid #EF4444'
                  }}
                />
              )
            }}
          />
        </div>
      </section>

      {/* Example 8: Trans with conditional rendering */}
      <section>
        <h3>8. Conditional Trans Rendering</h3>
        {[234, 0].map((count, idx) => (
          <p key={idx}>
            {count > 0 ? (
              <Trans
                i18nKey="stats.usersDescription"
                values={{ count }}
                components={{
                  em: <em style={{ fontWeight: 'bold', color: '#10B981' }} />
                }}
              />
            ) : (
              t('common.error')
            )}
          </p>
        ))}
      </section>

      {/* Example 9: Trans with array mapping */}
      <section>
        <h3>9. Trans with Dynamic Array Data</h3>
        {[
          { userName: 'John', action: 'activity.newUser' },
          { userName: 'Sarah', action: 'activity.newUser' }
        ].map((activity, idx) => (
          <p key={idx}>
            <Trans
              i18nKey={activity.action}
              values={{ userName: activity.userName }}
              components={{
                strong: <strong className={`user-${idx}`} />
              }}
            />
          </p>
        ))}
      </section>

      {/* Example 10: Trans with count and pluralization */}
      <section>
        <h3>10. Best Practices</h3>
        <ul style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
          <li>
            <strong>Use Trans for JSX:</strong> When you need to embed HTML tags,
            React components, or links in your translations
          </li>
          <li>
            <strong>Use t() for simple strings:</strong> When you just need plain
            text without any formatting
          </li>
          <li>
            <strong>Pass values separately:</strong> Use the values prop for
            interpolation variables
          </li>
          <li>
            <strong>Define components mapping:</strong> Map translation tags
            (like {'<strong>'}, {'<link>'}) to actual React components
          </li>
          <li>
            <strong>Keep translations clean:</strong> Use semantic HTML tags
            in your translation files
          </li>
        </ul>
      </section>
    </div>
  );
};

export default TransExample;
