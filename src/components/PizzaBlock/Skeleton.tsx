import React from "react";
import ContentLoader from "react-content-loader";

// @ts-ignore
const Skeleton: React.FC = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <circle cx="145" cy="131" r="119" />
    <rect x="25" y="271" rx="5" ry="5" width="236" height="22" />
    <rect x="31" y="315" rx="5" ry="5" width="225" height="84" />
    <rect x="28" y="423" rx="5" ry="5" width="72" height="28" />
    <rect x="119" y="414" rx="20" ry="20" width="140" height="42" />
  </ContentLoader>
);
export default Skeleton;
