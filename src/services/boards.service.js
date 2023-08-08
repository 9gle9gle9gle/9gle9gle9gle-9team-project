import BoardsRepository from '../repositories/boards.repository';
import Messages from './message';
class BoardsService {
  boardsRepository = new BoardsRepository();
  makeBoard = async (userId, boardName, boardColor, boardContent) => {
    const messages = new Messages('보드 생성');
    if (!boardName || !boardColor || !boardContent) {
      return messages.status400();
    }
    try {
      const makeBoard = await this.boardsRepository.makeBoard(
        userId,
        boardName,
        boardColor,
        boardContent,
      );
      if (makeBoard) {
        return messages.status200();
      } else return messages.status400();
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}

export default BoardsService;
