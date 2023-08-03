import { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NewNote from "./NewNote";
import NoteLayoutNew from "./NoteLayoutNew";

import { useLocalStorage } from "./useLocalStorage";
import NoteList from "./NoteList";
import Note from "./Note";
import EditNote from "./EditNote";

import { v4 as uuidV4 } from "uuid";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagIds: string[];
};

export type Tag = {
  id: string;
  label: string;
};

const App: React.FC = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  };

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((prevNotes) => {
      return prevNotes.map((note) => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map((tag) => tag.id) };
        } else {
          return note;
        }
      });
    });
  };

  const onDeleteNote = (id: string) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => note.id !== id);
    });
  };

  const addTag = (tag: Tag) => {
    setTags((prev) => [...prev, tag]);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<NoteList notes={notesWithTags} availableTags={tags} />}
      />
      <Route
        path="/new"
        element={
          <NewNote
            onSubmit={onCreateNote}
            onAddTag={addTag}
            availableTags={tags}
          />
        }
      />
      <Route path="/:id" element={<NoteLayoutNew notes={notesWithTags} />}>
        <Route index element={<Note onDelete={onDeleteNote} />} />
        <Route
          path="/:id/edit"
          element={
            <EditNote
              onSubmit={onUpdateNote}
              onAddTag={addTag}
              availableTags={tags}
            />
          }
        />
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
