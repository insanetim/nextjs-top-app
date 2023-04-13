import { GetStaticProps } from 'next'
import axios from 'axios'

import { MenuItem } from 'interfaces/menu.interface'
import withLayout from 'layout'

const Search = () => {
  return <>Search</>
}

export default withLayout(Search)

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0
  const { data: menu } = await axios.post<MenuItem[]>(process.env.NEXT_PUBLIC_DOMAIN + '/top-page/find', {
    firstCategory
  })

  return {
    props: {
      menu,
      firstCategory
    }
  }
}

interface HomeProps {
  menu: MenuItem[]
  firstCategory: number
}
