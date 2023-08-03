import React, { FormEvent } from "react";
import styled from "styled-components";
import CreatableSelect from "react-select/creatable";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

import { NoteData, Tag } from "./App";
import { v4 as uuidv4 } from "uuid";

type NoteFormProbs = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

const NoteForm = ({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProbs) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });
    navigate("..");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <TitleTag>
        <FormPart>
          <label htmlFor="FormPart" style={{ margin: "10px" }}>
            Title
          </label>
          <input
            type="text"
            id="title"
            ref={titleRef}
            required
            defaultValue={title}
            style={{
              width: "200px",
              height: "30px",
              marginLeft: "10px",
              fontSize: "bold",
            }}
          />
        </FormPart>
        <FormPart>
          <label style={{ margin: "10px" }}> Tags</label>
          <span style={{ width: "200px", marginLeft: "10px" }}>
            <CreatableSelect
              onCreateOption={(label) => {
                const newTag = { id: uuidv4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
              }}
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

      <FormPart>
        <label style={{ marginTop: "10px", marginLeft: "10px" }}> Body</label>
        <textarea
          ref={markdownRef}
          required
          defaultValue={markdown}
          style={{ margin: "10px" }}
          rows={15}
        />
      </FormPart>

      <Buttons style={{ margin: "10px" }}>
        <SaveButton type="submit">Save</SaveButton>

        <Link to="..">
          <button
            type="button"
            style={{
              marginRight: "20px",
              width: "70px",
              height: "30px",
              // border: "none",
            }}
          >
            Cancel
          </button>
        </Link>
      </Buttons>
    </Form>
  );
};

export default NoteForm;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormPart = styled.div`
  display: flex;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const TitleTag = styled.div`
  display: flex;
`;

const SaveButton = styled.button`
  margin-right: 10px;
  width: 70px;
  height: 30px;
  background-color: #53a2f0;
  border: none;
  border-radius: 3px;

  &:hover {
    background-color: #8ebdec;
  }
`;
