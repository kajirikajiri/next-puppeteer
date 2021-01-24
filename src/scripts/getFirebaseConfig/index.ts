export const getFirebaseConfig = ()=>{
  console.log(process.env.FIREBASE_CONFIG)
  if (process.env.NODE_ENV === 'production' && process.env.FIREBASE_CONFIG) {
    console.log(process.env.FIREBASE_CONFIG)
    const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG)
    return firebaseConfig
  } else if (process.env.NODE_ENV === 'development') {
    const firebaseConfig = require('../../../jonson_and.json')
    return firebaseConfig
  }
}