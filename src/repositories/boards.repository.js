import Boards from '../db/models/boards.js';
import Access from '../db/models/access.js';
import sequelize from '../db/sequelize.js';
import { QueryTypes } from 'sequelize';

class BoardsRepository {
  // =====보드 생성=====
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

  // =====보드 전체 조회=====
  getBoards = async userId => {
    const getBoards = await Boards.findAll({
      where: { userId, deletedAt: null },
    });
    return getBoards;
  };

  // =====보드 개별 조회=====
  showABoard = async boardId => {
    const getBoards = await sequelize.query(
      `SELECT * 
          FROM Cards 
              LEFT JOIN Columns on Columns.columnId = Cards.columnId
              LEFT JOIN Boards on Boards.boardId = Columns.boardId
          WHERE Boards.boardId = :boardId AND Cards.deletedAt IS NULL AND Boards.deletedAt IS NULL AND Columns.deletedAt IS NULL`,
      { replacements: { boardId }, type: QueryTypes.SELECT },
    );
    return getBoards;
  };

  // =====보드 수정=====
  updateBoard = async (boardId, boardName, boardColor, boardContent) => {
    const updateBoard = await Boards.update(
      { boardName, boardColor, boardContent },
      { where: { boardId } },
    );
    return updateBoard;
  };

  // =====보드 삭제=====
  removeBoard = async (boardId, deletedAt) => {
    const removeBoard = await Boards.update(
      { deletedAt },
      { where: { boardId } },
    );
    return removeBoard;
  };
}
export default BoardsRepository;
