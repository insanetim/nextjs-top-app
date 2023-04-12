import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export interface PtagProps
  extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLParagraphElement>, HTMLParagraphElement>> {
  size?: 'sm' | 'md' | 'lg'
}
