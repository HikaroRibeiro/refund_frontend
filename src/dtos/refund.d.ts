type RefundApiResponse = {
  id: string
  userId: string
  name: string
  amount: number
  filename: string
  category: CategoriesApiEnum
  user: {
    name: string
  }
}

type RefundsPaginationApiResponse = {
  refunds: RefundApiResponse[]
  pagination: {
    page: number
    perPage: number
    totalPages: number
    totalRecords: number
  }
}
