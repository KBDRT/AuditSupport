import { Box, HStack, Portal, Button, Separator } from "@chakra-ui/react"
import { useState,  useEffect } from "react"
import { useUsersStore } from "@/stores/UsersStore"
import { Input, InputGroup } from "@chakra-ui/react"
import { LuSearch } from "react-icons/lu"
import { Select } from "@chakra-ui/react"
import { SegmentGroup } from "@chakra-ui/react"
import { MdFilterAltOff } from "react-icons/md"
import { CloseButton } from "@chakra-ui/react"
import { ROLES_COLLECTION, STATUS_ITEMS } from "@/constants/roles"

const FilterTable = () => {
  const { clearFiler, filterUsers, filter } = useUsersStore()

  const [searchValue, setSearchValue] = useState(filter.searchField)
  const [statusValue, setStatusValue] = useState(filter.statusCode)
  const [rolesValue, setRolesValue] = useState<string[]>(filter.roles)

  useEffect(() => {
    setSearchValue(filter.searchField)
  }, [filter.searchField])

  useEffect(() => {
    setStatusValue(filter.statusCode)
  }, [filter.statusCode])

  useEffect(() => {
    setRolesValue(filter.roles)
  }, [filter.roles])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filter.searchField) {
        filterUsers({ searchField: searchValue })
      }
    }, 100)
    return () => clearTimeout(timer)
  }, [searchValue])

  const handleChangeSearch = (value: string) => {
    setSearchValue(value)
  }

  const handleChangeRoles = (value: string[]) => {
    setRolesValue(value)
    filterUsers({ roles: value })
  }

  const handleChangeStatus = (value: string) => {
    setStatusValue(value)
    filterUsers({ statusCode: value })
  }

  const handleClearFilter = () => {
    clearFiler()
    setSearchValue("")
    setStatusValue("active")
    setRolesValue([])
  }

  const endElement = searchValue ? (
    <CloseButton
      size="xs"
      onClick={() => {
        setSearchValue("")
        filterUsers({ searchField: "" })
      }}
      me="-2"
    />
  ) : undefined

  return (
    <Box>
      <HStack gap={3}>
        <InputGroup startElement={<LuSearch />} endElement={endElement}>
          <Input
            value={searchValue}
            placeholder="ФИО или Логин"
            size="sm"
            onChange={(e) => handleChangeSearch(e.target.value) }
          />
        </InputGroup>

        <Separator orientation="vertical" height="8" />

        <Select.Root
          multiple
          collection={ROLES_COLLECTION}
          size="sm"
          // width="320px"
          value={rolesValue}
          onValueChange={({ value }) => handleChangeRoles(value)}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Выберите роли" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.ClearTrigger />
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {ROLES_COLLECTION.items.map((role) => (
                  <Select.Item item={role} key={role.value}>
                    {role.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Separator orientation="vertical" height="8" />

        <SegmentGroup.Root
          size="sm"
          value={statusValue}
          css={{
            "--segment-indicator-bg": "colors.green.300",
            "--segment-indicator-shadow": "shadows.md",
          }}
          onValueChange={({ value }) => handleChangeStatus(value ?? "all")}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={STATUS_ITEMS} />
        </SegmentGroup.Root>

        <Separator orientation="vertical" height="8" />

        <Button size="xs" variant="surface" onClick={handleClearFilter}>
          <MdFilterAltOff /> Сбросить фильтрацию
        </Button>
      </HStack>
    </Box>
  )
}

export default FilterTable