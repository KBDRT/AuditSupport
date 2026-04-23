import { Grid, GridItem, Heading, Box, Center, Button, Flex } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
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
    <>
    <Center>
      <Grid w="60%" maxW="60%">
        <GridItem>
          <Flex justify="space-between" align="center" mb={1}>
            <Heading size="2xl">Направленности программ</Heading>
            <Button 
              // colorPalette="blue"
              variant="outline" 
              onClick={handleAdd}
              size="sm"
            >
              <MdAdd />
              Добавить новую направленность
            </Button>
          </Flex>
        </GridItem>

        <GridItem>
          <Box>
            <DirectionsTable />
          </Box>
        </GridItem>
      </Grid>
    </Center>
    
    {isOpenCreate &&  (
         <DirectionCreate 
          open={isOpenCreate}
          onClose={handleCloseCreate} />
      )}
    
    </>
  );
}

export default DirectionPage;