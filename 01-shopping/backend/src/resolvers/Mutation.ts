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
  },
  async updateItem(parent, args) {
    try {
      const item = await db.item.update({
        where: { id: args.id},
        data: {
          title: args.title,
          description: args.description,
          price: args.price,
        }
      })
      return item
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  async deleteItem(parent, args) {
    try {
      return db.item.delete({ where: { id: args.id }})
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default Mutation