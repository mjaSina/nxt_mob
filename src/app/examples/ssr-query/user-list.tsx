"use client";

import { useQuery } from "@tanstack/react-query";
import { List, Avatar, Typography } from "antd";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

async function fetchUsers(): Promise<User[]> {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  return res.json();
}

export function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <List
      loading={isLoading}
      dataSource={data}
      renderItem={(user) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar style={{ backgroundColor: "#1677ff" }}>
                {user.name[0]}
              </Avatar>
            }
            title={<Typography.Text strong>{user.name}</Typography.Text>}
            description={`${user.email} — ${user.phone}`}
          />
        </List.Item>
      )}
    />
  );
}
