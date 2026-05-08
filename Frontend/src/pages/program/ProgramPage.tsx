"use client"

import { Box, Container, Tabs } from "@chakra-ui/react"
import EduProgram from "./EduProgram"
import { MdHistory, MdMenuBook, MdVerified } from "react-icons/md"
import ProgramHistory from "./ProgramHistory"
import ProgramReviewsView from "./ProgramReviewsView"


const ProgramPage = () => {

  return (
    <Box >
      <Container>
        <Tabs.Root lazyMount unmountOnExit defaultValue="tab-1">
          <Tabs.List>
            <Tabs.Trigger value="tab-1"><MdMenuBook />Программа</Tabs.Trigger>
            <Tabs.Trigger value="tab-2"><MdVerified />Проверки</Tabs.Trigger>
            <Tabs.Trigger value="tab-3"><MdHistory />История</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="tab-1">
            <EduProgram />
          </Tabs.Content>
          <Tabs.Content value="tab-2">
            <ProgramReviewsView/>
          </Tabs.Content>
          <Tabs.Content value="tab-3">
             <ProgramHistory />
          </Tabs.Content>
        </Tabs.Root>
      </Container>
    </Box>
  )
}


export default ProgramPage