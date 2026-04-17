import { Grid, GridItem, Heading, Box, Center, Button, Flex } from "@chakra-ui/react";
import UsersTable from "./UsersTable";
import { MdAdd } from "react-icons/md";

function AdminPage() {
  const handleAdd = () => {
    console.log("Добавить новую запись");
  };

  return (
    <Center mt="20px">
      <Grid w="60%" maxW="60%">
        <GridItem>
          <Flex justify="space-between" align="center" mb={3}>
            <Heading size="2xl">Пользователи системы</Heading>
            <Button 
              // colorPalette="blue"
              variant="outline" 
              onClick={handleAdd}
              size="sm"
            >
              <MdAdd />
              Добавить нового пользователя
            </Button>
          </Flex>
        </GridItem>

        <GridItem>
          <Box>
            <UsersTable />
          </Box>
        </GridItem>
      </Grid>
    </Center>
  );
}

export default AdminPage;