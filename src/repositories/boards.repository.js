import Boards from '../db/models/boards.js';
class BoardsRepository {
  makeBoard = async (userId, boardName, boardColor, boardContent) => {
    const makeBoard = await Boards.create({
      userId,
      boardName,
      boardColor,
      boardContent,
    });
    return makeBoard;
  };
  getBoards = async userId => {
    const getBoards = await Boards.findAll({ where: { userId } });
    return getBoards;
  };
}
export default BoardsRepository;
