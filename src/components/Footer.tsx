import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-slate-900 pt-16 pb-4  mt-auto
    ">
    <div className="border-t dark:border-slate-600 ">
      <div className="flex  flex-col md:flex-row items-center justify-between px-6 py-4 space-y-2 text-center text-zinc-300 dark:text-zinc-100">
        <h2 className="inline-flex space-x-2">        
          <span className="text-zinc-300 dark:text-zinc-100 font-bold text-2xl"><NavLink to={"/"}>LMDB</NavLink></span>
        </h2>
        <p className="text-sm">© 2022 İSA KAYA.</p>
        <div className="flex space-x-4">
          <a href="https://github.com/isakli05" target={'_blank'} className="text-zinc-300 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400">
            <span className="sr-only">GitHub</span>
            <i className="fab fa-github"></i>
          </a>
          <a href="https://www.linkedin.com/in/isa-kaya-187653171/" target={'_blank'} className="text-zinc-300 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400">
            <span className="sr-only">Linkedin</span>
            <i className="fab fa-linkedin-in"></i>
          </a>          
        </div>
      </div>
    </div>
  </footer>
  )
}

export default Footer