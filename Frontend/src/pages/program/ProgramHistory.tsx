import { type ProgramHistoryDTO } from "@/api/models/programHistoryDTO"
import StatusBadge from "@/components/common/StatusBadge";
import { GetHistory } from "@/services/ProgramService";
import { FormatDateTime } from "@/utils/TextUtils";
import { Timeline, Box, VStack, Text, HStack, Icon } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { MdHistory, MdPerson, MdSwapHoriz } from "react-icons/md";

const ProgramHistory = () => {
  const { id } = useParams();
  const [history, setHistory] = useState<ProgramHistoryDTO[]>([]);

  useEffect(() => {
    const loadErrors = async () => {
      const data = await GetHistory(id || "")
      setHistory(data)
    };
    loadErrors();
  }, [id]);
  
  return (
    <Box>
      <VStack align="stretch" gap={4}>
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
            <Icon as={MdHistory} boxSize="16px" color="white" />
          </Box>
          <Text fontSize="lg" fontWeight="600" color="gray.700">
            История изменений
          </Text>
        </HStack>

        <Box
          bg="white"
          borderRadius="2xl"
          boxShadow="sm"
          p={6}
          _hover={{ boxShadow: "md" }}
          transition="all 0.3s ease"
        >
          {history.length === 0 ? (
            <VStack py={8} gap={3}>
              <Icon as={MdHistory} boxSize="48px" color="gray.300" />
              <Text fontSize="14px" color="gray.500" textAlign="center">
                История изменений пуста
              </Text>
            </VStack>
          ) : (
            <Timeline.Root size="sm">
              {history.map((item, index) => (
                <Timeline.Item key={index}>
                  <Timeline.Content width="auto">
                    <Timeline.Title fontSize="13px" fontWeight="500" color="gray.600" width="100px">
                      {FormatDateTime(item.date)}
                    </Timeline.Title>
                  </Timeline.Content>
                  <Timeline.Connector>
                    <Timeline.Separator />
                    <Timeline.Indicator
                      bg="blue.500"
                      color="white"
                      boxSize="24px"
                      fontSize="12px"
                      fontWeight="600"
                    >
                      {index + 1}
                    </Timeline.Indicator>
                  </Timeline.Connector>
                  <Timeline.Content>
                    <HStack gap={2} flexWrap="wrap">
                      <Icon as={MdPerson} color="blue.500" boxSize="14px" />
                      <Text fontSize="14px" fontWeight="500" color="gray.700">
                        {item.userFIO}
                      </Text>
                      <Icon as={MdSwapHoriz} color="gray.400" boxSize="14px" />
                      <Text fontSize="14px" color="gray.600">
                        изменил статус программы на
                      </Text>
                      <StatusBadge status={item.newStatus} />
                    </HStack>
                  </Timeline.Content>
                </Timeline.Item>
              ))}
            </Timeline.Root>
          )}
        </Box>
      </VStack>
    </Box>
  )
}

export default ProgramHistory