import React from 'react'

import { Link } from 'react-router-dom'

import { ChevronRight } from 'react-feather'

const Book = ({ book }) => {
  return <article className="p-4 rounded-lg shadow-lg block w-full">
    <h4 className="font-bold text-lg font-serif">{ book.title }</h4>
    <h5 className="text-gray-500">{ book.author }</h5>
    <h5 className="text-gray-700">
      <span className="font-bold">${ book.unitPrice / 100 }</span>
      <span className="text-xs ml-2">MXN</span>
    </h5>
    <Link to={`/books/${book._id}`} className="p-4 bg-black text-white block mt-4 rounded-lg">
      Ver más
      <ChevronRight size="1em" className="inline ml-2"/>
    </Link>
  </article>
}

export default Book
