import React, { useEffect, useState } from "react";
import "./users.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../main";
import Layout from "../Utils/Layout";
import toast from "react-hot-toast";

const AdminUsers = ({ user }) => {
  const navigate = useNavigate();

  if (user && user.role !== "admin") return navigate("/");

  const [users, setUsers] = useState([]);

  async function fetchUsers() {
    try {
      const { data } = await axios.get(`${server}/api/users`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  const updateRole = async (id) => {
    if (confirm("Are you sure you want to update this user's role?")) {
      try {
        const { data } = await axios.put(
          `${server}/api/user/${id}`,
          {},
          {
            headers: {
              token: localStorage.getItem("token"),
            },
          }
        );

        toast.success(data.message);
        fetchUsers();
      } catch (error) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <Layout>
      <div className="users">
        <h1>All Users</h1>
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <td>#</td>
                <td>Name</td>
                <td>Email</td>
                <td>Role</td>
                <td>Update Role</td>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((e, i) => (
                  <tr key={e._id}>
                    <td data-label="#">{i + 1}</td>
                    <td data-label="Name">{e.name}</td>
                    <td data-label="Email">{e.email}</td>
                    <td data-label="Role">{e.role}</td>
                    <td data-label="Update Role">
                      <button
                        onClick={() => updateRole(e._id)}
                        className="common-btn"
                      >
                        Update Role
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminUsers;
