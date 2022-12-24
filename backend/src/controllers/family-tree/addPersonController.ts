import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";

const addPersonController = {
  handleAddPerson: async (req: any, res: Response) => {
    const treeOwner = req.user.username;
    const { name, relationType, relative } = req.body;

    if (!name || !relationType || !relative) {
      return res.status(400).json({ error: "Missing name or type or target" });
    }

    const session = driver.session();

    try {
      let result;

      console.log("STARTING MATCH");

      if (relationType === "Child") {
        result = await session.executeWrite((tx) =>
          tx.run(
            `MATCH (n:Person {name: $target, treeOwner: $treeOwner})
            CREATE (n)<-[:CHILD]-(m:Person {name: $name, treeOwner: $treeOwner})
            RETURN m`,
            { name, targetRole: relationType, target: relative, treeOwner }
          )
        );
      }

      if (relationType === "Parent") {
        result = await session.executeWrite((tx) =>
          tx.run(
            `MATCH (n:Person {name: $target, treeOwner: $treeOwner})
            CREATE (n)-[:CHILD]->(m:Person {name: $name, treeOwner: $treeOwner})
            RETURN m`,
            { name, targetRole: relationType, target: relative, treeOwner }
          )
        );
      }

      console.log("RESULT:", result);

      const person = result?.records[0].get(0);

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
