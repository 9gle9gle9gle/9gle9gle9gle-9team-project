class Messages {
  constructor(message) {
    this.message = message;
  }

  status200() {
    return {
      status: 200,
      message: `${this.message}에 성공하였습니다.`,
    };
  }
  status400() {
    return {
      status: 400,
      message: `${this.message}에 실패하였습니다.`,
    };
  }
  nosubject() {
    return {
      status: 400,
      message: `${this.message}을 입력해 주세요.`,
    };
  }
}

export default Messages;
