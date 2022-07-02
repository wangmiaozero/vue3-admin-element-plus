/*
 * @Description: 路由tabbar
 * @Version: 0.1
 * @Autor: wangmiao
 * @Date: 2021-02-22 22:29:35
 * @LastEditors: wangmiao
 * @LastEditTime: 2021-02-22 22:42:47
 */

const state = {
  visitedRoutes: [],
};

const getters = {
  visitedRoutes: (state) => state.visitedRoutes,
};
const mutations = {
  addVisitedRoute(state, route) {
    let target = state.visitedRoutes.find((item) => item.path === route.path);
    if (target) {
      if (route.fullPath !== target.fullPath) Object.assign(target, route);
      return;
    }
    state.visitedRoutes.push(Object.assign({}, route));
  },
  delVisitedRoute(state, route) {
    try {
      let index = state.visitedRoutes.findIndex(r=>r.path === route.path)
      if(index!=-1) {
        state.visitedRoutes.splice(index, 1);
      }
    } catch (error) {
      console.log(error)
    }
  },
  delOthersVisitedRoute(state, route) {
    state.visitedRoutes = state.visitedRoutes.filter(
      (item) => item.meta.affix || item.path === route.path
    );
  },
  delLeftVisitedRoute(state, route) {
    let index = state.visitedRoutes.length;
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
      return item.meta.affix || index <= state.visitedRoutes.indexOf(item);
    });
  },
  delRightVisitedRoute(state, route) {
    let index = state.visitedRoutes.length;
    state.visitedRoutes = state.visitedRoutes.filter((item) => {
      if (item.name === route.name) index = state.visitedRoutes.indexOf(item);
      return item.meta.affix || index >= state.visitedRoutes.indexOf(item);
    });
  },
  delAllVisitedRoutes(state) {
    state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix);
  },
  updateVisitedRoute(state, route) {
    state.visitedRoutes.forEach((item) => {
      if (item.path === route.path) item = Object.assign(item, route);
    });
  },
};
const actions = {
  addVisitedRoute({ commit }, route) {
    commit('addVisitedRoute', route);
  },
  async delRoute({ dispatch, state }, route) {
    await dispatch('delVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  delVisitedRoute({ commit, state }, route) {
    commit('delVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  async delOthersRoutes({ dispatch, state }, route) {
    await dispatch('delOthersVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  async delLeftRoutes({ dispatch, state }, route) {
    await dispatch('delLeftVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  async delRightRoutes({ dispatch, state }, route) {
    await dispatch('delRightVisitedRoute', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  delOthersVisitedRoute({ commit, state }, route) {
    commit('delOthersVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  delLeftVisitedRoute({ commit, state }, route) {
    commit('delLeftVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  delRightVisitedRoute({ commit, state }, route) {
    commit('delRightVisitedRoute', route);
    return [...state.visitedRoutes];
  },
  async delAllRoutes({ dispatch, state }, route) {
    await dispatch('delAllVisitedRoutes', route);
    return {
      visitedRoutes: [...state.visitedRoutes],
    };
  },
  delAllVisitedRoutes({ commit, state }) {
    commit('delAllVisitedRoutes');
    return [...state.visitedRoutes];
  },
  updateVisitedRoute({ commit }, route) {
    commit('updateVisitedRoute', route);
  },
};
export default { state, getters, mutations, actions };
