import withLayout from 'layout'
import { TypeProps } from './types'
import useContainer from './hook'

const Type = ({ menu, firstCategory }: TypeProps) => {
  useContainer(menu)

  return <h1>Type {firstCategory} Page</h1>
}

export default withLayout(Type)
