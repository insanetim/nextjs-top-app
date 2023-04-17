import { ChangeEventHandler, KeyboardEventHandler, useState } from 'react'
import { useRouter } from 'next/router'

const useContainer = () => {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
    setSearch(e.target.value)
  }

  const goToSearch = () => {
    if (search.trim()) {
      router.push({
        pathname: '/search',
        query: {
          q: search
        }
      })
    }
  }

  const keyDownHandler: KeyboardEventHandler<HTMLInputElement> = e => {
    if (e.key === 'Enter') {
      goToSearch()
    }
  }

  return { search, changeHandler, goToSearch, keyDownHandler }
}

export default useContainer
