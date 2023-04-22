export default function Wrapper({ children, className }) {
  return <div className={className + ''}>{children}</div>
}
