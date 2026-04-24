import { Grid, GridItem, Heading, Box, Center, Button, Flex } from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";
import { useState } from "react";
import { FixDialog } from "@/utils/DialogFix";
import WordRulesTable from "./WordRulesTable";
import WordRulesCreate from "./WordRulesCreate";

function WordRulesPage() {
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
            <Heading size="2xl">Нежелательные термины</Heading>
            <Button 
              // colorPalette="blue"
              variant="outline" 
              onClick={handleAdd}
              size="sm"
            >
              <MdAdd />
              Добавить новый термин
            </Button>
          </Flex>
        </GridItem>

        <GridItem>
          <Box>
            <WordRulesTable />
          </Box>
        </GridItem>
      </Grid>
    </Center>
    
    {isOpenCreate &&  (
         <WordRulesCreate 
          open={isOpenCreate}
          onClose={handleCloseCreate} />
      )}
    
    </>
  );
}

export default WordRulesPage;