// import { useDirectionStore } from "@/stores/DirectionsStore";
// import { Table, Box, IconButton, HStack, Center } from "@chakra-ui/react"
// import { MdEdit, MdDelete } from "react-icons/md";
// import DirectionUpdate from "./DirectionUpdate";
// import { useState, useEffect } from "react";
// import type { Direction } from '@/types/Direction';

// const DirectionTable = () => {
//   const { items, deleteItem, updateItem, fetchDirections } = useDirectionStore()
//   const [selectedItem, setSelectedItem] = useState<Direction | null>(null)
//   const [isOpen, setIsOpen] = useState(false)

//   useEffect(() => {
//     fetchDirections();
//   }, []);

//   const handleDelete = (id: string) => {
//     if (confirm('Вы уверены, что хотите удалить?')) {
//       deleteItem(id)
//     }
//   }

//   const handleOpen = (item: Direction) => {
//     setSelectedItem(item)
//     setIsOpen(true)
//   }

//   const handleClose = () => {
//     setIsOpen(false)
//     setSelectedItem(null)

//     setTimeout(() => {
//       document.body.style.pointerEvents = ''
//       document.body.style.overflow = ''
//       document.body.style.position = ''
//       document.body.style.top = ''
//       document.body.style.width = ''
//       document.body.style.paddingRight = ''  
      
//       document.body.style.removeProperty('padding-right')
//     }, 0)
//   }

//   const handleSave = (updatedItem: Direction) => {
//     updateItem(updatedItem.id, updatedItem)  
//     handleClose()  
//   }

//   return (
//     <>
//       <Box overflowX="auto" maxW="100%">
//         <Table.Root 
//           size="md" 
//           interactive 
//           variant="outline" 
//           showColumnBorder
//           w="100%"
//           minW="800px"  
//         >
//           <Table.Header>
//             <Table.Row>
//               <Table.ColumnHeader w="200px">Название</Table.ColumnHeader>
//               <Table.ColumnHeader minW="300px">Описание</Table.ColumnHeader>
//               <Table.ColumnHeader textAlign="center" w="100px">Действия</Table.ColumnHeader>
//             </Table.Row>
//           </Table.Header>
//           <Table.Body>
//             {items.map((item) => (
//               <Table.Row key={item.id}>
//                 <Table.Cell w="200px" verticalAlign="top">
//                   {item.name}
//                 </Table.Cell>
//                 <Table.Cell minW="300px" verticalAlign="top">
//                   {item.description || "—"}
//                 </Table.Cell>
//                 <Table.Cell textAlign="center">
//                   <Center>
//                     <HStack gap={30}>
//                       <IconButton 
//                         aria-label="Edit" 
//                         size="sm" 
//                         variant="ghost" 
//                         colorPalette="blue"
//                         onClick={() => handleOpen(item)}
//                       >
//                         <MdEdit />
//                       </IconButton>
//                       <IconButton 
//                         aria-label="Delete" 
//                         size="sm" 
//                         variant="ghost" 
//                         colorPalette="red"
//                         onClick={() => handleDelete(item.id)}
//                       >
//                         <MdDelete />
//                       </IconButton>
//                     </HStack>
//                   </Center>
//                 </Table.Cell>
//               </Table.Row>
//             ))}
//           </Table.Body>
//         </Table.Root>
//       </Box>

//       {isOpen && selectedItem && (
//         <DirectionUpdate 
//           open = {isOpen}
//           item={selectedItem}
//           onClose={handleClose}
//           onSave={handleSave}
//         />
//       )}
//     </>
//   )
// }

// export default DirectionTable