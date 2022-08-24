export interface ILeaderboardDTS {
  checkDrawn():void,
  // checkWinner():void,
  // addPoints():void,
  // addPlayedMatches():void,
  // addGoalsFor():void,
  // addGoalsAgainst():void,
  // addWin():void,
  // addDraw():void,
  // addLost():void,

  // calcTotalMatches():void,
  // calPercentual():void,
  // calGoalDiference():void,
}

export default class leaderboardDTS implements ILeaderboardDTS {
  checkDrawn = ():void => {
    console.log('teste');
  };
}
