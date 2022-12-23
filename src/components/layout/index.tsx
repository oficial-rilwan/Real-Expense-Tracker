import Header from "../header";
import Sidebar from "../sidebar";

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div id="layout" style={{ overflow: "hidden" }}>
      <Header />
      <div className="flex">
        <Sidebar />
        <div className="presentation">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
