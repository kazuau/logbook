//Ver1.0.2
//Author: twk@2ch

load("script/utils.js");
var currentDockData = {};

function header() {
	return [ "成功" ];
}

function begin(fleetid) { 
	//艦隊データ取得
	var ships = Packages.logbook.data.context.GlobalContext.getDock(fleetid).getShips();
	
	//艦隊データオブジェクト初期化
	currentDockData = {
		"shipCount": ships.length,
		"flgShipLv": 0,
		"sumShipLv": 0,
		"drumShipCount": 0,
		"drumCount": 0,
		"DDCount": 0,
		"CLCount": 0,
		"CLTCount": 0,
		"CACount": 0,
		"CVACount": 0,
		"BBCount": 0,
		"CVCount": 0,
		"CVLCount": 0,
		"SSCount": 0,
		"CVSCount": 0,
		"CVBCount": 0,
		"TVCount": 0,
		"AVCount": 0,
		"ASCount": 0,
		"LHACount": 0,
		"ACVCount": 0,
		"ARCount": 0
	};
	
	//艦隊データオブジェクト設定
	for(var i = 0; i < ships.length; i++){
	
		//ドラム缶
		var drumFlg = false;
		for(var j = 0; j < ships[i].slot.length; j++){
			if(ships[i].slot[j].match(/ドラム缶\(輸送用\)/)){
				if(!drumFlg){
					currentDockData.drumShipCount++;
					drumFlg = true;
				}
				currentDockData.drumCount++;
			}
		}

		//旗艦Lv
		if(i == 0){
			currentDockData.flgShipLv = ships[i].lv;
		}
		//艦隊合計Lv
		currentDockData.sumShipLv += ships[i].lv;

		//艦種カウント
		switch(ships[i].stype){
			case 2: currentDockData.DDCount++; break;
			case 3: currentDockData.CLCount++; break;
			case 4: currentDockData.CLTCount++; break;
			case 5: currentDockData.CACount++; break;
			case 6: currentDockData.CVACount++; break;
			case 7: currentDockData.CVLCount++; break;
			case 8: currentDockData.BBCount++; break;
			case 9: currentDockData.BBCount++; break;
			case 10: currentDockData.CVBCount++; break;
			case 11: currentDockData.CVCount++; break;
			case 12: currentDockData.BBCount++; break;
			case 13: currentDockData.SSCount++; break;
			case 14: currentDockData.CVSCount++; break;
			case 16: currentDockData.AVCount++; break;
			case 17: currentDockData.LHACount++; break;
			case 18: currentDockData.ACVCount++; break;
			case 19: currentDockData.ARCount++; break;
			case 20: currentDockData.ASCount++; break;
			case 21: currentDockData.TVCount++; break;
		}
	}
}

function body(data) {
	return toComparable([ getCanMission(data.id) ]);
}

function end() { }

//遠征成功判定
function getCanMission(missionID){
	switch(missionID){
		case 1: return sTypeFree(2, 1); break;
		case 2: return sTypeFree(4, 2); break;
		case 3: return sTypeFree(3, 3); break;
		case 4: return sTypeLock(3, 3, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 5: return sTypeLock(4, 3, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 6: return sTypeFree(4, 4); break;
		case 7: return sTypeFree(6, 5); break;
		case 8: return sTypeFree(6, 6); break;
		case 9: return sTypeLock(4, 3, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 10: return sTypeLock(3, 3, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0); break;
		case 11: return sTypeLock(4, 6, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 12: return sTypeLock(4, 4, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 13: return sTypeLock(6, 5, 0, 0, 0, 1, 4, 0, 0, 0, 0, 0, 0, 0); break;
		case 14: return sTypeLock(6, 6, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0); break;
		case 15: return sTypeLock(6, 9, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0); break;
		case 16: return sTypeLock(6, 10, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 17: return sTypeLock(6, 20, 0, 0, 0, 1, 3, 0, 0, 0, 0, 0, 0, 0); break;
		case 18: return sTypeLock(6, 15, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0); break;
		case 19: return sTypeLock(6, 20, 0, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0); break;
		case 20: return sTypeLock(2, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0); break;
		case 21: return sTypeLock(5, 15, 30, 3, 3, 1, 4, 0, 0, 0, 0, 0, 0, 0); break;
		case 22: return sTypeLock(6, 30, 45, 0, 0, 1, 2, 0, 0, 0, 1, 0, 0, 0); break;
		case 23: return sTypeLock(6, 50, 200, 0, 0, 0, 2, 0, 2, 0, 0, 0, 0, 0); break;
		case 25: return sTypeLock(4, 25, 0, 0, 0, 0, 2, 0, 0, 0, 2, 0, 0, 0); break;
		case 26: return sTypeLock(4, 30, 0, 0, 0, 1, 2, 1, 0, 0, 0, 0, 0, 0); break;
		case 27: return sTypeLock(2, 1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0); break;
		case 28: return sTypeLock(3, 30, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0); break;
		case 29: return sTypeLock(3, 50, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0); break;
		case 30: return sTypeLock(4, 55, 0, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0); break;
		case 31: return sTypeLock(4, 60, 200, 0, 0, 0, 0, 0, 0, 4, 0, 0, 0, 0); break;
		case 32: return sTypeLock(3, 5, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 1); break;
		case 33: return sTypeLock(2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 34: return sTypeLock(2, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0); break;
		case 35: return sTypeLock(6, 40, 0, 0, 0, 0, 1, 2, 0, 0, 1, 0, 0, 0); break;
		case 36: return sTypeLock(6, 30, 0, 0, 0, 1, 1, 0, 0, 0, 0, 2, 0, 0); break;
		case 37: return sTypeLock(6, 50, 200, 3, 4, 1, 5, 0, 0, 0, 0, 0, 0, 0); break;
		case 38: return sTypeLock(6, 65, 240, 4, 8, 0, 5, 0, 0, 0, 0, 0, 0, 0); break;
		case 39: return sTypeLock(5, 3, 180, 0, 0, 0, 0, 0, 0, 4, 0, 0, 1, 0); break;
		default: return "不明";
	}
}

//艦種縛り他諸条件
//艦数 旗艦Lv 合計Lv ドラム缶艦数 ドラム缶合計数 軽巡 駆逐 空母 航戦 潜水艦 重巡 水母 潜水艦母艦 練習艦
function sTypeLock(shipCount, flgShipLv, sumShipLv, drumShipCount, drumCount, CLCount, DDCount, CVCount, CVBCount, SSCount, CACount, AVCount, ASCount, TVCount){
	if(currentDockData.shipCount >= shipCount && 
			currentDockData.flgShipLv >= flgShipLv && 
			currentDockData.sumShipLv >= sumShipLv &&
			currentDockData.drumShipCount >= drumShipCount &&
			currentDockData.drumCount >= drumCount &&
			currentDockData.CLCount >= CLCount && 
			currentDockData.DDCount >= DDCount && 
			(currentDockData.CVCount + currentDockData.CVLCount + currentDockData.ACVCount + currentDockData.AVCount) >= CVCount &&
			currentDockData.CVBCount >= CVBCount &&
			(currentDockData.SSCount + currentDockData.CVSCount) >= SSCount &&
			currentDockData.CACount >= CACount &&
			currentDockData.AVCount >= AVCount &&
			currentDockData.ASCount >= ASCount &&
			currentDockData.TVCount >= TVCount
	){
		return "○";
	}else{
		return "×";
	}
}

//艦種縛り無し
//必要艦数と旗艦Lv
function sTypeFree(shipCount, flgShipLv){
	if(currentDockData.shipCount >= shipCount && currentDockData.flgShipLv >= flgShipLv){
		return "○";
	}else{
		return "×";
	}
}


//艦種記号
//	DD	駆逐
//	CL	軽巡
//	CLT	雷巡
//	CA	重巡
//	CVA	航空巡洋艦
//	BB	戦艦
//	CV	正規空母
//	CVL	軽空母
//	SS	潜水艦
//	CVS	潜水空母
//	CVB	航空戦艦
//	TV	練習巡洋艦
//	AV	水上機母艦
//	AS	潜水艦母艦
//	LHA	強襲揚陸艦
//	ACV 装甲空母
//	AR	工作艦