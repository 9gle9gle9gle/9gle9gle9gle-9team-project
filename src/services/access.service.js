import AccessRepository from '../repositories/access.repository';
import Messages from './message';

class AccessService {
  accessRepository = new AccessRepository();
  // ======초대=====
  giveAccess = async (loginuserId, email, boardId) => {
    const messages = new Messages('초대');

    // userId와 boardId가 없으면 status 400
    if (!email || !boardId) {
      return messages.status400();
    }

    // 보드 소유주 확인
    const isMyBoard = await this.accessRepository.isMyBoard(
      loginuserId,
      boardId,
    );
    if (!isMyBoard) {
      return messages.status400();
    }
    const targetUser = await this.accessRepository.searchEmail(email);
    if (!targetUser) {
      return messages.status400();
    }
    const targetUserId = targetUser.userId;
    // 이미 초대한 회원 확인
    const isAccessable = await this.accessRepository.isAccessable(
      targetUserId,
      boardId,
    );
    if (isAccessable) {
      return {
        status: 400,
        message: '이미 초대한 회원입니다.',
      };
    }

    try {
      // 초대
      const giveAccess = await this.accessRepository.giveAccess(
        targetUserId,
        boardId,
      );
      if (!giveAccess.userId) return messages.status400();
      else return messages.status200();
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };

  // =====권한 조회=====
  showAccess = async (loginuserId, boardId) => {
    // boardId가 없으면 status 400
    if (!boardId) {
      return {
        status: 400,
        message: '권한 조회에 실패했습니다.',
        showAccess: null,
      };
    }

    // 보드 소유주 확인
    const isMyBoard = await this.accessRepository.isMyBoard(
      loginuserId,
      boardId,
    );
    if (!isMyBoard) {
      return {
        status: 400,
        message: '권한 조회에 실패했습니다. ',
        showAccess: null,
      };
    }

    try {
      // 권한 조회
      const showAccess = await this.accessRepository.showAccess(boardId);
      if (!showAccess)
        return {
          status: 400,
          message: '권한 조회에 실패했습니다. ',
          showAccess: null,
        };
      else
        return {
          status: 200,
          message: '권한 조회에 성공헀습니다.',
          showAccess,
        };
    } catch (err) {
      console.log(err);
      return {
        status: 400,
        message: '권한 조회에 실패했습니다. ',
        showAccess: null,
      };
    }
  };
  // ======권한 삭제=====
  removeAccess = async (loginuserId, userId, boardId) => {
    const messages = new Messages('권한 삭제');

    // userId와 boardId가 없으면 status 400
    if (!userId || !boardId) {
      return messages.status400();
    }

    // 보드 소유주 확인
    const isMyBoard = await this.accessRepository.isMyBoard(
      loginuserId,
      boardId,
    );
    if (!isMyBoard.boardId) {
      return messages.status400();
    }

    try {
      // 권한 삭제
      const removeAccess = await this.accessRepository.removeAccess(
        userId,
        boardId,
      );
      if (!removeAccess) return messages.status400();
      else return messages.status200();
    } catch (err) {
      console.log(err);
      return messages.status400();
    }
  };
}
export default AccessService;
