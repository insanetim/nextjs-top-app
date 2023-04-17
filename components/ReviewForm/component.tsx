import { Controller } from 'react-hook-form'
import classNames from 'classnames'

import { Button, Input, Rating, Textarea } from 'components'
import CloseIcon from './close.svg'
import { ReviewFormProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps) => {
  const { register, control, handleSubmit, errors, isSuccess, error, onSubmit, setIsSuccess, setError } = useContainer({
    productId
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div
        className={classNames(styles.reviewForm, className)}
        {...props}
      >
        <Input
          {...register('name', {
            required: {
              value: true,
              message: 'Заполните имя'
            }
          })}
          placeholder='Имя'
          error={errors.name}
        />
        <Input
          {...register('title', {
            required: {
              value: true,
              message: 'Заполните заголовок'
            }
          })}
          placeholder='Заголовок отзыва'
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name='rating'
            rules={{
              required: {
                value: true,
                message: 'Укажите рейтинг'
              }
            }}
            render={({ field }) => (
              <Rating
                ref={field.ref}
                rating={field.value}
                setRating={field.onChange}
                isEditable
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register('description', {
            required: {
              value: true,
              message: 'Заполните описание'
            }
          })}
          className={styles.description}
          placeholder='Текст отзыва'
          rows={3}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button
            appearance='primary'
            type='submit'
          >
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={classNames(styles.panel, styles.success)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon
            className={styles.close}
            onClick={() => setIsSuccess(false)}
          />
        </div>
      )}
      {error && (
        <div className={classNames(styles.panel, styles.error)}>
          Что-то пошло не так, попробуйте обновить страницу.
          <CloseIcon
            className={styles.close}
            onClick={() => setError('')}
          />
        </div>
      )}
    </form>
  )
}
