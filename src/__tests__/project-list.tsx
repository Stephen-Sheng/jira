import React, { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { ProjectListScreen } from "screens/project-list";
import fakeData from "./db.json";
import { AppProviders } from "context";

const apiUrl = process.env.REACT_APP_API_URL;

const server = setupServer(
  rest.get(`${apiUrl}/me`, (req, res, ctx) =>
    res(
      ctx.json({
        id: 1,
        name: "jack",
        token: "123",
      })
    )
  ),
  rest.get(`${apiUrl}/users`, (req, res, ctx) => res(ctx.json(fakeData.users))),
  rest.get(`${apiUrl}/projects`, (req, res, ctx) => {
    const { name = "", personId = undefined } = Object.fromEntries(
      req.url.searchParams
    );
    const result = fakeData.projects.filter((project) => {
      return (
        project.name.includes(name) &&
        (personId ? project.personId === Number(personId) : true)
      );
    });
    return res(ctx.json(result));
  })
);

beforeAll(() => server.listen());

const waitTable = () =>
  waitFor(() => expect(screen.getByText("骑手管理")).toBeInTheDocument());

// 每个测试跑完都重置mock路由
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("项目列表展示正常", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(fakeData.projects.length + 1);
});

test("搜索项目", async () => {
  renderScreen(<ProjectListScreen />, { route: "/projects?name=骑手" });
  await waitTable();
  expect(screen.getAllByRole("row").length).toBe(2);
});

export const renderScreen = (ui: ReactNode, { route = "/projects" } = {}) => {
  window.history.pushState({}, "Test Page", route);
  return render(<AppProviders>{ui}</AppProviders>);
};
