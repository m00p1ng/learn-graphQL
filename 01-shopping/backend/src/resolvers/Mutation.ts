import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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
  },
  async signup(parent, args, ctx) {
    const password = await bcrypt.hash(args.password, 10)

    const user = await db.user.create({
      data: {
        email: args.email.toLowerCase(),
        password,
        name: args.name,
        permissions: ['USER']
      }
    })

    const token = jwt.sign({userId: user.id}, 'test-test-test')
    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    return user
  }
}

export default Mutation