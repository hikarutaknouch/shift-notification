var webhook = "https://hooks.slack.com/services/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";
var spreadsheet = SpreadsheetApp.openById('1ZxNF2TOK_JNdkaNwMvGiOy0bMUkzSPLMR44VgEU1EXk');

function todayNotification() {
  var today = new Date();
  var month = today.getMonth() + 1;
  var date = today.getDate();
  var sheet = spreadsheet.getSheetByName(String(month));
  
  var startrow = 2;
  var startcol = 1;
  var lastrow = sheet.getLastRow();
  var lastcol = sheet.getLastColumn();
  var sheetdata = sheet.getSheetValues(startrow, startcol, lastrow, lastcol);
  var day, name, note;
  for(var i = 0; i < sheetdata.length; i++) {
    if(i+1==date) {
      day = sheetdata[i][1];
      name = sheetdata[i][2];
      note = sheetdata[i][3];
      break;
    }
  }
  
  var username = "今日のシフト";
  var message = month + "/" + date + "(" + day + ")" + '\r\n' + "今日のシフト担当者は";
  if(name=="") message += "いません。";
  else {
    message += name + "です。よろしくおねがいします。" + '\r\n';
    message += "連絡事項は";
    if(note) message += note + "です。";
    else message += "とくにありません。";
  }
  
  var jsonData = {
    "username" : username,
    "text": message
  };
  var payload = JSON.stringify(jsonData);
  var options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
      };
  UrlFetchApp.fetch(webhook, options);
}


function tomorrowNotification() {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  var month = tomorrow.getMonth() + 1;
  var date = tomorrow.getDate();
  var sheet = spreadsheet.getSheetByName(String(month));
  
  var startrow = 2;
  var startcol = 1;
  var lastrow = sheet.getLastRow();
  var lastcol = sheet.getLastColumn();
  var sheetdata = sheet.getSheetValues(startrow, startcol, lastrow, lastcol);
  var day, name, note;
  for(var i = 0; i < sheetdata.length; i++) {
    if(i+1==date) {
      day = sheetdata[i][1];
      name = sheetdata[i][2];
      note = sheetdata[i][3];
      break;
    }
  }
  
  var username = "明日のシフト";
  var message = month + "/" + date + "(" + day + ")" + '\r\n' + "明日のシフト担当者は";
  if(name=="") message += "いません。";
  else {
    message += name + "です。よろしくおねがいします。" + '\r\n';
    message += "連絡事項は";
    if(note) message += note + "です。";
    else message += "とくにありません。";
  }
  
  var jsonData = {
    "username" : username,
    "text": message
  };
  var payload = JSON.stringify(jsonData);
  var options =
      {
        "method" : "post",
        "contentType" : "application/json",
        "payload" : payload
      };
  UrlFetchApp.fetch(webhook, options);
}
