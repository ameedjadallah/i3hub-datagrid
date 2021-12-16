import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

import { TextField, Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import Close from "@material-ui/icons/Close";

const useStyles = makeStyles({
  container: {
    background: "#fff",
    width: "40vw",
    height: "100vh",
    position: "fixed",
    right: 0,
    top: 0,
    zIndex: 9999,
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
    "&::before": {
      content: "''",
      position: "absolute",
      left: 0,
      top: 0,
      right: 0,
      background: "rgba(82, 140, 252, 1)",
      height: 158,
    },
  },
  content: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    marginTop: 90,
  },
  userImage: {
    width: 132,
    height: 132,
    borderRadius: "50%",
  },
  username: {
    fontSize: 18,
  },
  location: {
    color: "#87888C",
    fontSize: 14,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    margin: " 2rem auto 0",
  },
  field: {
    marginBottom: 30,
  },
  imagesList: {
    height: "70vh",
    overflow: "auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    padding: "0 1rem",
    alignContent: 'flex-start'
  },
  imageItem: {
    width: "32%",
    marginBottom: "1rem",
  },
  closeIcon: {
    float: "right",
    marginTop: 10,
    color: "#fff",
  },
});

function UserView({ user, setUser, handleEditUser, editMode }) {
  const classes = useStyles();

  const [state, setState] = useState({
    username: "",
    email: "",
    phone: "",
    id: "",
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value,
    });
  }

  useEffect(() => {
    if (!user) return;
    setState(user);
  }, [user]);

  return (
    <>
      <div className={classes.container}>
        <Button
          onClick={() => {
            setUser();
          }}
          className={classes.closeIcon}
        >
          <Close />
        </Button>
        <div className={classes.content}>
          <img
            src={user.picture.large}
            className={classes.userImage}
            alt={user.username}
          />
          <h3 className={classes.username}>{user.username}</h3>

          {user.images && !editMode && (
            <div className="images">
              <div className={classes.imagesList}>
                {user.images?.map((image, index) => {
                  return (
                    <div className={classes.imageItem}>
                      <img src={image} alt={image}/>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {editMode && (
            <div className={classes.form}>
              <TextField
                className={classes.field}
                label="User Name"
                name="username"
                variant="outlined"
                value={state.username}
                onChange={handleChange}
              />
              <TextField
                className={classes.field}
                label="Email"
                name="email"
                variant="outlined"
                value={state.email}
                onChange={handleChange}
              />
              <TextField
                className={classes.field}
                label="Phone Number"
                name="phone"
                variant="outlined"
                value={state.phone}
                onChange={handleChange}
              />
              <div className="flex">
                <Button
                  color="primary"
                  variant="contained"
                  onClick={() => handleEditUser(state)}
                >
                  Edit
                </Button>
                <Button
                  onClick={() => {
                    setUser();
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

UserView.defaultProps = {
  user: null,
  setUser: () => {},
  handleEditUser: () => {},
  editMode: true,
};

UserView.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  handleEditUser: PropTypes.func,
  editMode: PropTypes.bool,
};

export default UserView;
