import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import classnames from "classnames";
import Loader from "react-loader-spinner";

// components
import Layout from "../../components/Layout";
import UsersList from "../../components/UsersList";
import Content from "../../components/Content";
import UserView from "../../components/UserView";

//helpers
import { modifyUsersObject, findUser } from "../../utils/utils";

// hooks
import useUsers from "./useUsers";

const useStyles = makeStyles({
  contentHeader: {
    padding: 30,
  },
  contentTitle: {
    fontSize: 19,
  },
  loader: {
    minHeight: 400,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection:"column",
    color: "#cacaca"
  },
});

function Users() {
  const classes = useStyles();
  const {
    data,
    error,
    loading,
    handleChangePage,
    handleChangeRowsPerPage,
    rowsPerPage,
    setRowsPerPage,
    page,
  } = useUsers();

  const [users, setUsers] = useState([]);
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (loading || error) return;
    setUsers(modifyUsersObject(data.results));
  }, [data, loading, error]);

  const handleRemoveUser = (id) => {
    setUsers(
      users.filter(function (obj) {
        return obj.login.uuid !== id;
      })
    );
  };

  const handleEditUser = (user) => {
    let findIndex = users.findIndex(function (obj) {
      return obj.id === user.id;
    });
    users[findIndex] = user;
    setUsers(users);
    setUser();
  };

  const showUser = (id) => {
    setUser(findUser(users, id));
    setEditMode(true);
  };

  const showUserImages = (id) => {
    setUser(findUser(users, id));
    setEditMode(false);
  };

  return (
    <Layout title="Users">
      <Content>
        <div
          className={classnames(
            classes.contentHeader,
            "flex justify-between items-center"
          )}
        >
          <h3 className={classnames("m-0", classes.contentTitle)}>All Users</h3>
        </div>
        {loading && (
          <div className={classes.loader}>
            <Loader type="TailSpin" color="#cacaca" height={50} width={50} />
            <div>Loading Data</div>
          </div>
        )}
        {error && (
          <div className={classes.loader}>
            Error: {error}
          </div>
        )}
        {!loading && data && (
          <UsersList
            users={users}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            page={page}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            handleRemoveUser={handleRemoveUser}
            showUser={showUser}
            showUserImages={showUserImages}
          />
        )}
        {user && <UserView user={user} setUser={setUser} handleEditUser={handleEditUser} editMode={editMode} />}
      </Content>
    </Layout>
  );
}

export default Users;
