import { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Language = 'en' | 'fa';

interface Translations {
  [key: string]: {
    en: string;
    fa: string;
  };
}

const translations: Translations = {
  // Common
  'common.back': {
    en: 'Back',
    fa: 'بازگشت',
  },
  'common.save': {
    en: 'Save',
    fa: 'ذخیره',
  },
  'common.cancel': {
    en: 'Cancel',
    fa: 'لغو',
  },
  'common.delete': {
    en: 'Delete',
    fa: 'حذف',
  },
  'common.edit': {
    en: 'Edit',
    fa: 'ویرایش',
  },
  'common.loading': {
    en: 'Loading...',
    fa: 'در حال بارگذاری...',
  },
  'common.error': {
    en: 'Error',
    fa: 'خطا',
  },
  'common.success': {
    en: 'Success',
    fa: 'موفقیت',
  },

  // Auth
  'auth.login': {
    en: 'Sign In',
    fa: 'ورود',
  },
  'auth.signup': {
    en: 'Sign Up',
    fa: 'ثبت نام',
  },
  'auth.logout': {
    en: 'Logout',
    fa: 'خروج',
  },
  'auth.email': {
    en: 'Email',
    fa: 'ایمیل',
  },
  'auth.phone': {
    en: 'Phone',
    fa: 'تلفن',
  },
  'auth.password': {
    en: 'Password',
    fa: 'رمز عبور',
  },
  'auth.forgotPassword': {
    en: 'Forgot Password?',
    fa: 'رمز عبور را فراموش کرده‌اید؟',
  },

  // Settings
  'settings.title': {
    en: 'Settings',
    fa: 'تنظیمات',
  },
  'settings.language': {
    en: 'Language',
    fa: 'زبان',
  },
  'settings.english': {
    en: 'English',
    fa: 'انگلیسی',
  },
  'settings.persian': {
    en: 'Persian',
    fa: 'فارسی',
  },
  'settings.account': {
    en: 'Account',
    fa: 'حساب کاربری',
  },
  'settings.profile': {
    en: 'Profile Settings',
    fa: 'تنظیمات پروفایل',
  },
  'settings.currency': {
    en: 'Currency Settings',
    fa: 'تنظیمات ارز',
  },
  'settings.about': {
    en: 'About',
    fa: 'درباره',
  },
  'settings.support': {
    en: 'Contact Support',
    fa: 'تماس با پشتیبانی',
  },
  'settings.clearData': {
    en: 'Clear All Data',
    fa: 'پاک کردن همه اطلاعات',
  },

  // Customers
  'customers.title': {
    en: 'Customers',
    fa: 'مشتریان',
  },
  'customers.new': {
    en: 'New Customer',
    fa: 'مشتری جدید',
  },
  'customers.search': {
    en: 'Search customers...',
    fa: 'جستجوی مشتریان...',
  },
  'customers.noResults': {
    en: 'No customers found',
    fa: 'مشتری‌ای یافت نشد',
  },
  'customers.addFirst': {
    en: 'Add your first customer',
    fa: 'اولین مشتری خود را اضافه کنید',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => Promise<void>;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('language');
      if (savedLanguage === 'fa' || savedLanguage === 'en') {
        setLanguageState(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    }
  };

  const setLanguage = async (lang: Language) => {
    try {
      await AsyncStorage.setItem('language', lang);
      setLanguageState(lang);
    } catch (error) {
      console.error('Error saving language:', error);
    }
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  const isRTL = language === 'fa';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}