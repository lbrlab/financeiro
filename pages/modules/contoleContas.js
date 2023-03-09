
import React,{useRef, useEffect, useState} from "react";
import { Grid, h } from "gridjs";
import { Text, Space,Notification } from "@mantine/core";
import CardContas from "../components/cardcontas";
import Mymodal2 from "../components/mymodal2";




export default function ControleContas(){

    const [opened, setOpened] = useState(false)

    return(

        <>

        <Text size={'xl'} weight={500} mb={50}>Contas</Text>
        <CardContas setOpened = {setOpened}></CardContas>
        <Mymodal2 opened={opened} setOpened={setOpened}></Mymodal2>
        </>
    )


}

