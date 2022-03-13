import { hasPermission } from '../util'

const Query = {
  async items(parent, args, ctx) {
    const items = await ctx.prisma.item.findMany({
      take: args.first,
      skip: args.skip,
    })
    return items
  },
  async item(parent, args, ctx) {
    const item = await ctx.prisma.item.findUnique({ where: { id: args.id }})
    return item
  },
  async _allItemsMeta(parent, args, ctx) {
    const count = await ctx.prisma.item.count()
    return { count }
  },
  async me(parent, args, ctx) {
    if (!ctx.req.userId) {
      return null
    }

    return ctx.prisma.user.findUnique({ where: { id: ctx.req.userId }})
  },
  async users(parent, args, ctx) {
    if (!ctx.req.userId) {
      throw new Error('You must be logged in')
    }

    try {
      const user = await ctx.prisma.user.findUnique({ where: { id: ctx.req.userId }})

      hasPermission(user, ['ADMIN', 'PERMISSIONUPDATE'])

      return ctx.prisma.user.findMany()
    } catch (err) {
      console.log(err)
      throw err
    }
  }
}

export default Query