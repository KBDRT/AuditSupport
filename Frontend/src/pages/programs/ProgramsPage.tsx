import { Heading, Box, Flex, Container, VStack, HStack, Icon } from "@chakra-ui/react";
import ProgramsTable from "./ProgramsTable";
import { MdMenuBook } from "react-icons/md";

function ProgramsPage() {

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
                    <Icon as={MdMenuBook} boxSize="16px" color="white" />
                  </Box>
                  <Heading size="lg" fontWeight="600" color="gray.800">
                    Дополнительные общеразвивающие программы
                  </Heading>
                </HStack>
              </Flex>

              <ProgramsTable />
            </VStack>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

export default ProgramsPage;