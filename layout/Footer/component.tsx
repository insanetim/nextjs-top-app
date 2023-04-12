import classNames from 'classnames'
import { format } from 'date-fns'

import { FooterProps } from './types'
import styles from './styles.module.scss'

const Footer = ({ className, ...props }: FooterProps) => {
  return (
    <footer
      className={classNames(className, styles.footer)}
      {...props}
    >
      <div>OwlTop © 2020 - {format(new Date(), 'yyyy')} Все права защищены</div>
      <a
        href='#'
        target='_blank'
        rel='noopener noreferrer'
      >
        Пользовательское соглашение
      </a>
      <a
        href='#'
        target='_blank'
        rel='noopener noreferrer'
      >
        Политика конфиденциальности
      </a>
    </footer>
  )
}

export default Footer
