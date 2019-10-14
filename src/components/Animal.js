import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";
import Moment from "react-moment";

const ANIMAL_QUERY = gql`
  query AnimalQuery($id: Int!) {
    animal(id: $id) {
      id
      name
      species_id
      description
      notes
      history {
        action_id
        success
        is_complete
        created_at
        item_id
        quantity
      }
      species {
        name
        id
      }
      actions {
        id
        name
        items {
          id
          name
        }
      }
    }
  }
`;

// create key-value mappings for actions and items
const actionsList = {};
function generateList(data) {
  const { actions } = data.animal;
  for (let i in actions) {
    const { id } = actions[i];
    actionsList[id] = {
      name: data.animal.actions[i].name,
      items: {},
    };
    const { items } = data.animal.actions[i];
    for (let k in items) {
      actionsList[id].items[items[k].id] = items[k].name;
    }
  }
}
function getAction(animal) {
  return actionsList[animal.action_id].name;
}
function getItem(animal) {
  return actionsList[animal.action_id].items[animal.item_id];
}

export default class Animal extends Component {
  render() {
    let { id } = this.props.match.params;
    id = parseInt(id);
    return (
      <div>
        <Query query={ANIMAL_QUERY} variables={{ id }}>
          {({ loading, error, data }) => {
            if (loading) return <h4>Loading...</h4>;
            if (error) console.log(error);
            console.log(data);
            generateList(data);
            return (
              <>
                <h1>{data.animal.name}</h1>
                <h6>{data.animal.species.name}</h6>
                <h6>{data.animal.description}</h6>
                <table>
                  <tbody>
                    <tr>
                      <th>Date</th>
                      <th>Action</th>
                      <th>Result</th>
                      <th>Item</th>
                      <th>Status</th>
                    </tr>
                    {data.animal.history.map(each => {
                      const date = new Date(Number(each.created_at));
                      return (
                        <tr>
                          <th>
                            <Moment format="YYYY-MM-DD ">{date}</Moment>
                          </th>
                          <th>{getAction(each)}</th>
                          <th>{each.success ? "Success" : "Failure"}</th>
                          <th>
                            {each.quantity}x {getItem(each)}
                          </th>
                          <th>{each.is_complete ? "Completed" : "Pending"}</th>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </>
            );
          }}
        </Query>
      </div>
    );
  }
}
