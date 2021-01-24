export const getFirebaseConfig = ()=>{
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
    console.error('prod')
    const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
    console.error('res', firebaseConfig)
    return firebaseConfig
  } else if (process.env.NODE_ENV === 'development') {
    console.error('dev')
    const firebaseConfig = require('../../../jonson_and.json')
    console.error('res', firebaseConfig)
    return firebaseConfig
  }
  console.log('eeeeee')
}