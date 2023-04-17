import { GetStaticProps } from 'next'
import axios from 'axios'

import { MenuItem } from 'interfaces/menu.interface'
import { API } from 'helpers/api'
import { SearchProps } from './types'

export const getStaticProps: GetStaticProps<SearchProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory
  })

  return {
    props: {
      menu,
      firstCategory
    }
  }
}
