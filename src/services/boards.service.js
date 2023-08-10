import BoardsRepository from '../repositories/boards.repository';
import AccessRepository from '../repositories/access.repository';
import Messages from './message';
class BoardsService {
  boardsRepository = new BoardsRepository();
  accessRepository = new AccessRepository();

  // =====보드 생성=====
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

  // =====보드 전체 조회=====
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

  // =====보드 개별 조회=====
  showCards = async (userId, boardId, columnId) => {
    const isAccessable = await this.accessRepository.isAccessable(
      userId,
      boardId,
    );
    if (!isAccessable) {
      console.log('계정 문제');
      return {
        status: 400,
        message: '보드 조회에 실패하였습니다.',
        showCards: null,
      };
    }

    try {
      const showCards = await this.boardsRepository.showCards(columnId);
      if (!showCards) {
        console.log('레포지토리 문제');
        return {
          status: 400,
          message: '보드 조회에 실패하였습니다.',
          showCards: null,
        };
      } else
        return {
          status: 200,
          message: '보드 조회에 성공하였습니다.',
          showCards,
        };
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        message: '보드 조회에 실패하였습니다.',
        showCards: null,
      };
    }
  };

  // =====보드 수정=====
  updateBoard = async (
    userId,
    boardId,
    boardName,
    boardColor,
    boardContent,
  ) => {
    const messages = new Messages('보드 수정');
    if (!boardName || !boardColor || !boardContent || !boardId) {
      return messages.status400();
    }
    const isAccessable = await this.accessRepository.isAccessable(
      userId,
      boardId,
    );
    if (!isAccessable) return messages.status400();

    try {
      const updateBoard = await this.boardsRepository.updateBoard(
        boardId,
        boardName,
        boardColor,
        boardContent,
      );
      if (updateBoard) {
        return messages.status200();
      } else return messages.status400();
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };

  // =====보드 삭제=====
  removeBoard = async (userId, boardId, deletedAt) => {
    const messages = new Messages('보드 삭제');
    const isAccessable = await this.accessRepository.isAccessable(
      userId,
      boardId,
    );
    if (!isAccessable) return messages.status400();

    try {
      const removeBoard = await this.boardsRepository.removeBoard(
        boardId,
        deletedAt,
      );
      if (!removeBoard) return messages.status400();
      else return messages.status200();
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}

export default BoardsService;
