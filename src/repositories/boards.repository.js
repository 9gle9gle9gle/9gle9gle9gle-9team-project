import Boards from '../db/models/boards.js';
import Access from '../db/models/access.js';
import sequelize from '../db/sequelize.js';
import { QueryTypes } from 'sequelize';

class BoardsRepository {
  makeBoard = async (userId, boardName, boardColor, boardContent) => {
    const t = await sequelize.transaction();
    try {
      const makeBoard = await Boards.create(
        {
          userId,
          boardName,
          boardColor,
          boardContent,
        },
        { transaction: t },
      );

      const boardId = makeBoard.boardId;

      await Access.create({ userId, boardId }, { transaction: t });
      await t.commit();
      return 1;
    } catch (err) {
      console.log(err);
      await t.rollback();
      return 0;
    }
  };

  getBoards = async userId => {
    const getBoards = await Boards.findAll({ where: { userId } });
    return getBoards;
  };
  showABoard = async boardId => {
    const getBoards = await sequelize.query(
      `SELECT * 
          FROM Cards 
              LEFT JOIN Columns on Columns.columnId = Cards.columnId
              LEFT JOIN Boards on Boards.boardId = Columns.boardId
          WHERE Boards.boardId = :boardId`,
      { replacements: { boardId }, type: QueryTypes.SELECT },
    );
    return getBoards;
  };
  updateBoard = async (boardId, boardName, boardColor, boardContent) => {
    const updateBoard = await Boards.update(
      { boardName, boardColor, boardContent },
      { where: { boardId } },
    );
    return updateBoard;
  };
}
export default BoardsRepository;
