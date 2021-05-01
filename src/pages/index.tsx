import Head from 'next/head';
import Link from  'next/link';
import { Box, Flex, Img, Text, Divider, useBreakpointValue } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import api from '../services/api';

import { Header } from "../components/Header";

import { theme } from '../styles/theme';
import '../styles/theme';
import { GetStaticProps } from 'next';

SwiperCore.use([Navigation, Pagination]);

type ContinentProps = {
  name: string,
  description: string,
  banner: string
}

interface HomeProps {
  continents: ContinentProps[],
}

export default function Home( { continents }: HomeProps) {

  const isWideVersion = useBreakpointValue({
    base: false, 
    lg: true,
})

  return (
    <>
    <Head>
      <title>WorldTrip | Home</title>
    </Head>
      <Header />
      <Box
        as="section"
        backgroundImage="url('/bg.svg')"
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        w="100%"
        h={["165","330"]}
        px={["16px","140"]}
        mb="30"
      >
        <Flex
          w="100%"
          h="100%"
          justify="space-between"
        >
          <Box
            w={["100%","40%"]}
            h="100%"
            display="flex"
            flexDir="column"
            justifyContent="center"
            alignItems="center"
          >
            <Text
              as="h1"
              fontSize={["20px","36"]}
              color="light.500"
            >
              5 Continentes, infinitas possibilidades.
            </Text>
            <Text
              as="p"
              fontSize={["14px","20"]}
              color="light.500"
            >
              Chegou a hora de tirar do papel a viagem que você sempre sonhou. 
            </Text>
          </Box>

          { isWideVersion && (
            <Box
              w="50%"
              h="100%"
              display="flex"
              flexDir="column"
              justifyContent="center"
              alignItems="center"
            >
              <Img
                src="/airplane.svg"
                alt="airplane"
                transform="translateY(65px)"
              />
            </Box>
          )}

        </Flex>
      </Box>
      
      <Flex
        as="section"
        w="100%"
        h="145"
        px={["50","140"]}
        my={["36px","80px"]}
        mt={["36px","110px"]}
        justify={["space-around","space-between"]}
        alignItems="center"
        flexWrap="wrap"
      >
        <Box
          display="flex"
          flexDir={["row","column"]}
          justifyContent="center"
          alignItems="center"
        >
          { !isWideVersion ? <Box w="10px" h="10px" borderRadius="50%" bg="highlight" /> : <Img src="/cocktail.svg" alt="cocktail" />}
          <Text as="p" fontSize="md" ml={["8px","0px"]} mt={["0","6"]} fontWeight="semibold" textAlign="center" >
            Vida noturna
          </Text>
        </Box>

        <Box
          display="flex"
          flexDir={["row","column"]}
          justifyContent="center"
          alignItems="center"
        >
          { !isWideVersion ? <Box w="10px" h="10px" borderRadius="50%" bg="highlight" /> : <Img src="/surf.svg" alt="surf board" />}
          <Text as="p" fontSize="md" ml={["8px","0px"]} mt={["0","6"]} fontWeight="semibold" textAlign="center" >
            Praia
          </Text>
        </Box>

        <Box
          display="flex"
          flexDir={["row","column"]}
          justifyContent="center"
          alignItems="center"
        >
          { !isWideVersion ? <Box w="10px" h="10px" borderRadius="50%" bg="highlight" /> : <Img src="/building.svg" alt="building" />}
          <Text as="p" fontSize="md" ml={["8px","0px"]} mt={["0","6"]} fontWeight="semibold" textAlign="center" >
            Moderno
          </Text>
        </Box>

        <Box
          display="flex"
          flexDir={["row","column"]}
          justifyContent="center"
          alignItems="center"
        >
          { !isWideVersion ? <Box w="10px" h="10px" borderRadius="50%" bg="highlight" /> : <Img src="/museum.svg" alt="museum" />}
          <Text as="p" fontSize="md" ml={["8px","0px"]} mt={["0","6"]} fontWeight="semibold" textAlign="center" >
            Clássico
          </Text>
        </Box>

        <Box
          display="flex"
          flexDir={["row","column"]}
          justifyContent="center"
          alignItems="center"
        >
          { !isWideVersion ? <Box w="10px" h="10px" borderRadius="50%" bg="highlight" /> : <Img src="/planet.svg" alt="planet" />}
          <Text as="p" fontSize="md" ml={["8px","0px"]} mt={["0","6"]} fontWeight="semibold" textAlign="center" >
            e mais...
          </Text>
        </Box>

      </Flex>
    
      <Divider w="90px" orientation="horizontal" mx="auto" borderColor="dark.600" />

      <Box>
        <Flex
          flexDir="column"
          my={["25px","52px"]}
          textAlign="center"
          fontSize={["20px","36px"]}
        >
          <Text as="h1" >Vamos nessa?</Text>
          <Text as="h1" >Então escolha seu continente</Text>
        </Flex>

        <Box
          maxW="1240px"
          mx="auto"
          mb="10"
        >
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          autoplay
          pagination = {{
            clickable: true,
            renderBullet: function() {
              return `<span class=" swiper-pagination-bullet"
                            style="background-color: ${theme.colors.highlight}"
                      ></span>`;
            }
          }}

          navigation = {{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          
          }}
        >
          <Box className="swiper-button-next" color={theme.colors.highlight}></Box>
          <Box className="swiper-button-prev" color={theme.colors.highlight}></Box>
          {
            continents.map(continent => {
              return (
                  <SwiperSlide 
                    key={continent.name}
                  >
                    <Link
                      href={`/continents/${continent.name}`}
                    >
                      <Box
                        as="div"
                        w="100%"
                        h={["250","450"]}
                        cursor="pointer"
                        display="flex"
                        flexDir="column"
                        justifyContent="center"
                        alignItems="center"
                        position="relative"
                      >
                        <Img 
                          src={continent.banner}
                          w="100%"
                          h="100%"
                          position="absolute"
                        />
                        <Box 
                          w="100%"
                          h="100%"
                          position="absolute"
                          bg="black"
                          opacity=".5"
                        />
                        <Text as="h1" zIndex="2" fontSize={["24","42"]} fontWeight="bold" color="light.500" >{continent.name}</Text>
                        <Text as="p" zIndex="2" color="light.500" fontSize={["14px","16px"]} >{continent.description}</Text>
                      </Box>
                    </Link>
                  </SwiperSlide>
                  
              )
            })
          }

          
        </Swiper>
        </Box>
      </Box>
    </>
  )
}


export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get(`continents`);
  

  const continents: ContinentProps = data.map(continent => {
    return {
      name: continent.name,
      description: continent.subtitle,
      banner: continent.banner,
    }
  });

  return {
      props: {
        continents
      },
      revalidate: 60 * 60 * 24   // 24h
  }
}