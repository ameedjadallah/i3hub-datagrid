import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import { Button } from "@material-ui/core";

const useStyles = makeStyles({
  firstVal: {
    color: "#252733",
    fontSize: 14,
  },
  secondVal: {
    color: "#C5C7CD",
    fontSize: 12,
    marginTop: 5,
  },
  userThumbnail: {
    width: 44,
    height: 44,
    borderRadius: "50%",
    marginRight: 24,
  },
  tableRow: {
    "&:hover": {
      background: "rgba(55, 81, 255,0.04)"
    },
  },
});

function UserListItem({
  id,
  name,
  thumbnail,
  location,
  email,
  phone,
  registeredDate,
  registeredTime,
  country,
  postcode,
  handleRemoveUser,
  showUser,
  showUserImages
}) {
  const classes = useStyles();

  return (
    <TableRow className={classes.tableRow}>
      <TableCell component="th" scope="row" className={classes.tableCell}>
        <div className="flex">
          <img
            src={thumbnail}
            width={30}
            className={classes.userThumbnail}
            alt={name}
          />
          <div className="">
            <div className={classes.firstVal}>{name}</div>
            <div className={classes.secondVal}>{location}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <div className={classes.firstVal}><a href={`mailto:${email}`}>{email}</a></div>
        <div className={classes.secondVal}><a href={`tell:${phone}`}>{phone}</a></div>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <div className={classes.firstVal}>{registeredDate}</div>
        <div className={classes.secondVal}>{registeredTime}</div>
      </TableCell>
      <TableCell className={classes.tableCell} style={{ width: 160 }}>
        <div className={classes.firstVal}>{country}</div>
        <div className={classes.secondVal}>{postcode}</div>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <Button color="primary" variant="contained" onClick={() => showUserImages(id)}>
          Show Images
        </Button>
      </TableCell>
      <TableCell className={classes.tableCell}>
        <IconButton
          color="primary"
          onClick={() => showUser(id)}
          className={classes.menuButton}
        >
          <Edit />
        </IconButton>

        <IconButton
          color="secondary"
          onClick={() => handleRemoveUser(id)}
          className={classes.menuButton}
        >
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

UserListItem.defaultProps = {
  id: "",
  name: "",
  thumbnail: "",
  location: "",
  email: "",
  phone: "",
  registeredDate: "",
  registeredTime: "",
  country: "",
  postcode: "",
  handleRemoveUser: () => {},
  showUser: () => {},
  showUserImages: () => {},
};

UserListItem.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  thumbnail: PropTypes.string,
  location: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  registeredDate: PropTypes.string,
  registeredTime: PropTypes.string,
  country: PropTypes.string,
  postcode: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  handleRemoveUser: PropTypes.func,
  showUser: PropTypes.func,
  showUserImages: PropTypes.func,
};

export default UserListItem;
