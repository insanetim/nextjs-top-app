import { motion } from 'framer-motion'

import { ButtonIcon } from 'components'
import useContainer from './hook'
import styles from './styles.module.scss'

export const Up = () => {
  const { scrollToTop, scrollYProgress } = useContainer()

  return (
    <motion.div
      className={styles.up}
      style={{ opacity: scrollYProgress }}
    >
      <ButtonIcon
        icon='up'
        appearance='primary'
        onClick={scrollToTop}
        aria-label='Наверх'
      />
    </motion.div>
  )
}
