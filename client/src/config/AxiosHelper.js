import axios from 'axios'
import { toast } from 'react-toastify'

export const baseURL = "http://localhost:8080/api"

export const httpClient = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
})

export const post = async (url, data, successMsg, token) => {
  try {
    const response = await httpClient.post(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (successMsg) toast.success(successMsg)
    return response.data
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    toast.error(msg)
    throw error
  }
}

export const get = async (url, token) => {
  try {
    const response = await httpClient.get(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    return response.data
  } catch (error) {
    throw error
  }
  
}
// ...existing code...
export const put = async (url, data, successMsg, token) => {
  try {
    const response = await httpClient.put(url, data, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (successMsg) toast.success(successMsg)
    return response.data
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    toast.error(msg)
    throw error
  }
}

export const del = async (url, successMsg, token) => {
  try {
    const response = await httpClient.delete(url, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
    if (successMsg) toast.success(successMsg)
    return response.data
  } catch (error) {
    const msg =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong"
    toast.error(msg)
    throw error
  }
}