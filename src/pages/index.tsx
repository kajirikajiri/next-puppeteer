import React, {FC} from 'react'

const Home: FC = () => {
  console.log(1, process.env.SERVICE_ACCOUNT)
  console.log(3, process.env.private_key)
  let a = JSON.parse(process.env.SERVICE_ACCOUNT)
  a.private_key = process.env.private_key
  return (
    <div>hello</div>
  )
}

export default Home
