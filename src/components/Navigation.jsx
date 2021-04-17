import React from 'react'

import { Link } from 'react-router-dom'

import { BookOpen, User } from 'react-feather'

import { useUser }from '../contexts/UserContext'

const Navigation = () => {
  const userContext = useUser()

  return <nav className="w-full p-4 mb-8">
    <div className="flex justify-between">
      <Link to="/" className="font-bold font-serif p-4 tracking-wider block">
        <BookOpen size="1em" className="inline mr-2" fill="currentColor" stroke="none"/>
        Casuss
      </Link>
      <div className="flex gap-4">
        { userContext.state ? 
          <Link to="/profile" className="p-4">
            <User size="1em" className="inline mr-2" fill="currentColor" stroke="none"/>
            { userContext.state.user.name }
          </Link>
          :
          <>
            <Link to="/login" className="font-serif p-4 tracking-wide">
              Entrar
            </Link>
            <Link to="/register" className="font-serif bg-black text-white p-4 tracking-wide">
              Registrarme
            </Link>
          </>
        }
      </div>
    </div>
  </nav>
}

export default Navigation
