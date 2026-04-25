import { createListCollection } from "@chakra-ui/react"

export const ROLES_COLLECTION = createListCollection({
  items: [
    { label: "Педагоги", value: "0" },
    { label: "Методисты", value: "1" },
    { label: "Зам. директора", value: "2" },
    // { label: "Админ", value: "3" },
  ],
})

export const ROLE_COLLECTION = createListCollection({
  items: [
    { label: "Педагог", value: "0" },
    { label: "Методист", value: "1" },
    { label: "Зам. директора", value: "2" },
    // { label: "Админ", value: "3" },
  ],
})

export const STATUS_ITEMS = [
  { value: "all", label: "Все статусы" },
  { value: "active", label: "Активные" },
  { value: "inactive", label: "Неактивные" },
]

export const STATUS_COLLECTION = createListCollection({
  items: [
    { label: "Активен", value: "active" },
    { label: "Неактивен", value: "inactive" },
  ],
})


export const SECTION_RULE_TYPE_COLLECTION = createListCollection({
  items: [
    { label: "Текстовый", value: "0" },
    { label: "Табличный", value: "1" },
    { label: "Строки", value: "2" },
  ],
})
