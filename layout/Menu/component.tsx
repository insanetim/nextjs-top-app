import useContainer from './hook'
import styles from './styles.module.scss'

const Menu = () => {
  const { buildFirstLevel } = useContainer()

  return <div className={styles.menu}>{buildFirstLevel()}</div>
}

export default Menu
