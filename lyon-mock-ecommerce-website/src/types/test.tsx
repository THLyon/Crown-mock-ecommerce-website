
export type ServerError = {
    log: string,
    status?: number,
    message: { err: string }
  }
  
  export type Scoreboard = {
    X: number,
    O: number
  }
  
  export type Player = 'X' | 'O';
  
  export type BoardText = '-' | 'X' | 'O';
  
  export type BoardContent = Array<BoardText>[];
  
  //
