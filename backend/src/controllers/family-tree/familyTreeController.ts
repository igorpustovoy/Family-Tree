import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";

const familyTreeController = {
  handleGetTree: async (req: any, res: Response) => {
    const treeOwner = req.user.username;

    const session = driver.session();

    try {
      const result = await session.executeRead((tx) =>
        tx.run(
          `MATCH (n:Person {treeOwner: $treeOwner})
            RETURN n`,
          { treeOwner }
        )
      );

      const people = result?.records.map((record) => record.get(0));

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

    const session = driver.session();

    try {
      const result = await session.executeWrite((tx) =>
        tx.run(
          `CREATE (n:Person {name: $name, treeOwner: $treeOwner}) RETURN n`,
          { name, treeOwner }
        )
      );

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

export default familyTreeController;
