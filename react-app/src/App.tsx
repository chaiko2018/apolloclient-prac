import React, { useState, ChangeEvent } from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  useQuery,
  gql,
  NetworkStatus,
  useMutation,
  createHttpLink,
} from "@apollo/client";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import About from "./components/About";
import Navbar from "./components/navbar";
import { setContext } from "@apollo/link-context";

const GET_BOOKS = gql`
  query getBooks($id: String) {
    books(id: $id) {
      id
      title
      author
      created
    }
  }
`;

const GET_DOGS = gql`
  query GetDogs {
    dogs {
      id
      breed
    }
  }
`;

const GET_DOG_PHOTO = gql`
  query Dog($breed: String!) {
    dog(breed: $breed) {
      id
      displayImage
    }
  }
`;

const ADD_TODO = gql`
  mutation AddTodo($type: String!) {
    addTodo(type: $type) {
      id
      type
    }
  }
`;

const GET_TODOS = gql`
  query GetTodos {
    todos
  }
`;

const httpLink = createHttpLink({
  uri: "http://localhost:4000/",
});

const authLink = setContext((_, { headers }) => {
  const token = "testToken";
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const link = createHttpLink({
  uri: "http://localhost:4000/",
  credentials: "same-origin",
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "http://localhost:4000/",
  }),
});

interface BookInterface {
  id: string;
  title: string;
  author: string;
  created: string;
}

interface DogInterface {
  id: string;
  breed: string;
}

interface DogPhotoInterface {
  id: string;
  display: string;
}

function AddTodo() {
  let input: any;
  const [addTodo, { data }] = useMutation(ADD_TODO);

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addTodo({ variables: { type: input.value } });
          input.value = "";
        }}
      >
        <input
          ref={(node) => {
            input = node;
          }}
        />
        <button type="submit">Add Todo</button>
      </form>
    </div>
  );
}

function DogPhoto({ breed }: any) {
  const { loading, error, data, refetch } = useQuery(GET_DOG_PHOTO, {
    variables: { breed },
    skip: !breed,
  });

  if (loading) return <p>Loading... ...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <img src={data.dog.displayImage} style={{ height: 100, width: 100 }} />
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}

interface MyDogsVaribles {
  onDogSelected: (target: ChangeEvent<HTMLSelectElement>) => void;
}

function MyDogs({ onDogSelected }: MyDogsVaribles) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_DOGS, {
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === NetworkStatus.refetch) return <p>Refetching...</p>;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <div>
      <select name="dog" onChange={onDogSelected}>
        {data.dogs.map((dog: DogInterface) => (
          <option key={dog.id} value={dog.breed}>
            {dog.breed}
          </option>
        ))}
      </select>
      <button onClick={() => refetch()}>Refetch</button>
    </div>
  );
}

interface booksVariables {
  id: String;
}

function Books({ id }: booksVariables) {
  const { loading, error, data } = useQuery(GET_BOOKS, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.books.map((book: BookInterface) => {
    return (
      <div key={book.id}>
        <div>ID: {book.id}</div>
        <div>TITLE: {book.title}</div>
        <div>Written by: {book.author}</div>
        <div>Created: {book.created}</div>
      </div>
    );
  });
}

function App() {
  const [dogSelect, SetDogSelect] = useState(null);

  const onDogSelected = ({ target }: any) => {
    SetDogSelect(target.value);
    alert(dogSelect);
  };

  const mybook = "100002";

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <div>
          <div>
            <Navbar />
          </div>

          <Switch>
            <Route path="/" exact>
              <p>Welcome Page</p>
            </Route>
            <Route path="/About" exact component={About}></Route>
            <Route path="/Books">
              <Books id={mybook} />
            </Route>
            <Route path="/Dogs">
              <MyDogs onDogSelected={onDogSelected} />
            </Route>
            <Route path="/AddTodo">
              <AddTodo />
            </Route>
          </Switch>

          <Books id={mybook} />
          <MyDogs onDogSelected={onDogSelected} />
        </div>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
