import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import IGetUserAuthInfoRequest from "../../models/IGetUserAuthInfo";

const copyPeopleController = {
  handleCopyBranch: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const { rootPersonId, newParentId, sourceTreeOwner } = req.body;

    const targetTreeOwner = req.user?.username;

    if (!rootPersonId || !newParentId || !sourceTreeOwner) {
      return res.status(400).json({
        error: "Missing rootPersonId, newParentId, sourceTreeOwner",
      });
    }

    const session = driver.session();

    try {
      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (root:Person {id: $rootPersonId, treeOwner: $sourceTreeOwner}),
            (newParent:Person {id: $newParentId, treeOwner: $targetTreeOwner})
            MATCH path = (root)-[r*]-(node:Person)
            WITH root, newParent, COLLECT(path) AS paths
            CALL apoc.refactor.cloneSubgraphFromPaths(paths, {
                standinNodes:[[root, newParent]],
                skipProperties: ['treeOwner']
            }) YIELD input, output, error
            RETURN input, output, error
              `,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParentId }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (newParent:Person {id: $newParentId, treeOwner: $targetTreeOwner})<-[:MARRIED]->(spouse:Person)
            DETACH DELETE spouse`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParentId }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (newParent:Person {id: $newParentId, treeOwner: $targetTreeOwner})<-[:CHILD]-(parents:Person)
           WHERE parents.treeOwner IS NULL
           DETACH DELETE parents`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParentId }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH  (newParent:Person {id: $newParentId, treeOwner: $targetTreeOwner})
          CALL apoc.path.subgraphNodes(newParent, {minLevel: 1, maxLevel: 5}) YIELD node
          WITH node
          MATCH (node)
            WHERE node.treeOwner IS NULL
            SET node.treeOwner = $targetTreeOwner
            SET node.isRoot = false
            SET node.id = apoc.create.uuid()`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner, newParentId }
        )
      );

      await session.executeWrite((tx) =>
        tx.run(
          `MATCH (copy:Person)
            WHERE copy.treeOwner IS NULL
            DETACH DELETE copy`,
          { rootPersonId, sourceTreeOwner, targetTreeOwner }
        )
      );

      return res.status(200).send();
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default copyPeopleController;
