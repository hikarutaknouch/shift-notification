function myFunction() {
  var webhook = "https://hooks.slack.com/services/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";
  var spreadsheet = SpreadsheetApp.openById('1ZxNF2TOK_JNdkaNwMvGiOy0bMUkzSPLMR44VgEU1EXk');
  
  var month = new Date().getMonth() + 1;
  var date = new Date().getDate();
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
  
  var person = "今日のシフト";
  var message = month + "/" + date + "(" + day + ")" + '\r\n' + "今日のシフト担当者は";
  if(name=="") message += "いません。";
  else {
    message += name + "です。よろしくおねがいします。" + '\r\n';
    message += "連絡事項は";
    if(note) message += note + "です。";
    else message += "とくにありません。";
  }
  
  var jsonData = {
    "username" : person,
    "text":message
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
