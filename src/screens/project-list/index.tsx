import { List } from "./list";
import styled from "@emotion/styled";
import { SearchPanel } from "./search-panel";
import { useDebounce } from "utils";
import { Typography } from "antd";
import { useProjects } from "utils/project";
import { useUsers } from "utils/user";
import { useDocumentTitle } from "utils";
import { useProjectModal, useProjectSearchParams } from "./util";
import { ButtonNoPadding, Row } from "components/lib";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const { open } = useProjectModal();
  const [param, setParam] = useProjectSearchParams();
  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <Row between>
        <h1>项目列表</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      {/* <Button onClick={retry}>retry</Button> */}
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};
// ProjectListScreen.whyDidYouRender = true;
const Container = styled.div`
  padding: 3.2rem;
`;
