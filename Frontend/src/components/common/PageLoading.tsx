import { Box } from '@chakra-ui/react';
import { ProgressCircle, Text, VStack} from "@chakra-ui/react"

const PageLoading = () =>  {
  return (
    <Box  display="flex" alignItems="center" justifyContent="center">
      <VStack gap={4} alignItems="center">
        <ProgressCircle.Root value={null} size="lg" colorPalette="blue">
          <ProgressCircle.Circle>
            <ProgressCircle.Track />
            <ProgressCircle.Range />
          </ProgressCircle.Circle>
        </ProgressCircle.Root>
        <Text fontSize="md" color="gray.500">Загрузка...</Text>
      </VStack>
    </Box>
  )
}

export default PageLoading