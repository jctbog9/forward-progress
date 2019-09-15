export default function starSort(notes) {
  let starredNotes = [];
  let unStarredNotes = [];
  notes.forEach(note => {
    if (note.starred) {
      starredNotes.push(note);
    } else {
      unStarredNotes.push(note);
    }
  });

  starredNotes = starredNotes.sort((earlier, later) => {
    return later.createdAt - earlier.createdAt;
  });

  unStarredNotes = unStarredNotes.sort((earlier, later) => {
    return later.createdAt - earlier.createdAt;
  });

  return starredNotes.concat(unStarredNotes);
}
