'use client'

import React, { ReactNode } from 'react'

const Provider = ({children} : {children : ReactNode}) => {
    // TODO : use firebase provider , theme provider , toast Provider ... here
  return (
    <div>{children}</div>
  )
}

export default Provider