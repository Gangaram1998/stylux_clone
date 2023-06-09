import { Badge, Box, Grid, Heading } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../../constants/config";
import qs from "qs"
import {
  BLACK,
  CYAN,
  FILL_PARENT,
  GREEN,
  LARGE,
  LEFT,
  ORCHID,
  R1,
  R2,
  R3,
  R4,
  TOP,
  WHITE,
  X2LARGE,
  YELLOW,
  YELLOWGREEN,
} from "../../constants/typography";
import { StatsBox } from "../components/StatsBox.jsx";
import "./style.css";
import { KURTIS, PARTY_WEAR, SHIRT } from "../../constants/constants";

async function getData(query,endpoint,token){

  let res = await axios({
    url:BASE_URL+`/stat/${endpoint}?${qs.stringify(query)}`,
    method:"get",
    headers:{
      Authorization:token
    }
  })
  return res.data


}



export default function Dashboard({user}) {

  let {token} = useSelector((state)=>state.authReducer)
  const [totalOrder,setTotalOrder] = useState(0)
  const [pendingOrders,setPendingOrders] = useState(0)
  const [totalEarning,seTotalEarnings] = useState(0)
  const [totalProduct,setTotalProduct] = useState(0)
  const [outofstcok,setOutOfStock] = useState(0)
  const [top,setTop] = useState(0)
  const [shirt,setShrit] = useState(0)
  const [kurtis,setKurtis] = useState(0)
  const [pw,setPw] = useState(0)

  
  useEffect
  (() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"totalorder"},"order",token)
      
      if(data.status==1){

        setTotalOrder(data.count)

      }else{
        return
      }


    }

    myData()

  },[])

  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,status1:"ordered",status2:"dispatched",request:"pendingorder"},"order",token)
      
      if(data.status==1){

        setPendingOrders(data.count)

      }else{
        return
      }


    }

    myData()

  },[])

  
  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"totalearning"},"order",token)
      
      if(data.status==1){

        seTotalEarnings(data.count)

      }else{
        return
      }


    }

    myData()

  },[])
  

  
  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"totalproduct"},"product",token)
      
      if(data.status==1){

        setTotalProduct(data.count)

      }else{
        return
      }


    }

    myData()

  },[])

  
  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"outofstock"},"product",token)
      
      if(data.status==1){

        setOutOfStock(data.count)

      }else{
        return
      }


    }

    myData()

  },[])

  
  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"categorycount",category:SHIRT},"product",token)
      
      if(data.status==1){

        setShrit(data.count)

      }else{
        return
      }


    }

    myData()

  },[])

  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"categorycount",category:TOP},"product",token)
      
      if(data.status==1){

        setTop(data.count)

      }else{
        return
      }


    }

    myData()

  },[])
  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"categorycount",category:KURTIS},"product",token)
      
      if(data.status==1){

        setKurtis(data.count)

      }else{
        return
      }


    }

    myData()

  },[])
  useEffect(()=>{

    let myData = async()=>{

      let data = await getData({adminId:user.admin,request:"categorycount",category:PARTY_WEAR},"product",token)
      
      if(data.status==1){

        setPw(data.count)

      }else{
        return
      }


    }

    myData()

  },[])
  
  


  return (
    <Box w={FILL_PARENT}>
      <Badge colorScheme={YELLOW} fontSize={X2LARGE} m={8}>
        DASHBOARD
      </Badge>

      <Heading textAlign={LEFT} color={BLACK} m={8}>
        ORDERS
      </Heading>
      <Grid gap={6} gridTemplateColumns={{ base: R1, sm: R2, lg: R3 }}>
        <StatsBox
          name={"Total orders"}
          br={6}
          size={300}
          color={WHITE}
          image={"https://www.svgrepo.com/show/374750/orders.svg"}
          classname={YELLOW}
          bcolor={YELLOW}
          count={totalOrder}
        />

        <StatsBox
          name={"Pending orders"}
          br={6}
          size={300}
          color={BLACK}
          image={"https://www.svgrepo.com/show/374750/orders.svg"}
          classname={CYAN}
          bcolor={CYAN}
          count={pendingOrders}
        />

        <StatsBox
          name={"Total Earnings $"}
          br={6}
          size={300}
          color={BLACK}
          image={"https://www.svgrepo.com/show/500409/money.svg"}
          classname={"lush"}
          bcolor={GREEN}
          count={totalEarning}
        />
      </Grid>

      <Heading textAlign={LEFT} color={BLACK} m={8}>
        PRODUCTS
      </Heading>
      <Grid gap={6} gridTemplateColumns={{ base: R1, sm: R2, lg: R2 }}>
        <StatsBox
          name={"Total products"}
          br={6}
          size={300}
          color={WHITE}
          image={"https://www.svgrepo.com/show/498969/menu2.svg"}
          classname={YELLOW}
          bcolor={YELLOW}
          count={totalProduct}
        />

        <StatsBox
          name={"Out of stock"}
          br={6}
          size={300}
          color={BLACK}
          image={"https://www.svgrepo.com/show/489639/unavailable.svg"}
          classname={CYAN}
          bcolor={CYAN}
          count={outofstcok}
        />
      </Grid>
      <Heading textAlign={LEFT} color={BLACK} m={8}>
        CATEGORIES
      </Heading>
      <Grid gap={6} gridTemplateColumns={{ base: R1, sm: R2, lg: R4 }}>
        <StatsBox
          name={"Shirt"}
          br={6}
          size={300}
          color={WHITE}
          image={"https://www.svgrepo.com/show/506321/shirt.svg"}
          classname={YELLOW}
          bcolor={YELLOW}
          count={shirt}
        />

        <StatsBox
          name={"Top"}
          br={6}
          size={300}
          color={BLACK}
          image={"https://www.svgrepo.com/show/395689/women-shirt-clothes-clothing-fashion-apparel.svg"}
          classname={CYAN}
          bcolor={CYAN}
          count={top}
        />

        <StatsBox
          name={"Kurtis"}
          br={6}
          size={300}
          color={BLACK}
          image={"https://www.svgrepo.com/show/108239/women-dress.svg"}
          classname={"lush"}
          bcolor={GREEN}
          count={kurtis}
        />

        <StatsBox
          name={"Partywear"}
          br={6}
          size={300}
          color={BLACK}
          image={"https://www.svgrepo.com/show/491057/party.svg"}
          classname={CYAN}
          bcolor={CYAN}
          count={pw}
        />
      </Grid>
    </Box>
  );
}