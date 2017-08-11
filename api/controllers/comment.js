const Models = require('../database');

const getListComments = async(projectId, offset, range) => {
  try {
    let commentList = await Models.Comments.find({ projectId }).exec();
    if (!commentList)
      return Promise.resolve([]);
    let list = [];
    for (i in commentList) {
      let { name, content, projectId, postedTime } = commentList[i];
      let day = postedTime.getDate();
      let month = postedTime.getMonth() + 1;
      let year = postedTime.getFullYear();
      let hour = postedTime.getHours();
      let minute = postedTime.getMinutes();
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
