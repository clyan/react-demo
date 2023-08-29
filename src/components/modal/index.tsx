import type { ReactNode } from 'react'

interface ModalProps {
  title: ReactNode
}

export function Modal(props: ModalProps) {
  const { title } = props
  return (
    <div>
      {title}
    </div>
  )
}

export default Modal
