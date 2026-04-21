import { Link } from 'react-router-dom'
import './Logo.css'

export default function Logo({ size = 'md', to = '/', inverse = false }) {
  const content = (
    <span className={`logo logo--${size} ${inverse ? 'logo--inverse' : ''}`}>
      <span className="logo__mark" aria-hidden="true">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="20" cy="20" r="19" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
          <path
            d="M20 6c-4.5 6.5-4.5 15.5 0 22-4.5-1-9-5.5-9-11s4.5-10 9-11Z"
            fill="currentColor"
            opacity="0.85"
          />
          <circle cx="26" cy="14" r="2" fill="currentColor" />
        </svg>
      </span>
      <span className="logo__text">
        <span className="logo__name">тихо</span>
        <span className="logo__sub">digital calm</span>
      </span>
    </span>
  )

  if (!to) return content
  return (
    <Link to={to} className="logo-link">
      {content}
    </Link>
  )
}
