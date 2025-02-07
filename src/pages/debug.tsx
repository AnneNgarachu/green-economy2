import React from "react";
import fs from "fs";
import path from "path";

const DebugPage = ({ routes }: { routes: string[] }) => {
  return (
    <div>
      <h1>Available Routes</h1>
      <ul>
        {routes.map((route, index) => (
          <li key={index}>{route}</li>
        ))}
      </ul>
    </div>
  );
};

export async function getStaticProps() {
  const pagesPath = path.join(process.cwd(), "src/pages");
  const files = fs.readdirSync(pagesPath);
  const routes = files.map((file) => "/" + file.replace(".tsx", ""));
  return { props: { routes } };
}

export default DebugPage;
