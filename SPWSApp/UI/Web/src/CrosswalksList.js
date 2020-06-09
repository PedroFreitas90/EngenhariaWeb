import React from "react";
import { List, Button } from "semantic-ui-react";

const CrosswalksList = ({ markers, centerMap, infoPoint }) => {
  return (
    <List verticalAlign="middle" divided selection>
      {markers.map((crosswalk) => {
        return (
          <List.Item
            onClick={() => centerMap(crosswalk.latitude, crosswalk.longitude)}
            key={crosswalk.id}
          >
            <List.Content floated="right">
              <Button
                inverted
                icon="info"
                color="blue"
                onClick={(event) => {
                  event.preventDefault();
                  infoPoint(
                    crosswalk.title,
                    crosswalk.latitude,
                    crosswalk.longitude,
                    crosswalk.state
                  );
                }}
              ></Button>
            </List.Content>
            <List.Content>
              <List.Header>{crosswalk.title}</List.Header>
            </List.Content>
          </List.Item>
        );
      })}
    </List>
  );
};

export default CrosswalksList;
