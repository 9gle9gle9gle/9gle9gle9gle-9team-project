import AccessService from '../services/access.service';

class AccessController {
  loginuserId = 1;
  accessService = new AccessService();

  // =====초대=====
  giveAccess = async (req, res) => {
    const { userId, boardId } = req.body;
    const { status, message } = await this.accessService.giveAccess(
      this.loginuserId,
      userId,
      boardId,
    );
    return res.status(status).json({ message });
  };

  // =====권한 조회=====
  showAccess = async (req, res) => {
    const { boardId } = req.body;
    const { status, message, showAccess } = await this.accessService.showAccess(
      this.loginuserId,
      boardId,
    );
    return res.status(status).json({ message, showAccess });
  };
  // =====권한 삭제=====
  removeAccess = async (req, res) => {
    const { userId, boardId } = req.body;
    const { status, message } = await this.accessService.removeAccess(
      this.loginuserId,
      userId,
      boardId,
    );
    return res.status(status).json({ message });
  };
}
export default AccessController;
