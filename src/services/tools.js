import { request, config } from 'utils'

const { api } = config
const { tools } = api

export async function query (params) {
  return request({
    url: tools,
    method: 'get',
    data: params,
  })
}
