import React from "react";
import { Link } from "react-router-dom";


const Navigation = () => (
  <nav className="row row-centered">
    <div className="column column-25">
      <Link className="button button-outline" to="/check-immunity/">Check Certificate</Link>
    </div>
    <div className="column column-25">
      <Link className="button button-outline" to="/tester-approval/">Authority Approval</Link>
    </div>
    <div className="column column-25">
      <Link className="button button-outline" to="/issue-certificate/">Issue Certificate</Link>
    </div>
    
  </nav>
);

export default Navigation;
