import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import { v4 as uuidv4 } from "uuid";

const addPersonController = {
  handleAddDescendant: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
    const { name, relativeId } = req.body;

    console.log(name, relativeId);

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
            RETURN m`,
          { relativeId, name, id, treeOwner }
        )
      );

      console.log(result.records[0]);
      const person = result.records[0].get(0).properties;

      return res.status(200).json({ person: { ...person, children: [] } });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default addPersonController;
