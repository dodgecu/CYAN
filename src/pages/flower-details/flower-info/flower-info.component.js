import React from "react";

import DetailsMain from "./flower-info-components/flower-primary.component";
import FlowerInformation from "./flower-info-components/flower-information.component";
import Ranges from "./flower-info-components/flower-ranges.component";
import Problems from "./flower-info-components/flower-problems.component";

const flowerInfo = props => {
  return (
    <section className="flower-details">
      <DetailsMain
        name={props.flowerName}
        thumbnail={props.thumb}
        isConnected={props.connected}
        isNeedy={props.issues}
      />
      <div className="flower-details__desktop-view">
        <FlowerInformation
          flowerType={props.type}
          dateAdded={props.created_at}
        />
        <Ranges
          soilMoisture={props.soil}
          temp={props.temperature}
          airHumidity={props.humidity}
          amblight={props.light}
        />
        <Problems isNeedy={props.issues} isConnected={props.connected} />
      </div>
    </section>
  );
};

export default flowerInfo;
