import { Button, Htag, Ptag, Tag } from 'components'

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
      <Ptag size='sm'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est ab ipsam, quod fuga voluptate minima alias
        impedit ea cupiditate. Et aspernatur consequatur eveniet est nobis magni molestiae? Esse, eaque.
      </Ptag>
      <Ptag>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id est ab ipsam, quod fuga voluptate minima alias
        impedit ea cupiditate. Et aspernatur consequatur eveniet est nobis magni molestiae? Esse, eaque.
      </Ptag>
      <Ptag size='lg'>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quidem velit alias, sunt architecto ea aut fuga quae
        quis ratione est eum minima tenetur eaque accusantium saepe dolor officia dignissimos sapiente?
      </Ptag>
      <Tag>tag</Tag>
      <Tag
        size='md'
        color='gray'
      >
        tag
      </Tag>
      <Tag
        size='md'
        color='red'
      >
        tag
      </Tag>
      <Tag color='green'>tag</Tag>
      <Tag
        href='#'
        color='primary'
      >
        tag
      </Tag>
    </div>
  )
}
