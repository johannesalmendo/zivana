"use client"
import React, { FC } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useSWR from 'swr';
import { fetcher } from '@/lib/utils';
import { columns } from '../columns';
import { DataTable } from '../data-table';


interface UsersPageProps {

}

interface UserData {
  id: string,
  name: string,
  email: string
}

const UsersPage: FC<UsersPageProps> = ({ }) => {

  const {
    data: dataUser,
    isLoading,
    error,
  } = useSWR(`api/users`, fetcher);

  const userData = dataUser?.data || [];

  console.log("USERS", userData);
  const data = [
    { id: 1, name: "nikky", email: "nikki@mail.com" },
    { id: 2, name: "alim", email: "alim@mail.com" }
  ]
  return (
    <div>
      <h1>Customer</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id Customer</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userData.map((item: UserData) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

  )
}

export default UsersPage;