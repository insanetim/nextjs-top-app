import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'

import { API } from 'helpers/api'
import { IReviewForm, IReviewSentResponse, ReviewHookProps } from './types'

const useContainer = ({ productId }: ReviewHookProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<IReviewForm>()
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string>()

  const onSubmit = async (formData: IReviewForm) => {
    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
      if (data.message) {
        setIsSuccess(true)
        reset()
      } else {
        setError('Что-то пошло не так')
      }
    } catch (e) {
      setError((e as AxiosError).message)
    }
  }

  return { register, control, handleSubmit, errors, isSuccess, error, onSubmit, setIsSuccess, setError }
}

export default useContainer
