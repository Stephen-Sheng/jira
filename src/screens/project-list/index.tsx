import React from "react";
import { List } from "./list";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, ErrorBox, Row } from "components/lib";
import { Profiler } from "components/profiler";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Profiler id="项目列表">
      <Container>
        <Row between>
          <h1>项目列表</h1>
          <ButtonNoPadding onClick={open} type={"link"}>
            创建项目
          </ButtonNoPadding>
        </Row>
        {/* <Button onClick={retry}>retry</Button> */}
        <SearchPanel param={param} setParam={setParam} users={users || []} />
        <ErrorBox error={error} />
        <List loading={isLoading} dataSource={list || []} users={users || []} />
      </Container>
    </Profiler>
  );
};
// ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
