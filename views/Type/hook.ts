import { useContext, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import axios from 'axios'

import { AppContext } from 'context/app.context'
import { MenuItem } from 'interfaces/menu.interface'
import { firstLevelMenu } from 'helpers/helpers'
import { TypeProps } from './types'

const useContainer = (menu: MenuItem[]) => {
  const { setMenu } = useContext(AppContext)

  useEffect(() => {
    setMenu && setMenu(menu)
  }, [menu, setMenu])

  return
}

export default useContainer

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: firstLevelMenu.map(m => `/${m.route}`),
    fallback: true
  }
}

export const getStaticProps: GetStaticProps<TypeProps> = async ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return { notFound: true }
  }

  const firstCategoryItem = firstLevelMenu.find(m => m.route === params.type)

  if (!firstCategoryItem) {
    return { notFound: true }
  }

  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory: firstCategoryItem.id
  })

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}
