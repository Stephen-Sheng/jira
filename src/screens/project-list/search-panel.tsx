/** @jsxImportSource @emotion/react */
import { Input, Form } from "antd";
import { UserSelect } from "components/user-select";
import { Project } from "./list";
type SearchPanelProps = {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
};
export type User = {
  token: string;
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
};
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          placeholder="项目名称"
          type={"text"}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName="负责人"
          value={param.personId}
          onChange={(value: number | undefined) => {
            setParam({ ...param, personId: value });
          }}
        />
      </Form.Item>
    </Form>
  );
};
