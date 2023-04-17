import classNames from 'classnames'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

import { Rating } from 'components'
import UserIcon from './user.svg'
import { ReviewProps } from './types'
import styles from './styles.module.scss'

export const Review = ({ review, className, ...props }: ReviewProps) => {
  const { name, title, description, createdAt, rating } = review

  return (
    <div
      className={classNames(styles.review, className)}
      {...props}
    >
      <UserIcon className={styles.user} />
      <div className={styles.title}>
        <span className={styles.name}>{name}:</span>&nbsp;&nbsp;
        <span>{title}</span>
      </div>
      <div className={styles.date}>{format(new Date(createdAt), 'dd MMMM yyyy', { locale: ru })}</div>
      <div className={styles.rating}>
        <Rating rating={rating} />
      </div>
      <div className={styles.description}>{description}</div>
    </div>
  )
}
