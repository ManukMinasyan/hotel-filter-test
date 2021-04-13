import qs from 'qs'
import * as api from '~/modules/api'

const actions = {
  async index({ commit }, filters) {
    try {
      return await api.fetch({
        url: `/hotels/?${qs.stringify( {filter:filters}, { indices: true, skipNulls: true})}`,
        resource: 'v1',
      })
    }
    catch (e) {
      throw e
    }
  },
}

export default {
  namespaced: true,
  actions,
}