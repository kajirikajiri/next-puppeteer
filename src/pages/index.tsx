import React, {FC} from 'react'

const Home: FC = () => {
  console.log('fireconf', process.env.FIREBASE_CONFIG)
  console.log(JSON.parse(process.env.FIREBASE_CONFIG))
  return (
    <div>hello</div>
  )
}

export default Home
