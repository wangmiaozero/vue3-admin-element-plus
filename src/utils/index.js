/*
 * @Description: 常用公共工具函数
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-22 22:29:35
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-22 22:42:47
 */

import { setting } from '@/config/setting';
const { title } = setting;

export const getPageTitle = (pageTitle) => {
  if (pageTitle) {
    return `${pageTitle}-${title}`;
  }
  return `${title}`;
};
