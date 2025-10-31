# Local Translations Setup Guide

## Overview

The i18n configuration has been updated to use **local JSON translation files** as the primary translation source. This provides immediate access to translations without relying on external services.

## What Changed?

### Before: ContentStorage Backend
```typescript
import ContentStorageBackend from '@contentstorage/i18next-plugin';
import contentStorageConfig from '../../contentstorage.config';

i18n
  .use(ContentStorageBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      contentKey: contentStorageConfig.contentKey,
    },
    // ...
  });
```

**Issues:**
- Depends on external ContentStorage service
- Requires network requests
- May have loading delays
- Configuration dependency on contentStorageConfig

### After: Local JSON Files
```typescript
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
    },
    // ...
  });
```

**Benefits:**
- ✅ No external dependencies
- ✅ Instant translation loading
- ✅ Works offline
- ✅ Easier development and testing
- ✅ No network overhead
- ✅ Bundled with the application

## File Structure

```
app2/
├── src/
│   └── i18n/
│       ├── config.ts          # i18n configuration (UPDATED)
│       └── locales/
│           ├── en.json        # English translations
│           ├── es.json        # Spanish translations
│           └── fr.json        # French translations
└── tsconfig.app.json          # TypeScript config (UPDATED)
```

## Configuration Files Updated

### 1. src/i18n/config.ts

**Key Changes:**
- Removed `ContentStorageBackend` import
- Removed `contentStorageConfig` import
- Added direct JSON imports
- Changed from `backend` to `resources` configuration
- Simplified `supportedLngs` to static array

### 2. tsconfig.app.json

**Added:**
```json
{
  "compilerOptions": {
    "resolveJsonModule": true
  }
}
```

This enables importing JSON files as modules in TypeScript.

## Translation File Format

Each language file (`en.json`, `es.json`, `fr.json`) uses the same structure:

```json
{
  "header": {
    "title": "Dashboard",
    "search": "Search...",
    "welcomeMessage": "Welcome back, <strong>{{userName}}</strong>! You have <link>{{count}} new notifications</link>."
  },
  "sidebar": {
    "dashboard": "Dashboard",
    "upgrade": {
      "title": "Upgrade to Pro",
      "description": "Unlock <strong>unlimited access</strong>. <link>Learn more</link>"
    }
  },
  "stats": {
    "totalRevenue": "Total Revenue",
    "revenueDescription": "Your revenue increased by <strong>{{percentage}}%</strong>"
  }
}
```

## How It Works

### 1. Import Phase
At build time, Vite bundles the JSON files into your application:

```typescript
import enTranslations from './locales/en.json';
// enTranslations is now a JavaScript object
```

### 2. Initialization Phase
i18next receives the translations as JavaScript objects:

```typescript
i18n.init({
  resources: {
    en: { translation: enTranslations },
    es: { translation: esTranslations },
    fr: { translation: frTranslations },
  }
});
```

### 3. Runtime Phase
Translations are immediately available - no async loading needed:

```tsx
const { t } = useTranslation();
// t('header.title') returns instantly from memory
```

## Benefits of Local Files

### 1. Development Experience
- **Instant Hot Reload**: Changes to JSON files reflect immediately
- **No Network Issues**: Works without internet connection
- **Easier Testing**: Can modify translations locally
- **Version Control**: All translations tracked in git

### 2. Performance
- **Zero Latency**: No network requests for translations
- **Smaller Bundle**: Only used translations are included
- **Tree Shaking**: Unused translation keys can be removed
- **Faster Initial Load**: No async translation loading

### 3. Reliability
- **No Service Dependencies**: Doesn't rely on external services
- **Offline Support**: App works completely offline
- **No Loading States**: Translations available immediately
- **Predictable Behavior**: No network errors to handle

### 4. Simplicity
- **Fewer Dependencies**: Removed ContentStorageBackend
- **Less Configuration**: No backend config needed
- **Easier Debugging**: All translations visible in source
- **Direct Control**: Full control over translation content

## Adding New Languages

### Step 1: Create Translation File
```bash
touch src/i18n/locales/de.json
```

### Step 2: Add Translations
```json
{
  "header": {
    "title": "Dashboard",
    "search": "Suchen..."
  }
}
```

### Step 3: Import in config.ts
```typescript
import deTranslations from './locales/de.json';

i18n.init({
  resources: {
    en: { translation: enTranslations },
    es: { translation: esTranslations },
    fr: { translation: frTranslations },
    de: { translation: deTranslations },
  },
  supportedLngs: ['en', 'es', 'fr', 'de'],
});
```

### Step 4: Update Language Selector
Add the new language to your language selector component.

## Modifying Translations

### 1. Edit JSON File
Open `src/i18n/locales/en.json` and make changes:

```json
{
  "header": {
    "title": "My Dashboard"
  }
}
```

### 2. Save File
Vite will automatically detect the change and hot-reload.

### 3. See Changes
The UI updates immediately without page refresh.

## TypeScript Support

### Type-Safe Translations (Optional)

You can generate TypeScript types from your translations:

```typescript
// types/i18next.d.ts
import 'i18next';
import type en from '../i18n/locales/en.json';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation';
    resources: {
      translation: typeof en;
    };
  }
}
```

This provides autocomplete for translation keys:

```tsx
// TypeScript will suggest valid keys
t('header.title') // ✅ Valid
t('header.invalid') // ❌ TypeScript error
```

## Migration from ContentStorage

If you were previously using ContentStorage and want to switch back:

### Option 1: Hybrid Approach
Use local files as fallback with ContentStorage as primary:

```typescript
import ContentStorageBackend from '@contentstorage/i18next-plugin';
import enTranslations from './locales/en.json';

i18n
  .use(ContentStorageBackend)
  .use(initReactI18next)
  .init({
    backend: {
      contentKey: contentStorageConfig.contentKey,
    },
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
    },
    partialBundledLanguages: true,
  });
```

### Option 2: Dynamic Loading
Load translations dynamically when needed:

```typescript
import HttpBackend from 'i18next-http-backend';

i18n
  .use(HttpBackend)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
  });
```

## Bundle Size Impact

### JSON File Sizes
- `en.json`: ~2 KB
- `es.json`: ~2 KB
- `fr.json`: ~2 KB
- **Total**: ~6 KB (minimal impact)

### After Gzip
- **~1.5 KB total** (all three languages compressed)

### Comparison
- **ContentStorage**: Network request + parsing overhead
- **Local files**: Included in main bundle, instant access

## Testing

### Unit Tests
Mock translations easily:

```typescript
jest.mock('./i18n/locales/en.json', () => ({
  header: { title: 'Test Dashboard' }
}));
```

### Integration Tests
No need to mock external services:

```typescript
import { render } from '@testing-library/react';
import App from './App';

// Translations work immediately
render(<App />);
expect(screen.getByText('Dashboard')).toBeInTheDocument();
```

## Troubleshooting

### Issue: JSON import error
**Error:** `Cannot find module './locales/en.json'`

**Solution:** Ensure `resolveJsonModule: true` in tsconfig.app.json

### Issue: Type error on JSON import
**Error:** `Module has no default export`

**Solution:** Use named import style:
```typescript
import * as enTranslations from './locales/en.json';
```

### Issue: Translations not updating
**Solution:**
1. Save the JSON file
2. Check Vite dev server console
3. Hard refresh browser (Ctrl+Shift+R)

### Issue: Wrong language showing
**Solution:**
1. Clear localStorage: `localStorage.removeItem('selectedLanguage')`
2. Check browser console for i18n debug messages
3. Verify language code matches (lowercase: 'en', not 'EN')

## Best Practices

### 1. Keep Files Organized
```json
{
  "feature": {
    "component": {
      "action": "Text"
    }
  }
}
```

### 2. Use Consistent Keys
All languages should have the same keys:
```json
// ✅ Good
en.json: { "header": { "title": "Dashboard" } }
es.json: { "header": { "title": "Tablero" } }

// ❌ Bad
en.json: { "header": { "title": "Dashboard" } }
es.json: { "titulo": "Tablero" }
```

### 3. Document Complex Translations
```json
{
  "welcome": "Welcome <strong>{{name}}</strong>!",
  "_comment": "{{name}} is replaced with user's name, <strong> adds bold formatting"
}
```

### 4. Regular Validation
Ensure all languages have same structure:

```bash
npm run validate-translations
```

## Monitoring

Track translation usage in your app:

```typescript
// Log missing translations
i18n.on('missingKey', (lng, ns, key) => {
  console.warn(`Missing translation: ${lng}.${key}`);
});

// Log loaded languages
i18n.on('loaded', (loaded) => {
  console.log('Loaded languages:', Object.keys(loaded));
});
```

## Conclusion

Using local JSON files for translations provides:
- ✅ Better developer experience
- ✅ Improved performance
- ✅ Greater reliability
- ✅ Simplified architecture
- ✅ Easier maintenance

The configuration is now simpler, faster, and more maintainable while still supporting all the Trans component features we implemented.
