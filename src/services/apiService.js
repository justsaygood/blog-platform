class ApiService {
  baseURL = 'https://blog.kata.academy/api/'

  async getArticleFull(slug, token) {
    const url = new URL(`${this.baseURL}/articles/${slug}`)

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Token ${token}`,
      },
    }).catch((err) => err.message)

    return response.json()
  }
}

const apiService = new ApiService()

// eslint-disable-next-line import/prefer-default-export
export { apiService }
