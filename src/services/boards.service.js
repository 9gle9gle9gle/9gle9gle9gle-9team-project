import BoardsRepository from '../repositories/boards.repository';
import AccessRepository from '../repositories/access.repository';
import Messages from './message';
class BoardsService {
  boardsRepository = new BoardsRepository();
  accessRepository = new AccessRepository();

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
      if (makeBoard == 1) {
        return messages.status200();
      } else return messages.status400();
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
  getBoards = async userId => {
    try {
      const getBoards = await this.boardsRepository.getBoards(userId);
      if (!getBoards)
        return {
          status: 400,
          message: '보드 전체 조회에 실패하였습니다.',
          getBoards: null,
        };
      else
        return {
          status: 200,
          message: '보드 전체 조회에 성공하였습니다.',
          getBoards,
        };
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        message: '보드 전체 조회에 실패하였습니다.',
        getBoards: null,
      };
    }
  };
  showABoard = async (userId, boardId) => {
    const isAccessable = await this.accessRepository.isAccessable(
      userId,
      boardId,
    );
    if (!isAccessable)
      return {
        status: 400,
        message: '보드 조회에 실패하였습니다.',
        showABoard: null,
      };

    try {
      const showABoard = await this.boardsRepository.showABoard(boardId);
      if (!showABoard)
        return {
          status: 400,
          message: '보드 조회에 실패하였습니다.',
          showABoard: null,
        };
      else
        return {
          status: 200,
          message: '보드 조회에 성공하였습니다.',
          showABoard,
        };
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        message: '보드 조회에 실패하였습니다.',
        showABoard: null,
      };
    }
  };
}

export default BoardsService;
