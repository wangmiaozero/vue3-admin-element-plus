import { asyncRoutes, constantRoutes } from '@/router';

import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes';

const state = () => ({
  routes: [],
  partialRoutes: [],
});
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
};
const mutations = {
  setRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  setAllRoutes(state, routes) {
    state.routes = constantRoutes.concat(routes);
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = constantRoutes.concat(routes);
  },
};
const actions = {
  async setRoutes({ commit }, permissions) {
    //开源版只过滤动态路由permissions，admin不再默认拥有全部权限
    const finallyAsyncRoutes = await filterAsyncRoutes([...asyncRoutes], permissions);
    commit('setRoutes', finallyAsyncRoutes);
    return finallyAsyncRoutes;
  },
  async setAllRoutes({ commit }) {
   
    const data = [
      {
        path: '/',
        component: 'Layout',
        redirect: 'index',
        children: [
          {
            path: '/index',
            name: 'Index',
            component: '',
            meta: {
              title: '首页',
              icon: 'home',
              affix: true,
              noKeepAlive: true,
            },
          },
        ],
      },
      {
        path: '/comp',
        component: 'Layout',
        name: 'Comp',
        meta: { title: '组件', icon: '' },
        children: [
          {
            path: '/iconPark',
            name: 'IconPark',
            component: '',
            meta: {
              title: '图标',
            },
            children: [
              {
                path: '/iconPark2',
                name: 'IconPark2',
                component: '',
                meta: {
                  title: '图标2211',
                },
              },
            ],
          },
          {
            path: '/iconPark233',
            name: 'IconPark3',
            component: () => '',
            meta: {
              title: '图标2233',
            },
          },
          {
            path: '/iconPark234',
            name: 'IconPark3',
            component: () => '',
            meta: {
              title: '测试',
            },
          },
        ],
      },
    ];
    console.log(data,'data');
    // data.push({ path: '*', redirect: '/404', hidden: true });
    let accessRoutes = convertRouter(data);
    commit('setAllRoutes', accessRoutes);
    return accessRoutes;
  },
  setPartialRoutes({ commit }, accessRoutes) {
    commit('setPartialRoutes', accessRoutes);
    return accessRoutes;
  },
};
export default { state, getters, mutations, actions };
