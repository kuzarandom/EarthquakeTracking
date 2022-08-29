import type { NextPage } from 'next'
import { Button, Box, Stack, Paper } from '@mui/material'
import Map from './Map'
import { useCollection } from 'react-firebase-hooks/firestore'
import { loadFirebase } from '../firebase/firebaseDB'
import { collection, getDocs } from 'firebase/firestore/lite';
import { getFirestore } from "firebase/firestore"
import { resourceLimits } from 'worker_threads'
import AppbarLog from './AppbarLogin'
import { height, width } from '@mui/system'
import { Container } from '@mui/material'
import Toppage from './Toppage'
import image from '../public/img/mountain.png'
import News from './news'
import Pagetable from './pageTable'
import AppbarPub from './AppbarUnlogin'
import { tsParticles } from 'tsparticles'
import React from 'react'
const Home: NextPage = () => {
  React.useEffect(() => {
    tsParticles.loadJSON("tsparticle", "/json/snow.json")
    .then((container) => {
      console.log("callback");
    })
    .catch((error) => {
      console.error(error);
    })
  }, []);
  
  // const [users, userLoading, userError] = useCollection(
  //   firebase.firestore().collection("users"),
  //   {}
  // )
  // async function connectdb() {

  //   let Firebase = await loadFirebase()
  //   let db = Firebase.firestore()
  //   let result = await new Promise((resolve, reject) => {
  //     db.collection('users')
  //       .limit(10)
  //       .get()
  //       .then(snapshot => {
  //         let data = []
  //         snapshot.forEach((doc) => {
  //           data.push(
  //             Object.assign({
  //               id: doc.id
  //             }, doc.data())
  //           )
  //         })
  //         resolve(data)
  //       })
  //       .catch(error => {
  //         reject([])
  //       })
  //   })
  //   return result
  // }

  const data = {
    password: '123456',
    userid: 'user2'
  }


  const styles = {
    paperContainer: {
      backgroundImage: `url(${"/img/mountain.png"})`
    }
  };

  return (

    <div>
      <AppbarPub />
    </div >

    







  )
}

export default Home
