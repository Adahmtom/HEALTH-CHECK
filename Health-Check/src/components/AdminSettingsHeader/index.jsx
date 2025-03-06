import React from "react";
import { Link } from "react-router-dom";
import { PrivatePaths } from "../../routes/path";
import "./styles.css";

const AdminSettingsHeader = (props) => {
	return (
		<div className="menubar">
			<ul>
				<li className={props.time}>
					<Link to={PrivatePaths.ADMIN_SETTINGS}> Time</Link>
				</li>
				<li className={props.location}>
					<Link to={PrivatePaths.ADMIN_SETTINGS_LOCATION}>
						Location
					</Link>
				</li>

				<li className={props.authentication}>
					<Link to={PrivatePaths.ADMIN_SETTINGS_AUTHENTICATION}>
						Authentication
					</Link>
				</li>
				
			</ul>
		</div>
	);
};

export default AdminSettingsHeader;
