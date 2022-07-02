import { setting } from '@/config/setting';
const { langKey, themeKey } = setting;
//import Cookies from 'js-cookie';

export function getLanguage() {
  return localStorage.getItem(langKey)||false;
  // return Cookies.get(langKey);
}

export function setLanguage(lang) {
  return localStorage.setItem(langKey, lang)
 // return Cookies.set(langKey, lang);
}

export function getSettings() {
  const settings = localStorage.getItem(themeKey)
  return settings ? JSON.parse(settings) : null;
 /*  const settings = Cookies.get(themeKey);
  return settings ? JSON.parse(settings) : null; */
}

export function setSettings(theme) {
  console.log(theme,'22');
  // return localStorage.setItem(themeKey, JSON.stringify(theme))
  return localStorage.setItem(themeKey, theme)
  // return Cookies.set(themeKey, JSON.stringify(theme));
}
