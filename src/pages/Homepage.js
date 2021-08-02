import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const REVIEWS = gql`
  query GetReviews {
    reviews {
      title,
      body,
      rating,
      id,
      categories {
        id, name
      }
    }
  }
`

const Homepage = () => {
  const { loading, error, data } = useQuery(REVIEWS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>
  return (
    <div className="mt-4">
      {data.reviews.map((review) => (
        <div className="article" key={review.id}>
          <div className="rating">{review.rating}</div>
          <h2 className="title-article">{review.title}</h2>
          {review.categories.map(c => (
            <small className="tag" key={c.id}>{c.name}</small>
          ))}
          <p>{review.body.substr(0, 200)}...</p>
          <Link to={`/details/${review.id}`} className="link">Read more...</Link>
        </div>
      ))}
    </div>
  );
}

export default Homepage;