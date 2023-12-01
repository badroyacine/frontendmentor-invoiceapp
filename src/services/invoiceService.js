import { db } from '@/firebase/init'
import { 
    collection, 
    getDocs, 
    setDoc, 
    doc, 
    getDoc, 
    deleteDoc 
} from 'firebase/firestore'

const collectionName = 'invoices'

export default {
    async getInvoices(){
        const querySnapshot = await getDocs(collection(db, collectionName))
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }))
    },
    getInvoice(id){
        return getDoc(doc(db, collectionName, id))
    },
    setInvoice(id, invoice){
        return setDoc(doc(db, collectionName, id), (invoice), { merge: true })
    },
    deleteInvoice(id) {
        return deleteDoc(doc(db, collectionName, id));
    }
}