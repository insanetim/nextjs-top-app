import { ForwardedRef, forwardRef } from 'react'
import classNames from 'classnames'

import { TextareaProps } from './types'
import styles from './styles.module.scss'

export const Textarea = forwardRef(
  ({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <div className={classNames(styles.textareaWrapper, className)}>
        <textarea
          ref={ref}
          className={classNames(styles.textarea, {
            [styles.error]: error
          })}
          {...props}
        />
        {error && <span className={styles.errorMessage}>{error.message}</span>}
      </div>
    )
  }
)
