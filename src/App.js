import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// pages and componnent
import SiteHeader from './components/SiteHeader'
import Category from './pages/Category'
import Homepage from './pages/Homepage'
import ReviewDetail from './pages/ReviewDetail'

function App() {
  // apollo client
  const client = new ApolloClient({
    uri: 'http://localhost:1337/graphql',
    cache: new InMemoryCache()
  })


  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="w-full h-full min-h-screen text-gray-600 bg-gray-100 font-body">
          <div className="w-full max-w-screen-lg lg:mx-auto">
            <SiteHeader />
            <Switch>
              <Route exact path="/">
                <Homepage />
              </Route>
              <Route path="/category/:id">
                <Category />
              </Route>
              <Route exact path="/details/:id">
                <ReviewDetail />
              </Route>

            </Switch>
          </div>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
