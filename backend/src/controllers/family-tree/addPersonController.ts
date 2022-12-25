import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import { v4 as uuidv4 } from "uuid";

const addPersonController = {
  handleAddDescendant: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
    const { name, relative } = req.body;

    if (!name || !relative) {
      return res.status(400).json({ error: "Missing name or relative" });
    }

    const session = driver.session();

    try {
      const id = uuidv4();

      const result = await session.executeWrite((tx) =>
        tx.run(
          `MATCH (n:Person {name: $relative, treeOwner: $treeOwner})
            CREATE (n)-[:CHILD]->(m:Person {name: $name, id: $id, isRoot: false, treeOwner: $treeOwner})
            RETURN m`,
          { relative, name, id, treeOwner }
        )
      );

      const person = result?.records[0].get(0);

      console.log("CREATED PERSON: ", person);

      return res.status(200).json({ person });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default addPersonController;
