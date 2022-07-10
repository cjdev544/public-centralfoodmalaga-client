import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Search from '../components/Search'
import Seo from '../components/Seo'

const SearchPage = () => {
  const router = useRouter()

  useEffect(() => {
    document.getElementById('search').focus()
  }, [])

  useEffect(() => {
    if (router.query.query === '') {
      router.push('/')
    }
  }, [router])

  return (
    <>
      <Seo title={`Buscando: ${router.query.query}`} />
      <main>
        <Search />
      </main>
    </>
  )
}

export default SearchPage
