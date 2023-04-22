import { useState } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { useReducedMotion } from 'framer-motion'
import { sortBy } from 'sort-by-typescript'

import { MenuItem } from 'interfaces/menu.interface'
import { TopPageModel } from 'interfaces/page.interface'
import { ProductModel } from 'interfaces/product.interface'
import httpClient from 'api/httpClient'
import { firstLevelMenu } from 'helpers/helpers'
import { SortEnum } from 'components/Sort/types'
import { API } from 'helpers/api'
import { TopPageHookProps, TopPageProps } from './types'

const useContainer = ({ products }: TopPageHookProps) => {
  const [sort, setSort] = useState(SortEnum.Rating)
  const prefersReducedMotion = useReducedMotion()

  const updatedProdcuts = products.map(p => {
    p.rating = Math.round(p.reviewAvg ?? p.initialRating)
    return p
  })

  let sortedProducts: ProductModel[] = []

  if (sort === SortEnum.Rating) {
    sortedProducts = updatedProdcuts.sort(sortBy('-rating', 'price'))
  } else if (sort === SortEnum.Price) {
    sortedProducts = updatedProdcuts.sort(sortBy('price', '-rating'))
  }

  const setSortHandler = (sort: SortEnum) => {
    setSort(sort)
  }

  return { sort, sortedProducts, prefersReducedMotion, setSortHandler }
}

export default useContainer

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const m of firstLevelMenu) {
    try {
      const { data: menu } = await httpClient.post<MenuItem[]>(API.topPage.find, {
        firstCategory: m.id
      })
      paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
    } catch (error) {
      console.log(error)
    }
  }

  return {
    paths,
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return { notFound: true }
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)

  if (!firstCategoryItem) {
    return { notFound: true }
  }

  try {
    const { data: menu } = await httpClient.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id
    })
    if (menu.length === 0) {
      return { notFound: true }
    }
    const { data: page } = await httpClient.get<TopPageModel>(API.topPage.byAlias + params.alias)
    const { data: products } = await httpClient.post<ProductModel[]>(API.product.find, {
      category: page.category,
      limit: 10
    })

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products
      }
    }
  } catch {
    return { notFound: true }
  }
}
