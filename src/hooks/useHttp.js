import { ref } from 'vue'

export default function useHttp() {
  const loading = ref(false)
  const error = ref(null)

  const request = async (url) => {
    loading.value = true
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Could not fetch ${url}, status: ${response.status}`)
      }
      const data = await response.json()
      loading.value = false
      return data
    } catch (err) {
      loading.value = false
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const clearError = () => {
    error.value = null
  }
  return {
    loading,
    error,
    request,
    clearError,
  }
}
