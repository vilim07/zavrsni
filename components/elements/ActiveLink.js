import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} className="rounded-lg px-4 py-3">
      {children}
    </a>
  )
}

export default ActiveLink