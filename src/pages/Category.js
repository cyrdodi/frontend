import { useQuery, gql } from "@apollo/client";
import { Link, useParams } from 'react-router-dom'

const CATEGORY = gql`
  query GetCategory($id: ID!){
    category(id: $id){
      id, 
      name,
      reviews {
        id,
        title,
        body,
        rating,
        categories {
          id, name
        }
      }
    }
  }
`

const Category = () => {
  const { id } = useParams()
  const { data, error, loading } = useQuery(CATEGORY,
    {
      variables: { id }
    })
  console.log(data)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error.message}</p>
  return (
    <div>
      <h2 className="text-2xl font-semibold">Show only reviews from {data.category.name}</h2>

      {data.category.reviews.map((review) => (
        <div className="article" key={review.id}>
          <div className="rating">{review.rating}</div>
          <h2 className="title-article">{review.title}</h2>
          {review.categories.map(c => (
            <small className="tag" key={c.id}>{c.name}</small>
          ))}
          <p>{review.body.substr(0, 200)}...</p>
          <Link to={`/details/${review.id}`} className="flex link">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#7819b8" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M128,88a32,32,0,0,1,32-32h64a8,8,0,0,1,8,8V192a8,8,0,0,1-8,8H160a32,32,0,0,0-32,32" fill="none" stroke="#7819b8" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path><path d="M24,192a8,8,0,0,0,8,8H96a32,32,0,0,1,32,32V88A32,32,0,0,0,96,56H32a8,8,0,0,0-8,8Z" fill="none" stroke="#7819b8" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"></path></svg>
            Read more...
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Category;