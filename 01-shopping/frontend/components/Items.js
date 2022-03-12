import { useQuery, gql } from '@apollo/client'
import styled from 'styled-components'

import Pagination from './Pagination'
import Item from './Item'
import config from '../config'

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int) {
    items(first: $first, skip: $skip) {
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

function Items({ page }) {
  const { data, error, loading } = useQuery(ALL_ITEMS_QUERY, {
    variables: {
      skip: page * config.perPage - config.perPage,
      first: config.perPage,
    }
  })

  if (loading) {
    return (<p>Loading....</p>)
  }

  if (error) {
    return (<p>Error: {error.message}</p>)
  }

  return (
    <Center>
      <Pagination page={page} />
      <ItemsList>
        {data.items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ItemsList>
    </Center>
  )
}

export default Items