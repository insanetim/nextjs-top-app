import { MenuItem } from 'interfaces/menu.interface'
import { TopLevelCategory } from 'interfaces/page.interface'

export interface TypeProps {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
}

export interface TypeHookProps {
  menu: MenuItem[]
}
