import Button from "@atlaskit/button";
import React from "react";
import styled, { css } from "styled-components";
import CheckIcon from "@atlaskit/icon/glyph/check";
import RemoveIcon from "@atlaskit/icon/glyph/trash";

const ButtonStyled = styled(Button)`
  margin-top: 5px;
  text-align: left;

  &,
  &:hover {
    ${(p) =>
      p.isCompleted &&
      css`
        text-decoration: line-through;
      `}
  }

  &:hover {
    .check-icon,
    .remove-icon {
      display: block;
    }
  }

  .check-icon,
  .remove-icon {
    display: none;
    padding: 3px;
    border-radius: 5px;
    &:hover {
      background-color: #cccbca;
    }
  }
`;

const Todo = (props) => {
  return (
    <ButtonStyled
      isCompleted={props.todo.isCompleted}
      shouldFitContainer
      iconAfter={
        (!props.todo.isCompleted && (
          <span
            className="check-icon"
            onClick={() => props.onCheckButtonClick(props.todo.id)}
          >
            <CheckIcon primaryColor="#32cc27"></CheckIcon>
          </span>
        )) || (
          <span
            className="remove-icon"
            onClick={() => props.onRemoveBtnClick(props.todo.id)}
          >
            <RemoveIcon primaryColor="red"></RemoveIcon>
          </span>
        )
      }
    >
      {props.todo.name}
    </ButtonStyled>
  );
};
export default Todo;
