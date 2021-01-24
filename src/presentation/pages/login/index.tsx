import firebase from "firebase";
import React, {FC, useEffect, useState } from "react";
import { getFirebaseConfig } from "src/scripts/getFirebaseConfig";
import { sendMessage } from "src/scripts/sendMessage";

export const Login:FC = () => {
  const [email, setEmail] = useState('hogehoge@example.com')
  const [pass, setPass] = useState('password')
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(undefined)
  const [width, setWidth] = useState(0)
  // Initialize Firebase
  if (!(firebase?.apps?.length > 0)) {
    try {
      const firebaseConfig = getFirebaseConfig()
      firebase.initializeApp(firebaseConfig);
    } catch(e) {
    }
  }
  useEffect(()=>{
    window.onresize = ()=>{
      setWidth(window.innerWidth)
    }
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLogin(true)
        console.log(user);
        ;(async()=>{
          const a = await sendMessage({userUuid: user.uid})
        })()
        setTimeout(async()=>{
          const a = await sendMessage({toggle: true})
        }, 2000)
      } else {
        setIsLogin(false)
        console.log('please login')
      }
      setLoading(false)
    });
  }, [])

  const handleClick=(type:'login'|'signup')=>{
    if (type === 'login') {
      firebase.auth().signInWithEmailAndPassword(email, pass)
        .then(({user}) => {
          console.log('login', user)
          ;(async()=>{
            const a = await sendMessage({userUuid: user.uid})
          })()
          setTimeout(async()=>{
            const a = await sendMessage({toggle: true})
          }, 2000)
          })
        .catch((error) => {
        });
    } else if(type==="signup") {
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((user) => {
          console.log('signup')
          console.log(user)
        })
        .catch((error) => {
          console.log(error)
        });
      }
  }
  if (loading) {
    return (
      <div>restore login ...</div>
    )
  }

  if (isLogin === true) {
    return (
      <div>now open menu !!</div>
    )
  }

  if (isLogin === false) {
    return (
      <button onClick={()=>handleClick("login")}>
        buttona
      </button>
    )
  }
}
