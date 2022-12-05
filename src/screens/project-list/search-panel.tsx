import { Input, Select } from "antd";
type SearchPanelProps = {
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
};
export type User = {
  token: string;
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
};
export const SearchPanel = ({ param, setParam, users }: SearchPanelProps) => {
  return (
    <form action="">
      <div>
        <Input
          type={"text"}
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
        <Select
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>
          {users.map((user) => (
            <Select.Option value={user.id} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
