import React from 'react'

interface Props {
    children: JSX.Element
}

const Layout = (props : Props) => {
  return (
      <div>{props.children}</div>
  )
}

export default Layout