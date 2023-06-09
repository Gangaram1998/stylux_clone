import {
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { CONTAINER } from "../../../constants/constants.js";
import {
  AUTO,
  BLACK,
  BLANCHEDALMOND,
  BLUEVIOLET,
  CENTER,
  FILL_25PARENT,
  FILL_75PARENT,
  FILL_90PARENT,
  FILL_PARENT,
  FIXED,
  GREEN,
  LARGE,
  MAGENTA,
  MAROON,
  MEDIUM,
  NONE,
  ORANGE,
  PINK,
  PURPLE,
  RIGHT,
  STICKY,
  WHITE,
} from "../../../constants/typography";
import { CardAvatar } from "../Avatar";
import "../../pages/style.css";
export default function MobileSideNav({ setTab, tab, name, role, onClose }) {
  const bg = ORANGE;

  return (
    <VStack
      borderTopRightRadius={20}
      padding={"8px 0px"}
      h={"100vh"}
      className="sidebar"
      w={{ base: FILL_PARENT, sm: FILL_PARENT, md: FILL_PARENT, lg: FILL_25PARENT }}
    >
      <Flex
        justifyContent={"end"}
        maxH={150}
        padding={2}
        border={"1px solid orange"}
        borderRadius={6}
        alignItems={CENTER}
        w={FILL_90PARENT}
      >
        <VStack>
          <Heading fontSize={MEDIUM} color={ORANGE}>
            {name}
          </Heading>
          <Badge colorScheme={GREEN}>{role}</Badge>
        </VStack>
        <CardAvatar name={name} role={role}></CardAvatar>
      </Flex>

      <VStack gap={4} w={FILL_PARENT}>
        <Button
          variant={"outline"}
          borderColor={bg}
          bg={tab == 1 && bg}
          color={tab == 1 ? WHITE : ORANGE}
          w={FILL_90PARENT}
          onClick={() => {
            setTab(1);
            onClose()
          }}
        >
          Dashboard
        </Button>
        <Button
          variant={"outline"}
          borderColor={bg}
          bg={tab == 2 && bg}
          color={tab == 2 ? WHITE : ORANGE}
          w={FILL_90PARENT}
          onClick={() => {
            setTab(2);
            onClose()
          }}
        >
          Add Products
        </Button>
        <Button
          variant={"outline"}
          borderColor={bg}
          bg={tab == 3 && bg}
          color={tab == 3 ? WHITE : ORANGE}
          w={FILL_90PARENT}
          onClick={() => {
            setTab(3);
            onClose()
          }}
        >
          Edit Products
        </Button>
        <Button
          variant={"outline"}
          borderColor={bg}
          bg={tab == 4 && bg}
          color={tab == 4 ? WHITE : ORANGE}
          w={FILL_90PARENT}
          onClick={() => {
            setTab(4);
            onClose()
          }}
        >
          Manage Orders
        </Button>
        <Button
          variant={"outline"}
          borderColor={bg}
          bg={tab == 5 && bg}
          color={tab == 5 ? WHITE : ORANGE}
          w={FILL_90PARENT}
          onClick={() => {
            setTab(5);
            onClose()
          }}
        >
          Manage Admins
        </Button>
      </VStack>
    </VStack>
  );
}