import { Box, Flex, Text, Image, HStack, VStack, Input, Button, IconButton, DrawerBody, Drawer, DrawerOverlay, DrawerCloseButton, DrawerContent, DrawerHeader } from '@chakra-ui/react'
import React from 'react'
import { FcBusinessman } from "react-icons/fc"
import {AiOutlineShoppingCart} from "react-icons/ai"
import {GiHamburgerMenu} from "react-icons/gi"
import {GrSearch} from "react-icons/gr"
import "./Navbar.css"
import { useNavigate } from 'react-router-dom';
import Menu1 from './Menu'
import logo from "../../assets/logo.png"
const isAuth = true;

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <Box className="nav-container">
      <Flex
        display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
        fontSize={{ base: "12px", md: "14px", lg: "16px" }}
        justifyContent={{ base: "start", sm: "start", lg: "end" }}
        gap={4}
      >
        <p>WELCOME GUEST</p>
        <p>DOWNLOAD APP</p>
        <p>CONTACT US</p>
        <Text
          cursor={"poiter"}
          onClick={() => {
            if (!isAuth) {
              navigate("/login");
            } else {
              navigate("/profile");
            }
          }}
        >
          {isAuth ? "Hi,  Gangaram" : "LOGIN"}
        </Text>
        <p
          onClick={() => {
            if (isAuth) {
              navigate("/profile");
            }
          }}
        >
          {isAuth ? <FcBusinessman size={"20px"} /> : "LOGIN WITH FACEBOOK"}
        </p>
      </Flex>
      <Box className="hl"></Box>

      <Flex padding={2} alignItems={"center"} gap={2} justify={"space-between"}>
        <Box>
          <Image
            w={{ base: "60px", sm: "100px", md: "120px", lg: "150px" }}
            style={{ cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
            src={logo}
            alt="stylux"
          />
        </Box>
        <HStack
          display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
          w={"55%"}
          gap={2}
        >
          <VStack position={"relative"} w={"100%"}>
            <Input
              isInvalid
              errorBorderColor="orange.400"
              focusBorderColor="black"
              // onKeyDown={handleKeyDown}
              placeholder="search for FRESH FASHION!"
              // value={search}
              // onChange={(e) => {
              //   setSearch(e.target.value);
              //   setDisplay(true)
              // }}
            />

            <Flex
              overflowY={"scroll"}
              direction={"column"}
              justifyContent={"center"}
              bg={"white"}
              zIndex={500}
              // display={display ? "block" : "none"}
              display={"block"}
              position={"absolute"}
              top={10}
              w={"100%"}
              borderRadius={8}
              maxH={500}
            >
              {/* {searchData?.map((el) => (
                <SearchItem key={el._id} setDisplay={setDisplay} {...el} />
              ))} */}
            </Flex>
          </VStack>
          <Button
            // onClick={() => {
            //   setDisplay(false)
            //   navigate(`/search?q=${search}`);
            // }}
            background={"orange.400"}
            color="white"
          >
            Search
          </Button>
        </HStack>

        <Flex
          display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
          alignItems={"center"}
          gap={4}
        >
          <Image
            src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677477714/samples/styluxe/own-yepme-store-btn_g29q2g.png"
            alt=""
          />
          <Box fontWeight={"bold"}>
            <Text
              cursor={"pointer"}
              onClick={() => {
                if (isAuth) {
                  navigate("/cart");
                }
              }}
            >
              {/* Cart({count}) */}
              Cart
            </Text>

            <p>Loyalty Points</p>
          </Box>
        </Flex>
        <HStack display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}>
          <Button
            _hover={{ bg: "transparent" }}
            _active={{ bg:"transparent"}}
            bg="transparent"
            leftIcon={<AiOutlineShoppingCart />}
            onClick={() => {
              if (isAuth) {
                navigate("/cart");
              }
            }}
          >
            {/* {count} */}
            0
          </Button>
          <Text
            fontSize={isAuth ? "8px" : "16px"}
            cursor={"pointer"}
            onClick={() => {
              if (!isAuth) {
                navigate("/login");
              } else {
                navigate("/profile");
              }
            }}
          >
            {isAuth ? "Hi, Gangaram" : "LOGIN"}
          </Text>{" "}
          {isAuth && (
            <FcBusinessman
              onClick={() => {
                navigate("/profile");
              }}
              size={"20px"}
            />
          )}
          <>
            <Button
              _hover={{ bg:"transparent"}}
              _active={{ bg:"transparent"}}
              bg="transparent"
              // ref={btnRef}
              textAlign={"center"}
              rightIcon={<GiHamburgerMenu />}
              // onClick={onOpen}
            >
              Menu
            </Button>

            <Drawer
              // isOpen={isOpen}
              // placement="right"
              // onClose={onClose}
              // finalFocusRef={btnRef}
            >
              <DrawerOverlay />
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Menu</DrawerHeader>
                <VStack padding={"0px 24px"} alignItems={"start"}>
                  <p>WELCOME GUEST</p>
                  <p>DOWNLOAD APP</p>
                  <p>CONTACT US</p>
                  <Text
                    cursor={"pointer"}
                    onClick={() => {
                      if (!isAuth) {
                        navigate("/login");
                        // onClose();
                      } else {
                        sessionStorage.removeItem("token");
                        sessionStorage.removeItem("isAuth");
                        sessionStorage.removeItem("name");
                        sessionStorage.removeItem("email");
                        // dispatch({ type: LOGOUT });
                        // onClose();
                      }
                    }}
                  >
                    {isAuth ? "LOGOUT" : "LOGIN"}
                  </Text>

                  <Box fontWeight={"bold"}>
                    <Button
                      m={0}
                      p={0}
                      _hover={{ bg:"transparent"}}
                      _active={{ bg:"transparent"}}
                      bg="transparent"
                      leftIcon={<AiOutlineShoppingCart />}
                      onClick={() => {
                        if (isAuth) {
                          navigate("/cart");
                        }
                      }}
                    >
                      {/* Cart({count}) */}
                      Cart
                    </Button>

                    {/* <p>Loyalty Points</p> */}
                  </Box>
                </VStack>

                <DrawerBody></DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        </HStack>
      </Flex>
      <HStack
        w={"95%"}
        display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}
        margin={"auto"}
        mb={2}
        gap={2}
      >
        <VStack position={"relative"} w={""}>
          <Input
            isInvalid
            errorBorderColor="orange.400"
            focusBorderColor="black"
            // onKeyDown={handleKeyDown}
            placeholder="search for FRESH FASHION!"
            // value={search}
            // onChange={(e) => {
            //   setSearch(e.target.value);
            //   setDisplay(true)
            // }}
          />

          <Flex
            overflowY={"scroll"}
            direction={"column"}
            justifyContent={"center"}
            bg={"white"}
            // display={display ? "block" : "none"}
            position={"absolute"}
            zIndex={500}
            top={10}
            w={""}
            borderRadius={8}
            maxH={500}
          >
            {/* {searchData?.map((el) => (
              <SearchItem key={el._id} setDisplay={setDisplay} {...el} />
            ))} */}
          </Flex>
        </VStack>
        <IconButton
          onClick={() => {
            // setDisplay(false)
            // navigate(`/search?q=${search}`);
          }}
          background={"orange.400"}
          icon={<GrSearch />}
          color="white"
        ></IconButton>
      </HStack>

      <Box className="black-nav">
        <Menu1
          gen="MEN"
          types="Mens Wear"
          op1="Shirt"
          op2="Party Wear"
          link1="/products?category=shirt"
          link2="/products?category=party-wear"
        />
        <Menu1
          gen="WOMEN"
          types="Womens Wear"
          op1="Tops"
          op2="Party-Wear Kurtis"
          link1="/products?category=top"
          link2="/products?category=Kurtis"
        />
      </Box>
    </Box>
  )
}

export default Navbar