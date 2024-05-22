
import React, { useEffect } from 'react';
import { useTransition } from 'react'
const UserProfile: React.FC = () => {

  const [pending, startTransition] = useTransition();
  const options = {
    width: 625,
    height: 625
  }
  useEffect(() => {
    setTimeout(() => {
      startTransition(() => {
        // Intentionally not passing a comment
        // so error gets thrown
        throw new Error("Example Error: An error thrown to trigger error boundary");

      });
    }, 1000);
  }, [])
  useEffect(() => {
    console.log(pending)
  }, [pending])
  return (
    <svg width={options.width} height={options.height}>
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        <circle cx={225} cy={225} r="100" />
      </g>
    </svg>
  );
};
export default UserProfile;