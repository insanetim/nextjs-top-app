import { ProductProps } from './types'
import { Button, Card, Divider, Rating, Tag } from 'components'
import { priceRu } from 'helpers/helpers'
import styles from './styles.module.scss'

export const Product = ({ product }: ProductProps) => {
  return (
    <Card className={styles.product}>
      <div className={styles.logo}>
        <img
          src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
          alt={product.title}
        />
      </div>
      <div className={styles.title}>{product.title}</div>
      <div className={styles.price}>
        {priceRu(product.price)}
        {product.oldPrice && (
          <Tag
            color='green'
            size='sm'
          >
            {priceRu(product.price - product.oldPrice)}
          </Tag>
        )}
      </div>
      <div className={styles.credit}>
        {product.credit > 0 && (
          <>
            {priceRu(product.credit)}
            <span className={styles.month}>/мес</span>
          </>
        )}
      </div>
      <div className={styles.rating}>
        <Rating rating={product.rating ?? product.initialRating} />
      </div>
      <div className={styles.tags}>
        {product.categories.map(c => (
          <Tag
            key={c}
            color='ghost'
          >
            {c}
          </Tag>
        ))}
      </div>
      <div className={styles.priceTitle}>цена</div>
      <div className={styles.creditTitle}>{product.credit > 0 && 'в кредит'}</div>
      <div className={styles.rateTitle}>{product.reviewCount} отзывов</div>
      <div className={styles.hr}>
        <Divider />
      </div>
      <div className={styles.description}>{product.description}</div>
      <div className={styles.feature}>features</div>
      <div className={styles.advBlock}>
        {product.advantages && (
          <div className={styles.advantages}>
            <div className={styles.advTitle}>Преимущества</div>
            <div>{product.advantages}</div>
          </div>
        )}
        {product.disadvantages && (
          <div className={styles.disadvantages}>
            <div className={styles.advTitle}>Недостатки</div>
            <div>{product.disadvantages}</div>
          </div>
        )}
      </div>
      <div className={styles.hr}>
        <Divider />
      </div>
      <div className={styles.actions}>
        <Button appearance='primary'>Узнать подробнее</Button>
        <Button
          appearance='ghost'
          arrow='right'
        >
          Читать отзывы
        </Button>
      </div>
    </Card>
  )
}
