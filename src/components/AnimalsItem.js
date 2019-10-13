import React from "react";

const AnimalsItem = props => {
  console.log(props.speciesList);
  return (
    <tr>
      <th>{props.animal.name}</th>
      <th>{props.animal.description}</th>
      <th>{props.species}</th>
    </tr>
  );
};

export default AnimalsItem;
