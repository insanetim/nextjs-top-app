import { useReducer } from 'react'
import { sortBy } from 'sort-by-typescript'

import { TopPageComponentProps } from './types'
import { Advantages, HhData, Htag, Sort, Tag } from 'components'
import { SortEnum } from 'components/Sort/types'
import { sortReducer } from './sort.reducer'
import styles from './styles.module.scss'

export const TopPageComponent = ({ page, products }: TopPageComponentProps) => {
  const [{ sort, products: sortedProducts }, dispatchSort] = useReducer(sortReducer, {
    products: products.sort(sortBy('-initialRating', 'price')),
    sort: SortEnum.Rating
  })

  const setSortHandler = (sort: SortEnum) => {
    dispatchSort({ type: sort })
  }

  return (
    <div>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {sortedProducts && (
          <Tag
            color='gray'
            size='md'
          >
            {sortedProducts.length}
          </Tag>
        )}
        <Sort
          sort={sort}
          setSort={setSortHandler}
        />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map(p => (
            <div key={p._id}>
              {p.title} - {p.initialRating} - {p.price}
            </div>
          ))}
      </div>
      {page.hh && page.hh.count > 0 && (
        <>
          <div className={styles.hhTitle}>
            <Htag tag='h2'>Вакансии - {page.category}</Htag>
            <Tag
              color='red'
              size='md'
            >
              hh.ru
            </Tag>
          </div>
          <HhData {...page.hh} />
        </>
      )}
      {page.advantages && page.advantages.length > 0 && page.advantages[0].title && (
        <>
          <Htag tag='h2'>Преимущества</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && (
        <div
          className={styles.seo}
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}
      <Htag tag='h2'>Получаемые навыки</Htag>
      <div className={styles.tagsRow}>
        {page.tags.map(t => (
          <Tag
            key={t}
            color='primary'
          >
            {t}
          </Tag>
        ))}
      </div>
    </div>
  )
}
