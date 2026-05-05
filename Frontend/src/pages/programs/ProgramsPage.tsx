import { Grid, GridItem, Heading, Box, Center, Button, Flex } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { FixDialog } from "@/utils/DialogFix";
import ProgramsTable from "./ProgramsTable";

function ProgramsPage() {
  const [isOpenCreate, setIsOpenCreate] = useState(false)

  const handleCloseCreate = () => {
    setIsOpenCreate(false)
    FixDialog()
  }
      
  const handleAdd = () => {
    setIsOpenCreate(true)
  };

  return (
    <>
    <Center>
      <Grid w="60%" maxW="60%">
        <GridItem>
          <Flex justify="space-between" align="center" mb={3}>
            <Heading size="2xl">Дополнительные общеразвивающие программы</Heading>
            {/* <Button 
              variant="outline" 
              onClick={handleAdd}
              size="sm"
            >
              <MdAdd />
              Добавить нового пользователя
            </Button> */}
          </Flex>
        </GridItem>

        <GridItem>
          <Box>
            <ProgramsTable />
          </Box>
        </GridItem>
      </Grid>
    </Center>
    
    {/* {isOpenCreate &&  (
         <UserCreate 
          open={isOpenCreate}
          onClose={handleCloseCreate} />
      )} */}
    
    </>
  );
}

export default ProgramsPage;
