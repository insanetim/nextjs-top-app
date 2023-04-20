import { KeyboardEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'

import StarIcon from './star.svg'
import { RatingHookProps } from './types'
import styles from './styles.module.scss'

const useContainer = ({ rating, error, isEditable, setRating, tabIndex }: RatingHookProps) => {
  const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(null))
  const ratingArrayRef = useRef<(HTMLSpanElement | null)[]>([])

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

  const keyDownHandler = (e: KeyboardEvent<HTMLSpanElement>) => {
    if (!isEditable || !setRating) {
      return
    }
    if (e.code === 'ArrowRight' || e.code === 'ArrowUp') {
      e.preventDefault()
      if (!rating) {
        setRating(1)
      } else {
        setRating(rating < 5 ? rating + 1 : 5)
      }
      ratingArrayRef.current[rating]?.focus()
    }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowDown') {
      e.preventDefault()
      setRating(rating > 1 ? rating - 1 : 1)
      ratingArrayRef.current[rating - 2]?.focus()
    }
  }

  const computeFocus = (r: number, i: number): number => {
    if (!isEditable) {
      return -1
    }
    if (!r && i === 0) {
      return tabIndex ?? 0
    }
    if (r == i + 1) {
      return tabIndex ?? 0
    }
    return -1
  }

  const constructRating = (currentRating: number) => {
    const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
      return (
        <span
          key={i}
          ref={r => ratingArrayRef.current?.push(r)}
          className={classNames(styles.star, {
            [styles.filled]: i < currentRating,
            [styles.editable]: isEditable
          })}
          onMouseEnter={() => changeDisplayHandler(i + 1)}
          onMouseLeave={() => changeDisplayHandler(rating)}
          onClick={() => clickHandler(i + 1)}
          onKeyDown={keyDownHandler}
          tabIndex={computeFocus(rating, i)}
          role={isEditable ? 'slider' : ''}
          aria-valuenow={rating}
          aria-valuemax={5}
          aria-valuemin={1}
          aria-label={isEditable ? 'Укажите рейтинг' : `рейтинг ${rating}`}
          aria-invalid={error ? true : false}
        >
          <StarIcon />
        </span>
      )
    })
    setRatingArray(updatedArray)
  }

  useEffect(() => {
    constructRating(rating)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rating, tabIndex])

  return { ratingArray }
}

export default useContainer
