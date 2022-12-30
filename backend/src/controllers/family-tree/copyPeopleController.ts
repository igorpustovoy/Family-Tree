import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";

const copyPeopleController = {
  handleCopyBranch: async (req: any, res: Response) => {
    const { rootPersonId, newParent, sourceTreeOwner } = req.body;

    const targetTreeOwner = req.user.username;

    if (!rootPersonId || !newParent || !sourceTreeOwner) {
      return res.status(400).json({
        error: "Missing rootPersonId, newParent, sourceTreeOwner",
      });
    }

    const session = driver.session();

    try {
      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (root:Person {id: $rootPersonId, treeOwner: $sourceTreeOwner}),
            (newParent:Person {name: $newParent, treeOwner: $targetTreeOwner})
            MATCH path = (root)-[r*]-(node:Person)
            WITH root, newParent, COLLECT(path) AS paths
            CALL apoc.refactor.cloneSubgraphFromPaths(paths, {
                standinNodes:[[root, newParent]],
                skipProperties: ['treeOwner']
            }) YIELD input, output, error
            RETURN input, output, error
              `,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParent }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (newParent:Person {name: $newParent, treeOwner: $targetTreeOwner})<-[:MARRIED]->(spouse:Person)
            DETACH DELETE spouse`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParent }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (newParent:Person {name: $newParent, treeOwner: $targetTreeOwner})<-[:CHILD]-(parents:Person)
           WHERE parents.treeOwner IS NULL
           DETACH DELETE parents`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParent }
        )
      );

      const result = await session.executeWrite((tx) =>
        tx.run(
          `MATCH  (newParent:Person {name: $newParent, treeOwner: $targetTreeOwner})-[r*]-(copy:Person)
            WHERE copy.treeOwner IS NULL
            SET copy.treeOwner = $targetTreeOwner
            SET copy.id = apoc.create.uuid()
            RETURN copy`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParent }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (copy:Person)
            WHERE copy.treeOwner IS NULL
            DETACH DELETE copy`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParent }
        )
      );

      console.log({
        rootPersonId,
        sourceTreeOwner,
        targetTreeOwner,
        newParent,
      });

      console.log(result);

      return res.status(200).json({ result });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default copyPeopleController;
