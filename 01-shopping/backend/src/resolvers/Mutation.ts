import db from '../db'

const Mutation = {
  async createItem(parent, args) {
    try {
      const item = await db.item.create({
        data: {
          title: args.title,
          description: args.description,
          image: args.image,
          largeImage: args.largeImage,
          price: args.price,
        }
      })
      return item
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default Mutation