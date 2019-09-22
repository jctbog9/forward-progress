import tagFiltering from './helpers/tagFiltering';
import starSort from './helpers/starSort';

export default {
  setUserNotes(state, notes) {
    const sortedNotes = starSort(notes);
    state.notes = sortedNotes;
    state.allNotes = sortedNotes;
    state.notesIndexNavigation.selectedNote = sortedNotes[0];
  },

  setTagsInMyNotes(state, tags) {
    state.tagsInMyNotes = tags;
  },

  setSearchObject(state, searchObject) {
    state.searchObject = searchObject;
  },

  selectedTagFilter(state, tags) {
    state.selectedTagsInMyNotes = tags;
    const unsortedFilteredNotes = tagFiltering(state, tags);
    state.notes = starSort(unsortedFilteredNotes);
  },

  filterType(state, filterType) {
    state.filterType = filterType;
    const unsortedFilteredNotes = tagFiltering(
      state,
      state.selectedTagsInMyNotes
    );
    state.notes = starSort(unsortedFilteredNotes);
  },

  setStarredNote(state, updatedNote) {
    const currentNoteId = updatedNote.id;
    const allNotesIndex = state.allNotes.findIndex(
      note => note.id === currentNoteId
    );
    state.allNotes[allNotesIndex].starred = updatedNote.starred;

    const notesIndex = state.notes.findIndex(note => note.id === currentNoteId);
    if (notesIndex !== -1) {
      state.notes[notesIndex].starred = updatedNote.starred;
    }

    state.notes = starSort(state.notes);
    state.allNotes = starSort(state.allNotes);
  },

  removeFromNotesList(state, noteId) {
    let currentNotes = state.notes;
    currentNotes = currentNotes.filter(note => {
      return note.id !== noteId;
    });
    state.notes = currentNotes;
  },

  filterToggle(state, newValue) {
    state.notesIndexNavigation.filterTagsOpen = newValue;
  },

  selectNote(state, note) {
    state.notesIndexNavigation.selectedNote = note;
  },

  setNewNote(state, note) {
    state.notes.push(note);
  },

  setNoteToEdit(state, noteToEdit) {
    state.noteToEdit = noteToEdit;
  },

  setSelected(state, newSelections) {
    state.selectedTags = newSelections;
  },

  clearSelected(state) {
    state.selectedTags = [];
  },

  loadSelectedTags(state, loadedSelections) {
    let tagsWithCodes = loadedSelections.map(tag => {
      tag.code = tag.id.toString();
      return tag;
    });
    state.selectedTags = tagsWithCodes;
  },

  loadAllTags(state, loadedTags) {
    let tagsWithCodes = loadedTags.map(tag => {
      tag.code = tag.id.toString();
      tag.new = false;
      return tag;
    });
    state.allTags = tagsWithCodes;
  },

  addNewTag(state, newTag) {
    state.allTags.push(newTag);
    state.selectedTags.push(newTag);
  }
};
