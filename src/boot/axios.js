import Vue from 'vue'
import axios from 'axios'
import objectToFormData from 'src/utils/objectToFormData'

Vue.prototype.$axios = axios

axios.interceptors.request.use(request => {
	request.transformRequest = (data) => {
		return objectToFormData(data)
	}

	request.headers.common['Content-Type'] = undefined

	return request
})

axios.interceptors.response.use(response => {
	return Promise.resolve(response)
},
error => {
	return Promise.reject(error)
})
