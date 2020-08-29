new Vue({
  el: "#app",
  data() {
    return {
      editorContent: '',

      openNoteIndex: null,

      movableNoteIndex: null,
      startPoint: {},
      isDrag: false,

      notes: [
        {
          id: 1,
          content: 'test',
          top: 20,
          left: 100,
          zIndex: 1,
        }
      ],
    };
  },
  watch: {
    openNoteIndex(newValue) {
      if (newValue === null) return;

      this.editorContent = (this.notes[newValue] && this.notes[newValue].content) || '';
    },
  },
  methods: {
    createNote(content) {
      this.notes.push({
        content,
        top: 200,
        left: 200,
        zIndex: this.getFreeZIndex(),
      });
    },

    getFreeZIndex() {
      return Math.max(...this.notes.map(note => note.zIndex)) + 1;
    },

    // handlers
    onClickAddNote() {
      this.openNoteIndex = this.notes.length;
    },
    onClickCloseEditor() {
      this.openNoteIndex = null;
    },
    onClickDeleteNote(index) {
      this.notes.splice(index, 1);
    },
    onClickSave() {
      if (this.openNoteIndex === null || !this.notes[this.openNoteIndex]) {
        this.createNote(this.editorContent);
      } else {
        this.notes[this.openNoteIndex].content = this.editorContent;
      }

      this.openNoteIndex = null;
    },

    onMouseDown(event, index) {
      this.movableNoteIndex = index;
      this.isDrag = false;
      this.startPoint = {
        x: event.offsetX,
        y: event.offsetY,
      }
    },
    onMouseMove(event) {
      this.isDrag = true;
      if (this.movableNoteIndex !== null) {
        this.notes[this.movableNoteIndex].top = event.pageY - this.startPoint.y;
        this.notes[this.movableNoteIndex].left = event.pageX - this.startPoint.x;
      }
    },
    onMouseUp(event, index) {
      this.movableNoteIndex = null;
      this.startPoint = {};

      if (!this.isDrag) {
        this.openNoteIndex = index;
      }
    },
  },
});
