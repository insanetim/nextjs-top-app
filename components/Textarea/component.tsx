import classNames from 'classnames'

import { TextareaProps } from './types'
import styles from './styles.module.scss'

export const Textarea = ({ className, ...props }: TextareaProps) => {
  return (
    <textarea
      className={classNames(className, styles.textarea)}
      {...props}
    />
  )
}
