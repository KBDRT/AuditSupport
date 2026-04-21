import { Grid, GridItem, Heading, Box, Center, Button, Flex } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { FixDialog } from "@/utils/DialogFix";
import YearsTable from "./YearsTable";
import YearCreate from "./YearCreate";


function YearsPage() {
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
    <Center mt="20px">
      <Grid w="60%" maxW="60%">
        <GridItem>
          <Flex justify="space-between" align="center" mb={1}>
            <Heading size="2xl">Учебные года</Heading>
            <Button 
              // colorPalette="blue"
              variant="outline" 
              onClick={handleAdd}
              size="sm"
            >
              <MdAdd />
              Добавить новый учебный год
            </Button>
          </Flex>
        </GridItem>

        <GridItem>
          <Box>
            <YearsTable />
          </Box>
        </GridItem>
      </Grid>
    </Center>
    
    {isOpenCreate &&  (
         <YearCreate 
          open={isOpenCreate}
          onClose={handleCloseCreate} />
      )}
    
    </>
  );
}

export default YearsPage;