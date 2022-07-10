import { getToken, isTokenExpired } from './token'

export const authFetch = async (url, params, logout) => {
  const token = getToken()

  if (!token) {
    logout()
  } else {
    if (isTokenExpired(token)) {
      logout()
    } else {
      const paramsTemp = {
        ...params,
        headers: {
          ...params?.headers,
          Authorization: `Bearer ${token}`,
        },
      }

      try {
        const response = await fetch(url, paramsTemp)
        const result = await response.json()
        return result
      } catch (err) {
        console.error(err)
        return null
      }
    }
  }
}
