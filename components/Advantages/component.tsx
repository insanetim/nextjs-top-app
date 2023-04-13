import { AdvantagesProps } from './types'
import CheckIcon from './check.svg'
import styles from './styles.module.scss'

export const Advantages = ({ advantages }: AdvantagesProps) => {
  return (
    <>
      {advantages.map(a => (
        <div
          key={a._id}
          className={styles.advantage}
        >
          <CheckIcon />
          <div className={styles.title}>{a.title}</div>
          {a.description && (
            <>
              <hr className={styles.vline} />
              <div>{a.description}</div>
            </>
          )}
        </div>
      ))}
    </>
  )
}
