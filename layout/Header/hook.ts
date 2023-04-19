import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const useContainer = () => {
  const [isOpened, setIsOpened] = useState(false)
  const router = useRouter()

  const variants = {
    opened: {
      opacity: 1,
      x: 0,
      transition: {
        stiffness: 20
      }
    },
    closed: {
      opacity: 0,
      x: '100%'
    }
  }

  const openMenuHandler = () => {
    document.body.style.overflow = 'hidden'
    setIsOpened(true)
  }

  const closeMenuHandler = () => {
    document.body.style.overflow = ''
    setIsOpened(false)
  }

  useEffect(() => {
    closeMenuHandler()
  }, [router])

  return { isOpened, variants, openMenuHandler, closeMenuHandler }
}

export default useContainer
