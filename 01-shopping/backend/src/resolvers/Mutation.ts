import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import config from '../config'

const Mutation = {
  async createItem(parent, args, ctx) {
    try {
      const item = await ctx.prisma.item.create({
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
  async updateItem(parent, args, ctx) {
    try {
      const item = await ctx.prisma.item.update({
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
  async deleteItem(parent, args, ctx) {
    try {
      return ctx.prisma.item.delete({ where: { id: args.id }})
    } catch (err) {
      console.log(err)
      throw err
    }
  },
  async signup(parent, args, ctx) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await ctx.prisma.user.create({
      data: {
        email: args.email.toLowerCase(),
        password,
        name: args.name,
        permissions: ['USER']
      }
    })

    const token = jwt.sign({userId: user.id}, config.jwtSecret)
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    return user
  },
  async signin(parent, args, ctx) {
    const user = await ctx.prisma.user.findUnique({ where: { email: args.email }})
    if (!user) {
      throw new Error(`No such user found for email ${args.email}`)
    }

    const valid = await bcrypt.compare(args.password, user.password)

    if (!valid) {
      throw new Error('Invalid Password!')
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret)

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    return user
  }
}

export default Mutation