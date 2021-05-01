import { Box, Flex, Img, Text, Icon, Tooltip, Grid, GridItem } from "@chakra-ui/react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from 'next/head';
import { Header } from "../../components/Header";
import { ImInfo } from 'react-icons/im';
import api from "../../services/api";

interface ContinentDataProps {
    name:  string,
    description: string,
    banner: string,
    countrysNumber: number,
    languagesNumber: number,
    topCitiesNumber: number,
    topCities: {
        cityName: string,
        cityCountry: string,
        cityPhoto: string,
        countryFlag: string,
    }[],
}

interface ContinentData {
    continent: ContinentDataProps,
}

export default function Continent({ continent }: ContinentData) {
    
    return (
        <>
            <Head>
                <title> {continent.name} | WorldTrip </title>
            </Head>
            <Header />

            <Box
                w="100%"
                h={["150px","500px"]}
                display="flex"
                alignItems={["center","flex-end"]}
                justifyContent={["center","flex-start"]}
            >
            <Img 
                src={continent.banner}
                w="100%"
                h={["150px","500px"]}
                position="absolute"
                zIndex="-1"
            />
            <Box 
                w="100%"
                h={["150px","500px"]}
                position="absolute"
                bg="black"
                opacity=".7"
                zIndex="-1"
            />

            <Text 
                zIndex="2" 
                fontWeight="semibold"
                fontSize={["28px","48px"]}
                color="light.500"
                ml={["0px","140"]}
                mb={["0px","60px"]}
            >
                {continent.name}</Text>
            </Box>
        
            <Flex
                as="section"
                px={["16px","140px"]}
                my="20"
                flexDir={["column", "row"]}
            >
                <Box
                    w={["100%","50%"]}
                >
                    <Text
                        fontSize={["14px","20px"]}
                        textAlign="justify"
                    >{continent.description}</Text>
                </Box>
            
                <Box
                    w={["100%","50%"]}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Flex
                        w="100%"
                        justify="space-evenly"
                        mt={["16px", "0px"]}
                    >
                        <Box
                            display="flex"
                            flexDir="column"
                            textAlign="center"
                        >
                            <Text as="h1" fontSize={["24px","48px"]} fontWeight="semibold" color="highlight"  >{continent.countrysNumber}</Text>
                            <Text as="h3" fontWeight="semibold" color="dark.600" >países</Text>
                        </Box>

                        <Box
                            display="flex"
                            flexDir="column"
                            textAlign="center"
                        >
                            <Text as="h1" fontSize={["24px","48px"]} fontWeight="semibold" color="highlight" >{continent.languagesNumber}</Text>
                            <Text as="h3" fontWeight="semibold" color="dark.600" >línguas</Text>
                        </Box>

                        <Box
                            display="flex"
                            flexDir="column"
                            textAlign="center"
                        >
                            <Text as="h1" fontSize={["24px","48px"]} fontWeight="semibold" color="highlight" >{continent.topCitiesNumber}</Text>
                            <Text
                              as="h3"
                              fontWeight="semibold"
                              color="dark.600"
                              >
                                cidades+100
                                <Tooltip label="Essas cidades estão entre as 100 cidades mais visitadas do mundo !" textAlign="center" fontSize="small">
                                    <span>
                                        <Icon as={ImInfo} ml="2" mb="1" />
                                    </span>
                                </Tooltip>
                            </Text>
                        </Box>
                    </Flex>
                </Box>
            </Flex>
        
            <Box
                as="section"
                px={["16px","140px"]}
            >
                <Text
                    as="h1"
                    color="dark.600"
                    fontSize={["24px","36px"]}
                    fontWeight="medium"
                    mb="40px"
                >
                    Cidades +100
                </Text>

                <Grid
                    w="100%"
                    templateColumns={["1fr","repeat(auto-fill, 240px)"]}
                    gridAutoFlow="dense"
                    gap={6}
                    mb="20px"
                >
                
                    {
                        continent.topCities.map(city => {
                            return (
                                <Box
                                    w={["100%","240px"]}
                                    h="280px"
                                    bg="white"
                                    borderRadius="5px"
                                    boxShadow="base"
                                    key={city.cityName}
                                >  
                                    <Img
                                        w="100%"
                                        h="175px"
                                        borderTopLeftRadius="5px"
                                        borderTopRightRadius="5px"
                                        src={city.cityPhoto}

                                    />
                                    <Flex
                                        alignItems="center"
                                        justifyContent={["space-between","space-around"]}
                                        h="105px"
                                        px="15px"
                                    >
                                        <Box>
                                            <Text as="h1" fontSize="20px" fontWeight="semibold" mb="12px" color="dark.600">{city.cityName}</Text>
                                            <Text as="span" fontSize="16px" color="dark.300">{city.cityCountry}</Text>
                                        </Box>
                                        <Box
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <Img
                                                w="30px"
                                                h="30px"
                                                borderRadius="50%"
                                                src={city.countryFlag}
                                            />
                                        </Box>
                                    </Flex>
                                </Box>
                            )
                        })
                    }

                </Grid>
            </Box>
        </>
    )
} 

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: "blocking",
      };
}

export const getStaticProps: GetStaticProps = async ({
    params,
  }) => {
    const { slug } = params;

    const { data } = await api.get(`continents?name=${slug}`);

    const continentData = data[0];

    const continentDataFormated = {
        name:  continentData.name,
        description: continentData.description,
        banner: continentData.banner,
        countrysNumber: continentData.countrys,
        languagesNumber: continentData.languages,
        topCitiesNumber: continentData.plusCities.length,
        topCities: continentData.plusCities.map(city => {
            return {
                cityName: city.city,
                cityCountry: city.country,
                cityPhoto: city.photoURL,
                countryFlag: city.countryFlagURL,
            }
        })
    }

    return {
        props: {
            continent: continentDataFormated
        },
        revalidate: 1   // 24h
    }
  }