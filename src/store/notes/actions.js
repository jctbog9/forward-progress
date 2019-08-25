import * as NotesApi from '../../util/NotesApi.js';

export default {
  getUserNotes(context) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        NotesApi.getUserNotes().then(response => {
          context.commit('setUserNotes', response);
          resolve();
        });
      }
    });
  },

  getNote(context, payload) {
    return new Promise(resolve => {
      if (context.loaded) {
        resolve();
      } else {
        NotesApi.getEditNote(payload.id).then(response => {
          context.commit('setNoteToEdit', response);
        });
      }
    });
  },

  saveNote(context, payload) {
    return new Promise(resolve => {
      NotesApi.saveNote(payload.title, payload.body).then(note => {
        context.commit('setNewNote', note);
        resolve();
      });
    });
  }
};
