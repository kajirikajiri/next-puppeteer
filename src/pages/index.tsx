import React, {FC} from 'react'

const Home: FC = () => {
  console.log(process.env.FIREBASE_CONFIG)
  return (
    <div>hello</div>
  )
}

export default Home
