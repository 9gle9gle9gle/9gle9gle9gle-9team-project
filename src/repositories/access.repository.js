import Boards from '../db/models/boards';
import Access from '../db/models/access';
class AccessRepository {
  // =====보드 소유 확인=====
  isMyBoard = async (userId, boardId) => {
    const isMyBoard = await Boards.findOne({ where: { userId, boardId } });
    return isMyBoard;
  };

  // =====보드 권한 확인=====
  isAccessable = async (userId, boardId) => {
    const isAccessable = await Access.findOne({ where: { userId, boardId } });
    return isAccessable;
  };

  // =====초대=====
  giveAccess = async (userId, boardId) => {
    const giveAccess = await Access.create({ userId, boardId });
    return giveAccess;
  };

  // =====권한 조회=====
  showAccess = async boardId => {
    const showAccess = await Access.findAll({ where: { boardId } });
    return showAccess;
  };

  // =====권한 삭제=====
  removeAccess = async (userId, boardId) => {
    const removeAccess = await Access.destroy({ where: { userId, boardId } });
    return removeAccess;
  };
}
export default AccessRepository;
