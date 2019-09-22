<template>
  <div>
    <h6>Title:</h6><input v-model="title" type="text" tabindex="1" v-on:keydown="focusEditor" />
    <vue-editor v-model="content" ref="editor"></vue-editor>
    <div class="editorTagDiv">
      <h6>Add Tags:</h6>
      <multiselect
        v-model="selected"
        tag-placeholder="Add this as a new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :taggable="true"
        :multiple="true"
        @tag="addTag" />
    </div>
    <div class="buttonRow">
      <router-link to="/notes" tag="button" v-if="this.editNoteID">Cancel</router-link>
      <button v-on:click="clearEditor" v-if="!this.editNoteID">Clear</button>
      <button v-on:click="saveNote">Save Note</button>
      <button v-on:click="deleteNote" v-if="this.editNoteID">Delete Note</button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';

export default {
  name: 'TextEditorComponentV2',

  components: {Multiselect},

  mixins: [],

  props: [ 'noteTitle', 'noteBody', 'editNoteID' ],

  data() {
    return {
      title: null,
      content: null
    }
  },
  watch: {
    noteTitle: function() {
      this.title = this.noteTitle;
    },
    noteBody: function() {
      this.content = this.noteBody
    }
  },
  computed: {
   options() {
      return this.$store.getters['notes/getAllTags'];
    },
    selected: {
      get: function() {
        return this.$store.getters['notes/getSelectedTags'];
      },
      set: function(updatedTags) {
        this.$store.dispatch('notes/updateTagSelection', updatedTags);
      }
    }
  },

  methods: {
    clearEditor() {
      this.$store.dispatch('notes/clearTagSelection');
      this.selected = [];
      this.content = null;
    },
    saveNote() {
      if (this.editNoteID) {
        this.$store.dispatch('notes/editNote', {
          title: this.title,
          body: this.content,
          id: this.editNoteID,
          tags: this.selected,
          allTags: this.options
        })
      } else {
        this.$store.dispatch('notes/saveNote', {
          title: this.title,
          body: this.content,
          tags: this.selected,
          allTags: this.options
        });
      }
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 100000000)),
        new: true
      }
      this.$store.dispatch('notes/createNewTag', tag);
    },
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', {
        id: this.editNoteID,
        source: 'editor'
      });
    },
    focusEditor(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        this.$refs.editor.quill.focus();
      }
    }
  },

  mounted() {
    // Invoked when the component loads, good place to fetch data from the API
  }
};
</script>

<style>
  .buttonRow {
    position: relative;
    margin: 15px 0 5px 0;
  }

  /* STYLES FOR FIXING TAGS */
  .editorTagDiv {
    margin: 15px 0 15px 0;
  }

  .multiselect__input {
    border: none !important;
  }

  /*
  STYLES FROM MULTISELECT (EXTRACTED FROM THEIR
  CSS FILE - NEEDED CUSTOMIZATION) 
  STICK THESE IN A SEPARATE FILE SOMETIME 
  */

  fieldset[disabled] .multiselect {
      pointer-events: none
  }
  .multiselect__spinner {
      position: absolute;
      right: 1px;
      top: 1px;
      width: 48px;
      height: 35px;
      background: #fff;
      display: block
  }
  .multiselect__spinner:after,
  .multiselect__spinner:before {
      position: absolute;
      content: "";
      top: 50%;
      left: 50%;
      margin: -8px 0 0 -8px;
      width: 16px;
      height: 16px;
      border-radius: 100%;
      border-color: #41b883 transparent transparent;
      border-style: solid;
      border-width: 2px;
      box-shadow: 0 0 0 1px transparent
  }
  .multiselect__spinner:before {
      animation: a 2.4s cubic-bezier(.41, .26, .2, .62);
      animation-iteration-count: infinite
  }
  .multiselect__spinner:after {
      animation: a 2.4s cubic-bezier(.51, .09, .21, .8);
      animation-iteration-count: infinite
  }
  .multiselect__loading-enter-active,
  .multiselect__loading-leave-active {
      transition: opacity .4s ease-in-out;
      opacity: 1
  }
  .multiselect__loading-enter,
  .multiselect__loading-leave-active {
      opacity: 0
  }
  .multiselect,
  .multiselect__input,
  .multiselect__single {
      font-family: inherit;
      font-size: 16px;
      -ms-touch-action: manipulation;
      touch-action: manipulation
  }
  .multiselect {
      box-sizing: content-box;
      display: block;
      position: relative;
      width: 100%;
      min-height: 40px;
      text-align: left;
      color: #35495e
  }
  .multiselect * {
      box-sizing: border-box
  }
  .multiselect:focus {
      outline: none
  }
  .multiselect--disabled {
      opacity: .6
  }
  .multiselect--active {
      z-index: 1
  }
  .multiselect--active:not(.multiselect--above) .multiselect__current,
  .multiselect--active:not(.multiselect--above) .multiselect__input,
  .multiselect--active:not(.multiselect--above) .multiselect__tags {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0
  }
  .multiselect--active .multiselect__select {
      transform: rotate(180deg)
  }
  .multiselect--above.multiselect--active .multiselect__current,
  .multiselect--above.multiselect--active .multiselect__input,
  .multiselect--above.multiselect--active .multiselect__tags {
      border-top-left-radius: 0;
      border-top-right-radius: 0
  }
  .multiselect__input,
  .multiselect__single {
      position: relative;
      display: inline-block;
      min-height: 20px;
      line-height: 20px;
      border: none;
      border-radius: 5px;
      background: #fff;
      padding: 0 0 0 5px;
      width: 100%;
      transition: border .1s ease;
      box-sizing: border-box;
      margin-bottom: 8px;
      vertical-align: top
  }
  .multiselect__input::-webkit-input-placeholder {
      color: #35495e
  }
  .multiselect__input:-ms-input-placeholder {
      color: #35495e
  }
  .multiselect__input::placeholder {
      color: #35495e
  }
  .multiselect__tag ~ .multiselect__input,
  .multiselect__tag ~ .multiselect__single {
      width: auto
  }
  .multiselect__input:hover,
  .multiselect__single:hover {
      border-color: #cfcfcf
  }
  .multiselect__input:focus,
  .multiselect__single:focus {
      border-color: #a8a8a8;
      outline: none
  }
  .multiselect__single {
      padding-left: 5px;
      margin-bottom: 8px
  }
  .multiselect__tags-wrap {
      display: inline
  }
  .multiselect__tags {
      min-height: 40px;
      display: block;
      padding: 8px 40px 0 8px;
      border-radius: 5px;
      border: 1px solid #e8e8e8;
      background: #fff;
      font-size: 14px
  }
  .multiselect__tag {
      position: relative;
      display: inline-block;
      padding: 4px 26px 4px 10px;
      border-radius: 5px;
      margin-right: 10px;
      color: #fff;
      line-height: 1;
      background: #0E4689;
      margin-bottom: 5px;
      white-space: nowrap;
      overflow: hidden;
      max-width: 100%;
      text-overflow: ellipsis
  }
  .multiselect__tag-icon {
      cursor: pointer;
      margin-left: 7px;
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      font-weight: 700;
      font-style: normal;
      width: 22px;
      text-align: center;
      line-height: 22px;
      transition: all .2s ease;
      border-radius: 5px
  }
  .multiselect__tag-icon:after {
      content: "\D7";
      color: white;
      font-size: 14px
  }
  .multiselect__tag-icon:focus,
  .multiselect__tag-icon:hover {
      background: #606c76
  }
  .multiselect__tag-icon:focus:after,
  .multiselect__tag-icon:hover:after {
      color: #fff
  }
  .multiselect__current {
      min-height: 40px;
      overflow: hidden;
      padding: 8px 12px 0;
      padding-right: 30px;
      white-space: nowrap;
      border-radius: 5px;
      border: 1px solid #e8e8e8
  }
  .multiselect__current,
  .multiselect__select {
      line-height: 16px;
      box-sizing: border-box;
      display: block;
      margin: 0;
      text-decoration: none;
      cursor: pointer
  }
  .multiselect__select {
      position: absolute;
      width: 40px;
      height: 38px;
      right: 1px;
      top: 1px;
      padding: 4px 8px;
      text-align: center;
      transition: transform .2s ease
  }
  .multiselect__select:before {
      position: relative;
      right: 0;
      top: 65%;
      color: #999;
      margin-top: 4px;
      border-style: solid;
      border-width: 5px 5px 0;
      border-color: #999 transparent transparent;
      content: ""
  }
  .multiselect__placeholder {
      color: #adadad;
      display: inline-block;
      margin-bottom: 10px;
      padding-top: 2px
  }
  .multiselect--active .multiselect__placeholder {
      display: none
  }
  .multiselect__content-wrapper {
      position: absolute;
      display: block;
      background: #fff;
      width: 100%;
      max-height: 240px;
      overflow: auto;
      border: 1px solid #e8e8e8;
      border-top: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
      z-index: 1;
      -webkit-overflow-scrolling: touch
  }
  .multiselect__content {
      list-style: none;
      display: inline-block;
      padding: 0;
      margin: 0;
      min-width: 100%;
      vertical-align: top
  }
  .multiselect--above .multiselect__content-wrapper {
      bottom: 100%;
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;
      border-bottom: none;
      border-top: 1px solid #e8e8e8
  }
  .multiselect__content::webkit-scrollbar {
      display: none
  }
  .multiselect__element {
      display: block
  }
  .multiselect__option {
      display: block;
      padding: 12px;
      min-height: 40px;
      line-height: 16px;
      text-decoration: none;
      text-transform: none;
      vertical-align: middle;
      position: relative;
      cursor: pointer;
      white-space: nowrap
  }
  .multiselect__option:after {
      top: 0;
      right: 0;
      position: absolute;
      line-height: 40px;
      padding-right: 12px;
      padding-left: 20px;
      font-size: 13px
  }
  .multiselect__option--highlight {
      background: #41b883;
      outline: none;
      color: #fff
  }
  .multiselect__option--highlight:after {
      content: attr(data-select);
      background: #41b883;
      color: #fff
  }
  .multiselect__option--selected {
      background: #f3f3f3;
      color: #35495e;
      font-weight: 700
  }
  .multiselect__option--selected:after {
      content: attr(data-selected);
      color: silver
  }
  .multiselect__option--selected.multiselect__option--highlight {
      background: #ff6a6a;
      color: #fff
  }
  .multiselect__option--selected.multiselect__option--highlight:after {
      background: #ff6a6a;
      content: attr(data-deselect);
      color: #fff
  }
  .multiselect--disabled {
      background: #ededed;
      pointer-events: none
  }
  .multiselect--disabled .multiselect__current,
  .multiselect--disabled .multiselect__select,
  .multiselect__option--disabled {
      background: #ededed;
      color: #a6a6a6
  }
  .multiselect__option--disabled {
      cursor: text;
      pointer-events: none
  }
  .multiselect__option--group {
      background: #ededed;
      color: #35495e
  }
  .multiselect__option--group.multiselect__option--highlight {
      background: #35495e;
      color: #fff
  }
  .multiselect__option--group.multiselect__option--highlight:after {
      background: #35495e
  }
  .multiselect__option--disabled.multiselect__option--highlight {
      background: #dedede
  }
  .multiselect__option--group-selected.multiselect__option--highlight {
      background: #ff6a6a;
      color: #fff
  }
  .multiselect__option--group-selected.multiselect__option--highlight:after {
      background: #ff6a6a;
      content: attr(data-deselect);
      color: #fff
  }
  .multiselect-enter-active,
  .multiselect-leave-active {
      transition: all .15s ease
  }
  .multiselect-enter,
  .multiselect-leave-active {
      opacity: 0
  }
  .multiselect__strong {
      margin-bottom: 8px;
      line-height: 20px;
      display: inline-block;
      vertical-align: top
  }
  [dir=rtl] .multiselect {
      text-align: right
  }
  [dir=rtl] .multiselect__select {
      right: auto;
      left: 1px
  }
  [dir=rtl] .multiselect__tags {
      padding: 8px 8px 0 40px
  }
  [dir=rtl] .multiselect__content {
      text-align: right
  }
  [dir=rtl] .multiselect__option:after {
      right: auto;
      left: 0
  }
  [dir=rtl] .multiselect__clear {
      right: auto;
      left: 12px
  }
  [dir=rtl] .multiselect__spinner {
      right: auto;
      left: 1px
  }
  @keyframes a {
      0% {
          transform: rotate(0)
      }
      to {
          transform: rotate(2turn)
      }
  }
</style>