// const PORT = 9000
// import express from 'express'
// import cors from 'cors'
// import axios from 'axios'
// import dotenv from "dotenv";
// dotenv.config()
// //require('dotenv').config()

// const app = express()

// app.use(cors())

// app.get('/', (req,res)=>{
//     res.json('hi')
// })

// async function getPopularFilms(){
//     const {data} = await axios(`${process.env.REACT_APP_BASE_API_ENDPOINT}/movie/popular?api_key=${process.env.REACT_APP_API_KEY}`);
//     return data;
//   }

//   app.get('/popularFilms', async (req,res)=>{
//     const data = await getPopularFilms();
//     return res.json(data);
// })

// app.listen(9000,()=> console.log(`Server is Running on port ${PORT}`))