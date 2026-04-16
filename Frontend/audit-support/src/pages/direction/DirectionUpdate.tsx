// import { Button, Dialog, Field, Input, Portal, Stack } from "@chakra-ui/react"
// import type { Direction } from '@/types/Direction';
// import { useState, useEffect } from "react"

// interface DirectionUpdateProps {
//   open: boolean  // Добавляем open
//   item: Direction
//   onClose: () => void
//   onSave: (item: Direction) => void
// }

// const DirectionUpdate = ({ open, item, onClose, onSave }: DirectionUpdateProps) => {
//   const [formData, setFormData] = useState<Direction>(item)

//   useEffect(() => {
//     setFormData(item)
//   }, [item])

//   const handleSave = () => {
//     onSave(formData)
//     onClose()         
//   }

//   const handleCancel = () => {
//     onClose()       
//   }

//   return (
//     <Dialog.Root 
//       open={open}
//       onOpenChange={(details) => {
//         if (!details.open) {
//           onClose()
//         }
//       }}
//     >
//       <Portal>       
//         <Dialog.Positioner>
//           <Dialog.Content>
//             <Dialog.Header>
//               <Dialog.Title>Редактирование направленности</Dialog.Title>
//             </Dialog.Header>
//             <Dialog.Body pb="4">
//               <Stack gap="4">
//                 <Field.Root>
//                   <Field.Label>Название</Field.Label>
//                   <Input
//                     value={formData.name}
//                     onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                     placeholder="Введите название"
//                   />
//                 </Field.Root>
//                 <Field.Root>
//                   <Field.Label>Описание</Field.Label>
//                   <Input
//                     value={formData.description}
//                     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                     placeholder="Введите описание"
//                   />
//                 </Field.Root>
//               </Stack>
//             </Dialog.Body>
//             <Dialog.Footer>
//               <Button colorPalette="green" onClick={handleSave}>
//                 Сохранить
//               </Button>
//               <Button colorPalette="red" onClick={handleCancel}>
//                 Отмена
//               </Button>
//             </Dialog.Footer>
//           </Dialog.Content>
//         </Dialog.Positioner>
//       </Portal>
//     </Dialog.Root>
//   )
// }

// export default DirectionUpdate