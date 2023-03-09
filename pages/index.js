import { useState } from 'react';
import {
  AppShell,
  Navbar,
  Header,
  Text,
  MediaQuery,
  Burger,
  useMantineTheme,
} from '@mantine/core';

import MenuItens from './components/menubar'
import  LinkBarTop  from './components/linkBar';

import ControleRecebiveis from './modules/controleRecebiveis';
import  ControleContas  from './modules/contoleContas';

export default function AppShellDemo() {

  const Itens = [{label:"Financeiro",parent:true,links:[{label:"Recebiveis", item:<ControleRecebiveis/>}, {label:"Contas", item:<ControleContas/>}]}]

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  const [page, setPage] = useState(<ControleRecebiveis/>)

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[0] : "#1a73e866",
        },
      }}
     
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }} style={{boxShadow: "2px 2px 4px grey"}}>
          <Text weight={"bolder"}>Módulos</Text>
        <MenuItens Itens={Itens} setPage = {setPage}></MenuItens>

        </Navbar>
      }


      header={
        <Header height={{ base: 50, md: 70 }} p="md" style={{backgroundColor : "#00C9A7"}}>

        
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>

            <Text size={"lg"} weight={"bolder"} color={"aliceblue"} mr={'20%'}>LBR Telecom</Text>

<LinkBarTop configuration={[{label:"Prefeitura", link:"https://voltaredonda.simplissweb.com.br/contrib/Account/Login", bgurl:"./download.png"},
{label:"Nibo(Contabilidade)", link:"https://empresa.nibo.com.br/", bgurl:"https://empresa.nibo.com.br/img/favicon.png"},
{label:"Nimbi(AMBEV)", link:"https://tn004.nimbi.com.br/RedeNimbiTodos/Orders.aspx", bgurl:"http://d1en7e1cv2psfy.cloudfront.net/cloudfront/theme/img/favicon180x180.png?8891"},
{label:"Subir notas AMBEV", link:"https://sso.ontimeambev.com.br/Home/Index/fae4cacc-3992-480e-adea-159bb66c5202?returnUrl=https%3A%2F%2Fpagamentos.ontimeambev.com.br%2Fapp%2Fupload", bgurl:"https://sso.ontimeambev.com.br/Content/logo_ABIn.png"},
]}/>

          </div>
        </Header>
      }
    >
      {page}
    </AppShell>
  );
}

