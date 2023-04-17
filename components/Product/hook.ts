import { MouseEventHandler, useRef, useState } from 'react'

const useContainer = () => {
  const [isReviewOpened, setIsReviewOpened] = useState(false)
  const reviewRef = useRef<HTMLDivElement>(null)

  const openReviewToggle = () => {
    setIsReviewOpened(prev => !prev)
  }

  const scrollToReview: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault()

    setIsReviewOpened(true)
    reviewRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }

  return { isReviewOpened, reviewRef, openReviewToggle, scrollToReview }
}

export default useContainer
