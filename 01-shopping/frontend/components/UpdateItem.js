import { useQuery, useMutation, gql } from '@apollo/client'

import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: Int!) {
    item(id: $id) {
      id
      title
      description
      price
    }
  }
`

const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION(
    $id: Int!
    $title: String!
    $description: String!
    $price: Int!
  ) {
    updateItem(
      id: $id
      title: $title
      description: $description
      price: $price
    ) {
      id
      title
      description
      price
    }
  }
`;

function UpdateItem({ id }) {
  const { data, error, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.item)
  const [
    updateItem,
    { loading: updateLoading, error: updateError, data: updateData }
  ] = useMutation(
    UPDATE_ITEM_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        console.log(inputs);
        await updateItem();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="title">
          Title
          <input
            id="title"
            name="title"
            placeholder="Title"
            type="text"
            value={inputs.title}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="price">
          Price
          <input
            id="price"
            name="price"
            placeholder="Price"
            type="number"
            value={inputs.price}
            onChange={handleChange}
            required
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter a description"
            value={inputs.description}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Submit</button>
      </fieldset>
    </Form>
  )
}

export default UpdateItem