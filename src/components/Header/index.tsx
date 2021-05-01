import { Flex, Img } from "@chakra-ui/react";

export function Header() {
    return(
        <Flex
            as="header"
            w="100%"
            maxW={1440}
            h={["50px","100"]}
            mx="auto"
            justify="center"
            align="center"
        >
            <Img src="/logo.svg" alt="Logo image" w={["85px","185px"]} />
        </Flex>
    );
} 