import { ButtonHTMLAttributes, DetailedHTMLProps, PropsWithChildren } from 'react'

export interface ButtonProps
  extends PropsWithChildren<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>> {
  appearance: 'primary' | 'ghost'
  arrow?: 'right' | 'down' | 'none'
}
