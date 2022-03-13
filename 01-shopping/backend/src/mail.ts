import nodemailer from 'nodemailer'

import config from './config'

const transport = nodemailer.createTransport({
  host: config.mailHost,
  port: config.mailPort,
  auth: {
    user: config.mailUser,
    pass: config.mailPassword,
  }
});

const makeANiceEmail = text => `
  <div className="email" style="
    border: 1px solid black;
    padding: 20px
    font-family: sans-serif;
    line-height: 2;
    font-size: 20px
  ">
    <h2>Hello There!</h2>
    <p>${text}</p>
  </div>
`

export {
  transport,
  makeANiceEmail,
}
