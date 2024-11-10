import  Db  from './connection'
import { collection, addDoc, getDocs } from 'firebase/firestore'

export const addFormData = async (formData) => {
    try {
        await addDoc(collection(Db, 'form-data'), formData)
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

export const getFormData = async () => {
    const formData = []
    const querySnapshot = await getDocs(collection(Db, 'form-data'))
    querySnapshot.forEach((doc) => {
        formData.push(doc.data())
    })
    return formData
}

