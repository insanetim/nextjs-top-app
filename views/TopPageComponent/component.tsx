import { TopPageComponentProps } from './types'
import { HhData, Htag, Tag } from 'components'
import styles from './styles.module.scss'

export const TopPageComponent = ({ page, products }: TopPageComponentProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag='h1'>{page.title}</Htag>
        {products && (
          <Tag
            color='gray'
            size='md'
          >
            {products.length}
          </Tag>
        )}
        <span>sorting</span>
      </div>
      <div>{products && products.map(p => <div key={p._id}>{p.title}</div>)}</div>
      {page.hh?.count > 0 && (
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
    </div>
  )
}
