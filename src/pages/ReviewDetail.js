import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import ReactMarkdown from 'react-markdown'

const REVIEW = gql`
  query GetReview($id : ID!) {
    review(id : $id) {
      title,
      body,
      id,
      rating,
      categories{
        id, 
        name}
    }
  }
`

const ReviewDetail = () => {
  const { id } = useParams()
  const { data, error, loading } = useQuery(REVIEW, {
    variables: { id: id }
  })


  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <div className="article" key={data.review.id}>
        <div className="rating">{data.review.rating}</div>
        <h2 className="title-article">{data.review.title}</h2>
        {data.review.categories.map(c => (
          <small className="tag" key={c.id}>{c.name}</small>
        ))}
        <ReactMarkdown>{data.review.body}</ReactMarkdown>
      </div>
    </div>
  );
}

export default ReviewDetail;