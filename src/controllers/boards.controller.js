import BoardsService from '../services/boards.service';
class BoardsController {
  boardsService = new BoardsService();

  // =====보드 생성=====
  makeBoard = async (req, res) => {
    const userId = res.locals.user;
    const { boardName, boardColor, boardContent } = req.body;
    const { status, message } = await this.boardsService.makeBoard(
      userId,
      boardName,
      boardColor,
      boardContent,
    );
    return res.status(status).json({ message });
  };

  // =====보드 전체 조회=====
  getBoards = async (req, res) => {
    const userId = res.locals.user;
    const { status, message, getBoards } = await this.boardsService.getBoards(
      userId,
    );
    return res.status(status).json({ message, getBoards });
  };

  // =====보드 불러오기 시 사용=====
  // =====컬럼 별 카드 개별 조회=====
  showCards = async (req, res) => {
    const userId = res.locals.user;
    const { boardId } = req.params;
    const { columnId } = req.query;
    const { status, message, showCards } = await this.boardsService.showCards(
      userId,
      boardId,
      columnId,
    );
    return res.status(status).json({ message, showCards });
  };

  // =====보드 수정=====
  updateBoard = async (req, res) => {
    const userId = res.locals.user;
    const { boardId } = req.params;
    const { boardName, boardColor, boardContent } = req.body;
    const { status, message } = await this.boardsService.updateBoard(
      userId,
      boardId,
      boardName,
      boardColor,
      boardContent,
    );
    return res.status(status).json({ message });
  };

  // =====보드 삭제=====
  removeBoard = async (req, res) => {
    const userId = res.locals.user;
    const { boardId } = req.params;
    const { deletedAt } = req.body;
    const { status, message } = await this.boardsService.removeBoard(
      userId,
      boardId,
      deletedAt,
    );
    return res.status(status).json({ message });
  };
}

export default BoardsController;
