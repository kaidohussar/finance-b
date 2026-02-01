import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.css';

const UKFlag = () => (
  <svg width="20" height="14" viewBox="0 0 513 343" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_uk)">
      <path d="M0 0.926514H513V342.93H0V0.926514Z" fill="white"/>
      <path d="M288.562 0.923584H224.438V139.86H0V203.985H224.438V342.922H288.562V203.985H513V139.86H288.562V0.923584Z" fill="#D80027"/>
      <path d="M394.554 231.401L513 297.205V231.401H394.554ZM312.261 231.401L513 342.922V311.387L369.026 231.401H312.261ZM459.53 342.922L312.261 261.099V342.922H459.53Z" fill="#0052B4"/>
      <path d="M312.261 231.401L513 342.922V311.387L369.026 231.401H312.261Z" fill="white"/>
      <path d="M312.261 231.401L513 342.922V311.387L369.026 231.401H312.261Z" fill="#D80027"/>
      <path d="M90.5174 231.399L0 281.687V231.399H90.5174ZM200.739 245.58V342.921H25.5408L200.739 245.58Z" fill="#0052B4"/>
      <path d="M143.974 231.401L0 311.387V342.922L200.739 231.401H143.974Z" fill="#D80027"/>
      <path d="M118.446 112.445L0 46.6407V112.445H118.446ZM200.739 112.445L0 0.923584V32.4591L143.974 112.445H200.739ZM53.4702 0.923584L200.739 82.7471V0.923584H53.4702Z" fill="#0052B4"/>
      <path d="M200.739 112.445L0 0.923584V32.4591L143.974 112.445H200.739Z" fill="white"/>
      <path d="M200.739 112.445L0 0.923584V32.4591L143.974 112.445H200.739Z" fill="#D80027"/>
      <path d="M422.483 112.447L513 62.1589V112.447H422.483ZM312.261 98.2653V0.924561H487.459L312.261 98.2653Z" fill="#0052B4"/>
      <path d="M369.026 112.445L513 32.4591V0.923584L312.261 112.445H369.026Z" fill="#D80027"/>
    </g>
    <defs>
      <clipPath id="clip0_uk">
        <rect width="513" height="342" fill="white" transform="translate(0 0.926514)"/>
      </clipPath>
    </defs>
  </svg>
);

interface LanguageOption {
  code: string;
  name: string;
  flag: React.ReactNode;
}

const languageOptions: LanguageOption[] = [
  { code: 'en', name: 'English', flag: <UKFlag /> },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'et', name: 'Eesti', flag: '🇪🇪' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentOption = languageOptions.find(
    (option) => option.code === i18n.language
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageSelect = (language: string) => {
    i18n.changeLanguage(language);
    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleToggle();
    } else if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-trigger"
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select language"
      >
        <span className="language-flag">{currentOption?.flag}</span>
        <span className="language-code">
          {currentOption?.code.toUpperCase()}
        </span>
        <svg
          className={`dropdown-arrow ${isOpen ? 'open' : ''}`}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 4.5L6 7.5L9 4.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="language-dropdown" role="listbox">
          {languageOptions.map((option) => (
            <button
              key={option.code}
              className={`language-option ${option.code === i18n.language ? 'active' : ''}`}
              onClick={() => handleLanguageSelect(option.code)}
              role="option"
              aria-selected={option.code === i18n.language}
            >
              <span className="language-flag">{option.flag}</span>
              <span className="language-name">{option.name}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
