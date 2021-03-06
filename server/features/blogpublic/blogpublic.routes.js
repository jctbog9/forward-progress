const passport = require('passport');
const multer = require('multer');
const multerConfig = {
  // dest: './profile/images/',
  limits: {
    fileSize: 1 * 1024 * 1024 // Max file size in bytes (1 MB)
  },
  fileFilter: (req, file, callback) => {
    if (
      file.mimetype !== 'image/png' &&
      file.mimetype !== 'image/jpg' &&
      file.mimetype !== 'image/jpeg' &&
      file.mimetype !== 'image/gif'
    ) {
      const err = new Error();
      err.code = 'UNSUPPORTED_MEDIA_TYPE';
      return callback(err, false);
    }
    return callback(null, true);
  }
};

module.exports = app => {
  const blog = require('./blogpublic.controller');

  app.route('/api/public/getBlogPosts').get(blog.getBlogPosts);
  app
    .route('/api/public/getPageOfBlogPosts/:page')
    .get(blog.getPageOfBlogPosts);
};
