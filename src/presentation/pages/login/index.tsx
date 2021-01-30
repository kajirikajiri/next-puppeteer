import firebase from "firebase";
import React, {FC, useEffect, useState } from "react";
import { getFirebaseConfig } from "src/scripts/getFirebaseConfig";
import { sendMessage } from "src/scripts/sendMessage";
import { useForm } from "react-hook-form";

export const Login:FC = () => {
  const [loading, setLoading] = useState(true)
  const [isLogin, setIsLogin] = useState(undefined)
  const [screen, setScreen] = useState<'login'|'signup'>('login')
  const [width, setWidth] = useState(0)
  const { register, handleSubmit, errors, reset } = useForm();
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
        success(user)
      } else {
        setIsLogin(false)
      }
      setLoading(false)
    });
  }, [])

  const onSubmitLogin = ({email, password}) => {
    doLogin(email, password)
  }
  const onSubmitSignup = ({email, password}) => {
    doSignup(email, password)
  }
  const doLogin =(email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(({user}) => {
        success(user)
      })
      .catch((error) => {
        alert('ログインに失敗しました')
      });
  }
  const doSignup = (email, password) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((user) => {
        success(user)
      })
      .catch((error) => {
        alert('登録に失敗しました')
      });
  }
  const success = (user)=>{
    ;(async()=>{
      const a = await sendMessage({userUuid: user.uid})
    })()
    setTimeout(async()=>{
      const a = await sendMessage({closeLogin: true, openMainMenu: true})
    }, 300)
  }
  if (loading) {
    return (
      <div className="container">ログイン状態を確認中です</div>
    )
  }

  if (isLogin === true) {
    return (
      <div className="container"><p>ログインしました<br/>少々お待ち下さい</p></div>
    )
  }

  if (isLogin === false && screen === 'login') {
    return (
      <>
        <div className="container">
          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmitLogin)}>
              <div className="form-group">
                <label htmlFor="email">
              <input id="email" type="text" name="email" placeholder="email" ref={register({ required: true, minLength: 4,       pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "メールアドレスの形式が無効です"
      } })} />
                  {errors.email && <div className="error">メールアドレスを入力してください</div>}
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="password">
                <input id="password" type="password" name="password" placeholder="password" ref={register({ required: true, minLength: 6 })} />
                  {errors.password && <div className="error">パスワードを入力してください</div>}
                </label>
              </div>
              <a style={{ cursor: 'pointer', marginRight: 40, color: 'grey', fontSize: 14 }} onClick={() => {
                setScreen('signup')
                reset()
                }}>登録</a>
              <button type="submit">ログイン</button>
            </form>
          </div>
        </div>
      </>
    )
  }

  if (isLogin === false && screen === 'signup') {
    return (
      <>
        <div className="container">
          <div className="login-form">
            <form onSubmit={handleSubmit(onSubmitSignup)}>
              <div className="form-group">
                <label htmlFor="email">
            <input id="email" type="text" name="email" placeholder="email" ref={register({ required: true, minLength: 4, pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "メールアドレスの形式が無効です"
      }})} />
                  {errors.email && <div className="error">メールアドレスを入力してください</div>}
                </label>
              </div>
              <div className="form-group">
                <label htmlFor="password">
              <input id="password" type="password" name="password"  placeholder="password" ref={register({ required: true, minLength: 6 })} />
                  {errors.password && <div className="error">パスワードを入力してください</div>}
                </label>
              </div>
              <a style={{ cursor: 'pointer', marginRight: 40, color: 'grey', fontSize: 14 }} onClick={() => {
                setScreen('login')
                reset()
              }}>ログイン</a>
              <button type="submit">登録</button>
            </form>
          </div>
        </div>
      </>
    )
  }
}
