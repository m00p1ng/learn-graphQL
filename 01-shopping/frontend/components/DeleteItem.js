import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: Int!) {
    deleteItem(id: $id) {
      id
      title
    }
  }
`;

function update(cache, payload) {
  cache.evict(cache.identify(payload.data.deleteProduct));
}

export default function DeleteProduct({ id, children }) {
  const [deleteItem, { loading, error }] = useMutation(
    DELETE_ITEM_MUTATION,
    {
      variables: { id },
      update
    }
  );
  return (
    <button
      type="button"
      disabled={loading}
      onClick={() => {
        if (confirm('Are you sure you want to delete this item?')) {
          deleteItem().catch((err) => alert(err.message));
        }
      }}
    >
      {children}
    </button>
  );
}