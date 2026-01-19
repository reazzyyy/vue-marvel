import useHttp from '@/hooks/useHttp'
import { ref, computed } from 'vue'

export default function MarvelService() {
  const serviceError = ref(null)

  const { loading, error: httpError, request, clearError } = useHttp()
  const _apiKey = 'd4eecb0c66dedbfae4eab45d312fc1df'
  const _apiBase = 'https://marvel-server-zeta.vercel.app/'
  const _baseOffset = 0

  const clearServiceError = () => {
    serviceError.value = null
    clearError()
  }

  const getAllCharacters = async (offset = _baseOffset) => {
    const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apiKey}`)
    return res.data.results.map(_transformCharacter)
  }

  const getCharacter = async (id) => {
    try {
      const res = await request(`${_apiBase}characters/${id}?apikey=${_apiKey}`)
      if (res.error) {
        serviceError.value = res.error
        throw new Error(res.error)
      }
      return _transformCharacter(res.data.results[0])
    } catch (e) {
      serviceError.value = e
      throw new Error(e.message)
    }
  }

  const getComic = async (id) => {
    try {
      const res = await request(`${_apiBase}comics/${id}?apikey=${_apiKey}`)
      if (res.error) {
        serviceError.value = res.error
        throw new Error(res.error)
      }
      return _transformComics(res.data.results[0])
    } catch (e) {
      serviceError.value = e
      throw new Error(e.message)
    }
  }

  const getAllComics = async (offset = 0) => {
    const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apiKey}`)
    return res.data.results.map(_transformComics)
  }

  const _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description:
        char.description.length > 200
          ? char.description.slice(0, 200) + '...'
          : char.description || 'There is no description for this character',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      homepage: char.urls[0].url,
      wiki: char.urls[1].url,
      comics: char.comics.items,
    }
  }

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      description: comics.description || 'There is no description',
      price: comics.prices[0].price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE',
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      pageCount: comics.pageCount,
      language: comics.textObjects.languages,
    }
  }

  const error = computed(() => serviceError.value || httpError.value)

  return {
    loading,
    error,
    clearServiceError,
    getAllCharacters,
    getCharacter,
    getAllComics,
    getComic,
  }
}
