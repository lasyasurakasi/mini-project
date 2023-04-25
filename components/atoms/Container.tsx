import { PropsWithChildren } from 'react'

export default function Container({
  children,
  className,
}: PropsWithChildren<{ className: string }>) {
  return <div className={'mx-auto max-w-[1240px] ' + className}>{children}</div>
}
