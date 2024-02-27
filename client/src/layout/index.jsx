import { Outlet, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Page from "./components/Page"
import Content from "./components/Content"

const Layout = () => {
  return (
    <>
    <Page>
    <Header />
    <Content>
      <Outlet />
    </Content>
    <Footer />
  </Page>
      
    </>
  );
};

export default Layout;
