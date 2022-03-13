import { useMutation, gql } from '@apollo/client'

import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm'
import Form from './styles/Form'
import formatMoney from '../lib/formatMoney'

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
      title
      description
      price
    }
  }
`;

function CreateItem() {
  const { inputs, handleChange, clearForm, resetForm } = useForm({
    title: 'Nice Shoes',
    price: 34234,
    description: 'These are the best shoes!',
  })
  const [createItem, { loading, error, data }] = useMutation(
    CREATE_ITEM_MUTATION,
    {
      variables: inputs,
    }
  );

  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault()
        await createItem();
        clearForm();
      }}
    >
      <DisplayError error={error} />
      <fieldset disabled={loading} aria-busy={loading}>
        <label htmlFor="file">
          Image
          <input
            id="file"
            type="file"
            name="file"
            placeholder="Upload an image"
          // onChange={handleChange}
          // required
          />
        </label>
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

export default CreateItem