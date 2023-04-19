import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { AxiosError } from 'axios'

import httpClient from 'api/httpClient'
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
      const { data } = await httpClient.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId })
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

  const submitFormHandler = handleSubmit(onSubmit)

  return { register, control, errors, isSuccess, error, submitFormHandler, setIsSuccess, setError }
}

export default useContainer
