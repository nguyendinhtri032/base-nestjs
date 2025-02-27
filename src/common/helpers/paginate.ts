import { SelectQueryBuilder } from 'typeorm'
import { PAGE_DEFAULT, PER_PAGE_DEFAULT } from '../const/constants'

export interface Meta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

export interface DataPaginate<T> {
  items: T[]
  meta: Meta
}

export async function paginate<T>(
  queryBuilder: SelectQueryBuilder<T>,
  page: number = PAGE_DEFAULT,
  itemsPerPage: number = PER_PAGE_DEFAULT,
  getRaw: boolean = false,
): Promise<DataPaginate<T>> {
  const [{ entities, raw }, totalItems] = await Promise.all([
    queryBuilder
      .skip((page - 1) * itemsPerPage)
      .take(itemsPerPage)
      .getRawAndEntities(),
    queryBuilder.getCount(),
  ])
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const meta: Meta = {
    totalItems,
    itemCount: entities.length,
    itemsPerPage,
    totalPages,
    currentPage: page,
  }

  return {
    items: getRaw ? raw : entities,
    meta,
  }
}
