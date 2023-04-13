import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export interface SortProps
  extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  sort: SortEnum
  setSort: (sort: SortEnum) => void
}

export enum SortEnum {
  Rating,
  Price
}
