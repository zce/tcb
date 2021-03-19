const { customAlphabet } = require('nanoid')
const { init } = require('@cloudbase/node-sdk')

const { ENV_ID, SECRET_ID, SECRET_KEY } = process.env

const app = init({ env: ENV_ID, secretId: SECRET_ID, secretKey: SECRET_KEY })

const db = app.database()

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 4)

const createSlug = async () => {
  const slug = nanoid()
  const collection = db.collection('links')
  const { total } = await collection.where({ slug }).count()
  if (!total) return slug
  return await createSlug()
}

exports.addLog = async (slug, ua, ip) => {
  const collection = db.collection('logs')
  await collection.add({ slug, ua, ip, date: new Date() })
}

exports.addLink = async (url, slug) => {
  slug = slug || await createSlug()
  const collection = db.collection('links')
  const res = await collection.add({ slug, url })
  return res.id && slug
}

exports.getUrlBySlug = async (slug) => {
  const collection = db.collection('links')
  const { data } = await collection.where({ slug }).get()
  return data[0] && data[0].url
}

exports.getSlugByUrl = async (url) => {
  const collection = db.collection('links')
  const { data } = await collection.where({ url }).get()
  return data[0] && data[0].slug
}
