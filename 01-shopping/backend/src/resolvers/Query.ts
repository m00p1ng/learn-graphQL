import db from '../db'

const Query = {
  async items(parent, args) {
    const items = await db.item.findMany({
      take: args.first,
      skip: args.skip,
    })
    return items
  },
  async item(parent, args) {
    const item = await db.item.findUnique({ where: { id: args.id }})
    return item
  },
  async _allItemsMeta() {
    const count = await db.item.count()
    return { count }
  }
}

export default Query