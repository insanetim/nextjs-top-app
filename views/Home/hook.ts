import { GetStaticProps } from 'next'

import { MenuItem } from 'interfaces/menu.interface'
import httpClient from 'api/httpClient'
import { API } from 'helpers/api'
import { HomeProps } from './types'

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  let menu: MenuItem[] = []

  try {
    const { data } = await httpClient.post<MenuItem[]>(API.topPage.find, { firstCategory })
    menu = data
  } catch (error) {
    console.log(error)
  }

  return {
    props: {
      menu,
      firstCategory
    }
  }
}
