import { useReviewsStore } from "@/stores/ReviewsStore";
import { useReviewStore } from "@/stores/ReviewStore";
import { Accordion, Box, Text, HStack, Icon, Badge, VStack, Center, Spinner } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import ReviewCommentaryPreview from "./ReviewCommentaryPreview";
import { MdInfo, MdPerson, MdCalendarToday } from "react-icons/md";
import { FormatDateTime } from '@/utils/TextUtils';

const ProgramReviewsView = () => {
  const { id } = useParams();
  const { items: reviews, fetch, loading} = useReviewsStore()
  const { fetchReview, commentary, loading: reviewLoading } = useReviewStore()
  const [value, setValue] = useState<string[]>([])

  useEffect(() => {
    const load = async () => {
      await fetch(id || "")
    };
    load();
  }, [id]);

  useEffect(() => {
    if (value.length > 0 && value[0].length > 0) {
      const load = async () => {
        await fetchReview(value[0])
      };
      load();
    }
  }, [value]);

  const getStatusText = (isFinished: boolean, isSuccess: boolean) => {
    if (!isFinished) return "В работе";
    return isSuccess ? "Успешно" : "Замечания";
  };

  const getStatusColor = (isFinished: boolean, isSuccess: boolean) => {
    if (!isFinished) return "yellow";
    return isSuccess ? "green" : "red";
  };

  if (loading) {
    return (
      <Box minH="400px" display="flex" alignItems="center" justifyContent="center">
        <Center>
          <Spinner size="xl" color="blue" />
        </Center>
      </Box>
    )
  }

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
              <Icon as={MdInfo} boxSize="16px" color="white" />
            </Box>
            <Text fontSize="lg" fontWeight="600" color="gray.700">
              Проверки программы
            </Text>
          </HStack>

          <Box
            bg="white"
            borderRadius="2xl"
            boxShadow="sm"
            overflow="hidden"
            _hover={{ boxShadow: "md" }}
            transition="all 0.3s ease"
          >
            {reviews.length === 0 ? (
              <VStack py={12} gap={3}>
                <Icon as={MdInfo} boxSize="48px" color="gray.300" />
                <Text fontSize="14px" color="gray.500" textAlign="center">
                  Нет проведенных проверок
                </Text>
              </VStack>
            ) : (
              <Accordion.Root 
                collapsible 
                value={value} 
                onValueChange={(e) => setValue(e.value)} 
                lazyMount
                variant="plain"
              >
                {reviews.map((review, index) => (
                  <Accordion.Item 
                    key={index} 
                    value={review.id || ""}
                    borderBottom="1px solid"
                    borderColor="gray.100"
                    _last={{ borderBottom: "none" }}
                  >
                    <Accordion.ItemTrigger
                      _hover={{ bg: "gray.50" }}
                      transition="all 0.2s"
                      px={6}
                      py={4}
                      cursor="pointer"
                    >
                      <HStack gap={4} flex="1">
                        <Badge 
                            colorPalette={getStatusColor(review.isFinished, review.isSuccess)}
                            fontSize="11px"
                            borderRadius="full"
                            px={2}
                          >
                            {getStatusText(review.isFinished, review.isSuccess)}
                        </Badge>
                        <VStack align="start" gap={1} flex="1">
                          <HStack gap={3}>
                            <HStack gap={1}>
                              <Icon as={MdCalendarToday} color="gray.400" boxSize="12px" />
                              <Text fontSize="13px" color="gray.500">
                                {FormatDateTime(review.createdDate)}
                              </Text>
                            </HStack>
                            <HStack gap={1}>
                              <Icon as={MdPerson} color="gray.400" boxSize="12px" />
                              <Text fontSize="13px" fontWeight="500" color="gray.700">
                                {review.auditor}
                              </Text>
                            </HStack>
                          </HStack>
                        </VStack>
                      </HStack>
                      <Accordion.ItemIndicator />
                    </Accordion.ItemTrigger>
                    <Accordion.ItemContent>
                      <Box px={6} py={4} bg="gray.50" borderTop="1px solid" borderColor="gray.100">
                        <Accordion.ItemBody>
                          {reviewLoading && value[0] === review.id ? (
                            <Center py={4}>
                              <Spinner size="sm" color="blue" />
                            </Center>
                          ) : (
                            <ReviewCommentaryPreview initialCommentary={commentary ?? ""} />
                          )}
                        </Accordion.ItemBody>
                      </Box>
                    </Accordion.ItemContent>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            )}
          </Box>
        </VStack>
    </Box>
  )
};

export default ProgramReviewsView