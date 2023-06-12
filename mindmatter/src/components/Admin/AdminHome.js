import { Link, Routes, Route, Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

export default function AdminHome() {
  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            Admin
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-mdb-toggle="collapse"
            data-mdb-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i class="fas fa-bars"></i>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link
                  to="counsellorapproval"
                  class="nav-link active"
                  aria-current="page"
                >
                  Approve
                </Link>
              </li>
              <li class="nav-item">
                <Link to="counsellorlistforadmin" class="nav-link">
                  Counsellor list
                </Link>
              </li>
              <li class="nav-item">
                <Link to="patientlist" class="nav-link">
                  Patient List
                </Link>
              </li>
              <li class="nav-item">
                <Link to="/logout" class="nav-link">
                  LogOut
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="dashboard">
        <h1>Admin Dashboard</h1>
       
        <Outlet></Outlet>
      </div>
    </div>
  );
}
