import { Navbar } from '@nextui-org/react';
import ServerInfo from './ServerInfo';

function HomeNavBar() {

  return (
    <Navbar disableBlur maxWidth={"fluid"} disableShadow containerCss={{ backgroundColor: "#0d0e0f", borderBottom: "solid 2px #17C964" }}>
      <Navbar.Content variant={"highlight-solid"} activeColor={"success"}>
        <Navbar.Link isActive>Inicio</Navbar.Link>
      </Navbar.Content>
      <Navbar.Content>
        <Navbar.Item>
          <ServerInfo />
        </Navbar.Item>
      </Navbar.Content>
    </Navbar>
  );
}

export default HomeNavBar;