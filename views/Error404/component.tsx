import { Htag } from 'components'
import withLayout from 'layout/component'

export const Error404 = () => {
  return (
    <>
      <Htag tag='h1'>Ошибка 404</Htag>
    </>
  )
}

export default withLayout(Error404)
