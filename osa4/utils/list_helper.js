const dummy = blogs => {
  return 1;
};

const totalLikes = blogs => {
  return blogs.length ? blogs.reduce((sum, blog) => sum + blog.likes, 0) : 0;
};

const favoriteBlog = blogs => {
  return blogs.length ? blogs.sort((a, b) => b.likes - a.likes)[0] : null;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
