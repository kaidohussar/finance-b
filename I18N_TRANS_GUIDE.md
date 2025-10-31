# i18next Trans Component Guide

This guide explains how to use the `Trans` component from `react-i18next` for handling JSX and component-based translations in React applications.

## Table of Contents
1. [Why Use Trans Component?](#why-use-trans-component)
2. [Basic Usage](#basic-usage)
3. [Key Features](#key-features)
4. [Examples](#examples)
5. [Best Practices](#best-practices)

## Why Use Trans Component?

The `Trans` component is designed for translations that contain:
- **HTML elements** (bold, italic, links, etc.)
- **React components** (buttons, custom components)
- **Complex formatting** with variables
- **Interactive elements** (clickable links, buttons)

### When to use `t()` vs `<Trans>`
- Use `t()` for simple text strings without any formatting
- Use `<Trans>` when you need JSX elements or components in your translations

## Basic Usage

### 1. Import the Trans component
```tsx
import { Trans, useTranslation } from 'react-i18next';
```

### 2. Define translations with HTML-like tags
```json
{
  "welcome": "Hello <strong>{{name}}</strong>! Click <link>here</link> to continue."
}
```

### 3. Use Trans component in your JSX
```tsx
<Trans
  i18nKey="welcome"
  values={{ name: 'John' }}
  components={{
    strong: <strong />,
    link: <a href="/dashboard" />
  }}
/>
```

## Key Features

### 1. **Variable Interpolation**
Pass dynamic values using the `values` prop:

```tsx
<Trans
  i18nKey="stats.revenueDescription"
  values={{ percentage: 12.5 }}
  components={{ strong: <strong /> }}
/>
```

Translation file:
```json
{
  "stats": {
    "revenueDescription": "Your revenue increased by <strong>{{percentage}}%</strong>"
  }
}
```

### 2. **Component Mapping**
Map translation tags to React components:

```tsx
<Trans
  i18nKey="upgrade.message"
  components={{
    strong: <strong />,
    link: <a href="/upgrade" className="upgrade-link" />,
    button: <button onClick={handleClick} />
  }}
/>
```

### 3. **Styled Components**
Add styles directly to mapped components:

```tsx
<Trans
  i18nKey="activity.message"
  components={{
    strong: <strong style={{ color: '#10B981' }} />,
    link: <a href="#" className="custom-link" />
  }}
/>
```

### 4. **Event Handlers**
Attach event handlers to components:

```tsx
<Trans
  i18nKey="notification.text"
  components={{
    link: (
      <button
        onClick={() => console.log('Clicked!')}
        className="notification-button"
      />
    )
  }}
/>
```

## Examples

### Example 1: Simple Bold Text
**Translation:**
```json
{
  "message": "This is <strong>important</strong> text"
}
```

**Component:**
```tsx
<Trans
  i18nKey="message"
  components={{ strong: <strong /> }}
/>
```

### Example 2: Link with Variables
**Translation:**
```json
{
  "payment": "Payment of <strong>{{amount}}</strong> received from <link>{{company}}</link>"
}
```

**Component:**
```tsx
<Trans
  i18nKey="payment"
  values={{ amount: '$2,450', company: 'Acme Corp' }}
  components={{
    strong: <strong />,
    link: <a href="/company/acme" />
  }}
/>
```

### Example 3: Multiple Formatting Types
**Translation:**
```json
{
  "upgrade": "Unlock <strong>unlimited access</strong> to all <em>premium features</em>. <link>Learn more</link>"
}
```

**Component:**
```tsx
<Trans
  i18nKey="upgrade"
  components={{
    strong: <strong />,
    em: <em style={{ color: '#F59E0B' }} />,
    link: <a href="/learn-more" />
  }}
/>
```

### Example 4: Custom React Component
**Translation:**
```json
{
  "error": "Something went wrong. <support>Contact support</support>"
}
```

**Component:**
```tsx
<Trans
  i18nKey="error"
  components={{
    support: (
      <CustomButton
        variant="danger"
        onClick={handleContactSupport}
      />
    )
  }}
/>
```

### Example 5: Dynamic Array Rendering
```tsx
const activities = [
  { userName: 'John', i18nKey: 'activity.newUser' },
  { userName: 'Sarah', i18nKey: 'activity.newUser' }
];

return (
  <>
    {activities.map((activity, idx) => (
      <Trans
        key={idx}
        i18nKey={activity.i18nKey}
        values={{ userName: activity.userName }}
        components={{ strong: <strong /> }}
      />
    ))}
  </>
);
```

## Best Practices

### 1. **Keep Translation Keys Semantic**
Use clear, descriptive HTML tags in your translations:
```json
{
  "good": "Click <link>here</link> to continue",
  "bad": "Click <0>here</0> to continue"
}
```

### 2. **Separate Values from Components**
Always use the `values` prop for interpolation:
```tsx
// Good
<Trans
  i18nKey="message"
  values={{ name: userName }}
  components={{ strong: <strong /> }}
/>

// Avoid
<Trans i18nKey="message">
  {userName}
</Trans>
```

### 3. **Use TypeScript for Type Safety**
```tsx
interface TransValues {
  userName: string;
  count: number;
}

<Trans<TransValues>
  i18nKey="welcome"
  values={{ userName: 'John', count: 5 }}
  components={{ strong: <strong /> }}
/>
```

### 4. **Configure i18next Properly**
Ensure your i18n config supports Trans:
```typescript
i18n.init({
  interpolation: {
    escapeValue: false, // React already escapes
  },
  react: {
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'b', 'p'],
  }
});
```

### 5. **Handle Missing Translations**
Provide fallback values or use defaultValue:
```tsx
<Trans
  i18nKey="message"
  defaults="Default <strong>text</strong>"
  components={{ strong: <strong /> }}
/>
```

### 6. **Accessibility Considerations**
Ensure links and interactive elements are accessible:
```tsx
<Trans
  i18nKey="link.message"
  components={{
    link: (
      <a
        href="/page"
        aria-label="Navigate to page"
        tabIndex={0}
      />
    )
  }}
/>
```

## Configuration

### i18n Config for Trans Support
```typescript
// src/i18n/config.ts
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: true,
      bindI18n: 'languageChanged loaded',
      bindI18nStore: 'added removed',
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i', 'em', 'b', 'p'],
    }
  });
```

## Components Reference

The project includes several components demonstrating Trans usage:

1. **Header.tsx** - Welcome message with user name and notification link
2. **Sidebar.tsx** - Upgrade card with formatted description
3. **StatsCards.tsx** - Statistics with percentage changes
4. **Chart.tsx** - Date range display with formatting
5. **RecentActivity.tsx** - Dynamic activity messages with links
6. **TransExample.tsx** - Comprehensive examples of all Trans features

## Translation File Structure

```json
{
  "header": {
    "welcomeMessage": "Welcome back, <strong>{{userName}}</strong>! You have <link>{{count}} new notifications</link>."
  },
  "stats": {
    "revenueDescription": "Your revenue increased by <strong>{{percentage}}%</strong> compared to last month"
  },
  "activity": {
    "newUser": "<strong>{{userName}}</strong> registered",
    "paymentReceived": "Payment of <strong>{{amount}}</strong> received from <link>{{company}}</link>"
  },
  "common": {
    "errorWithSupport": "Something went wrong. Please <link>contact support</link> if the problem persists."
  }
}
```

## Debugging Tips

1. **Check browser console** for i18next warnings
2. **Use i18next debug mode**:
   ```typescript
   i18n.init({ debug: true });
   ```
3. **Verify component mapping** - ensure tag names match between translation and components prop
4. **Check values prop** - ensure variable names match `{{variable}}` placeholders

## Resources

- [react-i18next Trans Component Docs](https://react.i18next.com/latest/trans-component)
- [i18next Documentation](https://www.i18next.com/)
- [TypeScript with i18next](https://react.i18next.com/latest/typescript)

## Migration from Simple t() to Trans

If you're migrating from simple `t()` calls:

**Before:**
```tsx
<p>{t('message', { name: userName })}</p>
```

**After:**
```json
{
  "message": "Hello <strong>{{name}}</strong>!"
}
```

```tsx
<p>
  <Trans
    i18nKey="message"
    values={{ name: userName }}
    components={{ strong: <strong /> }}
  />
</p>
```

This allows you to add formatting without changing your component structure!
