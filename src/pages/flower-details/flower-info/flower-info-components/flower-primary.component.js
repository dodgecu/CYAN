import React from "react";

const flowerPrimary = props => {
  return (
    <article className="flower-details__main">
      <h2 className="flower-details__name">{props.name}</h2>
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
