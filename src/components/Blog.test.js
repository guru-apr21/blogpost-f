import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

describe("<Blog/>", () => {
  let component;
  let incrementLikes;

  beforeEach(() => {
    const blog = { author: "test", title: "test", url: "test", likes: 0 };

    incrementLikes = jest.fn();
    component = render(
      <Blog blog={blog} incrementLikes={incrementLikes}></Blog>
    );
  });

  test("renders only the title and author not other details", () => {
    const content = component.container.querySelector(".visible");
    expect(content).toBeDefined();

    const hideContent = component.container.querySelector(".notVisible");
    expect(hideContent).toBe(null);
  });

  test("details displayed when button is clicked", () => {
    const button = component.getByText("view");
    fireEvent.click(button);

    const hideContent = component.container.querySelector(".notVisible");
    expect(hideContent).toBeDefined();
  });

  test("increment is called when like is clicked", () => {
    const viewButton = component.getByText("view");
    fireEvent.click(viewButton);

    const likeButton = component.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(incrementLikes.mock.calls).toHaveLength(2);
  });
});
