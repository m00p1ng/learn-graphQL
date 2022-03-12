import db from '../db'

const Query = {
  async items() {
    const items = await db.item.findMany()
    return items
  },
  async item(parent, args) {
    const item = await db.item.findUnique({ where: { id: args.id }})
    return item
  }
}

export default Query