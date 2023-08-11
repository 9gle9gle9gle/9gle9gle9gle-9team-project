import AccessService from '../services/access.service';

class AccessController {
  accessService = new AccessService();

  // =====초대=====
  giveAccess = async (req, res) => {
    const loginuserId = res.locals.user;
    const { email, boardId } = req.body;
    const { status, message } = await this.accessService.giveAccess(
      loginuserId,
      email,
      boardId,
    );
    return res.status(status).json({ message });
  };

  // =====권한 조회=====
  showAccess = async (req, res) => {
    const loginuserId = res.locals.user;
    const { boardId } = req.query;
    const { status, message, showAccess } = await this.accessService.showAccess(
      loginuserId,
      boardId,
    );
    return res.status(status).json({ message, showAccess });
  };
  // =====권한 삭제=====
  removeAccess = async (req, res) => {
    const loginuserId = res.locals.user;
    const { userId, boardId } = req.body;
    const { status, message } = await this.accessService.removeAccess(
      loginuserId,
      userId,
      boardId,
    );
    return res.status(status).json({ message });
  };
}
export default AccessController;
