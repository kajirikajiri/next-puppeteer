import React, {FC} from 'react'

const Home: FC = () => {
  console.log(1, process.env.SERVICE_ACCOUNT)
  console.log(2, JSON.parse(process.env.SERVICE_ACCOUNT))
  console.log(3, process.env.private_key)
  return (
    <div>hello</div>
  )
}

export default Home
