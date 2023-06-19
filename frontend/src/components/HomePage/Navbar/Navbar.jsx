import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Image,
    Input,
    Text,
    useDisclosure,
    VStack,
  } from "@chakra-ui/react";
  import React, { useEffect, useRef, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { useNavigate } from "react-router-dom";
  import logo from "../../../assets/logo.png";
  import {
    ABSOLUTE,
    AUTO,
    CENTER,
    COLUMN,
    FILL_55PARENT,
    FILL_PARENT,
    POINTER,
    RELATIVE,
    SB,
    START,
    TRANSPARENT,
    WHITE,
  } from "../../../constants/typography";
  import { LOGOUT } from "../../../redux/auth/auth.type";
  import Menu1 from "./Menu";
  import { FcBusinessman } from "react-icons/fc";
  import { GrSearch } from "react-icons/gr";
  import { GiHamburgerMenu } from "react-icons/gi";
  import { AiOutlineShoppingCart } from "react-icons/ai";
  import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from "@chakra-ui/react";
  import "./Navbar.css";
  import axios from "axios";
  import { BASE_URL } from "../../../constants/config";
  import { SearchItem } from "../../SearchItem";
  const Navbar = () => {
    const nav = useNavigate();
    const { isAuth, token, name } = useSelector((state) => state.authReducer);
    const { cartStatus } = useSelector((state) => state.cartReducer);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [display,setDisplay] = useState(false)
    
  
    useEffect(() => {
      let getCount = async () => {
        let res = await axios({
          method: "get",
          url: BASE_URL + "/cart",
          headers: {
            Authorization: token,
          },
        });
        if (res.data.status == 1) {
          setCount(res.data.count);
        }
      };
  
      if (isAuth) {
        getCount();
      } else {
        setCount(0);
      }
    }, [cartStatus, isAuth]);
  
    const handleKeyDown = (event) => {
      if (event.keyCode === 13) {
        setDisplay(false)
        setSearchData([])
        nav(`/search?q=${search}`);
      }
    };
  
    useEffect(() => {
      if(search==""){
        setDisplay(false)
        setSearchData([])
      }
      let getRecomandation = async () => {
        let res = await axios({
          method: "get",
          url: BASE_URL + `/search?q=${search}&page=${0}`,
        });
  
        if (res.data.status == 1) {
          setSearchData(res.data.data);
        } else {
        }
      };
      const timeoutId = setTimeout(() => {
        if(search!=""){
          getRecomandation();
        }
      }, 200);
  
      return () => {
        
        clearTimeout(timeoutId);
      };
    }, [search]);
  
    return (
      <Box className="nav-container">
        <Flex
          display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
          fontSize={{ base: "12px", md: "14px", lg: "16px" }}
          justifyContent={{ base: START, sm: START, lg: "end" }}
          gap={4}
        >
          <p>WELCOME GUEST</p>
          <p>DOWNLOAD APP</p>
          <p>CONTACT US</p>
          <Text
            cursor={POINTER}
            onClick={() => {
              if (!isAuth) {
                nav("/login");
              } else {
                nav("/profile");
              }
            }}
          >
            {isAuth ? "Hi, " + name.split(" ")[0] : "LOGIN"}
          </Text>
          <p
            onClick={() => {
              if (isAuth) {
                nav("/profile");
              }
            }}
          >
            {isAuth ? <FcBusinessman size={"20px"} /> : "LOGIN WITH FACEBOOK"}
          </p>
        </Flex>
        <Box className="hl"></Box>
  
        <Flex padding={2} alignItems={CENTER} gap={2} justify={SB}>
          <Box>
            <Image
              w={{ base: "60px", sm: "100px", md: "120px", lg: "150px" }}
              style={{ cursor: POINTER }}
              onClick={() => {
                nav("/");
              }}
              src={logo}
              alt="styluxe"
            />
          </Box>
          <HStack
            display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
            w={FILL_55PARENT}
            gap={2}
          >
            <VStack position={RELATIVE} w={FILL_PARENT}>
              <Input
                isInvalid
                errorBorderColor="orange.400"
                focusBorderColor="black"
                onKeyDown={handleKeyDown}
                placeholder="search for FRESH FASHION!"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setDisplay(true)
                }}
              />
  
              <Flex
              overflowY={"scroll"}
                direction={COLUMN}
                justifyContent={CENTER}
                bg={WHITE}
                zIndex={500}
                display={display? "block" : "none"}
                position={ABSOLUTE}
                top={10}
                w={FILL_PARENT}
                borderRadius={8}
                maxH={500}
              >
                {searchData?.map((el) => (
                  <SearchItem  key={el._id}  setDisplay={setDisplay} {...el} />
                ))}
              </Flex>
            </VStack>
            <Button
              onClick={() => {
                setDisplay(false)
                nav(`/search?q=${search}`);
              }}
              background={"orange.400"}
              color="white"
            >
              Search
            </Button>
          </HStack>
  
          <Flex
            display={{ base: "none", sm: "none", md: "flex", lg: "flex" }}
            alignItems={CENTER}
            gap={4}
          >
            <Image
              src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677477714/samples/styluxe/own-yepme-store-btn_g29q2g.png"
              alt=""
            />
            <Box fontWeight={"bold"}>
              <Text
                cursor={POINTER}
                onClick={() => {
                  if (isAuth) {
                    nav("/cart");
                  }
                }}
              >
                Cart
              </Text>
  
              <p>Loyalty Points</p>
            </Box>
          </Flex>
          <HStack display={{ base: "flex", sm: "flex", md: "none", lg: "none" }}>
            <Button
              _hover={{ bg: TRANSPARENT }}
              _active={{ bg: TRANSPARENT }}
              bg={TRANSPARENT}
              leftIcon={<AiOutlineShoppingCart />}
              onClick={() => {
                if (isAuth) {
                  nav("/cart");
                }
              }}
            >
              {count}
            </Button>
            <Text
              fontSize={isAuth ? "8px" : "16px"}
              cursor={POINTER}
              onClick={() => {
                if (!isAuth) {
                  nav("/login");
                } else {
                  nav("/profile");
                }
              }}
            >
              {isAuth ? "Hi, " + name.split(" ")[0] : "LOGIN"}
            </Text>{" "}
            {isAuth && (
              <FcBusinessman
                onClick={() => {
                  nav("/profile");
                }}
                size={"20px"}
              />
            )}
            <>
              <Button
                _hover={{ bg: TRANSPARENT }}
                _active={{ bg: TRANSPARENT }}
                bg={TRANSPARENT}
                ref={btnRef}
                textAlign={CENTER}
                rightIcon={<GiHamburgerMenu />}
                onClick={onOpen}
              >
                Menu
              </Button>
  
              <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
              >
                <DrawerOverlay />
                <DrawerContent>
                  <DrawerCloseButton />
                  <DrawerHeader>Menu</DrawerHeader>
                  <VStack padding={"0px 24px"} alignItems={START}>
                    <p>WELCOME GUEST</p>
                    <p>DOWNLOAD APP</p>
                    <p>CONTACT US</p>
                    <Text
                      cursor={POINTER}
                      onClick={() => {
                        if (!isAuth) {
                          nav("/login");
                          onClose();
                        } else {
                          sessionStorage.removeItem("token");
                          sessionStorage.removeItem("isAuth");
                          sessionStorage.removeItem("name");
                          sessionStorage.removeItem("email");
                          dispatch({ type: LOGOUT });
                          onClose();
                        }
                      }}
                    >
                      {isAuth ? "LOGOUT" : "LOGIN"}
                    </Text>
                    {/* <p
                      onClick={() => {
                        if (isAuth) {
                          nav("/profile");
                          onClose();
                        }
                      }}
                    >
                      {isAuth ? (
                        <FcBusinessman size={"20px"} />
                      ) : (
                        "LOGIN WITH FACEBOOK"
                      )}
                    </p> */}
                    {/* <Image
                      src="https://res.cloudinary.com/ducgyycpy/image/upload/v1677477714/samples/styluxe/own-yepme-store-btn_g29q2g.png"
                      alt=""
                    /> */}
                    <Box fontWeight={"bold"}>
                      <Button
                        m={0}
                        p={0}
                        _hover={{ bg: TRANSPARENT }}
                        _active={{ bg: TRANSPARENT }}
                        bg={TRANSPARENT}
                        leftIcon={<AiOutlineShoppingCart />}
                        onClick={() => {
                          if (isAuth) {
                            nav("/cart");
                          }
                        }}
                      >
                        Cart({count})
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
          margin={AUTO}
          mb={2}
          gap={2}
        >
           <VStack position={RELATIVE} w={FILL_PARENT}>
              <Input
                isInvalid
                errorBorderColor="orange.400"
                focusBorderColor="black"
                onKeyDown={handleKeyDown}
                placeholder="search for FRESH FASHION!"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setDisplay(true)
                }}
              />
  
              <Flex
              overflowY={"scroll"}
                direction={COLUMN}
                justifyContent={CENTER}
                bg={WHITE}
                display={display? "block" : "none"}
                position={ABSOLUTE}
                zIndex={500}
                top={10}
                w={FILL_PARENT}
                borderRadius={8}
                maxH={500}
              >
                {searchData?.map((el) => (
                  <SearchItem key={el._id}  setDisplay={setDisplay} {...el} />
                ))}
              </Flex>
            </VStack>
          <IconButton
            onClick={() => {
              setDisplay(false)
              nav(`/search?q=${search}`);
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
    );
  };
  
  export default Navbar;