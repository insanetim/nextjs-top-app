import { useState } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'

import { Htag, Rating } from 'components'
import { withLayout } from 'layout/Layout'
import { MenuItem } from 'interfaces/menu.interface'

function Home({ menu }: HomeProps) {
  const [rating, setRating] = useState(3)

  return (
    <>
      <Htag tag='h1'>Heading</Htag>
      <Rating
        rating={rating}
        isEditable
        setRating={setRating}
      />
      <ul>
        {menu.map(m => (
          <li key={m._id.secondCategory}>{m._id.secondCategory}</li>
        ))}
      </ul>
    </>
  )
}

export default withLayout(Home)

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

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[]
  firstCategory: number
}
