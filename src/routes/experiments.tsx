import { useEffect, useRef, useState } from "react";

const Component = ({ value }: { value: number }) => {
  const ref = useRef(false);
  ref.current = true;
  return <div>{value}</div>;
};

// const MemoComp = memo(Component);

export const Experiments = () => {
  const [value, setValue] = useState(0);
  const ref = useRef(false);
  useEffect(() => {
    if (!ref.current) {
      setValue(123);
    }
    return () => {
      ref.current = true;
    };
  }, []);
  return <Component value={value} />;
};
