import classNames from 'classnames'

import { Button, Input } from 'components'
import GlassIcon from './glass.svg'
import { SearchProps } from './types'
import useContainer from './hook'
import styles from './styles.module.scss'

export const Search = ({ className, ...props }: SearchProps) => {
  const { search, changeHandler, goToSearch, keyDownHandler } = useContainer()

  return (
    <form
      className={classNames(styles.search, className)}
      role='search'
      {...props}
    >
      <Input
        className={styles.input}
        placeholder='Поиск...'
        value={search}
        onChange={changeHandler}
        onKeyDown={keyDownHandler}
      />
      <Button
        className={styles.button}
        appearance='primary'
        onClick={goToSearch}
        aria-label='Искать по сайту'
      >
        <GlassIcon />
      </Button>
    </form>
  )
}
