import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ShowList from "./Pages/ShowList";
import EditUser from "./User/EditUser";
import Detail from "./Pages/Detail";
import CreateUser from "./User/CreateUser";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/list" replace />} />
        <Route path="/list" element={<ShowList />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/update" element={<EditUser />} />
        <Route path="/create" element={<CreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}
