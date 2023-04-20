import useContainer from './hook'
import styles from './styles.module.scss'

const Menu = () => {
  const { announce, buildFirstLevel } = useContainer()

  return (
    <nav
      className={styles.menu}
      role='navigation'
    >
      {announce && (
        <span
          className='visualyHidden'
          role='log'
        >
          {announce === 'opened' ? 'развернуто' : 'свернуто'}
        </span>
      )}
      {buildFirstLevel()}
    </nav>
  )
}

export default Menu
