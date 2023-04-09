import { Button, Htag } from '../components'

export default function Home() {
  return (
    <div>
      <Htag tag='h1'>Some text</Htag>
      <Button
        appearance='primary'
        arrow='right'
      >
        Click
      </Button>
      <Button
        appearance='ghost'
        arrow='down'
      >
        Click
      </Button>
    </div>
  )
}
