import { useSelector } from 'react-redux'

const useStateUser = () => useSelector((state) => state.user)

// const useStateArticles = () => useSelector((state) => state.articles)

export default useStateUser
