import { GetStaticProps } from 'next'
import axios from 'axios'

import { MenuItem } from 'interfaces/menu.interface'
import { SearchProps } from './types'

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/api/top-page/find', {
    firstCategory
  })

  return {
    props: {
      menu,
      firstCategory
    }
  }
}
