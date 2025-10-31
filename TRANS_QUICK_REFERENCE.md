# Trans Component Quick Reference

## Import
```tsx
import { Trans, useTranslation } from 'react-i18next';
```

## Basic Syntax
```tsx
<Trans
  i18nKey="translation.key"           // Required: translation key
  values={{ var1: value1 }}           // Optional: variables for interpolation
  components={{                       // Optional: component mapping
    tag: <Component />
  }}
  defaults="Fallback <tag>text</tag>" // Optional: fallback if key missing
/>
```

## Common Patterns

### 1. Bold Text
**Translation:**
```json
{ "key": "This is <strong>bold</strong>" }
```
**Component:**
```tsx
<Trans i18nKey="key" components={{ strong: <strong /> }} />
```

### 2. Link
**Translation:**
```json
{ "key": "Click <link>here</link>" }
```
**Component:**
```tsx
<Trans i18nKey="key" components={{ link: <a href="/path" /> }} />
```

### 3. Variable + Formatting
**Translation:**
```json
{ "key": "Price: <strong>{{price}}</strong>" }
```
**Component:**
```tsx
<Trans
  i18nKey="key"
  values={{ price: '$99' }}
  components={{ strong: <strong /> }}
/>
```

### 4. Multiple Components
**Translation:**
```json
{ "key": "<strong>{{name}}</strong> clicked <link>this</link>" }
```
**Component:**
```tsx
<Trans
  i18nKey="key"
  values={{ name: 'John' }}
  components={{
    strong: <strong />,
    link: <a href="#" />
  }}
/>
```

### 5. Styled Component
```tsx
<Trans
  i18nKey="key"
  components={{
    strong: <strong style={{ color: '#10B981' }} />
  }}
/>
```

### 6. Button/Interactive
```tsx
<Trans
  i18nKey="key"
  components={{
    button: <button onClick={handleClick} className="btn" />
  }}
/>
```

### 7. Custom Component
```tsx
<Trans
  i18nKey="key"
  components={{
    link: <CustomLink to="/path" variant="primary" />
  }}
/>
```

## Available HTML Tags in Translations
```
<strong>   - Bold text
<em>       - Italic/emphasized text
<b>        - Bold text (alternative)
<i>        - Italic text (alternative)
<br>       - Line break
<p>        - Paragraph
<link>     - Custom (map to any component)
<button>   - Custom (map to any component)
```

## When to Use What

| Use Case | Use `t()` | Use `<Trans>` |
|----------|-----------|---------------|
| Plain text | ✅ | ❌ |
| Text with variables | ✅ | ⚠️ |
| Text with HTML/JSX | ❌ | ✅ |
| Text with links | ❌ | ✅ |
| Text with components | ❌ | ✅ |
| Interactive elements | ❌ | ✅ |

## Real Examples from Project

### Header Welcome Message
```tsx
<Trans
  i18nKey="header.welcomeMessage"
  values={{ userName: 'John Doe', count: 3 }}
  components={{
    strong: <strong className="user-name-highlight" />,
    link: <a href="#notifications" className="notification-link" />
  }}
/>
```

### Stats Description
```tsx
<Trans
  i18nKey="stats.revenueDescription"
  values={{ percentage: 12.5 }}
  components={{ strong: <strong /> }}
/>
```

### Activity Message
```tsx
<Trans
  i18nKey="activity.paymentReceived"
  values={{ amount: '$2,450', company: 'Acme Corp' }}
  components={{
    strong: <strong />,
    link: <a href="#details" className="activity-link" />
  }}
/>
```

## Common Pitfalls

### ❌ Don't: Nest content inside Trans
```tsx
<Trans i18nKey="key">
  <strong>Don't do this</strong>
</Trans>
```

### ✅ Do: Use components prop
```tsx
<Trans
  i18nKey="key"
  components={{ strong: <strong /> }}
/>
```

### ❌ Don't: Hardcode formatting
```tsx
<p><strong>{t('key')}</strong></p>
```

### ✅ Do: Include in translation
```tsx
<Trans i18nKey="key" components={{ strong: <strong /> }} />
```

### ❌ Don't: Use numbered tags
```json
{ "key": "<0>text</0>" }
```

### ✅ Do: Use semantic tags
```json
{ "key": "<strong>text</strong>" }
```

## TypeScript Types

```tsx
import { Trans, TFunction } from 'react-i18next';

// With typed values
interface TransValues {
  userName: string;
  count: number;
}

<Trans<TransValues>
  i18nKey="key"
  values={{ userName: 'John', count: 5 }}
  components={{ strong: <strong /> }}
/>
```

## Debugging

### Enable debug mode
```typescript
i18n.init({ debug: true });
```

### Check in console
```javascript
// Get current translation
i18n.t('your.key');

// Check loaded namespaces
i18n.store.data;

// Check current language
i18n.language;
```

### Common Issues
1. **Tags don't match** - Ensure translation tags match components prop keys
2. **Variables not interpolated** - Check values prop variable names
3. **Components not rendering** - Verify transSupportBasicHtmlNodes is true
4. **Missing translation** - Check key path and language file

## Performance Tips

1. **Memoize Trans with useMemo** for expensive components
```tsx
const content = useMemo(() => (
  <Trans i18nKey="key" components={{ strong: <strong /> }} />
), []);
```

2. **Use React.memo** for Trans-heavy components
```tsx
const Component = React.memo(() => (
  <Trans i18nKey="key" />
));
```

3. **Lazy load translations** for large apps
```typescript
i18n.init({
  backend: {
    loadPath: '/locales/{{lng}}/{{ns}}.json',
  },
  ns: ['common'],
  defaultNS: 'common'
});
```

## Accessibility

Always ensure interactive elements are accessible:
```tsx
<Trans
  i18nKey="key"
  components={{
    link: (
      <a
        href="/path"
        aria-label="Descriptive label"
        tabIndex={0}
        role="link"
      />
    )
  }}
/>
```

## Need More Help?

- See `I18N_TRANS_GUIDE.md` for comprehensive guide
- See `src/components/TransExample.tsx` for live examples
- See `REFACTORING_SUMMARY.md` for what changed
- Visit [react-i18next docs](https://react.i18next.com/latest/trans-component)
