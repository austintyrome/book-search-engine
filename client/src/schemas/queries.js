import { gql, useQuery } from '@apollo/client';

const GET_ME = gql`
  query me {
    me {
      username
      email
      savedBooks {
        title
        description
      }
    }
  }
`;

const UserProfile = () => {
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>{data.me.username}</h1>
      <p>{data.me.email}</p>
      <ul>
        {data.me.savedBooks.map((book) => (
          <li key={book.bookId}>{book.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;