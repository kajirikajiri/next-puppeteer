import React, {FC} from 'react'

const Home: FC = () => {
  console.log(process.env.SERVICE_ACCOUNT)
  console.log(JSON.parse(process.env.SERVICE_ACCOUNT))
  return (
    <div>hello</div>
  )
}

export default Home
