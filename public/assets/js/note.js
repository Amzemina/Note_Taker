class Note {
    title; text; uniqid;
    constructor(title, text, uniqid = null){
        this.title = title;
        this.text = text;
        this.uniqid = uniqid;
    }
}

module.exports = Note;