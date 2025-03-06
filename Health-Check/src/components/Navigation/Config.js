import React, { Fragment, useContext, useState } from "react";
import { FaCaretDown, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context";
import { userLinks } from "./links";
import styles from "./styles.module.css";

const Config = ({ name, roles }) => {
  const [newItems, setNewItems] = useState({});
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);

  const toggleHandler = (id) => {
    setNewItems((txt) => ({ ...txt, [id]: !txt[id] }));
  };

  const hasPermission = (roles, allowed) => allowed?.includes(roles);

  const logout = () => {
    authCtx.logout();
    window.location.reload(false);
    navigate("/");
  };

  return (
    <div className={styles.links}>
      <ul>
        {userLinks.map((item, i) => {
          if (!hasPermission(roles, item?.allowed)) return null;

          const isActive = name === item?.name;
          const hasChildren = item?.children;

          return (
            <Fragment key={i}>
              {hasChildren ? (
                <div className={styles.childContainer}>
                  <li
                    className={isActive ? styles.active : undefined}
                    onClick={() => toggleHandler(i)}
                  >
                    <span to={item.route}>
                      <item.Icon />
                      {item.name}
                      &nbsp;&nbsp;
                      <FaCaretDown />
                    </span>
                  </li>
                  {newItems[i] && (
                    <div className={styles.child}>
                      <ul>
                        {item?.children?.map((child, x) => {
                          if (!hasPermission(roles, child?.allowed))
                            return null;

                          return (
                            <li key={x} onClick={() => setNewItems({})}>
                              <Link to={child.route}>
                                <child.Icon />
                                <div className={styles.childname}>{child.name}</div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <li className={isActive ? styles.active : undefined} key={i}>
                  <Link to={item.route}>
                    <item.Icon />
                    <div className={styles.pageName}>{item.name}</div>
                  </Link>
                </li>
              )}
            </Fragment>
          );
        })}
        <li>
          <span onClick={logout}>
            <FaSignOutAlt />
            <div className={styles.pageName}>logout</div>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Config;
