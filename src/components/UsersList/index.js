import React from "react";
import PropTypes from "prop-types";
import { format } from "date-fns";

import TableComponent from "../TableComponent";
import UserListItem from "./UserListItem";

import data from "../../data/data.json";

function UsersList({
  users,
  rowsPerPage,
  page,
  handleChangePage,
  handleChangeRowsPerPage,
  handleRemoveUser,
  showUser,
  showUserImages,
}) {
  return (
    users && (
      <TableComponent
        tableHead={data.tableHeadItems}
        count={users.length}
        rowsPerPage={rowsPerPage}
        colSpan={4}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        page={page}
      >
        {users.map((user, index) => {
          return (
            <UserListItem
              key={index}
              id={user.login.uuid}
              name={user.username}
              thumbnail={user.picture.thumbnail}
              location={`${user.location.state}. ${user.location.city},${user.location.street.name} ${user.location.street.number}`}
              email={user.email}
              phone={user.phone}
              registeredDate={format(
                new Date(user.registered.date),
                "MMMM dd, yyyy"
              )}
              registeredTime={format(new Date(user.registered.date), "hh:mm a")}
              country={user.location.country}
              postcode={user.location.postcode}
              handleRemoveUser={handleRemoveUser}
              showUser={showUser}
              showUserImages={showUserImages}
            />
          );
        })}
      </TableComponent>
    )
  );
}

UsersList.defaultProps = {
  users: [],
  rowsPerPage: 0,
  page: 0,
  handleChangePage: () => {},
  handleChangeRowsPerPage: () => {},
  handleRemoveUser: () => {},
  showUser: () => {},
};

UsersList.prototype = {
  users: PropTypes.array,
  rowsPerPage: PropTypes.number,
  page: PropTypes.number,
  handleChangePage: PropTypes.func,
  handleChangeRowsPerPage: PropTypes.func,
  handleRemoveUser: PropTypes.func,
  showUser: PropTypes.func,
};

export default UsersList;
