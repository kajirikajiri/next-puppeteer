import firebase from "firebase";
import React, {FC, useEffect, useState } from "react";
import { getFirebaseConfig } from "src/scripts/getFirebaseConfig";
import { sendMessage } from "src/scripts/sendMessage";

export const logout:FC = () => {
  const [loadedFirebaseConfig, setLoadedFirebaseConfig] = useState(false)
  const [width, setWidth] = useState(0)
  // Initialize Firebase
  if (!(firebase?.apps?.length > 0)) {
    try {
      const firebaseConfig = getFirebaseConfig()
      firebase.initializeApp(firebaseConfig);
      setLoadedFirebaseConfig(true)
    } catch(e) {
      console.error('catch error')
    }
  }
  useEffect(()=>{
    window.onresize = ()=>{
      setWidth(window.innerWidth)
    }

    if (width > 0 && loadedFirebaseConfig === true) {
      firebase.auth().signOut().then(()=>{
        (async()=>{
          const res = await sendMessage({doLogout: true})
          console.error(res)
        })()
      }).catch((error)=>{
        alert('ログアウトに失敗しました')
      })
    }
  }, [width])

  return (
    <div>... do logout</div>
  )
}
