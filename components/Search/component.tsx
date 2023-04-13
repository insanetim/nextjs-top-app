import { KeyboardEventHandler, useState } from 'react'
import { useRouter } from 'next/router'
import classNames from 'classnames'

import { SearchProps } from './types'
import { Button, Input } from 'components'
import GlassIcon from './glass.svg'
import styles from './styles.module.scss'

export const Search = ({ className, ...props }: SearchProps) => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const goToSearch = () => {
    if (search.trim()) {
      router.push({
        pathname: 'search',
        query: {
          q: search
        }
      })
    }
  }

  const handleKeyDown: KeyboardEventHandler = e => {
    if (e.key === 'Enter') {
      goToSearch()
    }
  }

  return (
    <div
      className={classNames(className, styles.search)}
      {...props}
    >
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={e => setSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <Button
        className={styles.button}
        appearance='primary'
        onClick={goToSearch}
      >
        <GlassIcon />
      </Button>
    </div>
  )
}
