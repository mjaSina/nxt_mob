"use client";

import { useApi } from "@/hooks/use-api";
import { usersApi } from "@/api/users";
import { List, Avatar, Button, Typography, Space, message } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";

interface User {
  id: number;
  name: string;
  email: string;
}

export function UsersDemo() {
  const { data, isLoading, post, remove } = useApi<User[]>(usersApi);

  const handleAdd = () => {
    post?.mutate(
      { name: "کاربر جدید", email: "new@test.com" },
      { onSuccess: () => message.success("کاربر اضافه شد (GET دوباره کال شد)") }
    );
  };

  const handleDelete = (id: number) => {
    remove?.mutate(
      { id } as never,
      { onSuccess: () => message.success("کاربر حذف شد (GET دوباره کال شد)") }
    );
  };

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          loading={post?.isPending}
          onClick={handleAdd}
        >
          افزودن کاربر (POST)
        </Button>
      </Space>

      <List
        loading={isLoading}
        dataSource={data}
        renderItem={(user) => (
          <List.Item
            actions={[
              <Button
                key="delete"
                danger
                size="small"
                icon={<DeleteOutlined />}
                loading={remove?.isPending}
                onClick={() => handleDelete(user.id)}
              >
                حذف (DELETE)
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Avatar style={{ backgroundColor: "#1677ff" }}>
                  {user.name[0]}
                </Avatar>
              }
              title={<Typography.Text strong>{user.name}</Typography.Text>}
              description={user.email}
            />
          </List.Item>
        )}
      />
    </div>
  );
}
