# ContentStorage Integration Guide

## Overview

This project integrates **ContentStorage Core** and **ContentStorage i18next Plugin** for managing translations with:
- CDN-based translation delivery with local fallback
- TypeScript type safety for translation keys
- CLI tools for pulling content and generating types
- Hybrid approach: CDN + local files

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                  Your React App                      │
│                                                      │
│  ┌────────────────────────────────────────────┐    │
│  │           i18next + Trans                   │    │
│  └────────────────┬───────────────────────────┘    │
│                   │                                  │
│  ┌────────────────▼───────────────────────────┐    │
│  │    ContentStorage i18next Plugin            │    │
│  │    (with local fallback)                    │    │
│  └────────┬──────────────────────┬─────────────┘    │
│           │                      │                  │
│  ┌────────▼────────┐    ┌───────▼─────────┐       │
│  │  ContentStorage │    │  Local JSON     │       │
│  │  CDN (Primary)  │    │  (Fallback)     │       │
│  └─────────────────┘    └─────────────────┘       │
└─────────────────────────────────────────────────────┘
```

## Installation

### Packages Installed

```json
{
  "dependencies": {
    "@contentstorage/i18next-plugin": "^2.0.0",
    "i18next": "^25.6.0",
    "react-i18next": "^16.2.3"
  },
  "devDependencies": {
    "@contentstorage/core": "^1.2.1"
  }
}
```

### Installation Commands

```bash
npm install @contentstorage/i18next-plugin i18next react-i18next
npm install --save-dev @contentstorage/core
```

## Configuration

### contentstorage.config.js

```javascript
/** @type {import('@contentstorage/core').ContentStorageConfig} */
const config = {
  // Your ContentStorage content key
  contentKey: process.env.VITE_CONTENTSTORAGE_KEY || '108541025900791613826/febe906c-7a8b-4b58-b792-77556c093dba',

  // Supported languages
  languageCodes: ['EN', 'FR', 'ES'],

  // Output configuration
  output: {
    // Directory for storing pulled content
    contentDir: 'src/locales/content',

    // Path for generated TypeScript types
    typesPath: 'src/types/translations.d.ts',
  },
};

export default config;
```

### package.json Scripts

```json
{
  "scripts": {
    "content:pull": "contentstorage pull",
    "content:types": "contentstorage generate-types",
    "content:sync": "npm run content:pull && npm run content:types",
    "content:pull:draft": "contentstorage pull --pending-changes"
  }
}
```

## File Structure

```
app2/
├── contentstorage.config.js      # ContentStorage configuration
├── src/
│   ├── i18n/
│   │   ├── config.ts             # i18next configuration
│   │   └── locales/              # Local fallback translations
│   │       ├── en.json
│   │       ├── es.json
│   │       └── fr.json
│   ├── content/
│   │   ├── json/                 # Pulled from ContentStorage CDN
│   │   │   ├── EN.json
│   │   │   ├── ES.json
│   │   │   └── FR.json
│   │   └── content-types.ts      # Generated TypeScript types
│   └── types/
│       └── translations.d.ts     # Optional: i18next type augmentation
```

## CLI Commands

### Pull Content from CDN

```bash
# Pull published content
npm run content:pull

# Pull draft/pending changes
npm run content:pull:draft
```

**What it does:**
- Fetches translations from ContentStorage CDN
- Saves to `src/content/json/`
- Downloads all configured languages

**Output:**
```
✓ Processing language: EN
✓ Successfully saved /path/to/src/content/json/EN.json
✓ Processing language: FR
✓ Successfully saved /path/to/src/content/json/FR.json
✓ Processing language: ES
✓ Successfully saved /path/to/src/content/json/ES.json
✓ All content successfully pulled and saved.
```

### Generate TypeScript Types

```bash
npm run content:types
```

**What it does:**
- Reads JSON from `src/content/json/EN.json`
- Generates TypeScript interface with all translation keys
- Saves to `src/content/content-types.ts`

**Generated Types Example:**
```typescript
export interface ContentRoot {
  'activity.title': string;
  'activity.viewAll': string;
  'header.welcomeMessage': string;
  'sidebar.upgrade.title': string;
  'stats.revenueDescription': string;
  // ... all translation keys
}
```

### Sync Both Commands

```bash
# Pull content AND generate types in one command
npm run content:sync
```

## i18next Configuration

### src/i18n/config.ts

```typescript
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ContentStorageBackend from '@contentstorage/i18next-plugin';
import contentStorageConfig from '../../contentstorage.config';

// Import local translations as fallback
import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';
import frTranslations from './locales/fr.json';

i18n
  .use(ContentStorageBackend)  // Primary: CDN
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      contentKey: contentStorageConfig.contentKey,
    },
    // Local fallback resources
    resources: {
      en: { translation: enTranslations },
      es: { translation: esTranslations },
      fr: { translation: frTranslations },
    },
    partialBundledLanguages: true,  // Enable fallback
    // ... other config
  });
```

## How It Works

### 1. Primary: ContentStorage CDN

When the app loads:
1. ContentStorage plugin fetches translations from CDN
2. Translations are cached in browser
3. Fast delivery via global CDN

```
User loads app → CDN fetch → Cached → Used
```

### 2. Fallback: Local JSON Files

If CDN fails or is slow:
1. Local bundled translations are used immediately
2. App works offline
3. No loading delays

```
CDN fails → Local fallback → Instant access
```

### 3. Type Safety

Generated types ensure type-safe translation keys:

```typescript
import { ContentRoot } from './content/content-types';

// ✅ Valid - TypeScript knows this key exists
t('header.title')

// ❌ Error - TypeScript catches typo
t('header.titel')
```

## Usage in Components

### Simple Text (t function)

```tsx
import { useTranslation } from 'react-i18next';

const Component = () => {
  const { t } = useTranslation();

  return <h1>{t('header.title')}</h1>;
};
```

### Complex Text (Trans component)

```tsx
import { Trans } from 'react-i18next';

const Component = () => {
  return (
    <Trans
      i18nKey="header.welcomeMessage"
      values={{ userName: 'John', count: 3 }}
      components={{
        strong: <strong />,
        link: <a href="#notifications" />
      }}
    />
  );
};
```

## Workflow

### Development Workflow

```bash
# 1. Pull latest translations from ContentStorage
npm run content:pull

# 2. Generate TypeScript types
npm run content:types

# 3. Start development server
npm run dev
```

### Content Update Workflow

```bash
# Developer updates translations in ContentStorage UI

# 1. Pull updated content
npm run content:pull

# 2. Regenerate types (if structure changed)
npm run content:types

# 3. TypeScript will catch any breaking changes
npm run build
```

### Testing Draft Content

```bash
# Pull draft/pending translations
npm run content:pull:draft

# Test in local development
npm run dev
```

## Benefits

### 1. CDN Delivery
- ✅ Fast global delivery
- ✅ Reduced bundle size
- ✅ Easy content updates without redeployment
- ✅ Real-time translation updates

### 2. Local Fallback
- ✅ Works offline
- ✅ No loading delays
- ✅ Reliable fallback if CDN fails
- ✅ Development without internet

### 3. Type Safety
- ✅ TypeScript autocomplete for translation keys
- ✅ Compile-time error on invalid keys
- ✅ Refactoring safety
- ✅ Better developer experience

### 4. Content Management
- ✅ Non-technical team can update content
- ✅ Preview changes before publishing
- ✅ Version control for content
- ✅ Multi-language management in one place

## Advanced Usage

### Type-Safe Hooks

Create a custom typed hook:

```typescript
import { useTranslation } from 'react-i18next';
import { ContentRoot } from './content/content-types';

export const useTypedTranslation = () => {
  const { t, ...rest } = useTranslation();

  return {
    t: (key: keyof ContentRoot, options?: any) => t(key, options),
    ...rest
  };
};
```

Usage:

```tsx
const { t } = useTypedTranslation();

// ✅ Autocomplete works
t('header.title')

// ❌ TypeScript error
t('invalid.key')
```

### Environment-Specific Content Keys

```javascript
// contentstorage.config.js
const config = {
  contentKey: process.env.NODE_ENV === 'production'
    ? process.env.VITE_CONTENTSTORAGE_KEY_PROD
    : process.env.VITE_CONTENTSTORAGE_KEY_DEV,
  // ...
};
```

### Custom Type Generation

Customize the generated types path:

```javascript
// contentstorage.config.js
const config = {
  output: {
    contentDir: 'src/i18n/cdn',
    typesPath: 'src/types/i18n.d.ts',
  },
};
```

## Troubleshooting

### Issue: Content not loading

**Check:**
1. Is contentKey correct in config?
2. Is internet connection available?
3. Check browser console for errors
4. Verify fallback files exist in `src/i18n/locales/`

**Debug:**
```typescript
i18n.on('loaded', (loaded) => {
  console.log('Loaded languages:', loaded);
});

i18n.on('failedLoading', (lng, ns, msg) => {
  console.error(`Failed loading ${lng}:`, msg);
});
```

### Issue: TypeScript errors after content update

**Solution:**
```bash
# Regenerate types
npm run content:types

# Restart TypeScript server in VS Code
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Issue: Local fallback not working

**Check:**
1. Ensure `partialBundledLanguages: true` in i18n config
2. Verify local JSON files exist
3. Check language codes match (lowercase in config)

### Issue: CLI commands not found

**Solution:**
```bash
# Ensure @contentstorage/core is installed
npm install --save-dev @contentstorage/core

# Use npx if needed
npx contentstorage pull
```

## Best Practices

### 1. Keep Local Files in Sync

Regularly pull content to keep local fallback up-to-date:

```bash
# Add to pre-commit hook
npm run content:sync
```

### 2. Version Control

**Do commit:**
- `contentstorage.config.js`
- `src/i18n/locales/*.json` (local fallback)
- `src/content/content-types.ts` (generated types)
- `package.json` scripts

**Don't commit:**
- `src/content/json/*.json` (CDN pulled files - optional)

### 3. CI/CD Integration

```yaml
# .github/workflows/deploy.yml
- name: Pull translations
  run: npm run content:pull

- name: Generate types
  run: npm run content:types

- name: Build
  run: npm run build
```

### 4. Content Validation

Validate translations before deploying:

```typescript
// scripts/validate-translations.ts
import EN from './src/content/json/EN.json';
import ES from './src/content/json/ES.json';

const enKeys = Object.keys(flattenJson(EN));
const esKeys = Object.keys(flattenJson(ES));

const missing = enKeys.filter(k => !esKeys.includes(k));
if (missing.length) {
  console.error('Missing Spanish translations:', missing);
  process.exit(1);
}
```

## Comparison: ContentStorage vs Local-Only

| Feature | ContentStorage + Local | Local Only |
|---------|----------------------|------------|
| **Bundle Size** | Smaller (CDN) | Larger (bundled) |
| **Update Speed** | Instant (no deploy) | Requires redeploy |
| **Offline Support** | ✅ (fallback) | ✅ |
| **Type Safety** | ✅ | ✅ |
| **Content Management** | UI + CLI | Code only |
| **Team Collaboration** | Non-tech friendly | Developers only |
| **Loading Speed** | CDN fast | Instant (bundled) |

## Resources

- [ContentStorage Core Docs](https://www.npmjs.com/package/@contentstorage/core)
- [ContentStorage i18next Plugin](https://www.npmjs.com/package/@contentstorage/i18next-plugin)
- [react-i18next Documentation](https://react.i18next.com/)
- [Our Trans Component Guide](./I18N_TRANS_GUIDE.md)

## Support

For ContentStorage-specific issues:
- GitHub: Check the package repository
- Documentation: Visit ContentStorage docs

For i18next issues:
- [react-i18next GitHub](https://github.com/i18next/react-i18next)
- [i18next Documentation](https://www.i18next.com/)
