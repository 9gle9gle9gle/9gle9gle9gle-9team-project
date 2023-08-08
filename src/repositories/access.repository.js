import Boards from '../db/models/boards';
import Access from '../db/models/access';
class AccessRepository {
  isMyBoard = async (userId, boardId) => {
    const isMyBoard = await Boards.findOne({ where: { userId, boardId } });
    return isMyBoard;
  };
  isAccessable = async (userId, boardId) => {
    const isAccessable = await Access.findOne({ where: { userId, boardId } });
    return isAccessable;
  };
  giveAccess = async (userId, boardId) => {
    const giveAccess = await Access.create({ userId, boardId });
    return giveAccess;
  };
  showAccess = async boardId => {
    const showAccess = await Access.findAll({ where: { boardId } });
    return showAccess;
  };
  removeAccess = async (userId, boardId) => {
    const removeAccess = await Access.destroy({ where: { userId, boardId } });
    return removeAccess;
  };
}
export default AccessRepository;
