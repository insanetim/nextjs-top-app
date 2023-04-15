import { useContext, useEffect } from 'react'

import { AppContext } from 'context/app.context'
import { TypeProps } from './types'
import withLayout from 'layout'

const Type = ({ menu, firstCategory }: TypeProps) => {
  const { setMenu } = useContext(AppContext)

  useEffect(() => {
    setMenu && setMenu(menu)
  }, [menu, setMenu])

  return <h1>Type {firstCategory} Page</h1>
}

export default withLayout(Type)
