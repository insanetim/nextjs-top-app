import classNames from 'classnames'

import SortIcon from './sort.svg'
import { SortEnum, SortProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

export const Sort = ({ sort, setSort, className, ...props }: SortProps) => {
  const { clickHandler } = useContainer({ setSort })

  return (
    <div
      className={classNames(styles.sort, className)}
      {...props}
    >
      <div
        id='sort'
        className={styles.sortName}
      >
        Сортировка
      </div>
      <button
        id='rating'
        className={classNames({
          [styles.active]: sort === SortEnum.Rating
        })}
        onClick={clickHandler.bind(null, SortEnum.Rating)}
        aria-selected={sort === SortEnum.Rating}
        aria-labelledby='sort rating'
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        id='price'
        className={classNames({
          [styles.active]: sort === SortEnum.Price
        })}
        onClick={clickHandler.bind(null, SortEnum.Price)}
        aria-selected={sort === SortEnum.Price}
        aria-labelledby='sort price'
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  )
}
