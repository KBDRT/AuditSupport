import {  Container, Box, SimpleGrid, Link, Flex, Spacer  } from "@chakra-ui/react"

const Header = () =>  {
    return (
        <Box boxShadow='lg' mb="10px" p="10px">
            <Flex alignItems="center" mx="auto" width="1400px">
                <Box fontSize={26} fontWeight="bold" ml="12px">
                    АУДИТ</Box>
                <Spacer />
                
                <Flex gap="30px" mr="180px">
                    {/* <Link fontSize={18} href="/resources">Пользователи</Link>
                    <Link fontSize={18} href="/units">Уч. года</Link>
                    <Link fontSize={18} href="/documents">Направленности</Link>
                    <Link fontSize={18} href="/documents">Доп. общеразвивающие программы</Link>
                    <Link fontSize={18} href="/documents">Аудит программ</Link>
                    <Link fontSize={18} href="/documents">История программы</Link> */}
                </Flex>
            </Flex>
        </Box>
    )
}

export default Header;