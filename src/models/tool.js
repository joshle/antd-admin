import modelExtend from 'dva-model-extend'
import { query } from 'services/tools'
import { pageModel } from 'models/common'

export default modelExtend(pageModel, {

  namespace: 'tool',

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/tool') {
          dispatch({ type: 'query',
            payload: {
              status: 2,
              ...location.query,
            } })
        }
      })
    },
  },

  effects: {
    * query ({
      payload,
    }, { call, put }) {
      const data = yield call(query, payload)
      if (data.success) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.data,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.total,
            },
          },
        })
      } else {
        throw data
      }
    },
  },
})
