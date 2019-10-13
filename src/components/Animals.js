import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import AnimalsItem from "./AnimalsItem";

const ANIMALS_QUERY = gql`
  query AnimalsQuery {
    animals(org_id: 1) {
      id
      name
    }
  }
`;

export default class Animals extends Component {
  render() {
    return (
      <>
        <h1 className="display-4 my-3">Animals</h1>
        <Query query={ANIMALS_QUERY}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);
            return (
              <>
                {data.animals.map(animal => (
                  <AnimalsItem key={animal.id} animal={animal} />
                ))}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
