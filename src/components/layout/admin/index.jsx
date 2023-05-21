import React, { useState } from "react";
import {
  DashboardOutlined,
  ExperimentOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MessageOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import "./Admin.scss";
import { Link } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo">
          <Link to={"/"} className="from_admin_to_home">
            <Button type="link">
              <h3 style={{ marginTop: "-8px" }}>Home</h3>
            </Button>
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          // selectedKeys={["1"]}
          defaultSelectedKeys={["0"]}
          items={[
            {
              key: "0",
              icon: (
                <Link to="/dashboard">
                  {" "}
                  <DashboardOutlined />{" "}
                </Link>
              ),
              label: "Dashboard",
            },
            {
              key: "1",
              icon: (
                <Link to="/skills">
                  {" "}
                  <SettingOutlined />{" "}
                </Link>
              ),
              label: "Skills",
            },
            {
              key: "2",
              icon: (
                <Link to="/portfolio">
                  {" "}
                  <InboxOutlined />{" "}
                </Link>
              ),
              label: "Portfolios",
            },
            {
              key: "3",
              icon: (
                <Link to="/experiences">
                  {" "}
                  <ExperimentOutlined />{" "}
                </Link>
              ),
              label: "Experiences",
            },
            {
              key: "4",
              icon: (
                <Link to="/messages">
                  {" "}
                  <MessageOutlined />{" "}
                </Link>
              ),
              label: "Messages",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
