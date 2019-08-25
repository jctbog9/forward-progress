/* eslint consistent-return: "off" */
const passport = require('passport');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const _ = require('lodash');
const DB = require('../../db/models');
const { Note, User, Usernote } = DB;
const errorHandler = require('../core/errorHandler');
const { getAccessToken } = require('../users/token');
const logger = require('../logger');

exports.getNotes = (req, res) => {
  let notes = null;
  Note.findAll().then(notes => {
    res.json(notes);
  });
};

exports.myNotes = (req, res) => {
  let notes = null;
  if (req.user) {
    User.findByPk(req.user.dataValues.id, {
      include: [
        {
          model: Note,
          as: 'notes'
        }
      ]
    }).then(user => {
      res.json(user);
    });
  } else {
    return res.status(401).send({});
  }
};

exports.getNote = (req, res) => {
  if (req.user) {
    console.log(req.params);
    Note.findByPk(req.params.id)
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  } else {
    return res.status(401).send({});
  }
};

exports.newNote = (req, res) => {
  if (req.user) {
    const newNote = Object.assign({
      title: req.body.title,
      body: req.body.body
    });
    Note.create(newNote)
      .then(newNote => {
        const newUsernote = Object.assign({
          UserId: req.user.dataValues.id,
          NoteId: newNote.id
        });
        Usernote.create(newUsernote);
        return newNote;
      })
      .then(note => {
        res.json(note);
      })
      .catch(err => {
        res.status(400).send(err);
      });
  } else {
    return res.status(401).send({});
  }
};
