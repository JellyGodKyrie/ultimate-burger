import React from "react";
import classes from "./Backdrop.module.css";

// eslint-disable-next-line
const backdrop = (props) => (props.show ? <div className={classes.Backdrop} onClick={props.clicked} /> : null);

export default backdrop;
