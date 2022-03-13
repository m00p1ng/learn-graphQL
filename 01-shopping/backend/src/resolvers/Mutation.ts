import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { randomBytes } from 'crypto'

import config from '../config'
import { transport, makeANiceEmail } from '../mail'

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
  },
  async signout(parent, args, ctx) {
    ctx.res.clearCookie('token')

    return { message: 'GoodBye!' }
  },
  async requestReset(parent, args, ctx) {
    const user = ctx.prisma.user.findUnique({ where: { email: args.email }})

    if (!user) {
      throw new Error(`No such user found for email ${args.email}`)
    }

    const resetToken = randomBytes(20).toString('hex')
    const resetTokenExpiry = Date.now() + 60*60*1000

    const res = await ctx.prisma.user.update({
      where: { email: args.email },
      data: {
        resetToken,
        resetTokenExpiry
      }
    })

    const mailRes = await transport.sendMail({
      from: 'mongkonchai4412@gmail.com',
      to: args.email,
      subject: 'Your Password Reset',
      html: makeANiceEmail(`Your password reset Token is here!
      \n\n
      <a href="${config.frontendUrl}/reset?resetToken=${resetToken}">Click Here to Reset</a>`)
    })

    return { message: 'Success' }
  },
  async resetPassword(parent, args, ctx) {
    if(args.password !== args.confirmPassword) {
      throw new Error('You password is not match')
    }

    const [user] = await ctx.prisma.user.findMany({
      where: {
        resetToken: args.resetToken,
        resetTokenExpiry: {
          gt: Date.now() - 60*60*1000
        }
      }
    })

    if (!user) {
      throw new Error('This token is either invalid or expired!')
    }

    const password = await bcrypt.hash(args.password, 10)

    const updatedUser = await ctx.prisma.user.update({
      where: { email: user.email },
      data: {
        password,
        resetToken: null,
        resetTokenExpiry: null
      }
    })

    const token = jwt.sign({userId: updatedUser.id}, config.jwtSecret)

    ctx.res.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365,
    })

    return updatedUser
  }
}

export default Mutation