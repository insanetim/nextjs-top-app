import { ForwardedRef, forwardRef } from 'react'
import Image from 'next/legacy/image'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import { Button, Card, Divider, Rating, Review, ReviewForm, Tag } from 'components'
import { declOfNum, priceRu } from 'helpers/helpers'
import { ProductProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

export const Product = motion(
  forwardRef(({ product, className, ...props }: ProductProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { isReviewOpened, reviewRef, variants, openReviewToggle, scrollToReview } = useContainer()

    return (
      <div
        ref={ref}
        className={classNames(styles.productWrapper, className)}
        {...props}
        role='listitem'
      >
        <Card className={styles.product}>
          <div className={styles.logo}>
            <Image
              src={process.env.NEXT_PUBLIC_DOMAIN + product.image}
              alt={product.title}
              width={70}
              height={70}
            />
          </div>
          <div className={styles.title}>{product.title}</div>
          <div className={styles.price}>
            <span>
              <span className='visualyHidden'>цена</span>
              {priceRu(product.price)}
            </span>
            {product.oldPrice && (
              <Tag
                color='green'
                size='sm'
              >
                <span className='visualyHidden'>скидка</span>
                {priceRu(product.price - product.oldPrice)}
              </Tag>
            )}
          </div>
          <div className={styles.credit}>
            {product.credit > 0 && (
              <span>
                <span className='visualyHidden'>в кредит</span>
                {priceRu(product.credit)}
                <span className={styles.month}>/мес</span>
              </span>
            )}
          </div>
          <div className={styles.rating}>
            <span className='visualyHidden'>{`рейтинг ${product.rating ?? product.initialRating}`}</span>
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
          <div
            className={styles.priceTitle}
            aria-hidden='true'
          >
            цена
          </div>
          <div
            className={styles.creditTitle}
            aria-hidden='true'
          >
            {product.credit > 0 && 'в кредит'}
          </div>
          <div className={styles.rateTitle}>
            <a
              href='#ref'
              onClick={scrollToReview}
            >
              {product.reviewCount} {declOfNum(product.reviewCount, ['отзыв', 'отзыва', 'отзывов'])}
            </a>
          </div>
          <div className={styles.hr}>
            <Divider />
          </div>
          <div className={styles.description}>{product.description}</div>
          <div className={styles.features}>
            {product.characteristics.map(c => (
              <div
                key={c.name}
                className={styles.characteristic}
              >
                <span className={styles.characteristicName}>{c.name}</span>
                <span className={styles.characteristicDots}></span>
                <span className={styles.characteristicValue}>{c.value}</span>
              </div>
            ))}
          </div>
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
          <div className={styles.hr2}>
            <Divider />
          </div>
          <div className={styles.actions}>
            <Button appearance='primary'>Узнать подробнее</Button>
            <Button
              className={styles.reviewsButton}
              appearance='ghost'
              arrow={isReviewOpened ? 'down' : 'right'}
              onClick={openReviewToggle}
              aria-expanded={isReviewOpened}
            >
              Читать отзывы
            </Button>
          </div>
        </Card>
        <motion.div
          variants={variants}
          initial='hidden'
          animate={isReviewOpened ? 'visible' : 'hidden'}
          className={styles.reviewsWrapper}
        >
          <Card
            ref={reviewRef}
            className={styles.reviews}
            color='blue'
            tabIndex={isReviewOpened ? 0 : -1}
          >
            {product.reviews.map(r => (
              <div key={r._id}>
                <Review review={r} />
                <Divider />
              </div>
            ))}
            <ReviewForm
              productId={product._id}
              isOpened={isReviewOpened}
            />
          </Card>
        </motion.div>
      </div>
    )
  })
)
