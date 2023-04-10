import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react'

export interface TagProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: 'sm' | 'md'
  color?: 'ghost' | 'red' | 'gray' | 'green' | 'primary'
  href?: string
  children: ReactNode
}
