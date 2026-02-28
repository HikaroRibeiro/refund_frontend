/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable dot-notation */
import React, { useEffect, useState } from 'react'
import { Input } from '../components/Input'
import { Button } from '../components/Button'
import iconSearchSvg from '../assets/search.svg'
import { RefundItem, type RefundItemProps } from '../components/RefundItem'
import { CATEGORIES } from '../utils/categories'
import { formatCurrency } from '../utils/formatCurrency'
import { Pagination } from '../components/Pagination'
import { api } from '../services/api'
import { AxiosError } from 'axios'

const PER_PAGE = 2

export default function Dashboard() {
  const [name, setName] = useState('')
  const [page, setPage] = useState(1)
  const [totalOfPage, setTotalOfPage] = useState(5)
  const [refunds, setRefunds] = useState<RefundItemProps[]>([])

  async function fetchRefunds() {
    const response = await api
      .get<RefundsPaginationApiResponse>('/refunds', {
        params: {
          name,
          page,
          perPage: PER_PAGE,
        },
      })
      .catch((err: AxiosError) => {
        console.error('Error fetching refunds:', err)
        alert('Ocorreu um erro ao buscar as solicitações. Tente novamente.')
      })

    if (response) {
      setRefunds(
        response.data.refunds.map((item) => ({
          id: item.id,
          name: item.user.name,
          amount: formatCurrency(item.amount),
          category: item.name, // Ajuste para acessar a categoria corretamente
          categoryImg:
            CATEGORIES[item.category as keyof typeof CATEGORIES].icon,
        })),
      ) // Ajuste para acessar a categoria corretamente
      setTotalOfPage(response.data.pagination.totalPages)
    }
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

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    fetchRefunds()
  }

  useEffect(() => {
    fetchRefunds()
  }, [page])

  return (
    <div className="bg-gray-500 rounded-xl p-10 md:min-w-3xl mx-auto max-w-md">
      <h1 className="text-gray-100 font-bold text-xl flex-1">Solicitações</h1>
      <form
        onSubmit={onSubmit}
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
      <div className="my-6 flex flex-col gap-4 max-h-85.5 custom-scrollbar overflow-y-scroll">
        {refunds.map((refund) => (
          <RefundItem
            key={refund.id}
            data={refund}
            href={`/refunds/${refund.id}`}
          />
        ))}
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
