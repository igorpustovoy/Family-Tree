import { Response } from "express";
import driver from "../../config/neo4jDriver";
import getErrorMessage from "../../helpers/getErrorMessage";
import IGetUserAuthInfoRequest from "../../models/IGetUserAuthInfo";

const findAncestorsController = {
  handleFindAncestors: async (req: IGetUserAuthInfoRequest, res: Response) => {
    const user = req.user?.username;
    const phrase = req.query.phrase;

    if (!phrase) {
      return res.status(400).json({ error: "Missing phrase" });
    }

    const session = driver.session();

    try {
      const result = await session.executeRead((tx) =>
        tx.run(
          `MATCH (p:Person)
            WHERE NOT p.treeOwner = $user
            AND p.name CONTAINS $phrase
            RETURN DISTINCT p as person`,
          { user, phrase }
        )
      );

      const people = result.records.map((record) => {
        return {
          treeOwner: record.get("person").properties.treeOwner,
          ancestor: {
            id: record.get("person").properties.id,
            name: record.get("person").properties.name,
          },
        };
      });

      return res.status(200).json({ people });
    } catch (error) {
      console.log(getErrorMessage(error));
      res.status(500).json({ error: getErrorMessage(error) });
    } finally {
      await session.close();
    }
  },
};

export default findAncestorsController;
