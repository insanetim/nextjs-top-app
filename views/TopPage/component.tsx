import Head from 'next/head'

import { Advantages, HhData, Htag, Product, Sort, Tag } from 'components'
import withLayout from 'layout'
import { TopPageProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'
import { Error404 } from 'views/Error404/component'

const TopPage = ({ page, products }: TopPageProps) => {
  const { sort, sortedProducts, prefersReducedMotion, setSortHandler } = useContainer({ products })

  if (!page || !products) {
    return <Error404 />
  }

  return (
    <>
      <Head>
        <title>{page.metaTitle}</title>
        <meta
          name='description'
          content={page.metaDescription}
        />
        <meta
          property='og:title'
          content={page.metaTitle}
        />
        <meta
          property='og:description'
          content={page.metaDescription}
        />
        <meta
          property='og:type'
          content='article'
        />
      </Head>
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
                <span className='visualyHidden'>элементов</span>
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
              <div
                className={styles.products}
                role='list'
              >
                {sortedProducts.map(p => (
                  <Product
                    key={p._id}
                    product={p}
                    layout={prefersReducedMotion ? false : true}
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
    </>
  )
}

export default withLayout(TopPage)
