'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react'

type CartItem = {
  id: number
  name: string
  price: string
  image: string
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (product: Omit<CartItem, 'quantity'>) => void
  removeFromCart: (id: number) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({
  children,
}: {
  children: ReactNode
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Add To Cart
  const addToCart = (
    product: Omit<CartItem, 'quantity'>
  ) => {

    const existingItem = cartItems.find(
      (item) => item.id === product.id
    )

    if (existingItem) {

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      )

    } else {

      setCartItems([
        ...cartItems,
        {
          ...product,
          quantity: 1,
        },
      ])
    }
  }

  // Remove Item
  const removeFromCart = (id: number) => {

    setCartItems(
      cartItems.filter((item) => item.id !== id)
    )
  }

  // Increase Quantity
  const increaseQuantity = (id: number) => {

    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    )
  }

  // Decrease Quantity
  const decreaseQuantity = (id: number) => {

    setCartItems(
      cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // Total Items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  )

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price.replace('₹', '')) *
        item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {

  const context = useContext(CartContext)

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    )
  }

  return context
}