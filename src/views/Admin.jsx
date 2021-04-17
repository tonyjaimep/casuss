import React, { useState, useEffect } from 'react'

import { Link, useParams } from 'react-router-dom'

import { ChevronsRight, BarChart, Info, Book } from 'react-feather'

import { fetchAllOrders, fetchBooks, createBook, updateBook } from '../api/actions'

import { Formik, Form } from 'formik'
import Input from '../components/Input.jsx'

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

const StockAdmin = () => {
  const [books, setBooks] = useState([])
  const [showForm, setShowForm] = useState(false)

  useEffect(() => {
    fetchBooks().then(res => {
      setBooks(res.data)
    })
  }, [])

  const AdminBook = (props) => {
    const [book, setBook] = useState(props.book)
    const [editMode, setEditMode] = useState(false)
    const [formikConfig, setFormikConfig] = useState({
      initialValues: {
        title: book.title,
        author: book.author,
        stock: book.stock,
        isbn: book.isbn,
        unitPrice: book.unitPrice / 100,
        description: book.description,
      },
      onSubmit: (values) => {
        updateBook(book._id, {
          ...values,
          unitPrice: values.unitPrice * 100
        }).then(res => {
          setBook(res.data)
          setEditMode(false)
        })
      },
      enableReinitialize: true,
    })

    useEffect(() => {
      setBook(props.book)
    }, [props.book])

    useEffect(() => {
      setFormikConfig(oldConfig => ({
        ...oldConfig,
        title: book.title,
        author: book.author,
        stock: book.stock,
        description: book.description
      }))
    }, [book])

    return <div className="bg-gray-100 p-4">
      { editMode ?
        <Formik {...formikConfig}>
          <Form>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="title">Título</label>
                  <Input type="text" name="title"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="isbn">ISBN</label>
                  <Input type="text" name="isbn"/>
                </div>
              </div>
              <label htmlFor="author">Autor</label>
              <Input type="text" name="author"/>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="stock">En almacén</label>
                  <Input type="number" name="stock"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="unitPrice">Precio unitario</label>
                  <Input type="number" name="unitPrice"/>
                </div>
              </div>
              <div>
                <label htmlFor="description">Descripción</label>
                <Input type="text" name="description"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="p-4" onClick={() => setEditMode(false)}>Cancelar</button>
                <button type="submit" className="bg-black text-white p-4">Guardar</button>
              </div>
            </div>
          </Form>
        </Formik>
        :
        <div>
          <h5 className="font-bold font-serif text-lg mb-4">{ book.title }</h5>
          <p className="mb-4 text-gray-700">{ book.author }</p>
          <label className="uppercase text-xs">En almacén</label>
          <p className="mb-4">{ book.stock }</p>
          <label className="uppercase text-xs">Precio unitario</label>
          <p className="mb-4">${Math.floor(book.unitPrice / 100)}<span className="text-xs">.{("0" + book.unitPrice % 100).slice(-2)}</span></p>
          <button onClick={() => setEditMode(true)} className="p-4 bg-black text-white">
            Editar
          </button>
        </div>
      }
    </div>
  }

  const formikConfig = {
    initialValues: {
      title: '',
      isbn: '',
      author: '',
      stock: 0,
      description: '',
      unitPrice: 0
    },
    onSubmit: (values, actions) => {
      createBook({
        ...values,
        unitPrice: values.unitPrice * 100
      }).then(res => {
        actions.resetForm()
        setBooks(oldBooks => [
          ...oldBooks,
          res.data
        ])
      })
    }
  }

  return <section>
    <h2 className="font-bold font-serif text-xl mb-4">Almacén</h2>
    <div className="mb-4">
      { showForm ? <Formik {...formikConfig}>
          <Form>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="title">Título</label>
                  <Input type="text" name="title"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="isbn">ISBN</label>
                  <Input type="text" name="isbn"/>
                </div>
              </div>
              <label htmlFor="author">Autor</label>
              <Input type="text" name="author"/>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                  <label htmlFor="stock">En almacén</label>
                  <Input type="number" name="stock"/>
                </div>
                <div className="col-span-1">
                  <label htmlFor="unitPrice">Precio unitario</label>
                  <Input type="number" name="unitPrice"/>
                </div>
              </div>
              <div>
                <label htmlFor="description">Descripción</label>
                <Input type="text" name="description"/>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <button type="button" className="p-4" onClick={() => setShowForm(false)}>Cancelar</button>
                <button type="submit" className="bg-black text-white p-4">Guardar</button>
              </div>
            </div>
          </Form>
        </Formik>
        :
        <button type="button" className="w-full bg-black text-white p-4" onClick={() => setShowForm(true)}>Agregar libro</button>
      }
    </div>
    <div className="flex flex-col gap-4">
      { books.map(book => <AdminBook book={book} key={book._id}/>) }
    </div>
  </section>
}

const Statistics = () => {
  return <h5 className="text-xl font-bold font-serif">Administrador</h5>
}

const Admin = () => {
  const [actionElement, setActionElement] = useState()

  const { action } = useParams()

  useEffect(() => {
    switch (action) {
    case 'stock':
      setActionElement(<StockAdmin/>)
      break
    case 'orders':
      setActionElement(<Orders/>)
      break
    default:
      setActionElement(<Statistics/>)
      break
    }
  }, [action])

  return <section>
    <div className="container">
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 border-r-2 border-black p-4">
          <h3 className="text-2xl font-bold font-serif mb-4">Administrador</h3>
          <div className="flex flex-col gap-4">
            <Link to="/admin/stock" className="p-4">
              <Book size="1em" className="inline mr-2"/>
              Almacén
            </Link>
            <Link to="/admin/stats" className="p-4">
              <BarChart size="1em" className="inline mr-2"/>
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
