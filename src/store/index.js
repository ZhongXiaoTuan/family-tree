import Vue from 'vue';
import Vuex from 'vuex';
import reconstruct from './reconstruct';
import Person from './person';
import Tree from './tree';

Vue.use(Vuex);

const state = {
  tree: {},
  isPater: true,
  treeType: 'self',
};

const getters = {
  me: state => state.tree && state.tree.me,
  current: state => state.tree && state.tree.current,
  relation: state => state.tree && state.tree.relation(),
  root: state => {
    const me = state.tree && state.tree.me;
    if (!me) {
      return null;
    }
    const type = state.treeType;
    const parent = state.isPater ? 'father' : 'mother';
    if (type === 'parent') {
      return me[parent] || me;
    }
    if (type === 'grand') {
      let root = me;
      while (root[parent]) {
        root = root[parent];
      }
      return root;
    }
    return me;
  }
};

const mutations = {
  buildTree(state, data) {
    state.tree = reconstruct(data);
  },
  setMe(state) {
    state.tree.setMe(state.tree.current);
    state.tree.current = null;
  },
  setCurrent(state, id) {
    const person = state.tree.members[id];
    if (!person) {
      state.tree.current = null;
    }
    state.tree.setCurrent(person);
  },
  transpose(state) {
    state.tree.transpose();
  },
  setPater(state, bool) {
    state.isPater = bool;
  },
  setTree(state, type) {
    state.treeType = type.name;
  },
  saveTree(state) {
    localStorage.setItem('tree', state.tree.toString());
  },
}

export default new Vuex.Store({
  state,
  getters,
  mutations,
});