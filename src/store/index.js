import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: "",
  },
  mutations: {
    getlist(state, list) {
      state.list = list
    },
    addPre(state, obj) {
      for (const food of state.list) {
        for (const nowfoods of food.foods) {
          if (nowfoods.id == obj.childId) {
            nowfoods.num += obj.n
          }
        }
      }
    }
  },

  getters: {
    curlist(state) {
      let selectlist = []
      for (const food of state.list) {
        for (const obj of food.foods) {
          if (obj.num > 0) {
            selectlist.push(obj)
          }
        }
      }
      return selectlist
    }

  },
  actions: {
  },
  modules: {
  }

})
