import { KeyboardEvent, useContext } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import { motion } from 'framer-motion'

import { FirstLevelMenuItem, PageItem } from 'interfaces/menu.interface'
import { AppContext } from 'context/app.context'
import { firstLevelMenu } from 'helpers/helpers'
import styles from './styles.module.scss'

const useContainer = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const router = useRouter()

  const variants = {
    visible: {
      marginBottom: 20,
      transition: {
        duration: 0.1,
        staggerChildren: 0.05
      }
    },
    hidden: {
      marginBottom: 0
    }
  }

  const variantsChildren = {
    visible: {
      opacity: 1,
      height: 29,
      transition: {
        duration: 0.2
      }
    },
    hidden: {
      opacity: 0,
      height: 0
    }
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map(m => {
          if (m._id.secondCategory === secondCategory) {
            m.isOpened = !m.isOpened
          }
          return m
        })
      )
  }

  const openSecondLevelKeyboard = (secondCategory: string, e: KeyboardEvent) => {
    if (e.code === 'Enter' || e.code === 'Space') {
      e.preventDefault()
      openSecondLevel(secondCategory)
    }
  }

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map(m => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a className={styles.firstLevelLink}>
                <div
                  className={classNames(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id === firstCategory
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id === firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <div className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true
          }
          return (
            <div key={m._id.secondCategory}>
              <div
                className={styles.secondLevel}
                onClick={openSecondLevel.bind(null, m._id.secondCategory)}
                onKeyDown={openSecondLevelKeyboard.bind(null, m._id.secondCategory)}
                tabIndex={0}
              >
                {m._id.secondCategory}
              </div>
              <motion.div
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.div>
            </div>
          )
        })}
      </div>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map(p => (
      <motion.div
        key={p._id}
        variants={variantsChildren}
      >
        <Link href={`/${route}/${p.alias}`}>
          <a
            className={classNames(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` === router.asPath
            })}
            title={p.category}
            tabIndex={isOpened ? 0 : -1}
          >
            {p.category}
          </a>
        </Link>
      </motion.div>
    ))
  }

  return { buildFirstLevel }
}

export default useContainer
