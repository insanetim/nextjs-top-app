import { KeyboardEvent, useEffect, useState } from 'react'
import classNames from 'classnames'

import StarIcon from './star.svg'
import { RatingHookProps } from './types'
import styles from './styles.module.scss'

const useContainer = ({ rating, isEditable, setRating }: RatingHookProps) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(null))

  const changeDisplayHandler = (i: number) => {
    if (!isEditable) {
      return
    }
    constructRating(i)
  }

  const clickHandler = (i: number) => {
    if (!isEditable || !setRating) {
      return
    }
    setRating(i)
  }

  const keyDownHandler = (i: number, e: KeyboardEvent<SVGAElement>) => {
    if (e.code !== 'Space' || !setRating) {
      return
    }
    setRating(i)
  }

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          key={i}
          className={classNames(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplayHandler(i + 1)}
          onMouseLeave={() => changeDisplayHandler(rating)}
          onClick={() => clickHandler(i + 1)}
        >
          <StarIcon
            tabIndex={isEditable ? 0 : -1}
            onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && keyDownHandler(i + 1, e)}
          />
        </span>
      )
    })
    setRatingArray(updatedArray)
  }

  useEffect(() => {
    constructRating(rating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

  return { ratingArray }
}

export default useContainer
