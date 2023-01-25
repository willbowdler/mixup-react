import { useState } from 'react'
import { Link } from 'react-router-dom'

import navSty from '../../styles/Nav.module.css'

function Nav() {
  const [shown, setShown] = useState(false)

  const mouseLeave = (e) => setShown(false)
  const mouseEnter = (e) => setShown(true)
  return (
    <>
      <div onMouseEnter={mouseEnter} className={navSty.navHover}></div>
      <div
        onMouseLeave={mouseLeave}
        className={shown ? `${navSty.navBar} ${navSty.shown}` : navSty.navBar}
      >
        <ul className={navSty.navFlex}>
          <Link to='/'>
            <li>Mixups</li>
          </Link>
          <Link to='/edits'>
            <li>Edits</li>
          </Link>
          <Link to='/mix-history'>
            <li>Mixup History</li>
          </Link>
        </ul>
      </div>
    </>
  )
}

export default Nav
