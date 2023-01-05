import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import { v4 as uuidv4 } from "uuid";
import { Request, Response } from "express";
import IGetUserAuthInfoRequest from "../../models/IGetUserAuthInfo";

const familyTreeController = {
  handleGetTree: async (req: Request, res: Response) => {
    const treeOwner = req.params.user;

    const session = driver.session();

    try {
      const result = await session.executeRead((tx) =>
        tx.run(
          `MATCH (p:Person { treeOwner: $treeOwner })
          WITH p
          OPTIONAL MATCH (p)-[:CHILD]->(c:Person)
          WITH p, collect(DISTINCT c.id) as children
          OPTIONAL MATCH (p)<-[:MARRIED]->(s:Person)
          RETURN DISTINCT p as person, children as children, s.id as spouseId`,
          { treeOwner }
        )
      );

      const people = result.records.map((record) => {
        if (record.get("spouseId") !== null) {
          return {
            ...record.get("person").properties,
            spouseId: record.get("spouseId"),
            children: record.get("children").reverse(),
          };
        } else {
          return {
            ...record.get("person").properties,
            children: record.get("children").reverse(),
          };
        }
      });

      return res.status(200).json({ people });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },

  handleInitializeTree: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const treeOwner = req.user?.username;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: "Missing name" });
    }

    const id = uuidv4();

    const session = driver.session();

    try {
      const result = await session.executeWrite((tx) =>
        tx.run(
          `CREATE (n:Person {name: $name, id: $id, isRoot: true, treeOwner: $treeOwner}) RETURN n`,
          { name, id, treeOwner }
        )
      );

      const person = result?.records[0].get(0).properties;

      return res.status(200).json({
        person: { ...person, children: [] },
      });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default familyTreeController;
