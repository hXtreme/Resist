var missionImages = [
  "assets/svg/ring.svg",
  "assets/svg/disk.svg",
  "assets/svg/tick.svg",
  "assets/svg/cross.svg"
];

var GameStatus = {
  resistance_score : 0,
  spy_score : 0,
  completedMissions : -1,
  // 0 : Future Mission
  // 1 : Current Mission
  // 2 : Mission Success
  // 3 : Mission Fail
  missionStatus : [
    0, 0, 0, 0, 0
  ]
};

var missions = [
  document.getElementById("mission-1").getElementsByTagName("img")[0],
  document.getElementById("mission-2").getElementsByTagName("img")[0],
  document.getElementById("mission-3").getElementsByTagName("img")[0],
  document.getElementById("mission-4").getElementsByTagName("img")[0],
  document.getElementById("mission-5").getElementsByTagName("img")[0]
];

function runCheck() {
  console.log(GameStatus);
  console.log(missions);
}

function setup(playersTot) {
  console.log("Setup Game for: " + playersTot + " Players");
}

function selectGame() {
  console.log("Select Game!");
}

function restartGame() {
  console.log("Restart Game!");
  GameStatus = {
    resistance_score : 0,
    spy_score : 0,
    completedMissions : -1,
    missionStatus : [
      0, 0, 0, 0, 0
    ]
  };
  for (var i = 0; i < missions.length; i++) {
    missions[i].src = missionImages[0];
  }
}

function changeMissionStatus(missionNo) {
  console.log("Change Mission Status for: " + missionNo);
  var validFlag = missionNo - GameStatus.completedMissions;
  console.log("validFlag = " + validFlag);
  if (validFlag < 1 || validFlag > 2) {
    return false;
  }
  // Check to see if previous mission is in a valid state
  var prevMission = missionNo - 1
  if (prevMission > -1 && GameStatus.missionStatus[prevMission] < 2) {
    console.log("Please Complete the previous mission first.");
    return false;
  }
  console.log("Updating the status.");
  GameStatus.completedMissions = prevMission;
  // Now the logic to change the status.
  var status = GameStatus.missionStatus[missionNo];
  console.log("Status: " + status);
  switch (status) {
    case 0:
      GameStatus.missionStatus[missionNo] = 1;
      missions[missionNo].src = missionImages[1];
      break;
    case 1:
      GameStatus.missionStatus[missionNo] = 2;
      GameStatus.resistance_score++;
      missions[missionNo].src = missionImages[2];
      break;
    case 2:
      GameStatus.missionStatus[missionNo] = 3;
      GameStatus.resistance_score--;
      GameStatus.spy_score++;
      missions[missionNo].src = missionImages[3];
      break;
    case 3:
      GameStatus.missionStatus[missionNo] = 1;
      GameStatus.spy_score--;
      missions[missionNo].src = missionImages[1];
      break;
    default:
  }
  return true;
}
