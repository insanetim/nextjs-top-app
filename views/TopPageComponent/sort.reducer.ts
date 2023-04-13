import { sortBy } from 'sort-by-typescript'

import { SortEnum } from 'components/Sort/types'
import { ProductModel } from 'interfaces/product.interface'

type SortActions = { type: SortEnum.Price } | { type: SortEnum.Rating }

interface SortReducerState {
  sort: SortEnum
  products: ProductModel[]
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort(sortBy('-initialRating', 'price'))
      }
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort(sortBy('price', '-initialRating'))
      }
    default:
      throw new Error('Wrong sorting type')
  }
}
