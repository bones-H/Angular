export interface Item {
  id_product: number
  product_name: string
  price: number
  quantity?: number
}
export interface CartItem {
  amount: number
  contents: Item[]
  countGoods: number
}
