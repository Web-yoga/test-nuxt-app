// https://github.com/Cockpit-HQ/Cockpit

// https://getcockpit.com/

// https://discourse.getcockpit.com/

import axios from 'axios'

const API_URL = 'https://bioprotection.ru/abc/api'

class ApiService {
  getContacts () {
    return axios.get(API_URL + '/content/item/header_var')
  }
  getCatalogLph () {
    return axios.get(API_URL + '/content/item/catalog_lph')
  }
  getFavoriteMedia () {
    return axios.get(API_URL + '/content/item/favorite_madia', {params: {populate: 1}})
  }

  getDirectionImages () {
    return axios.get(API_URL + '/content/item/prep_proup_images')
  }

  getCollection (collection, sort, filter) {
    const params = {

      sort: sort,

      filter: filter

    }

    return axios.get(API_URL + '/content/items/' + collection, { params: params })
  }

  async getCollectionStep (collection, params) {
	const result = await axios.get(API_URL + '/content/items/' + collection, { params: params })
    return result.data
  }

  findOneInCollection (collection, filter) {
    const params = {

      filter: filter

    }

    return axios.get(API_URL + '/content/item/' + collection, { params: params })
  }

  getById (collection, id, fields = {}) {
    const params = {

      fields: fields

    }

    return axios.get(`${API_URL}/content/item/${collection}/${id}`, { params: params })
  }

  getImage (id) {
    return axios.get(API_URL + `/assets/image/${id}`)
  }

  findDisease (name, limit = 3, skip = 0) {
    const params = {

      filter: {

        name: {

          $regex: name

        }

      },

      sort: { name: 'ASC' },

      limit: limit,

      skip: skip

    }

    return axios.get(API_URL + '/content/items/disease', { params: params })
  }

  login (login, hash) {
    const filter = {

      login: login,

      hash: hash

    }

    return this.findOneInCollection('users', filter)
  }

  checkLogin (login) {
    const filter = {

      login: login

    }

    return this.findOneInCollection('users', filter)
  }

  checkEmail (email) {
    const filter = {

      email: email

    }

    return this.findOneInCollection('users', filter)
  }

  updateUser (data) {
    return axios.post(API_URL + '/content/item/users',

      { data: data }

    )
  }

  addEmail (data) {
    return axios.post(API_URL + '/content/item/contacts',

      { data: data }

    )
  }

  addFeedback (data) {
    return axios.post(API_URL + '/content/item/feedback',

      { data: data }

    )
  }

  addReset (data) {
    return axios.post(API_URL + '/content/item/reset',

      { data: data }

    )
  }

  createOrder (data) {
    return axios.post(API_URL + '/content/item/orders',

      { data: data }

    )
  }

  createOrderMessage (data) {
	return axios.post(API_URL + '/content/item/order_list',

	{ data: data }

  )
  }

  async updateCollectionFieldById (collection, data) {
	const result = await axios.post(`${API_URL}/content/item/${collection}`, { data: data })
    return result
  }
}

export default new ApiService()
