const express = require('express');
const {
  readAllAlbums,
  readAlbumById,
  updateAlbum,
  deleteAlbum,
} = require('../controllers/album');
const albumRouter = express.Router();

albumRouter.get('/albums/', readAllAlbums);
albumRouter.get('/albums/:id', readAlbumById);
albumRouter.patch('/albums/:id', updateAlbum);
albumRouter.delete('/albums/:id', deleteAlbum);

module.exports = albumRouter;
