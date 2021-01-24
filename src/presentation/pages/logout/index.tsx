import firebase from "firebase";
import React, {FC, useEffect, useState } from "react";
import { getFirebaseConfig } from "src/scripts/getFirebaseConfig";

export const logout:FC = () => {
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(undefined)
  const sendMessage = (message) => {
    window.parent.postMessage(message, '*')
    return new Promise(resolve=>{
      const callback=(event:MessageEvent<any>)=>{
        console.log(event.data)
        resolve(event.data)
        window.removeEventListener('message', callback)
      }
      window.addEventListener('message', callback)
    })
  }
  // Initialize Firebase
  if (!(firebase?.apps?.length > 0)) {
    try {
      const firebaseConfig = getFirebaseConfig()
      firebase.initializeApp(firebaseConfig);
    } catch(e) {
    }
  }
  const [width, setWidth] = useState(0)
  useEffect(()=>{
    window.onresize = ()=>{
      setWidth(window.innerWidth)
    }
  }, [])

  const handleClickLogout=async()=>{
    firebase.auth().signOut().then(()=>{
    }).catch((error)=>{
      alert('ログアウトに失敗しました')
    })
    const res = await sendMessage({doLogout: true})
    console.log(res)
  }
  if (loading) {
    return (
      <div>...loading</div>
    )
  }

  return (
    <button onClick={handleClickLogout}>
      ログアウト
    </button>
  )
}
