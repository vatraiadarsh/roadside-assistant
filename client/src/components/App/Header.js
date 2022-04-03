import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Container, Image, Menu, Icon } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Menu fixed="top" inverted>
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
            <Menu.Item >
              <Icon name="home" size="large" />
              Home
            </Menu.Item>
          </Link>

          <Link to="/">
            <Menu.Item>
              <Icon name="car" size="large" />
              Assistant
            </Menu.Item>
          </Link>
        </Menu.Item>

        {!userInfo ? (
          <Menu.Item position="right">
            <Link to="/login">
              <Menu.Item header>
                <Icon name="user" size="large" />
                Login
              </Menu.Item>
            </Link>
            <Link to="/register">
              <Menu.Item header>
                <Icon name="user plus" size="large" />
                Register
              </Menu.Item>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item position="right">
            <Menu.Item header>
              Welcome,&nbsp;
              {userInfo &&
                userInfo.first_name.charAt(0).toUpperCase() +
                  userInfo.first_name.slice(1)}
            </Menu.Item>
            <Link to="/">
              <Menu.Item>
                <Icon name="user secret" size="large" />
                Profile
              </Menu.Item>
            </Link>

            <Menu.Item onClick={handleLogout}>
              <Icon name="sign out" size="large" />
              <span>Logout</span>
            </Menu.Item>
          </Menu.Item>
        )}
      </Container>
    </Menu>
  );
};

export default Header;
