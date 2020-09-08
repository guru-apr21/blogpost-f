import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import BlogForm from "./BlogFrom";

describe("<BlogForm/>", () => {
  let component;
  let handleCreate;

  beforeEach(() => {
    handleCreate = jest.fn();
    component = render(<BlogForm handleCreate={handleCreate}> </BlogForm>);
  });

  test("calls the handleCreate with appropriate details", () => {
    const title = component.container.querySelector("#title");
    const author = component.container.querySelector("#author");
    const url = component.container.querySelector("#url");
    const form = component.container.querySelector(".blogForm");

    fireEvent.change(title, { target: { value: "test title" } });
    fireEvent.change(author, { target: { value: "test author" } });
    fireEvent.change(url, { target: { value: "test url" } });
    fireEvent.submit(form);

    expect(handleCreate.mock.calls[0][0].author).toBe("test author");
    expect(handleCreate.mock.calls[0][0].title).toBe("test title");
    expect(handleCreate.mock.calls[0][0].url).toBe("test url");
  });
});
