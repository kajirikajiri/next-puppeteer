export const getFirebaseConfig = ()=>{
  if (process.env.NODE_ENV === 'production' && process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
    const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)
    return firebaseConfig
  } else if (process.env.NODE_ENV === 'development') {
    const firebaseConfig = require('../../../jonson_and.json')
    return firebaseConfig
  }
}