import { KeyboardEvent, useContext, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'
import { motion, useReducedMotion } from 'framer-motion'

import { FirstLevelMenuItem, PageItem } from 'interfaces/menu.interface'
import { AppContext } from 'context/app.context'
import { firstLevelMenu } from 'helpers/helpers'
import styles from './styles.module.scss'

const useContainer = () => {
  const { menu, setMenu, firstCategory } = useContext(AppContext)
  const [announce, setAnnounce] = useState<'closed' | 'opened' | undefined>()
  const prefersReducedMotion = useReducedMotion()
  const router = useRouter()

  const variants = {
    visible: {
      marginBottom: 20,
      transition: prefersReducedMotion
        ? {}
        : {
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
      opacity: prefersReducedMotion ? 1 : 0,
      height: 0
    }
  }

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map(m => {
          if (m._id.secondCategory === secondCategory) {
            setAnnounce(m.isOpened ? 'closed' : 'opened')
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
      <ul className={styles.firstLevelList}>
        {firstLevelMenu.map(m => (
          <li
            key={m.route}
            aria-expanded={m.id === firstCategory}
          >
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
          </li>
        ))}
      </ul>
    )
  }

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map(m => {
          if (m.pages.map(p => p.alias).includes(router.asPath.split('/')[2])) {
            m.isOpened = true
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={openSecondLevel.bind(null, m._id.secondCategory)}
                onKeyDown={openSecondLevelKeyboard.bind(null, m._id.secondCategory)}
                aria-expanded={m.isOpened ?? false}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? 'visible' : 'hidden'}
                animate={m.isOpened ? 'visible' : 'hidden'}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          )
        })}
      </ul>
    )
  }

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map(p => (
      <motion.li
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
            aria-current={`/${route}/${p.alias}` === router.asPath ? 'page' : false}
          >
            {p.category}
          </a>
        </Link>
      </motion.li>
    ))
  }

  return { announce, buildFirstLevel }
}

export default useContainer
