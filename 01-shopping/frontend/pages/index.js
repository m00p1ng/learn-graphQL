import Items from '../components/Items'

function Home({ query }) {
  return (
    <div>
      <Items page={parseFloat(query.page) || 1} />
    </div>
  )
}

export default Home