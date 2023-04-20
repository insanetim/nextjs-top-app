import { MouseEventHandler, useRef, useState } from 'react'

const useContainer = () => {
  const [isReviewOpened, setIsReviewOpened] = useState(false)
  const reviewRef = useRef<HTMLDivElement>(null)

  const variants = {
    visible: {
      opacity: 1,
      height: 'auto'
    },
    hidden: {
      opacity: 0,
      height: 0
    }
  }

  const openReviewToggle = () => {
    setIsReviewOpened(prev => !prev)
  }

  const scrollToReview: MouseEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault()

    setIsReviewOpened(true)
    window.requestAnimationFrame(() => {
      reviewRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    })
    reviewRef.current?.focus()
  }

  return { isReviewOpened, reviewRef, variants, openReviewToggle, scrollToReview }
}

export default useContainer
