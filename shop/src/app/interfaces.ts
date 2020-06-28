export interface Product {
  id_product: number
  product_name: string
  price: number
  quantity?: number
}
export interface Cart {
  amount: number
  contents: Product[]
  countGoods: number
}
