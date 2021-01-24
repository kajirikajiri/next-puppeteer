  export const sendMessage = (message) => {
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
