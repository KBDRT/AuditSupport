import { useAuthStore } from "@/stores/AuthStore";
import {  Box, Link, Flex, Spacer  } from "@chakra-ui/react"
import { MdExitToApp } from "react-icons/md";

const Header = () =>  {
    const { logout, user } = useAuthStore()


    return (
        <Box boxShadow='lg' mb="10px" p="10px">
            <Flex alignItems="center" mx="auto" width="1400px">
                <Box fontSize={26} fontWeight="bold" ml="12px">
                    АУДИТ</Box>
                <Spacer />
                
                <Flex gap="30px" mr="180px">

                    {user?.role == "Head" && 
                    (
                        <>
                            <Link fontSize={18} href="/years">Уч. года</Link>
                            <Link fontSize={18} href="/directions">Направления</Link>
                            <Link fontSize={18} href="/rules/words">Термины</Link>
                            <Link fontSize={18} href="/rules/sections">Разделы</Link>
                        </>
                    )}    

                    {user?.role == "Admin" && 
                    (
                        <>
                            <Link fontSize={18} href="/users">Пользователи</Link>
                        </>
                    )}  


                    <Link onClick={logout} fontSize={18}>
                        <MdExitToApp />
                        Выйти
                    </Link>

                </Flex>
            </Flex>
        </Box>
    )
}

export default Header;