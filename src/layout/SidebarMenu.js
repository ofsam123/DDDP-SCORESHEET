import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function SideBarMenu() {
  const { user } = useAuth();

  const currentUserRole = user?.user?.userRoles?.find(
    (role) =>
      role.name === "DPAT TECHNICAL TEAM" ||
      role.name === "DPAT QUALITY ASSURANCE" ||
      role.name === "DPAT DISTRICT USERS" ||
      role.name === "DPAT PETITION COMMITTEE"
  )?.name || "";
  const normalizedUserRole = currentUserRole;

  const currentUserRoleAPR = user?.user?.userRoles?.find(
    (role) =>
      role.name === "APR USER" ||
      role.name === "APR RCC" ||
      role.name === "NDPC USER"
  )?.name || "";
  const normalizedUserRoleAPR = currentUserRoleAPR;

  const isSpecialUser = user?.user?.username === "ofsam" || user?.user?.username === "msow" || user?.user?.username === "kofi" || user?.user?.username === "ayeboah";

  return (
    <div className="sidebar-menu">
      <ul>
        <li className="header-menu">General</li>

        {(isSpecialUser || normalizedUserRole) && (
          <li>
            <Link to="/">
              <i className="icon-home"></i>
              <span className="menu-text">Dashboard</span>
            </Link>
          </li>
        )}

        {(isSpecialUser || normalizedUserRole) && (
          <li>
            <Link to="/dpat-assessment-sheet">
              <i className="icon-phonelink"></i>
              <span className="menu-text">DPAT Assessment</span>
            </Link>
          </li>
        )}

        {(isSpecialUser || normalizedUserRole) && (
          <li>
            <Link to="/dpat-regional-analytics">
              <i className="icon-area-graph"></i>
              <span className="menu-text">Regional Analysis</span>
            </Link>
          </li>
        )}

        {(isSpecialUser || normalizedUserRole) && (
          <li>
            <Link to="/dpat-district-analytics">
              <i className="icon-pie-chart"></i>
              <span className="menu-text">District Analysis</span>
            </Link>
          </li>
        )}

        {(isSpecialUser || normalizedUserRole) && (
          <li>
            <Link to="/aap-analytics">
              <i className="icon-view_module"></i>
              <span className="menu-text">Annual Action Plan</span>
            </Link>
          </li>
        )}

        {(isSpecialUser || normalizedUserRole) && (
          <li>
            <Link to="/project-and-program-analytics">
              <i className="icon-view_stream"></i>
              <span className="menu-text">Projects & Program</span>
            </Link>
          </li>
        )}

        {(isSpecialUser || (!normalizedUserRole && normalizedUserRoleAPR)) && (
          <li>
            <Link to="/apr-report">
              <i className="icon-view_stream"></i>
              <span className="menu-text">Progress Report</span>
            </Link>
          </li>
        )}

       {isSpecialUser && <li>
          <Link to="/bulk-load">
            <i className="icon-upload"></i>
            <span className="menu-text">Bulk Load</span>
          </Link>
        </li>}
      </ul>
    </div>
  );
}

export default SideBarMenu;