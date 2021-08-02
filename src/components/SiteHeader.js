import { Link } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const CATEGORIES = gql`
  query GetCategories {
    categories {
      id, name
    }
  }
`

const SiteHeader = () => {
  const { data, error, loading } = useQuery(CATEGORIES)

  if (loading) return <p>Loading categories...</p>
  if (error) return <p>Error :(</p>

  return (
    <>
      <div className="navbar">
        <Link to="/"><h1 className="title">Ninja Reviews</h1></Link>
      </div>
      <div className="text-right">
        <span>Categories: </span>
        {data.categories.map((category) => (
          <Link className="ml-2 text-purple-700 hover:opacity-50" key={category.id} to={`/category/${category.id}`}>{category.name}</Link>
        ))}
      </div>
    </>

  );
}

export default SiteHeader;