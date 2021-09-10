/* eslint-disable no-console */
import * as React from "react";

import Window from "./components/Window";
import styles from "./App.module.scss";

const App: React.FC = () => {
  return (
    <main className={styles.container}>
      {Array(4)
        .fill()
        .map((_, i) => {
          return <Window key={i + 1} id={i + 1} />;
        })}
    </main>
  );
};

export default App;
