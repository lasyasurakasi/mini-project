import Footer from './Footer'
import Header from './Header'

export default function Layout({ children, className }) {
  return (
    <main className={className}>
      <Header />
      <div>{children}</div>
      <Footer />
    </main>
  )
}
