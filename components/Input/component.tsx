import { ForwardedRef, forwardRef } from 'react'
import classNames from 'classnames'

import { InputProps } from './types'
import styles from './styles.module.scss'

export const Input = forwardRef(({ error, className, ...props }: InputProps, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={classNames(styles.inputWrapper, className)}>
      <input
        ref={ref}
        className={classNames(styles.input, {
          [styles.error]: error
        })}
        {...props}
      />
      {error && (
        <span
          className={styles.errorMessage}
          role='alert'
        >
          {error.message}
        </span>
      )}
    </div>
  )
})
