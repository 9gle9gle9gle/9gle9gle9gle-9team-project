import BoardsService from '../services/boards.service';
class BoardsController {
  boardsService = new BoardsService();
  userId = 1;
  // =====보드 생성=====
  makeBoard = async (req, res) => {
    const { boardName, boardColor, boardContent } = req.body;
    console.log(boardName);
    const { status, message } = await this.boardsService.makeBoard(
      this.userId,
      boardName,
      boardColor,
      boardContent,
    );
    return res.status(status).json({ message });
  };

  // =====보드 전체 조회=====
  getBoards = async (req, res) => {
    const { status, message, getBoards } = await this.boardsService.getBoards(
      this.userId,
    );
    return res.status(status).json({ message, getBoards });
  };

  // =====보드 개별 조회=====
  showABoard = async (req, res) => {
    const { boardId } = req.params;
    const { status, message, showABoard } = await this.boardsService.showABoard(
      this.userId,
      boardId,
    );
    return res.status(status).json({ message, showABoard });
  };

  // =====보드 수정=====
  updateBoard = async (req, res) => {
    const { boardId } = req.params;
    const { boardName, boardColor, boardContent } = req.body;
    const { status, message } = await this.boardsService.updateBoard(
      this.userId,
      boardId,
      boardName,
      boardColor,
      boardContent,
    );
    return res.status(status).json({ message });
  };

  // =====보드 삭제=====
  removeBoard = async (req, res) => {
    const { boardId } = req.params;
    const { status, message } = await this.boardsService.removeBoard(
      this.userId,
      boardId,
    );
    return res.status(status).json({ message });
  };
}

export default BoardsController;
