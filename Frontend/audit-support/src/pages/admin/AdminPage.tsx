import { Grid, GridItem, Heading, Box, Center, Button, Flex } from "@chakra-ui/react";
import UsersTable from "./UsersTable";

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
              colorPalette="green" 
              onClick={handleAdd}
              size="sm"
            >
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