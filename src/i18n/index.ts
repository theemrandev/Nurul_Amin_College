import { LanguageCode, LanguageInfo, TranslationSchema } from "./types";
import { en } from "./locales/en";
import { bn } from "./locales/bn";
import { ar } from "./locales/ar";
import { es } from "./locales/es";
import { fr } from "./locales/fr";
import { de } from "./locales/de";
import { pt } from "./locales/pt";
import { zh } from "./locales/zh";
import { ja } from "./locales/ja";
import { ko } from "./locales/ko";
import { hi } from "./locales/hi";
import { ur } from "./locales/ur";
import { ru } from "./locales/ru";
import { it } from "./locales/it";
import { tr } from "./locales/tr";
import { id } from "./locales/id";
import { nl } from "./locales/nl";
import { th } from "./locales/th";
import { vi } from "./locales/vi";
import { fa } from "./locales/fa";

export const languages: LanguageInfo[] = [
  { code: "en", name: "English", englishName: "English", dir: "ltr" },
  { code: "bn", name: "বাংলা", englishName: "Bengali", dir: "ltr" },
  { code: "ar", name: "العربية", englishName: "Arabic", dir: "rtl" },
  { code: "es", name: "Español", englishName: "Spanish", dir: "ltr" },
  { code: "fr", name: "Français", englishName: "French", dir: "ltr" },
  { code: "de", name: "Deutsch", englishName: "German", dir: "ltr" },
  { code: "pt", name: "Português", englishName: "Portuguese", dir: "ltr" },
  { code: "zh", name: "简体中文", englishName: "Simplified Chinese", dir: "ltr" },
  { code: "ja", name: "日本語", englishName: "Japanese", dir: "ltr" },
  { code: "ko", name: "한국어", englishName: "Korean", dir: "ltr" },
  { code: "hi", name: "हिन्दी", englishName: "Hindi", dir: "ltr" },
  { code: "ur", name: "اردو", englishName: "Urdu", dir: "rtl" },
  { code: "ru", name: "Русский", englishName: "Russian", dir: "ltr" },
  { code: "it", name: "Italiano", englishName: "Italian", dir: "ltr" },
  { code: "tr", name: "Türkçe", englishName: "Turkish", dir: "ltr" },
  { code: "id", name: "Bahasa Indonesia", englishName: "Indonesian", dir: "ltr" },
  { code: "nl", name: "Nederlands", englishName: "Dutch", dir: "ltr" },
  { code: "th", name: "ไทย", englishName: "Thai", dir: "ltr" },
  { code: "vi", name: "Tiếng Việt", englishName: "Vietnamese", dir: "ltr" },
  { code: "fa", name: "فارسی", englishName: "Persian", dir: "rtl" },
];

export const translations: Record<LanguageCode, TranslationSchema> = {
  en,
  bn,
  ar,
  es,
  fr,
  de,
  pt,
  zh,
  ja,
  ko,
  hi,
  ur,
  ru,
  it,
  tr,
  id,
  nl,
  th,
  vi,
  fa,
};

export function getTranslation(lang: LanguageCode): TranslationSchema {
  return translations[lang] || translations.en;
}

export function getLanguageInfo(lang: LanguageCode): LanguageInfo {
  return languages.find((l) => l.code === lang) || languages[0];
}

export * from "./types";
