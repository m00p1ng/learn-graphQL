import { gql, useQuery } from '@apollo/client'
import Head from 'next/head';
import styled from 'styled-components';

import DisplayError from './ErrorMessage';

const ProductStyles = styled.div`
  max-width: var(--maxWidth);
  margin: 2rem auto;
  box-shadow: var(--bs);
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: column;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: Int!) {
    item(id: $id) {
      id
      title
      description
      largeImage
    }
  }
`
function SingleItem({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: {
      id,
    },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <DisplayError error={error} />;

  const { item } = data;

  return (
    <ProductStyles>
      <Head>
        <title>Sick Fits | {item.title}</title>
      </Head>
      <img
        src={item.largeImage}
        alt={item.largeImage}
      />
      <div className="details">
        <h2>Vewing {item.title}</h2>
        <p>{item.description}</p>
      </div>
    </ProductStyles>
  )
}

export default SingleItem