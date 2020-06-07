import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
});

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

function GetDogs() {
  const { loading, error, data } = useQuery(GET_DOGS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.dogs.map((dog: any) => {
    return (
      <div key={dog.id}>
        <p>{dog.id}</p>
        <p>{dog.breed}</p>
      </div>
    );
  });
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <GetDogs />
      </div>
    </ApolloProvider>
  );
}

export default App;
