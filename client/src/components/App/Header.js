import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Image, Menu, Icon } from "semantic-ui-react";

const Header = () => {
  return (
    <Menu className="menu">
    <Container>
      <Menu.Item>
        <Link to={"/"}>
          <Menu.Item header>
            <Image
              size="mini"
              src="/logo.png"
              style={{ marginRight: "1.5em" }}
            />
            Roadside Assistance
          </Menu.Item>
        </Link>
        <Link to="/">
          <Menu.Item>
            <Icon  name="home" size="large" />
            Home
          </Menu.Item>
        </Link>

        <Link to="/">
          <Menu.Item>
            <Icon  name="home" size="large" />
            Home
          </Menu.Item>
        </Link>

        <Link to="/">
          <Menu.Item>
            <Icon  name="home" size="large" />
            Home
          </Menu.Item>
        </Link>

        <Link to="/">
          <Menu.Item position="right" header>
            <Icon  name="home" size="large" />
            Home
          </Menu.Item>
        </Link>
      </Menu.Item>

      <Menu.Item position="right">
        <Link to="/login">
          <Menu.Item header>
            <Icon  name="user" size="large" />
            Login
          </Menu.Item>
        </Link>
        <Link to="/register">
          <Menu.Item header>
            <Icon  name="user plus" size="large" />
            Register
          </Menu.Item>
        </Link>
      </Menu.Item>
    </Container>
  </Menu>

  );
};

export default Header;
