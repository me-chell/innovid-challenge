/* eslint-disable prettier/prettier */
import * as React from "react";

import styles from "./Window.module.scss";

let REFRESH_TIME = 0;

const Window: React.FC = ({id}) => {
  const [server, setServer] = React.useState({id, status: true, load: 0});

  React.useEffect(() => {
    if (server.status === false) return;

    const intervalId = setInterval(() => {
      const fetchApi = async () => {
        const res = await fetch(`http://localhost:8000/status/${server.id}`);
        const data = await res.json();

        setServer((prev) => ({...prev, ...data}));
      };

      fetchApi();
      REFRESH_TIME = 5000;
    }, REFRESH_TIME);

    return () => clearInterval(intervalId);
  }, [server]);

  const handleClick = () => {
    REFRESH_TIME = 0;
    setServer((prev) => ({...prev, load: 0, status: !prev.status}));
  };

  return (
    <div
      key={server.id}
      className="window"
      style={{
        width: 320,
        margin: "auto",
      }}
    >
      <div className="title-bar">
        <div className="title-bar-text">Server #{server.id}</div>
      </div>
      <div className={styles.windowBody}>
        <img alt="server picture" className={styles.picture} src={server.status ? "../src/assets/pc-on.gif" : "../src/assets/pc-off.png"}  />
      </div>
      <div className={`${styles.statusBar} window-status-bar`}>
        <span className="status-bar-field">Status: {server.status ? "ON" : "OFF"}</span>
        <span className={`${styles.statusButton} status-bar-field`} onClick={handleClick}>
          {server.status ? "shut down" : "turn on"}
        </span>
        <span className="status-bar-field">CPU Usage: {server.load}%</span>
      </div>
    </div>
  );
};

export default Window;
