import { useState } from 'react'
import { GetStaticProps } from 'next'
import axios from 'axios'

import { MenuItem } from 'interfaces/menu.interface'
import { Htag, Rating } from 'components'
import withLayout from 'layout'

const Home = () => {
  const [rating, setRating] = useState(3)

  return (
    <>
      <Htag tag='h1'>Heading</Htag>
      <Rating
        rating={rating}
        isEditable
        setRating={setRating}
      />
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

interface HomeProps {
  menu: MenuItem[]
  firstCategory: number
}
