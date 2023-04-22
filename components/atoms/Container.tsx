export default function Container({ children, className }) {
  return <div className={'mx-auto max-w-[1240px] ' + className}>{children}</div>
}
