import { create } from 'zustand'

interface CartStore {
  isOpenCartDropdown: boolean
  openCartDropdown: () => void
  closeCartDropdown: () => void
}

export const useCartStore = create<CartStore>((set) => {
  return {
    isOpenCartDropdown: false,
    openCartDropdown: () =>
      set(() => ({
        isOpenCartDropdown: true,
      })),
    closeCartDropdown: () =>
      set(() => ({
        isOpenCartDropdown: false,
      })),
  }
})
