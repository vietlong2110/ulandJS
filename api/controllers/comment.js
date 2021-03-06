const sanitize = require('sanitize-html');

const Models = require('../database');

const DEFAULT_OFFSET = 0;
const DEFAULT_RANGE = 5;

const getListComments = async(projectId, offset = DEFAULT_OFFSET, range = DEFAULT_RANGE) => {
  try {
    let commentList = await Models.Comments
    .find({ projectId })
    .sort({ postedTime: -1 })
    .skip(offset)
    .limit(range)
    .lean()
    .exec();
    if (!commentList)
      return Promise.resolve([]);
    let list = [];
    for (i in commentList) {
      let { name, content, projectId, postedTime } = commentList[i];
      postedTime.setUTCHours(postedTime.getUTCHours() + 7);
      let day = postedTime.getDate() < 10 ? '0' + postedTime.getDate() : postedTime.getDate();
      let month = postedTime.getMonth() + 1 < 10 ? '0' + (postedTime.getMonth() + 1) : postedTime.getMonth() + 1;
      let year = postedTime.getFullYear();
      let hour = postedTime.getHours() < 10 ? '0' + postedTime.getHours() : postedTime.getHours();
      let minute = postedTime.getMinutes() < 10 ? '0' + postedTime.getMinutes() : postedTime.getMinutes();
      postedTime = day + '-' + month + '-' + year + ', ' + hour + ':' + minute;
      list = list.concat({
        id: commentList._id,
        name, content, projectId, postedTime
      });
    }
    return Promise.resolve(list);
  } catch(err) {
    return Promise.reject(err);
  }
};

const addCommentToProject = async(projectId, name, content) => {
  name = sanitize(name); content = sanitize(content);
  let newComment = new Models.Comments({
    name, content, projectId
  });
  try {
    await newComment.save();
    return Promise.resolve();
  } catch(err) {
    return Promise.reject(err);
  }
};

const deleteCommentFromProject = async(commentId) => {
  try {
    let comment = await Models.Comments.findById(commentId).exec();
    if (comment)
      await comment.remove();
    return Promise.resolve();
  } catch(err) {
    return Promise.reject(err);
  }
};

module.exports = {
  getListComments,
  addCommentToProject,
  deleteCommentFromProject
};
