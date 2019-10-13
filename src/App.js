import React from "react";
// import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import Animals from "./components/Animals";

import { API_URI, PERMA_TOKEN } from "./env";

const client = new ApolloClient({
  uri: API_URI,
  headers: {
    authorization: PERMA_TOKEN,
  },
});

console.log("token " + PERMA_TOKEN);

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container">
          <Route exact path="/" component={Animals} />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
