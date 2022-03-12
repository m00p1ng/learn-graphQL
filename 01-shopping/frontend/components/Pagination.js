import { useQuery, gql } from '@apollo/client';
import Head from 'next/head';
import Link from 'next/link';

import PaginationStyles from './styles/PaginationStyles';
import DisplayError from './ErrorMessage';
import config from '../config'

const PAGINATION_QUERY = gql`
  query PAGINATION_QUERY {
    _allItemsMeta {
      count
    }
  }
`;

export default function Pagination({ page }) {
  const { error, loading, data } = useQuery(PAGINATION_QUERY);
  if (loading) return 'Loading...';
  if (error) return <DisplayError error={error} />;
  const { count } = data._allItemsMeta;
  const pageCount = Math.ceil(count / config.perPage);
  return (
    <PaginationStyles>
      <Head>
        <title>Sick Fits - Page {page} of ___</title>
      </Head>
      <Link href={{ pathname: 'items', query: { page: page - 1 } }}>
        <a aria-disabled={page <= 1}>← Prev</a>
      </Link>
      <p>
        Page {page} of {pageCount}
      </p>
      <p>{count} Items Total</p>
      <Link href={{ pathname: 'items', query: { page: page + 1 } }}>
        <a aria-disabled={page >= pageCount}>Next →</a>
      </Link>
    </PaginationStyles>
  );
}