import { Loader } from 'semantic-ui-react'

import { useSearch } from '../../hooks/useSearch'
import FindProducts from '../FindProducts'
import style from './Search.module.css'

const Search = () => {
  const { searchPlates } = useSearch()

  return (
    <div className='search'>
      {!searchPlates && <Loader active>Buscando platos</Loader>}
      {searchPlates?.length === 0 && (
        <div className={style.noFound}>
          <h2>No hay coincidencias con la busqueda</h2>
        </div>
      )}
      {searchPlates?.length > 0 && (
        <>
          <h2 className={style.title}>Resultados de busqueda</h2>
          <FindProducts products={searchPlates} />
        </>
      )}
    </div>
  )
}

export default Search
