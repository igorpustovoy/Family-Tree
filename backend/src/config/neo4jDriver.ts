import neo4j, { Driver } from "neo4j-driver";

interface IDBConnData {
  uri: string;
  user: string;
  password: string;
}

const dbConnData: IDBConnData = {
  uri: process.env.NEO4J_URI || "bolt://localhost:7687",
  user: process.env.NEO4J_USER || "neo4j",
  password: process.env.NEO4J_PASSWORD || "password",
};

const driver: Driver = neo4j.driver(
  dbConnData.uri,
  neo4j.auth.basic(dbConnData.user, dbConnData.password),
  { disableLosslessIntegers: true }
);

export default driver;
