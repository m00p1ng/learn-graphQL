import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'

import Item from './Item'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY {
    items {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`

const Center = styled.div`
  text-align: center;
`

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 60px;
  max-width: var(--maxWidth);
`

function Items() {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY)

  if (loading) {
    return (<p>Loading....</p>)
  }

  if (error) {
    return (<p>Error: {error.message}</p>)
  }

  return (
    <Center>
      <ItemsList>
        {data.items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ItemsList>
    </Center>
  )
}

export default Items