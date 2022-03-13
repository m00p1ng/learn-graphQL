import Link from 'next/link'

import NavStyles from './styles/NavStyles'
import { useUser } from './User'
import Signout from './Signout'

function Nav() {
  const user = useUser();
  return (
    <NavStyles>
      <Link href="/items">Items</Link>
      {user && (
        <>
          <Link href="/sell">Sell</Link>
          <Link href="/orders">Orders</Link>
          <Link href="/me">Account</Link>
          <Signout />
        </>
      )}
      {!user && (
        <>
          <Link href="/signup">Sign Up</Link>
          <Link href="/signin">Sign In</Link>
        </>
      )}
    </NavStyles>
  )
}

export default Nav