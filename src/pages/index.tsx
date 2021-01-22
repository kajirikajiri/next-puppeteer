import React, {FC} from 'react'

const Home: FC = () => {
  console.log(process.env.PLAIN)
  console.log(process.env.SECRET)
  console.log(process.env.SERVICE_ACCOUNT)
  console.log(JSON.parse(process.env.SERVICE_ACCOUNT))
  return (
    <div>hello</div>
  )
}

export default Home
