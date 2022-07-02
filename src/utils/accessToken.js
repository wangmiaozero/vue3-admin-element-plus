import { setting } from '@/config/setting';
const { tokenTableName } = setting;
//import Cookies from 'js-cookie';
export function getAccessToken() {
  return localStorage.getItem(tokenTableName)||false;
 // return Cookies.get(tokenTableName);
}

export function setAccessToken(accessToken) {
  return localStorage.setItem(tokenTableName,accessToken)
  // return Cookies.set(tokenTableName, accessToken);
}

export function removeAccessToken() {
  // return localStorage.setItem(tokenTableName,"")
  return localStorage.removeItem(tokenTableName)
 // return Cookies.remove(tokenTableName);
}