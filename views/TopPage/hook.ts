import { useState } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import axios from 'axios'
import { sortBy } from 'sort-by-typescript'

import { MenuItem } from 'interfaces/menu.interface'
import { TopPageModel } from 'interfaces/page.interface'
import { ProductModel } from 'interfaces/product.interface'
import { SortEnum } from 'components/Sort/types'
import { TopPageProps } from './types'
import { firstLevelMenu } from 'helpers/helpers'

const useContainer = (products: ProductModel[]) => {
  const [sort, setSort] = useState(SortEnum.Rating)

  const updatedProdcuts = products.map(p => {
    p.rating = Math.round(p.reviewAvg ?? p.initialRating)
    return p
  })

  let sortedProducts = [] as ProductModel[]
  if (sort === SortEnum.Rating) {
    sortedProducts = updatedProdcuts.sort(sortBy('-rating', 'price'))
  } else if (sort === SortEnum.Price) {
    sortedProducts = updatedProdcuts.sort(sortBy('price', '-rating'))
  }

  const setSortHandler = (sort: SortEnum) => {
    setSort(sort)
  }

  return { sort, sortedProducts, setSortHandler }
}

export default useContainer

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = []

  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: m.id
    })
    paths = paths.concat(menu.flatMap(s => s.pages.map(p => `/${m.route}/${p.alias}`)))
  }

  return {
    paths,
    fallback: true
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
    const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
      firstCategory: firstCategoryItem.id
    })
    if (menu.length === 0) {
      return { notFound: true }
    }
    const { data: page } = await axios.get<TopPageModel>(
      process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/byAlias/' + params.alias
    )
    const { data: products } = await axios.post<ProductModel[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/product/find/', {
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
