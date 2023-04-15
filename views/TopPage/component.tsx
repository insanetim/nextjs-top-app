import { useState } from 'react'
import { sortBy } from 'sort-by-typescript'

import { ProductModel } from 'interfaces/product.interface'
import { TopPageProps } from './types'
import { SortEnum } from 'components/Sort/types'
import { Advantages, HhData, Htag, Product, Sort, Tag } from 'components'
import withLayout from 'layout'
import styles from './styles.module.scss'

const TopPage = ({ page, products }: TopPageProps) => {
  const [sort, setSort] = useState(SortEnum.Rating)

  const updatedProdcuts = products.map(p => {
    p.rating = Math.round(p.reviewAvg ?? p.initialRating)
    return p
  })

  let sortedProducts = [] as ProductModel[]
  if (sort === SortEnum.Rating) {
    sortedProducts = updatedProdcuts.sort(sortBy('-rating', 'price'))
  } else if (sort === SortEnum.Price) {
    sortedProducts = updatedProdcuts.sort(sortBy('price', '-rating'))
  }

  const setSortHandler = (sort: SortEnum) => {
    setSort(sort)
  }

  return (
    <div>
      <div className={styles.titleWrap}>
        <div className={styles.title}>
          <Htag tag='h1'>{page.title}</Htag>
          {sortedProducts.length > 0 && (
            <Tag
              color='gray'
              size='md'
            >
              {sortedProducts.length}
            </Tag>
          )}
        </div>
        {sortedProducts.length > 0 && (
          <>
            <Sort
              className={styles.sort}
              sort={sort}
              setSort={setSortHandler}
            />
            <div className={styles.products}>
              {sortedProducts.map(p => (
                <Product
                  key={p._id}
                  product={p}
                />
              ))}
            </div>
          </>
        )}
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

export default withLayout(TopPage)
