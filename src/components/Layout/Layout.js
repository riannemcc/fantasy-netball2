import React from 'react'

export const Layout = () => {
    const isSignedIn = true
  return (
    <div>
        {isSignedIn ? (
         <span>LEADERBOARD</span>
     ) : (
         <>
             <span>SIGN UP</span>
             <span>SIGN IN</span>
             </>
         )}

    </div>
  )
}
