import { useContext, useEffect } from 'react'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import axios from 'axios'

import { MenuItem } from 'interfaces/menu.interface'
import { TopLevelCategory } from 'interfaces/page.interface'
import { firstLevelMenu } from 'helpers/helpers'
import { AppContext } from 'context/app.context'
import withLayout from 'layout'

const Type = ({ menu, firstCategory }: TypeProps) => {
  const { setMenu } = useContext(AppContext)

  useEffect(() => {
    setMenu && setMenu(menu)
  }, [menu, setMenu])

  return <>Type {firstCategory}</>
}

export default withLayout(Type)

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

  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/top-page/find', {
    firstCategory: firstCategoryItem.id
  })

  return {
    props: {
      menu,
      firstCategory: firstCategoryItem.id
    }
  }
}

interface TypeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
}
