// import { getDirection } from '@/api/direction/direction';
// import type { Direction } from '@/api/models';
// import { create } from 'zustand';
// import axios from 'axios';

// interface DirectionStore {
//   items: Direction[]
//   loading: boolean
//   addItem: (item: Omit<Direction, 'id'>) => void
//   updateItem: (id: string, item: Partial<Direction>) => void
//   deleteItem: (id: string) => void
//   getItem: (id: string) => Direction | undefined
//   fetchDirections: () => Promise<void>
// }


// export const useDirectionStore = create<DirectionStore>((set, get) => ({
//   items: [],
//   loading: false,
  
//   fetchDirections: async () => {
//     set({ loading: true });
//     try {

//       const axiosInstance = axios.create({
//         baseURL: 'http://localhost:5000', 
//         headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json' 
//         }
//       });

//       const api = getDirection(axiosInstance)
//       const response = await api.getDirection()
//       if (response.data != null)
//       {
//         // set({ items: response.data, loading: false });
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       set({ loading: false });
//     }
//   },

//   addItem: (newItem) => set((state) => ({
//     items: [...state.items, { ...newItem, id: Date.now().toString() }]
//   })),
  
//   updateItem: (id, updatedItem) => set((state) => ({
//     items: state.items.map(item => 
//       item.id === id ? { ...item, ...updatedItem } : item
//     )
//   })),
  
//   deleteItem: (id) => set((state) => ({
//     items: state.items.filter(item => item.id !== id)
//   })),
  
//   getItem: (id) => get().items.find(item => item.id === id),
// }))