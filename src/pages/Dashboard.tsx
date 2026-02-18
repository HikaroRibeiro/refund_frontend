/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable dot-notation */
import React, { useState } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import iconSearchSvg from '../assets/search.svg'
import { RefundItem } from '../components/RefundItem'
import { CATEGORIES } from '../utils/categories'
import { formatCurrency } from '../utils/formatCurrency'
import { Pagination } from '../components/Pagination'

const REFUND_EXAMPLE = {
  id: '123',
  name: 'Hikaro',
  amount: formatCurrency(23.3),
  category: 'Alimentação',
  categoryImg: CATEGORIES.food.icon,
}

export default function Dashboard() {
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [totalOfPage, setTotalOfPage] = useState(5)

  function fetchRefunds(e: React.ChangeEvent) {
    e.preventDefault()
    console.log(name)
  }

  function handlePagination(action: 'next' | 'previous') {
    setPage((prevPage) => {
      if (action === 'next' && prevPage < totalOfPage) {
        return prevPage + 1
      }

      if (action === 'previous' && prevPage > 1) {
        return prevPage - 1
      }
      return prevPage
    })
  }

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl mx-auto max-w-md">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
      <form
        onSubmit={fetchRefunds}
        className="flex flex-1 items-center justify-between pb-6 border-b border-b-gray-400 md:flex-row gap-2 mt-6"
      >
        <Input
          placeholder="Pesquisar pelo nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Button variant="icon" type="submit">
          <img src={iconSearchSvg} className="w-5" alt="Ícone de busca" />
        </Button>
      </form>
      <div className="mt-6 flex flex-col gap-4 max-h-85.5 custom-scrollbar overflow-y-scroll">
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
        <RefundItem data={REFUND_EXAMPLE} />
      </div>
      <Pagination
        current={page}
        total={totalOfPage}
        onNext={() => handlePagination('next')}
        onPrevious={() => handlePagination('previous')}
      ></Pagination>
    </div>
  )
}
