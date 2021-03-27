const storage = require('../lib/storage')

/** @type {import('express').RequestHandler} */
module.exports = async (req, res) => {
  // params from request body
  const { url, slug } = req.body

  // url is required
  if (!url) return res.status(400).send({ message: 'Missing required parameter: url.' })

  // url format check
  if (!/^https?:\/\/.{3,}/.test(url)) {
    return res.status(400).send({ message: 'Illegal format: url.' })
  }

  // custom slug length check
  if (slug && (slug.length < 2 || slug.length > 10)) {
    return res.status(400).send({ message: 'Illegal length: slug, (>= 2 && <= 10).' })
  }

  try {
    // request origin url
    const origin = `${req.protocol}://${req.get('host')}/`

    // if slug customized
    if (slug) {
      const existUrl = await storage.getUrlBySlug(slug)

      // url & slug are the same.
      if (existUrl === url) {
        return res.send({ slug, link: origin + slug })
      }

      // slug already exists
      if (existUrl) {
        return res.status(400).send({ message: 'Slug already exists.' })
      }
    }

    // target url exists
    const existSlug = await storage.getSlugByUrl(url)

    // url exists & no custom slug
    if (existSlug && !slug) {
      return res.send({ slug: existSlug, link: origin + existSlug })
    }

    // create if not exists
    const newSlug = await storage.addLink(url, slug)

    // response
    res.send({ slug: newSlug, link: origin + newSlug })
  } catch (e) {
    res.status(500).send({ message: e.message })
  }
}
