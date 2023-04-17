import { useContext, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import axios from 'axios'

import { AppContext } from 'context/app.context'
import { MenuItem } from 'interfaces/menu.interface'
import { firstLevelMenu } from 'helpers/helpers'
import { API } from 'helpers/api'
import { TypeHookProps, TypeProps } from './types'

const useContainer = ({ menu }: TypeHookProps) => {
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

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id
  })

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}
