import { useEffect, useState } from "react";

function getView() {
  if (typeof window === "undefined") return;
  const { innerWidth } = window;
  return innerWidth;
}

function ViewPort() {
  const [width, setWidth] = useState(getView());
  const [initialLoad, setInitialLoad] = useState(false);

  useEffect(() => {
    setInitialLoad(true);
    const handelResize = () => setWidth(getView);

    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  }, []);

  // if False  Beacuse ignore undefined
  // if initialLoad === false  width = undefined
  if (!initialLoad) return;

  return width;
}

export default ViewPort;
