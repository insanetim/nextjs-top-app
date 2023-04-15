import { createContext, PropsWithChildren, useCallback, useMemo, useState } from 'react'

import { MenuItem } from '../interfaces/menu.interface'
import { TopLevelCategory } from '../interfaces/page.interface'

export interface IAppContext {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  setMenu?: (newMenu: MenuItem[]) => void
}

export const AppContext = createContext<IAppContext>({ menu: [], firstCategory: TopLevelCategory.Courses })

const AppContextProvider = ({ menu, firstCategory, children }: PropsWithChildren<IAppContext>) => {
  const [menuState, setMenuState] = useState<MenuItem[]>(menu)

  const setMenu = useCallback((newMenu: MenuItem[]) => {
    setMenuState(newMenu)
  }, [])

  const contextValue = useMemo(
    () => ({
      menu: menuState,
      firstCategory,
      setMenu
    }),
    [firstCategory, menuState, setMenu]
  )

  return <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
}

export default AppContextProvider
