const express = require('express');
const router = express.Router();

const Controllers = require('./controllers');

const InternalErr = (err, res) =>
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production"
    ? "Something wrong happened internally. Please try again!"
    : err.message,
    log: process.env.NODE_ENV === "production" ? null : err.stack
  });

router.get('/search-map', async(req, res) => {
  try {
    let list = await Controllers.Search.listByDistance(req.query.location, req.query.dist);
    res.json({
      list
    });
  } catch(err) {
    res.json({
      err
    });
  }
});

// router.get('/chung-cu', async(req, res) => {
//   try {
//     let { offset, size } = req.query;
//     let list = await Controllers.List.Apartments(offset, size);
//     res.json({
//       list
//     });
//   } catch(err) {
//     res.json({
//       err
//     });
//   }
// });

// router.get('/biet-thu', async(req, res) => {
//   try {
//     let { offset, size } = req.query;
//     let list = await Controllers.List.Villas(offset, size);
//     res.json({
//       list
//     })
//   } catch(err) {
//     res.json({
//       err
//     });
//   }
// });
//
// router.get('/chuyen-gia', async(req, res) => {
//   try {
//     let { offset, size } = req.query;
//     let list = await Controllers.List.Partners(offset, size);
//     res.json({
//       list
//     })
//   } catch(err) {
//     res.json({
//       err
//     });
//   }
// });

// router.get('/tim-kiem', async(req, res) => {
//   try {
//     let { offset, size, ...args } = req.query;
//     let list = await Controllers.Search.listByQuery(offset, size, ...s);
//   } catch(err) {
//     res.json({
//       err
//     });
//   }
// });

// router.get('/du-an/:id', async(req, res) => {
//   try {
//     let details = await Controllers.Info.detailProject(req.params.id);
//     res.json({
//       details
//     });
//   } catch(err) {
//     res.json({
//       err
//     });
//   }
// });
//
// router.get('/chuyen-gia/:id', async(req, res) => {
//   try {
//     let details = await Controllers.Info.detailPartner(req.params.id);
//     res.json({
//       details
//     });
//   } catch(err) {
//     res.json({
//       err
//     });
//   }
// });

router.get('/comment', async(req, res) => {
  let { id, offset, range } = req.query;
  try {
    let commentList = await Controllers.Comment.getListComments(id, offset, range);
    res.json({ commentList });
  } catch(err) {
    res.json({ err });
  }
});

router.post('/comment', async(req, res) => {
  let { projectId, name, content } = req.body;
  try {
    await Controllers.Comment.addCommentToProject(projectId, name, content);
    res.json({
      success: true
    })
  } catch(err) {
    res.json({ err });
  }
});

router.delete('/comment', async(req, res) => {
  let id = req.body.id;
  try {
    await Controllers.Comment.deleteCommentFromProject(id);
    res.json({
      success: true
    });
  } catch(err) {
    res.json({ err });
  }
});

module.exports = router;
