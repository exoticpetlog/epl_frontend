import React from "react";
import { Link, withRouter } from "react-router-dom";

const AnimalsItem = props => {
  function goToAnimal() {
    props.history.push(`/animal_${props.animal.id}`);
  }
  return (
    <tr onClick={goToAnimal}>
      <th>{props.animal.name}</th>
      <th>{props.animal.description}</th>
      <th>{props.species}</th>
    </tr>
  );
};

export default withRouter(AnimalsItem);
