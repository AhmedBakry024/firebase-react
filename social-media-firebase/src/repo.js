// this file is used to interact with firebase database
// the db object is used to interact with the database
// the app object is used to interact with the firebase app

// There will be two methods in this file:
// 1. add form data to the database
// 2. get form data from the database

// Method 1: add form data to the database
// This method will take form data as an argument and add it to the database
// The form data will be an object with the following properties:
// - groupName: string
// - groupType: string

// Method 2: get form data from the database
// This method will return an array of form data objects
// Each form data object will have the following properties:
// - groupName: string
// - groupType: string

import  db  from './connection'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import { useState } from 'react'

export const addFormData = async (formData) => {
    try {
        await addDoc(collection(db, 'form-data'), formData)
    } catch (error) {
        console.error('Error adding document: ', error)
    }
}

export const getFormData = async () => {
    const formData = []
    const querySnapshot = await getDocs(collection(db, 'form-data'))
    querySnapshot.forEach((doc) => {
        formData.push(doc.data())
    })
    return formData
}

