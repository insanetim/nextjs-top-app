import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export interface TagProps extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> {
  size?: 'sm' | 'md'
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary'
  href?: string
}
