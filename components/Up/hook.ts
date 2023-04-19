import { useScroll } from 'framer-motion'

const useContainer = () => {
  const { scrollYProgress } = useScroll()

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return { scrollToTop, scrollYProgress }
}

export default useContainer
