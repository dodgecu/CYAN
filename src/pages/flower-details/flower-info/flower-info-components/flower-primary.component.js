import React from "react";

const flowerPrimary = props => {
  return (
    <article className="flower-details__main">
      <h2 className="flower-details__name">
        {props.name}
        <i className="flower-details__main--issue material-icons">
          {props.isNeedy !== undefined && props.isNeedy.length
            ? "warning"
            : null}
        </i>
      </h2>

      <p className="flower-details__main--connection-status">
        {!props.isConnected ? (
          <>
            <i className="material-icons">cell_wifi</i>
            <span className="notconnected-message">
              There is no connection to the flower sensor!
            </span>
          </>
        ) : null}
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
