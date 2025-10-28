import { NextRequest } from 'next/server'

export interface PaginationParams {
  page: number
  limit: number
  skip: number
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export function getPaginationParams(req: NextRequest): PaginationParams {
  const searchParams = req.nextUrl.searchParams
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))
  const skip = (page - 1) * limit

  return { page, limit, skip }
}

export function createPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit)
  return {
    page,
    limit,
    total,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
  }
}

export function getFilterParams(req: NextRequest, allowedFilters: string[]): Record<string, any> {
  const searchParams = req.nextUrl.searchParams
  const filters: Record<string, any> = {}

  allowedFilters.forEach((filter) => {
    const value = searchParams.get(filter)
    if (value !== null) {
      // Handle numeric IDs
      if (filter.endsWith('Id')) {
        const numValue = parseInt(value, 10)
        if (!isNaN(numValue)) {
          filters[filter] = numValue
        }
      }
      // Handle boolean values
      else if (value === 'true' || value === 'false') {
        filters[filter] = value === 'true'
      }
      // Handle string values
      else {
        filters[filter] = value
      }
    }
  })

  return filters
}

export function getSearchParam(req: NextRequest, key: string): string | null {
  return req.nextUrl.searchParams.get(key)
}
