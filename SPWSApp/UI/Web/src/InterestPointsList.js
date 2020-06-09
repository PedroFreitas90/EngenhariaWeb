import React from "react";
import { List, Button } from "semantic-ui-react";

const InterestPointsList = ({ markers, centerMap, infoPoint }) => {
  return (
    <List divided selection>
      {markers.map((point) => {
        return (
          <List.Item
            key={point._id}
            onClick={() => centerMap(point.latitude, point.longitude)}
          >
            <List.Content floated="right">
              <Button
                inverted
                icon="info"
                color="blue"
                onClick={(event) => {
                  event.stopPropagation();
                  infoPoint(
                    point._id,
                    point.title,
                    point.latitude,
                    point.longitude,
                    point.state
                  );
                }}
              ></Button>
            </List.Content>
            <List.Content>
              <List.Header>{point.title}</List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default InterestPointsList;
