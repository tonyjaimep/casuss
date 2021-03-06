import React, { useState, useEffect } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'

import { useUser } from '../contexts/UserContext.js'

import { logout } from '../api/actions.js'

import { LogOut, ChevronsRight, Info } from 'react-feather'

import { fetchOrders } from '../api/actions'

const UserOrders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchOrders().then(res => {
      setOrders(res.data)
    })
  }, [])

  const OrderCard = ({ order }) => {
    return <div className="bg-gray-100 p-4">
      <h6 className="font-bold font-serif mb-4">Orden #{order._id}</h6>
      { order.books.map(book => <div className="p-4 mt-4" key={book._id}>
        <h6 className="font-bold font-serif">{book.book.title}</h6>
        <p>{ book.quantity } unidad{ book.quantity !== 1 && 'es' }</p>
      </div>
      )}
      <div className="text-center bg-gray-700 p-4 text-white"><Info size="1em" className="inline"/> { order.status }</div>
    </div>
  }

  return <div className="flex flex-col gap-4">
    <h5 className="text-xl font-bold font-serif">Mis órdenes</h5>
    { orders.map(order => <OrderCard order={order} key={order._id}/>) }
    { orders.length === 0 && "Sin órdenes hechas por ahora" }
  </div>
}

const UserInfo = () => {
  return <h5 className="text-xl font-bold font-serif">Mi perfil</h5>
}

const Profile = () => {
  const [actionElement, setActionElement] = useState()

  const userContext = useUser()

  const history = useHistory()

  const { action } = useParams()

  const exit = () => {
    logout().then(() => {
      userContext.dispatch({ type: 'logout' })
    }).finally(() => {
      history.push('/')
    })
  }

  useEffect(() => {
    switch (action) {
    case 'orders':
        setActionElement(<UserOrders/>)
        break;
    default:
        setActionElement(<UserInfo/>)
        break;
    }
  }, [action])

  if (!userContext.state)
    return <div className="text-center">Debe <Link to="/login?redirect=/profile">iniciar sesión</Link> para continuar</div>

  return <section>
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-r-2 border-black p-4">
          <h3 className="text-2xl font-bold font-serif mb-4">{ userContext.state.user.name }</h3>
          <div className="flex flex-col gap-4">
            <Link to="/profile/orders" className="p-4">
              <ChevronsRight size="1em" className="inline mr-2"/>
              Mis órdenes
            </Link>
            <button className="p-4 text-red-500 text-left" type="button" onClick={exit}>
              <LogOut size="1em" className="inline mr-2"/>
              Salir
            </button>
          </div>
        </div>
        <div className="col-span-2">
          { actionElement }
        </div>
      </div>
    </div>
  </section>
}

export default Profile
