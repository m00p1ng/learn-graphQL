import UpdateItem from '../components/UpdateItem'

function Update({ query }) {
  return (
    <div>
      <UpdateItem id={parseInt(query.id)} />
    </div>
  )
}

export default Update