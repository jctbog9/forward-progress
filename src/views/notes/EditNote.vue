<template>
  <div id="newNoteContainer">
    <h1>Edit A Note</h1>
    <text-editor-component-v2
      :noteTitle = "noteToEdit.title"
      :noteBody = "noteToEdit.body"
      :editNoteID = "this.$route.params.id"
      :type = "'note'"
    ></text-editor-component-v2>
  </div>
</template>

<script>
import TextEditorComponentV2 from '../../components/TextEditorComponentV2.vue';

export default {
  name: 'editnote',
  components: {
    TextEditorComponentV2
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('notes/getAllTags');
    this.$store.dispatch('notes/getNote', { id: this.$route.params.id })
  },
  computed: {
    noteToEdit(){
      return this.$store.getters['notes/noteToEdit'];
    },
    selected() {
      return this.$store.getters['notes/getSelectedTags']
    }
  }
}
</script>

<style scoped>
h1 {
  font-family: paralucent, sans-serif;
  font-weight: 400;
  color: #013369;
}

#newNoteContainer {
  margin: 10px 16% 0 16%;
}

/* CSS Here fixes menu buttons and styling */
.textButton {
  width: 5%;
  font-size: 0.75em;
  border-radius: 5px;
  vertical-align: middle;
  padding: 6px;
}

.buttonRow {
  position: relative;
  margin: 15px 0 5px 0;
}

.svg-inline--fa {
  vertical-align: -webkit-baseline-middle;
}

/* CSS here specifically fixed some of the text box's styling issues: */
.ProseMirror {
  padding: 6px;
}

.ProseMirror:focus {
  outline: none !important;
}

.editor li p {
  display: inline !important;
}

@media (max-width: 374px) {
  #newNoteContainer {
    margin: 10px 3% 0 3%;
  }
}

@media (min-width: 375px) and (max-width: 413px) {
  #newNoteContainer {
    margin: 10px 3% 0 3%;
  }
}

@media (min-width: 414px) and (max-width: 767px) {
  #newNoteContainer {
    margin: 10px 6% 0 6%;
  }
}

@media (min-width: 768px) and (max-width: 1365px) {
  #newNoteContainer {
    margin: 10px 10% 0 10%;
  }
}

@media (min-width: 1366px) and (max-width: 1599px) {
}

@media (min-width: 1600px) and (max-width: 1919px) {
}

@media (min-width: 1920px) {
}
</style>
