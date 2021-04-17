import React from 'react'

import { Link } from 'react-router-dom'

import { ChevronRight } from 'react-feather'

const Book = ({ book }) => {
  return <article className="p-4 bg-gray-200 block w-full">
    <div className="mb-4">
      <h4 className="font-bold text-lg font-serif tracking-wide">{ book.title }</h4>
      <h5 className="text-gray-600">{ book.author }</h5>
    </div>
    <h5 className="text-gray-800">
      <span className="font-bold">${ Math.floor(book.unitPrice / 100) }</span>
      <span className="font-bold text-xs">.{ ("0" + book.unitPrice % 100).slice(-2) }</span>
      <span className="text-sm ml-2">MXN</span>
    </h5>
    <Link to={`/books/${book._id}`} className="p-4 bg-black text-white block mt-4 flex justify-between items-center">
      Ver
      <ChevronRight size="1em"/>
    </Link>
  </article>
}

export default Book
