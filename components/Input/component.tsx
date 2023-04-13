import classNames from 'classnames'

import { InputProps } from './types'
import styles from './styles.module.scss'

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={classNames(className, styles.input)}
      {...props}
    />
  )
}
