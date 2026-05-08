import { Button, Box, Container, VStack, HStack, Icon, Heading, Flex, Text } from "@chakra-ui/react";
import { MdAdd, MdInfo, MdCategory } from "react-icons/md";
import { useState } from "react";
import { FixDialog } from "@/utils/DialogFix";
import DirectionsTable from "./DirectionsTable";
import DirectionCreate from "./DirectionCreate";

function DirectionPage() {
  const [isOpenCreate, setIsOpenCreate] = useState(false)

  const handleCloseCreate = () => {
    setIsOpenCreate(false)
    FixDialog()
  }
      
  const handleAdd = () => {
    setIsOpenCreate(true)
  };

  return (
    <Box minH="100vh" bg="gray.50">
      <Container maxW="container.xl" py={6}>
        <VStack align="stretch" gap={6}>
          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            p={6}
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            <VStack align="stretch" gap={5}>
              <Flex justify="space-between" align="center">
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
                    <Icon as={MdCategory} boxSize="16px" color="white" />
                  </Box>
                  <Heading size="lg" fontWeight="600" color="gray.800">
                    Направления программ
                  </Heading>
                </HStack>
                <Button
                  variant="outline"
                  colorPalette="blue"
                  onClick={handleAdd}
                  size="sm"
                  _hover={{
                    transform: "translateY(-1px)",
                    boxShadow: "md",
                    bg: "blue.50"
                  }}
                  transition="all 0.2s"
                >
                  <HStack gap={2}>
                    <Icon as={MdAdd} boxSize="16px" />
                    <Text>Новое направление</Text>
                  </HStack>
                </Button>
              </Flex>

              <DirectionsTable />
            </VStack>
          </Box>
        </VStack>
      </Container>

      {isOpenCreate && (
        <DirectionCreate 
          open={isOpenCreate}
          onClose={handleCloseCreate}
        />
      )}
    </Box>
  );
}

export default DirectionPage;