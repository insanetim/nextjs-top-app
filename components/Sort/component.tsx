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
      role='radiogroup'
    >
      <button
        className={classNames({
          [styles.active]: sort === SortEnum.Rating
        })}
        onClick={clickHandler.bind(null, SortEnum.Rating)}
        role='radio'
        aria-checked={sort === SortEnum.Rating}
        aria-label='Сортировать по рейтингу'
      >
        <SortIcon className={styles.sortIcon} />
        По рейтингу
      </button>
      <button
        className={classNames({
          [styles.active]: sort === SortEnum.Price
        })}
        onClick={clickHandler.bind(null, SortEnum.Price)}
        role='radio'
        aria-checked={sort === SortEnum.Price}
        aria-label='Сортировать по цене'
      >
        <SortIcon className={styles.sortIcon} />
        По цене
      </button>
    </div>
  )
}
