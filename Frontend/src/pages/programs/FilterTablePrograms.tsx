import { Box, HStack, Portal, Button, Separator, createListCollection } from "@chakra-ui/react"
import { useEffect, useMemo, useState } from "react"
import { Select } from "@chakra-ui/react"
import { MdFilterAltOff } from "react-icons/md"
import { ROLES_COLLECTION } from "@/constants/common"
import { useYearsStore } from "@/stores/YearsStore"
import { useDirectionsStore } from "@/stores/DirectionsStore"
import { useProgramsStore } from "@/stores/ProgramsStore"

const FilterTablePrograms = () => {
  const { setYear, fetch } = useProgramsStore()
  const { fetch: fetchYears, items: years } = useYearsStore()
  const { fetch: fetchDirections, items: directionsItems } = useDirectionsStore()
  
  const [selectedYear, setSelectedYear] = useState<string[]>([])
  const [selectedDirections, setSelectedDirections] = useState<string[]>([])
  const [selectedStatus, setSelectedStatus] = useState<string[]>([])

  const collectionYears = useMemo(() => {
    return createListCollection({
      items: years ?? [],
      itemToString: (year) => year.period || "",
      itemToValue: (year) => year.id || "", 
    })
  }, [years])

  const collectionDirections = useMemo(() => {
    return createListCollection({
      items: directionsItems ?? [],
      itemToString: (direction) => direction.name || "",
      itemToValue: (direction) => direction.id || "", 
    })
  }, [directionsItems])

  useEffect(() => {
    const init = async () => {
      await fetchYears()
      await fetchDirections()
    }
    init()
  }, [])

  useEffect(() => {
    if (collectionYears.items.length > 0) {
      const firstYearId = collectionYears.items[0].id ?? ""
      setSelectedYear([firstYearId])
      setYear(firstYearId)
      fetch()
    }
  }, [collectionYears.items.length])

  // useEffect(() => {
  //   if (directions && directions.length > 0) {
  //     setSelectedDirections(directions)
  //   }
  // }, [directions])

  // useEffect(() => {
  //   if (status && status.length > 0) {
  //     setSelectedStatus(status)
  //   }
  // }, [status])

  const handleChangeYear = async (value: string[]) => {
    const yearId = value[0]
    setSelectedYear(value)
    setYear(yearId)
    await fetch()
  }

  const handleChangeDirections = (value: string[]) => {
    setSelectedDirections(value)
    // setDirections(value)
    fetch()
  }

  const handleChangeStatus = (value: string[]) => {
    setSelectedStatus(value)
    // setStatus(value)
    fetch()
  }

  const handleClearFilter = () => {
    setSelectedDirections([])
    setSelectedStatus([])
    // setDirections([])
    // setStatus([])

    if (collectionYears.items.length > 0) {
      const firstYearId = collectionYears.items[0].id ?? ""
      setSelectedYear([firstYearId])
      setYear(firstYearId)
      fetch()
    }
  }

  return (
    <Box>
      <HStack gap={3}>
        <Select.Root
          collection={collectionYears}
          size="sm"
          value={selectedYear}
          onValueChange={({ value }) => handleChangeYear(value)}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Выберите уч. год" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.ClearTrigger />
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collectionYears.items.map((year) => (
                  <Select.Item item={year} key={year.id}>
                    {year.period}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Select.Root
          multiple
          collection={collectionDirections}
          size="sm"
          value={selectedDirections}
          onValueChange={({ value }) => handleChangeDirections(value)}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Выберите направления" />
            </Select.Trigger>
            <Select.IndicatorGroup>
              <Select.ClearTrigger />
              <Select.Indicator />
            </Select.IndicatorGroup>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                {collectionDirections.items.map((direction) => (
                  <Select.Item item={direction} key={direction.id}>
                    {direction.name}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Portal>
        </Select.Root>

        <Separator orientation="vertical" height="8" />

        <Select.Root
          multiple
          collection={ROLES_COLLECTION}
          size="sm"
          value={selectedStatus}
          onValueChange={({ value }) => handleChangeStatus(value)}
        >
          <Select.HiddenSelect />
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText placeholder="Выберите статус" />
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

        <Button size="xs" variant="surface" onClick={handleClearFilter}>
          <MdFilterAltOff /> Сбросить фильтрацию
        </Button>
      </HStack>
    </Box>
  )
}

export default FilterTablePrograms