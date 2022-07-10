import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

import { removeAccents } from '../helpers/removeAccents '

export const useSearch = () => {
  const [searchPlates, setSearchPlates] = useState([])

  const data = useSelector((state) => state?.data)
  const { query } = useRouter()

  const products = data?.products
  const textQuery = removeAccents(query.query)

  const searchPlateQuery = (plate) => {
    const inTitle = removeAccents(plate.nombre)
      .toLowerCase()
      .includes(textQuery.toLowerCase())
    const inDescription = removeAccents(plate.descripcion)
      .toLowerCase()
      .includes(textQuery.toLowerCase())
    const inCategory = removeAccents(plate.categoria)
      .toLowerCase()
      .includes(textQuery.toLowerCase())

    if (inTitle || inDescription || inCategory) {
      return true
    }
    return false
  }

  useEffect(() => {
    const newArray = []
    if (query?.query?.length > 0) {
      products?.map((plate) => {
        if (searchPlateQuery(plate)) {
          newArray.push(plate)
        }
      })
      setSearchPlates(newArray)
    } else {
      setSearchPlates([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query])

  return {
    searchPlates,
  }
}
