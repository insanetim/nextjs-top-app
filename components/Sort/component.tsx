import classNames from 'classnames'

import { SortEnum, SortProps } from './types'
import SortIcon from './sort.svg'
import styles from './styles.module.scss'

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  return (
    <div
      className={classNames(styles.sort, className)}
      {...props}
    >
      <span
        className={classNames({
          [styles.active]: sort === SortEnum.Rating
        })}
        onClick={() => setSort(SortEnum.Rating)}
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </span>
      <span
        className={classNames({
          [styles.active]: sort === SortEnum.Price
        })}
        onClick={() => setSort(SortEnum.Price)}
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </span>
    </div>
  )
}
