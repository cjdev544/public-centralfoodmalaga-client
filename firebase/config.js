import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// firebase config
const firebaseConfig = { ConfigurationFirebaseObject }

const firebaseApp = initializeApp(firebaseConfig)
const auth = getAuth(firebaseApp)
const storage = getStorage()

const db = getFirestore(firebaseApp)

const googleProvider = new GoogleAuthProvider()

export { auth, storage, db, googleProvider }
