import SingleItem from "../../components/SingleItem"

function Item({ query }) {
  return (
    <div>
      <SingleItem id={parseInt(query.id)} />
    </div>
  )
}

export default Item