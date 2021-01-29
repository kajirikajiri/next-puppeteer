  export const sendMessage = (message) => {
    window.parent.postMessage(message, '*')
    return new Promise(resolve=>{
      const callback=(event:MessageEvent<any>)=>{
        resolve(event.data)
        window.removeEventListener('message', callback)
      }
      window.addEventListener('message', callback)
    })
  }
