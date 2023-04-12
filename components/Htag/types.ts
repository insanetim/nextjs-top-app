import { DetailedHTMLProps, HTMLAttributes, PropsWithChildren } from 'react'

export interface HtagProps
  extends PropsWithChildren<DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>> {
  tag: 'h1' | 'h2' | 'h3'
}
