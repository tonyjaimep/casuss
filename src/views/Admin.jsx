import React, { useState, useEffect } from 'react'

import { Link, useHistory, useParams } from 'react-router-dom'

import { ChevronsRight, Info } from 'react-feather'

import { fetchAllOrders } from '../api/actions'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetchAllOrders().then(res => {
      setOrders(res.data)
    })
  }, [])

  const OrderCard = ({ order }) => {
    return <div className="bg-gray-100 p-4">
      <h6 className="font-bold font-serif mb-4">Orden #{order._id}</h6>
      <p className="mb-4">Para usuario { order.user.name } ({order.user._id})</p>
      { order.books.map(book => <div className="p-4 mt-4" key={book._id}>
        <h6 className="font-bold font-serif">{book.book.title}</h6>
        <p>{ book.quantity } unidad{ book.quantity !== 1 && 'es' }</p>
      </div>
      )}
      <div className="text-center bg-gray-700 p-4 text-white"><Info size="1em" className="inline"/> { order.status }</div>
    </div>
  }

  return <div className="flex flex-col gap-4">
    <h5 className="text-xl font-bold font-serif">Órdenes</h5>
    { orders.map(order => <OrderCard order={order} key={order._id}/>) }
  </div>
}

const Statistics = () => {
  return <h5 className="text-xl font-bold font-serif">Administrador</h5>
}

const Admin = () => {
  const [actionElement, setActionElement] = useState()

  const history = useHistory()

  const { action } = useParams()

  useEffect(() => {
    switch (action) {
    case 'orders':
        setActionElement(<Orders/>)
        break;
    default:
        setActionElement(<Statistics/>)
        break;
    }
  }, [action])

  return <section>
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-r-2 border-black p-4">
          <h3 className="text-2xl font-bold font-serif mb-4">Administrador</h3>
          <div className="flex flex-col gap-4">
            <Link to="/admin/stats" className="p-4">
              <ChevronsRight size="1em" className="inline mr-2"/>
              Estadísticas
            </Link>
            <Link to="/admin/orders" className="p-4">
              <ChevronsRight size="1em" className="inline mr-2"/>
              Órdenes
            </Link>
            <Link to="/" className="p-4">
              Salir
            </Link>
          </div>
        </div>
        <div className="col-span-2">
          { actionElement }
        </div>
      </div>
    </div>
  </section>
}

export default Admin
