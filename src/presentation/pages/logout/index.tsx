import firebase from "firebase";
import React, {useEffect, useState } from "react";
import { getFirebaseConfig } from "src/scripts/getFirebaseConfig";
import { sendMessage } from "src/scripts/sendMessage";

export const logout = () => {
  const [loadedFirebaseConfig, setLoadedFirebaseConfig] = useState(false)
  const [width, setWidth] = useState(0)
  const [logouted, setLogouted] = useState(false)
  const [logoutFailed, setLogoutFailed] = useState(false)
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
          const res = await sendMessage({logouted: true})
          setLogouted(true)
        })()
      }).catch(async(error)=>{
        const res = await sendMessage({logoutFailed: true})
        setLogoutFailed(true)
      })
    }
  }, [width])

  if (logouted) {
    return (
    <div>ログアウトしました !<br/>まもなくcloseします</div>
    )
  }

  if (logoutFailed) {
    return (
      <div>ログアウト失敗です。<br/>元の画面に戻ります。<br/>しばらくしてから<br/>再度お願いします</div>
    )
  }

  return (
    <div>{logouted ? 'ログアウトしました !':'...ログアウトしています'}</div>
  )
}
