import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import { v4 as uuidv4 } from "uuid";

const addPersonController = {
  handleAddDescendant: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
    const { name, relativeId } = req.body;

    if (!name || !relativeId) {
      return res.status(400).json({ error: "Missing name or relativeId" });
    }

    const session = driver.session();

    try {
      const id = uuidv4();

      const result = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (n:Person {id: $relativeId, treeOwner: $treeOwner})
            CREATE (n)-[:CHILD]->(m:Person {name: $name, id: $id, isRoot: false, treeOwner: $treeOwner})
            RETURN m as child`,
          { relativeId, name, id, treeOwner }
        )
      );

      const child = result.records[0].get("child").properties;

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (n:Person {id: $relativeId, treeOwner: $treeOwner})-[:CHILD]->(c:Person {id: $id, treeOwner: $treeOwner})
            MATCH (n)<-[:MARRIED]->(s:Person)
            CREATE (s)-[:CHILD]->(c)`,
          { relativeId, name, id, treeOwner }
        )
      );

      return res.status(200).json({ person: { ...child, children: [] } });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },

  handleAddSpouse: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
    const { name, relativeId } = req.body;

    if (!name || !relativeId) {
      return res.status(400).json({ error: "Missing name or relativeId" });
    }

    const session = driver.session();

    try {
      const toBeMarried = await session.executeRead((tx) =>
        tx.run(
          `MATCH (n:Person {id: $relativeId, treeOwner: $treeOwner})<-[:MARRIED]->(s:Person)
            RETURN s as spouse`,
          { relativeId, treeOwner }
        )
      );

      if (toBeMarried.records.length > 0) {
        return res.status(400).json({ error: "Person is already married" });
      }

      const id = uuidv4();

      const result = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (n:Person {id: $relativeId, treeOwner: $treeOwner})
          CREATE (n)<-[:MARRIED]-(m:Person {name: $name, id: $id, isRoot: false, treeOwner: $treeOwner})
          CREATE (n)-[:MARRIED]->(m)
          RETURN m as person`,
          { relativeId, name, id, treeOwner }
        )
      );

      const setChildren = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (m:Person)<-[:MARRIED]->(n:Person {id: $relativeId, treeOwner: $treeOwner})-[:CHILD]->(child:Person)
          CREATE (m)-[:CHILD]->(child)
          RETURN collect(child.id) as children`,
          { relativeId, treeOwner }
        )
      );

      const children = setChildren.records[0].get("children");

      const person = result.records[0].get("person").properties;

      return res
        .status(200)
        .json({ person: { ...person, spouseId: relativeId, children } });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default addPersonController;
