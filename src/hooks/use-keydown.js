import React from "react";

function useKeydown(key, callback) {
  React.useEffect(() => {
    const onEscKeydown = (event) => {
      if (event.code === key) {
        callback();
      }
    };
    window.addEventListener("keydown", onEscKeydown);
    return () => {
      window.removeEventListener("keydown", onEscKeydown);
    };
  }, [key, callback]);
}

export default useKeydown;
