import { Box, Container, VStack, HStack, Icon, Heading, Text, Badge, Grid, GridItem, Card, Center } from "@chakra-ui/react";
import { MdInfo, MdCheckCircle, MdPending, MdEdit, MdWarning, MdAssignment, MdVerified } from "react-icons/md";

interface Program {
  id: number;
  name: string;
  teacher: string;
  direction: string;
}

interface StatusConfig {
  label: string;
  color: string;
  icon: any;
  count: number;
}

const ProgramsBoard = () => {
  const programs: Record<string, Program[]> = {
    created: [
      { id: 1, name: "Программа 1", teacher: "Иванова А.А.", direction: "Техническая" },
      { id: 2, name: "Программа 2", teacher: "Петрова Б.Б.", direction: "Естественнонаучная" },
      { id: 3, name: "Программа 3", teacher: "Сидорова В.В.", direction: "Физкультурно-спортивная" },
    ],
    readyToCheck: [
      { id: 4, name: "Программа 4", teacher: "Кузнецова Г.Г.", direction: "Художественная" },
      { id: 5, name: "Программа 5", teacher: "Волкова Д.Д.", direction: "Туристско-краеведческая" },
    ],
    onCheck: [
      { id: 6, name: "Программа 6", teacher: "Соколова Е.Е.", direction: "Социально-гуманитарная" },
      { id: 7, name: "Программа 7", teacher: "Михайлова Ж.Ж.", direction: "Техническая" },
      { id: 8, name: "Программа 8", teacher: "Федорова З.З.", direction: "Естественнонаучная" },
    ],
    onEdit: [
      { id: 9, name: "Программа 9", teacher: "Морозова И.И.", direction: "Физкультурно-спортивная" },
    ],
    needFix: [
      { id: 10, name: "Программа 10", teacher: "Алексеева К.К.", direction: "Художественная" },
      { id: 11, name: "Программа 11", teacher: "Лебедева Л.Л.", direction: "Туристско-краеведческая" },
    ],
    readyToSign: [
      { id: 12, name: "Программа 12", teacher: "Егорова М.М.", direction: "Социально-гуманитарная" },
    ],
    signed: [
      { id: 13, name: "Программа 13", teacher: "Николаева Н.Н.", direction: "Техническая" },
      { id: 14, name: "Программа 14", teacher: "Андреева О.О.", direction: "Естественнонаучная" },
    ],
  };

  const statusConfig: Record<string, StatusConfig> = {
    created: { label: "Создана", color: "gray", icon: MdInfo, count: programs.created.length },
    readyToCheck: { label: "Готова к проверке", color: "blue", icon: MdCheckCircle, count: programs.readyToCheck.length },
    onCheck: { label: "На проверке", color: "yellow", icon: MdPending, count: programs.onCheck.length },
    onEdit: { label: "На исправлении", color: "orange", icon: MdEdit, count: programs.onEdit.length },
    needFix: { label: "Нужно исправление", color: "red", icon: MdWarning, count: programs.needFix.length },
    readyToSign: { label: "Готова к подписанию", color: "purple", icon: MdAssignment, count: programs.readyToSign.length },
    signed: { label: "Подписана", color: "green", icon: MdVerified, count: programs.signed.length },
  };

  const renderProgramCard = (program: Program) => (
    <Card.Root
      key={program.id}
      size="sm"
      variant="outline"
      p={3}
      borderRadius="lg"
      _hover={{ bg: "gray.50", borderColor: "blue.300", transform: "translateY(-2px)" }}
      transition="all 0.2s"
      cursor="pointer"
    >
      <VStack align="stretch" gap={1}>
        <Text fontWeight="600" fontSize="14px">
          {program.name}
        </Text>
        <Text fontSize="12px" color="gray.500">
          {program.teacher}
        </Text>
        <Badge colorPalette="gray" fontSize="10px" borderRadius="full" alignSelf="flex-start">
          {program.direction}
        </Badge>
      </VStack>
    </Card.Root>
  );

  const renderColumn = (statusKey: string, programsList: Program[]) => {
    const config = statusConfig[statusKey];
    if (!programsList || programsList.length === 0) return null;

    return (
      <GridItem minW="280px" bg="white" borderRadius="2xl" boxShadow="sm" overflow="hidden" _hover={{ boxShadow: "md" }} transition="all 0.3s ease">
        <Box
          bg={`${config.color}.50`}
          p={1}
          borderBottom="1px solid"
          borderColor={`${config.color}.200`}
        >
          <HStack justify="space-between">
            <HStack gap={1}>
              <Icon as={config.icon} color={`${config.color}.600`} boxSize="18px" />
              <Text fontSize="15px" fontWeight="600" color="gray.800">
                {config.label}
              </Text>
            </HStack>
            <Badge colorPalette={config.color} borderRadius="full" fontSize="12px" px={2}>
              {config.count}
            </Badge>
          </HStack>
        </Box>
        <VStack gap={2} p={3} align="stretch" maxH="calc(100vh - 250px)" overflowY="auto">
          {programsList.map((program) => renderProgramCard(program))}
        </VStack>
      </GridItem>
    );
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="100%" py={6}>
        
        <VStack align="stretch" gap={6}>
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
            <Heading size="lg" fontWeight="600" color="gray.800">
              Доска программ
            </Heading>
          </HStack>

          <Box overflowX="auto" pb={4}>
            <Grid
              templateColumns="repeat(6, minmax(260px, 300px))"
              gap={3}
              justifyItems="stretch"
              alignItems="start"
            >
              {renderColumn("created", programs.created)}
              {renderColumn("readyToCheck", programs.readyToCheck)}
              {renderColumn("onCheck", programs.onCheck)}
              {renderColumn("onEdit", programs.onEdit)}
              {/* {renderColumn("needFix", programs.needFix)} */}
              {renderColumn("readyToSign", programs.readyToSign)}
              {renderColumn("signed", programs.signed)}
            </Grid>
          </Box>
        </VStack>
      
      </Container>
    </Box>
  );
};

export default ProgramsBoard;