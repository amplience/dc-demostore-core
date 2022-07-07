import React, { useEffect, useState } from "react";

const WindowContext = React.createContext({ w: 0, h: 0 });

export function WithWindowContext({
  children,
}: {
  children: React.ReactNode;
}) {
  

  const [state, setState] = useState({ w: 0, h: 0 });

  const resizeWindow = () => {
    setState({ w: window.innerWidth, h: window.innerHeight });
  }

  useEffect(() => {
    const {
      innerWidth,
      innerHeight
    } = window as any || {};
    setState({w: innerWidth, h: innerHeight});
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  return (
    <WindowContext.Provider value={state}>
      {children}
    </WindowContext.Provider>
  );
}

export function useWindowContext() {
  return React.useContext(WindowContext);
}
