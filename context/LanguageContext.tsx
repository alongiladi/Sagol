
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { hebrewContent } from '../data/hebrew';
import { englishContent } from '../data/english';

type ContentType = typeof hebrewContent;
type Language = 'he' | 'en';
type Direction = 'rtl' | 'ltr';

interface LanguageContextType {
    language: Language;
    direction: Direction;
    content: ContentType;
    toggleLanguage: () => void;
    setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [language, setLanguageState] = useState<Language>('he');
    const [direction, setDirection] = useState<Direction>('rtl');
    const [content, setContent] = useState<ContentType>(hebrewContent);

    useEffect(() => {
        if (language === 'he') {
            setDirection('rtl');
            setContent(hebrewContent);
            document.documentElement.dir = 'rtl';
            document.documentElement.lang = 'he';
        } else {
            setDirection('ltr');
            setContent(englishContent);
            document.documentElement.dir = 'ltr';
            document.documentElement.lang = 'en';
        }
    }, [language]);

    const toggleLanguage = () => {
        setLanguageState(prev => prev === 'he' ? 'en' : 'he');
    };

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
    };

    return (
        <LanguageContext.Provider value={{ language, direction, content, toggleLanguage, setLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};
