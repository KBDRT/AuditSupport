import { useParams } from "react-router-dom";
import {
  Button,
  Box,
  Container,
  Field,
  HStack,
  Input,
  NativeSelect,
  VStack,
  Text,
  Icon,
  Grid,
  GridItem,
  Badge,
  Table,
  ActionBar,
  Portal,
  Select,
  createListCollection
} from "@chakra-ui/react"
import { MdWork, MdPerson, MdCalendarToday, MdCategory, MdInfo, MdDownload, MdVisibility, MdCheckCircle, MdPending, MdClose, MdPreview } from "react-icons/md";
import { useEffect, useState } from "react";
import { type EduProgramDTO } from "@/api/models";
import { GetProgram, UpdateProgram } from "@/services/ProgramService";
import VersionCreate from "./VersionCreate";
import { FixDialog } from "@/utils/DialogFix";
import { GetStatusTypeName } from './../../utils/TextUtils';
import { useYearsStore } from "@/stores/YearsStore";
import { useDirectionsStore } from "@/stores/DirectionsStore";



const EduProgram = () => {
  const { id } = useParams();
  const {fetch, items: directions} = useDirectionsStore()
  const [formData, setFormData] = useState<EduProgramDTO>();

  useEffect(() => {
    const loadProgram = async () => {
      const program = await GetProgram(id || "");
      setFormData(program);

      fetch()
    };
    
    loadProgram();
}, [id]); 




  const [isOpenCreate, setIsOpenCreate] = useState(false)

  const handleCloseCreate = () => {
    setIsOpenCreate(false)
    FixDialog()
  }
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value
    }));
  };

  const handleSave = async() => {
    await UpdateProgram({
      agesOfChildrens: formData?.agesOfChildrens, 
      directionId: formData?.directionId || "",
      duration: formData?.duration,
      name: formData?.name,
      programId: formData?.id })
  }






  return (
    <>

    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.md" py={2}>
        <VStack align="stretch" gap={3}>
          <HStack gap={3}>
            <Box
              as="div"
              w="32px"
              h="32px"
              bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={MdInfo} boxSize="16px" color="white" />
            </Box>
            <Text fontSize="lg" fontWeight="600" color="gray.700">
              Информация
            </Text>
          </HStack>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            p={8}
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            <VStack gap={6} align="stretch">
              <Grid templateColumns="auto 1fr" gap={6}>
                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdInfo} color="blue.500" boxSize="16px" />
                      Статус
                    </Field.Label>
                    <Badge
                      colorScheme="blue"
                      fontSize="14px"
                      borderRadius="full"
                      px={4}
                      py={2}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      minW="100px"
                    >
                      {formData?.programStatus != undefined && GetStatusTypeName(formData?.programStatus)}
                    </Badge>
                  </Field.Root>
                </GridItem>

                <GridItem>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdWork} color="blue.500" boxSize="16px" />
                      Название программы
                    </Field.Label>
                    <Input
                      name="name"
                      onChange={handleChange}
                      placeholder="Введите название программы"
                      size="lg"
                      fontSize="16px"
                      value={formData?.name || ""}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>
              </Grid>

              <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdCalendarToday} color="blue.500" boxSize="16px" />
                      Учебный год
                    </Field.Label>
                    <NativeSelect.Root>
                      <NativeSelect.Field
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                      >
                        <option value="">Выберите учебный год</option>
                        <option value="2024">2024/2025</option>
                        <option value="2023">2023/2024</option>
                        <option value="2022">2022/2023</option>
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdCategory} color="blue.500" boxSize="16px" />
                      Направление
                    </Field.Label>

                  {/* <Select.Root
                    collection={directions}
                    size="sm"
                    value={[formData?.direction?.toString() || ""]}
                    onValueChange={({ value }) => setFormData({ ...formData, directionId: value[0] })}
                  >
                    <Select.HiddenSelect />
                    <Select.Control>
                      <Select.Trigger>
                        <Select.ValueText placeholder="Выберите роли" />
                      </Select.Trigger>
                      <Select.IndicatorGroup>
                        <Select.Indicator />
                      </Select.IndicatorGroup>
                    </Select.Control>
                    <Portal>
                      <Select.Positioner>
                        <Select.Content>
                          {directions.items.map((direction) => (
                            <Select.Item item={direction} key={direction.value}>
                              {direction.label}
                              <Select.ItemIndicator />
                            </Select.Item>
                          ))}
                        </Select.Content>
                      </Select.Positioner>
                    </Portal>
                  </Select.Root> */}

                    <NativeSelect.Root>
                      <NativeSelect.Field
                        _focus={{
                          borderColor: "blue.500",
                          boxShadow: "0 0 0 1px #3182CE"
                        }}
                        value={formData?.directionId || ''}
                        onChange={(e) => setFormData({ ...formData, directionId: e.currentTarget.value })}
                      >
                        {directions.map((direction, index) => (
                          <option key={direction.id} value={direction.id}>{direction.name}</option>
                        ))}
                      </NativeSelect.Field>
                      <NativeSelect.Indicator />
                    </NativeSelect.Root>
                  </Field.Root>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdPerson} color="blue.500" boxSize="16px" />
                      Возраст учащихся
                    </Field.Label>
                    <Input
                      name="agesOfChildrens"
                      placeholder="Например: 8-15 лет"
                      onChange={handleChange}
                       value={formData?.agesOfChildrens || ""}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <Field.Root>
                    <Field.Label display="flex" alignItems="center" gap={2}>
                      <Icon as={MdCalendarToday} color="blue.500" boxSize="16px" />
                      Срок реализации
                    </Field.Label>
                    <Input
                      name="duration"
                      placeholder="Например: 3 года (576 часов)"
                      onChange={handleChange}
                      value={formData?.duration || ""}
                      _focus={{
                        borderColor: "blue.500",
                        boxShadow: "0 0 0 1px #3182CE"
                      }}
                    />
                  </Field.Root>
                </GridItem>
              </Grid>
            </VStack>
          </Box>
        </VStack>
      </Container>

      <Container maxW="container.md" py={6}>
        <VStack align="stretch" gap={3}>
          <HStack gap={3}>
            <Box
              as="div"
              w="32px"
              h="32px"
              bg="linear-gradient(135deg, #3182CE 0%, #2C5282 100%)"
              borderRadius="8px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Icon as={MdInfo} boxSize="16px" color="white" />
            </Box>
            <Text fontSize="lg" fontWeight="600" color="gray.700">
              Версии программы
            </Text>

            <Button onClick={(e) => setIsOpenCreate(true)} colorPalette={"blue"}  size="sm">
              Добавить
            </Button>
          </HStack>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            overflow="auto"
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            <Table.Root 
              size="sm" 
              interactive 
              variant="outline" 
              w="100%"
              borderWidth="0"
              showColumnBorder
            >
              <Table.Header>
                <Table.Row bg="gray.50">
                  <Table.ColumnHeader w="80px" textAlign="center">№ п/п</Table.ColumnHeader>
                  <Table.ColumnHeader w="150px">Дата создания</Table.ColumnHeader>
                  <Table.ColumnHeader>Комментарий</Table.ColumnHeader>
                  <Table.ColumnHeader w="200px" textAlign="center">Файл</Table.ColumnHeader>
                  <Table.ColumnHeader w="180px" textAlign="center">Статус тех. проверки</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {formData?.versions && formData?.versions.map((version, index) => (
                  <Table.Row _hover={{ bg: "gray.50" }} transition="all 0.2s">
                    <Table.Cell textAlign="center" fontWeight="500">{index}</Table.Cell>
                    <Table.Cell>{version.createdDate}</Table.Cell>
                    <Table.Cell color="gray.600">{version.changes}</Table.Cell>
                    <Table.Cell>
                      <HStack gap={2} justify="center">
                        <Button
                          variant="ghost"
                          size="xs"
                          colorScheme="blue"
                          _hover={{ bg: "blue.50", transform: "translateY(-1px)" }}
                        >
                          <HStack gap={1}>
                            <Icon as={MdDownload} boxSize="14px" />
                            <Text fontSize="12px">Скачать</Text>
                          </HStack>
                        </Button>
                        <Button
                          variant="ghost"
                          size="xs"
                          colorScheme="gray"
                          _hover={{ bg: "gray.100", transform: "translateY(-1px)" }}
                        >
                          <HStack gap={1}>
                            <Icon as={MdPreview} boxSize="14px" />
                            <Text fontSize="12px">Предпросмотр</Text>
                          </HStack>
                        </Button>
                      </HStack>
                    </Table.Cell>
                    <Table.Cell>
                      <HStack gap={2} justify="center">
                        {/* {getStatusBadge("passed")} */}
                        <Button
                          variant="ghost"
                          size="xs"
                          colorScheme="gray"
                          _hover={{ bg: "gray.100" }}
                        >
                          <HStack gap={1}>
                            <Icon as={MdVisibility} boxSize="14px" />
                            <Text fontSize="12px">Результат</Text>
                          </HStack>
                        </Button>
                      </HStack>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        </VStack>
      </Container>
    </Box>

    {isOpenCreate &&  (
      <VersionCreate 
      open={isOpenCreate}
      onClose={handleCloseCreate} />
    )}

    <ActionBar.Root open={!isOpenCreate} placement={"bottom"}>
      <Portal>
        <ActionBar.Positioner>
          <ActionBar.Content>
            {/* <ActionBar.SelectionTrigger>
              3 selected
            </ActionBar.SelectionTrigger> */}
            <Button variant="outline" size="sm" onClick={handleSave}>
              {/* <LuTrash2 /> */}
              Сохранить информацию
            </Button>
            <ActionBar.Separator />
            <Button variant="outline" size="sm">
              {/* <LuShare /> */}
              Отправить на проверку
            </Button>
          </ActionBar.Content>
        </ActionBar.Positioner>
      </Portal>
    </ActionBar.Root>

    </>

  )
}

export default EduProgram