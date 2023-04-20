import { Controller } from 'react-hook-form'
import classNames from 'classnames'

import { Button, Input, Rating, Textarea } from 'components'
import CloseIcon from './close.svg'
import { ReviewFormProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

export const ReviewForm = ({ productId, isOpened, className, ...props }: ReviewFormProps) => {
  const { register, control, errors, isSuccess, error, submitFormHandler, setIsSuccess, setError, clearErrors } =
    useContainer({
      productId
    })

  return (
    <form onSubmit={submitFormHandler}>
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
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.name ? true : false}
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
          tabIndex={isOpened ? 0 : -1}
          aria-invalid={errors.title ? true : false}
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
                tabIndex={isOpened ? 0 : -1}
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
          tabIndex={isOpened ? 0 : -1}
          aria-label='Текст отзыва'
          aria-invalid={errors.description ? true : false}
        />
        <div className={styles.submit}>
          <Button
            appearance='primary'
            onClick={() => clearErrors()}
            tabIndex={isOpened ? 0 : -1}
          >
            Отправить
          </Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div
          className={classNames(styles.panel, styles.success)}
          role='alert'
        >
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <button
            className={styles.close}
            onClick={() => setIsSuccess(false)}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && (
        <div
          className={classNames(styles.panel, styles.error)}
          role='alert'
        >
          Что-то пошло не так, попробуйте обновить страницу.
          <button
            className={styles.close}
            onClick={() => setError('')}
            aria-label='Закрыть оповещение'
          >
            <CloseIcon />
          </button>
        </div>
      )}
    </form>
  )
}
