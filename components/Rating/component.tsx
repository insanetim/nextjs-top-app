import { ForwardedRef, forwardRef } from 'react'
import classNames from 'classnames'

import { RatingProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, error, tabIndex, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    const { ratingArray } = useContainer({ rating, error, isEditable, setRating, tabIndex })

    return (
      <div
        ref={ref}
        className={classNames(styles.ratingWrapper, {
          [styles.error]: error
        })}
        {...props}
      >
        {ratingArray}
        {error && (
          <span
            className={styles.errorMessage}
            role='alert'
          >
            {error.message}
          </span>
        )}
      </div>
    )
  }
)
