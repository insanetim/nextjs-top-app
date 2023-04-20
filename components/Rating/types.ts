import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'

export interface RatingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  isEditable?: boolean
  rating: number
  setRating?: (rating: number) => void
  error?: FieldError
  tabIndex?: number
}

export interface RatingHookProps {
  rating: number
  isEditable?: boolean
  setRating?: (rating: number) => void
  tabIndex?: number
}
