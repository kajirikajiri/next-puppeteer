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
      setLoading(false)
      firebase.auth().signOut().then(()=>{
        (async()=>{
          const res = await sendMessage({doLogout: true})
          console.error(res)
        })()
      }).catch((error)=>{
        alert('ログアウトに失敗しました')
      })
    } catch(e) {
      console.error('catch error')
    }
  }
  const [width, setWidth] = useState(0)
  useEffect(()=>{
    window.onresize = ()=>{
      setWidth(window.innerWidth)
    }
  }, [])

  const handleClickLogout=async()=>{
  }

  return (
    <div>... do logout</div>
  )
}
