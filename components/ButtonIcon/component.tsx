import classNames from 'classnames'

import { ButtonIconProps, icons } from './types'
import styles from './styles.module.scss'

export const ButtonIcon = ({ appearance, icon, className, ...props }: ButtonIconProps) => {
  const IconComponent = icons[icon]

  return (
    <button
      className={classNames(styles.button, styles[appearance], className)}
      {...props}
    >
      <IconComponent />
    </button>
  )
}
