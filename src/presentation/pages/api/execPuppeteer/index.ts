import puppeteer from 'puppeteer'
import admin from 'firebase-admin'

export const index =(req, res) => {
  let serviceAccount
  if (process.env.NODE_ENV === 'production') {
    serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT)
  } else if (process.env.NODE_ENV === 'development') {
    serviceAccount = require('../8889eb754138.json');
  }
  console.log(serviceAccount)
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }

  let db = admin.firestore();
  writeFs(db)
  readFs(db)

  ;(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    try {
      await page.goto('https://www.cresco.co.jp/');
      await page.screenshot({ path: './image.png' });
    } catch (err) {
      // エラーが起きた際の処理
    } finally {
      await browser.close();
    }
  })();
  res.statusCode = 200
  res.json({ name: 'John Doe' })
}

const readFs = (db:FirebaseFirestore.Firestore) => {
  db.collection('users').get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, '=>', doc.data());
      });
    })
    .catch((err) => {
      console.log('Error getting documents', err);
    });
}

const writeFs=(db:FirebaseFirestore.Firestore)=>{
  let docRef = db.collection('users').doc('alovelace');
  let setAda = docRef.set({
    first: 'Ada',
    last: 'Lovelace',
    born: 1815
  });


  let aTuringRef = db.collection('users').doc('aturing');
  let setAlan = aTuringRef.set({
    'first': 'Alan',
    'middle': 'Mathison',
    'last': 'Turing',
    'born': 1912
  });
}