const db = require('../model')

const Bookmarks = db.bookmarks
const maxResults = 2

/*
Bookmark add controller
check if bookmark already exists
if not, add bookmark
*/
const add = async (req, res, next) => {
  const {email, title} = req.body
  try {
    const bookmark = await Bookmarks.findOne({where: {title}})
    if (bookmark) {
      return next({status: 400, message: 'Bookmark already exists'})
    }
    await Bookmarks.create({email, title})
    res.json({message: 'Bookmark added'})
  } catch (err) {
    next({status: 500, message: err})
  }
}
/*
Bookmark list controller
check if bookmarks exist
if yes, return bookmarks
*/
const list = async (req, res, next) => {
  const {email, startIndex} = req.body
  try {
    const bookmarks = await Bookmarks.findAll({
      attributes: ['title'], where: {email}, limit: maxResults, offset: startIndex
    })
    if (!bookmarks) {
      return next({status: 400, message: 'Bookmark does not exist'})
    }
    res.json({message: bookmarks.map((bookmark) => bookmark.title)}) // map to array of titles
  } catch (err) {
    next({status: 500, message: err})
  }
}
/*
Bookmark delete controller
check if bookmarks exist
if yes, delete bookmark
*/
const remove = async (req, res, next) => {
  const {email, title} = req.body
  try {
    const bookmark = await Bookmarks.findOne({where: {email, title}})
    if (!bookmark) {
      return next({status: 400, message: 'Bookmark does not exist'})
    }
    bookmark.destroy()
    res.json({message: 'Bookmark deleted'})
  } catch (err) {
    next({status: 500, message: err})
  }
}
module.exports = {add, list, remove}
