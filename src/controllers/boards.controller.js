import BoardsService from '../services/boards.service';
class BoardsController {
  boardsService = new BoardsService();
  userId = 1;

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
}

export default BoardsController;
