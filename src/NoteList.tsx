import { Link } from "react-router-dom";
import styled from "styled-components";
import Select from "react-select";
import { useState, useMemo } from "react";

import { Tag } from "./App";

type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: SimplifiedNote[];
};

const NoteList = ({ availableTags, notes }: NoteListProps) => {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLocaleLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every((tag) =>
            note.tags.some((noteTag) => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <>
      <NotesDiv>
        <div>
          <h1>Notes</h1>
        </div>

        <Buttons>
          <Link to="/new">
            <CreateButton>Create</CreateButton>
          </Link>
          {/* <button style={{ marginLeft: "10px" }}>Edit Tags</button> */}
        </Buttons>
      </NotesDiv>
      <Form>
        <TitleTag>
          <FormPart>
            <label htmlFor="FormPart" style={{ margin: "10px" }}>
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
              style={{ width: "200px", height: "30px", marginLeft: "10px" }}
            />
          </FormPart>
          <FormPart>
            <label style={{ margin: "10px" }}> Tags</label>
            <span style={{ width: "200px", marginLeft: "10px" }}>
              <Select
                value={selectedTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                options={availableTags.map((tag) => {
                  return { label: tag.label, value: tag.id };
                })}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </span>
          </FormPart>
        </TitleTag>
      </Form>
      <NoteListDiv>
        {filteredNotes.map((note) => (
          <div key={note.id} style={{ margin: "10px 0" }}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </NoteListDiv>
    </>
  );
};

export default NoteList;

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Link to={`/${id}`} style={{ textDecoration: "none" }}>
      <NoteDiv>
        <NoteTitleDiv style={{ textAlign: "center" }}>{title}</NoteTitleDiv>
        {tags.length > 0 && (
          <div style={{ textAlign: "center" }}>
            {tags.map((tag) => (
              <TagDiv key={tag.id}>{tag.label}</TagDiv>
            ))}
          </div>
        )}
      </NoteDiv>
    </Link>
  );
};

const NotesDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Buttons = styled.div`
  display: flex;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormPart = styled.div`
  display: flex;
  flex-direction: column;
`;

const TitleTag = styled.div`
  display: flex;
  justify-content: space-around;
`;

const NoteListDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  margin-top: 30px;
`;

const NoteDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  height: 200px;
  width: 200px;
`;

const TagDiv = styled.div`
  text-decoration: none;
  color: white;
  background-color: #0984e3;
  padding: 5px;
  border-radius: 5px;
  margin: 3px 0;
`;

const NoteTitleDiv = styled.div`
  font-weight: bold;
  color: black;
  font-size: 20px;
`;

const CreateButton = styled.button`
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember", sans-serif;
  font-size: 15px;
  line-height: 35px;
  padding: 0 10px 0 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;

  &:hover {
    background-color: #f7fafa;
  }

  &:focus {
    border-color: #008296;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    outline: 0;
  }
`;
