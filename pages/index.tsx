import { useState } from 'react'

import { Htag, Rating } from 'components'

export default function Home() {
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
