import { sdk } from '@lib/config'

export const listCategories = async function () {
  return sdk.store.category
    .list({ fields: '+category_children' }, { next: { tags: ['categories'] } })
    .then(({ product_categories }) => product_categories)
}

export const getCategoriesList = async function (
  offset: number = 0,
  limit: number = 100
) {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { limit, offset },
    { next: { tags: ['categories'] } }
  )
}

export const getCategoryByHandle = async function (categoryHandle: string[]) {
  return sdk.store.category.list(
    // TODO: Look into fixing the type
    // @ts-ignore
    { handle: categoryHandle },
    { next: { tags: ['categories'] } }
  )
}
