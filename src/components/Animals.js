import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import AnimalsItem from "./AnimalsItem";

const ANIMALS_QUERY = gql`
  query AnimalsQuery {
    animals(org_id: 1) {
      id
      name
      species_id
      description
    }
    species(org_id: 1) {
      id
      name
    }
  }
`;

// poor man's data store
const speciesList = {};
function generateList(data) {
  for (let i in data.species) {
    speciesList[data.species[i].id] = data.species[i].name;
  }
}
function getSpecies(animal) {
  return speciesList[animal.species_id];
}

export default class Animals extends Component {
  render() {
    return (
      <>
        <h1 className="display-4 my-3">Animals</h1>
        <Query query={ANIMALS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            generateList(data);
            return (
              <table>
                <tbody>
                  {data.animals.map(animal => (
                    <AnimalsItem
                      key={animal.id}
                      animal={animal}
                      species={getSpecies(animal)}
                    />
                  ))}
                </tbody>
              </table>
            );
          }}
        </Query>
      </>
    );
  }
}
