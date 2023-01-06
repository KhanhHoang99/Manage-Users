import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import TableUsers from "../components/TableUsers";
import PrivateRoute from "./PrivateRoute";

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route index element={<Home />} />
                <Route path="login" element={<Login />} />
                <Route path="*" element={<>page not found</>} />
                <Route 
                    path="/users"
                    element={
                        <PrivateRoute>
                            <TableUsers />
                        </PrivateRoute>
                    }
                />  
            </Routes>
        </>
    )
}

export default AppRoutes;