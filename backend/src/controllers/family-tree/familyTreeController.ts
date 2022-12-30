import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import { v4 as uuidv4 } from "uuid";

const familyTreeController = {
  handleGetTree: async (req: any, res: Response) => {
    const treeOwner = req.params.user;

    const session = driver.session();

    try {
      const result = await session.executeRead((tx) =>
        tx.run(
          `MATCH (p:Person { treeOwner: $treeOwner })
          WITH p
          OPTIONAL MATCH (p:Person)-[:CHILD]->(c:Person)
          WITH p, collect(c.id) as children
          OPTIONAL MATCH (p:Person)<-[:MARRIED]->(s:Person)
          RETURN DISTINCT p as person, children as children, s.id as spouseId`,
          { treeOwner }
        )
      );

      console.log(result.records);

      const people = result.records.map((record) => {
        console.log(record.get("spouseId"));
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

  handleInitializeTree: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
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
