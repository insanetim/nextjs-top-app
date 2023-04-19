import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'

export interface ButtonProps
  extends Omit<
    PropsWithChildren<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  appearance: 'primary' | 'ghost'
  arrow?: 'right' | 'down' | 'none'
}
