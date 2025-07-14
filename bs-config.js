module.exports = {
  server: {
    baseDir: "./",
    middleware: function (req, res, next) {
      // .html拡張子なしでアクセスした場合の処理
      if (req.url.match(/\/events\/[^.]+$/)) {
        req.url += ".html";
      }
      next();
    },
  },
  port: 3000,
  files: ["*.html", "events/*.html", "dist/*.css"],
  notify: false,
  open: false,
};
