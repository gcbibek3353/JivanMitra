'use client'
import React, { ReactNode } from 'react'

const layout = ({children} : {children : ReactNode}) => {
    // TODO : check if the user is signed in or not . 
    // If signed in return {children}
    // else redirect to landing page 

  return (
    <div>{children}</div>
  )
}

export default layout