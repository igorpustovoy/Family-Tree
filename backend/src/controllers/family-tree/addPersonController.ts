import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";

const addPersonController = {
  handleAddPerson: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
    const { name, targetRole, target } = req.body;

    if (!name || !targetRole || !target) {
      return res.status(400).json({ error: "Missing name or type or target" });
    }

    const session = driver.session();

    try {
      let result;

      if (targetRole === "child") {
        result = await session.executeWrite((tx) =>
          tx.run(
            `MATCH (n:Person {name: $target, treeOwner: $treeOwner})
            CREATE (n)<-[:child]-(m:Person {name: $name, treeOwner: $treeOwner})
            CREATE (n)-[:parent]->(m:Person {name: $name, treeOwner: $treeOwner})
            RETURN m`,
            { name, targetRole, target, treeOwner }
          )
        );
      }

      if (targetRole === "parent") {
        result = await session.executeWrite((tx) =>
          tx.run(
            `MATCH (n:Person {name: $target, treeOwner: $treeOwner})
            CREATE (n)-[:child]->(m:Person {name: $name, treeOwner: $treeOwner})
            CREATE (n)<-[:parent]-(m:Person {name: $name, treeOwner: $treeOwner})
            RETURN m`,
            { name, targetRole, target, treeOwner }
          )
        );
      }

      console.log(result);

      const person = result.records[0].get(0);

      return res.status(200).json({ person });
    } catch (error) {
      getErrorMessage(error);
    } finally {
      await session.close();
    }
  },
};

export default addPersonController;
