import React from "react";
import { Link } from "react-router-dom";


const Navigation = ({ isAuthorityAccount, isDoctorAccount }) => (
  <nav className="row row-centered">
    <div className="column column-25">
      <Link className="button button-outline" to="/check-immunity">Check Immunity</Link>
    </div>

    {isDoctorAccount && (
      <div className="column column-25">
        <Link className="button button-outline" to="/issue-certificate">Issue Certificate</Link>
      </div>)}

    {isAuthorityAccount && (
      <div className="column column-25">
        <Link className="button button-outline" to="/add-doctor">Add Doctor</Link>
      </div>

    )}
  </nav>
);

export default Navigation;
