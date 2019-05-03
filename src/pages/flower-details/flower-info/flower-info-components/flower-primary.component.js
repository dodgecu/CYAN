import React from "react";
import MenuIcon from "@material-ui/icons/Menu";

import AccessAlarmIcon from "@material-ui/icons/AccessAlarm";

const flowerPrimary = props => {
  return (
    <article className="flower-details__main">
      <h2 className="flower-details__name">{props.name}</h2>
      <p className="flower-details__main--connection-status">
        {!props.isConnected ? "There is no connection to flower sensor" : null}
      </p>
      <figure className="flower-details__main--thumbnail">
        <img
          className="thumb"
          src={require(`../../../../assets/${props.thumbnail}`)}
          alt=""
        />
      </figure>
    </article>
  );
};

export default flowerPrimary;
