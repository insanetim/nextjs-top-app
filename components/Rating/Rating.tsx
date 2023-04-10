import { KeyboardEvent, useEffect, useState } from 'react'
import classNames from 'classnames'

import { RatingProps } from './Rating.props'
import StarIcon from './star.svg'
import styles from './Rating.module.scss'

export function Rating({ isEditable = false, rating, setRating, ...props }: RatingProps) {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(null))

  useEffect(() => {
    constructRating(rating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating])

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
            onKeyDown={(e: KeyboardEvent<SVGAElement>) => isEditable && keyDownHandler(i + 1, e)}
            tabIndex={isEditable ? 0 : -1}
          />
        </span>
      )
    })
    setRatingArray(updatedArray)
  }

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

  return <div {...props}>{ratingArray}</div>
}
