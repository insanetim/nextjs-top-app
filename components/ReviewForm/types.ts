import { DetailedHTMLProps, HTMLAttributes } from 'react'

export interface ReviewFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  productId: string
  isOpened: boolean
}

export interface IReviewForm {
  name: string
  title: string
  description: string
  rating: number
}

export interface IReviewSentResponse {
  message: string
}

export interface ReviewHookProps {
  productId: string
}
