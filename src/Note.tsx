import { Link, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { useNote } from "./NoteLayoutNew";
import styled from "styled-components";

type NoteProps = {
  onDelete: (id: string) => void;
};

const Note = ({ onDelete }: NoteProps) => {
  const note = useNote();
  const navigate = useNavigate();
  return (
    <>
      <MainDiv>
        <div>
          <h1>{note.title}</h1>
          {note.tags.length > 0 && (
            <TagListDiv>
              {note.tags.map((tag) => (
                <TagDiv key={tag.id}>{tag.label}</TagDiv>
              ))}
            </TagListDiv>
          )}
        </div>
        <div>
          <Link to={`/${note.id}/edit`}>
            <Button style={{ backgroundColor: "#0984e3", color: "white" }}>
              Edit
            </Button>
          </Link>
          <Link to={"/"}>
            <Button
              style={{ color: "red" }}
              onClick={() => {
                onDelete(note.id);
                navigate("/");
              }}
            >
              Delete
            </Button>
          </Link>
          <Link to={"/"}>
            <Button>Back</Button>
          </Link>
        </div>
      </MainDiv>
      <ReactMarkdown>{note.markdown}</ReactMarkdown>
      {/* <BodyDiv>{note.markdown}</BodyDiv> */}
    </>
  );
};

export default Note;

const Button = styled.button`
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
  margin: 10px 5px;

  &:hover {
    background-color: #f7fafa;
  }

  &:focus {
    border-color: #008296;
    box-shadow: rgba(213, 217, 217, 0.5) 0 2px 5px 0;
    outline: 0;
  }
`;

const MainDiv = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const TagDiv = styled.div`
  text-decoration: none;
  color: white;
  background-color: #0984e3;
  padding: 5px;
  border-radius: 5px;
  margin: 3px 0;
  font-weight: bold;
`;

const TagListDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BodyDiv = styled.div`
  display: flex;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  margin: 10px 30px;
  padding: 0 10px;
  line-height: 35px;
`;
