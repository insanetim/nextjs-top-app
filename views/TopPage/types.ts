import { MenuItem } from 'interfaces/menu.interface'
import { TopLevelCategory, TopPageModel } from 'interfaces/page.interface'
import { ProductModel } from 'interfaces/product.interface'

export interface TopPageProps {
  menu: MenuItem[]
  firstCategory: TopLevelCategory
  page: TopPageModel
  products: ProductModel[]
}

export interface TopPageHookProps {
  products: ProductModel[]
}
