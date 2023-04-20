import { SortEnum, SortHookProps } from './types'

const useContainer = ({ setSort }: SortHookProps) => {
  const clickHandler = (sort: SortEnum) => {
    setSort(sort)
  }

  return { clickHandler }
}

export default useContainer
