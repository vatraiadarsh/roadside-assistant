import React from "react";
import { useSelector } from "react-redux";
import { Table, Icon } from "semantic-ui-react";

function ProfileInfo() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const formatted_date = new Date(userInfo.date_of_birth)
    .toString()
    .slice(0, 16);
  return (
    <>
      <Table celled striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="3">Profile</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="user" /> Name
            </Table.Cell>
            <Table.Cell>{`${userInfo.title} ${userInfo.first_name} ${userInfo.last_name}`}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="mail" /> Email
            </Table.Cell>
            <Table.Cell>{userInfo.email}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="circle" /> Gender
            </Table.Cell>
            <Table.Cell>{userInfo.gender}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="registered outline" /> Role
            </Table.Cell>
            <Table.Cell>{userInfo.role}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="calendar" /> Date of birth
            </Table.Cell>
            <Table.Cell>{formatted_date}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="phone" /> Mobile Number
            </Table.Cell>
            <Table.Cell>{userInfo.mobile_number}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell collapsing>
              <Icon name="home" /> Address
            </Table.Cell>
            <Table.Cell>{userInfo.address}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </>
  );
}

export default ProfileInfo;
