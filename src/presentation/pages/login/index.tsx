import firebase from "firebase";
import React, {FC, useEffect, useState } from "react";
import { getFirebaseConfig } from "src/scripts/getFirebaseConfig";
import { sendMessage } from "src/scripts/sendMessage";

export const Login:FC = () => {
  const [email, setEmail] = useState('hogehoge@example.com')
  const [pass, setPass] = useState('password')
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(undefined)
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

  const handleClick=(type:'login'|'signup'|'re')=>{
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
          var errorCode = error.code;
          var errorMessage = error.message;
        });
    } else if(type==="signup") {
      firebase.auth().createUserWithEmailAndPassword(email, pass)
        .then((user) => {
          console.log('signup')
          console.log(user)
          // Signed in
          // ...
        })
        .catch((error) => {
          console.log(error)
          var errorCode = error.code;
          var errorMessage = error.message;
          // ..
        });
      } else if (type === 're') {
          firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    console.log(provider)
    // return firebase.auth().signInWithEmailAndPassword(provider).then((user)=>{
    //   console.log(user)
    // })
  }).catch((error) => {
    console.log(error)
    var errorCode = error.code;
    var errorMessage = error.message;
  })
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