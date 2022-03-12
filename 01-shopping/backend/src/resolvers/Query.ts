import db from '../db'

const Query = {
  async items(parent, args) {
    const items = await db.item.findMany()
    return items
  }
}

export default Query