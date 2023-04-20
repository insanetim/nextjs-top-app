import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export enum SortEnum {
  Rating,
  Price
}

export interface SortProps
  extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  sort: SortEnum
  setSort: (sort: SortEnum) => void
}

export interface SortHookProps {
  setSort: (sort: SortEnum) => void
}
