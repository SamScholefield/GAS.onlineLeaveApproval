var reason = {
                a: 'a. One\'s own wedding',
                b: 'b. Participation in the wedding of children, siblings or parents',
                c: 'c. The death of a spouse, child or parent',
                d: 'd. The death of a sibling or parent-in-law',
                e: 'e. The birth of a child, to wife or life companion',
                f: 'f. Participation at the burial of a spouse, life companion, parent, child, parent-in-law, sibling or grandparent',
                g: 'g. Terminal illness or medical emergency for an immediate family member (spouse, life companion, parent, child, sibling)',
                h: 'h. Moving to a new house',
                i: 'i. Summons by a court of law or other official body',
                j: 'j. Medical treatment',
                k: 'k. Providing care',
                l: 'l. Child beginning school for the first time',
                m: 'm. Before call up for military service or Zivildienst',
                n: 'n. Personal business for which absence is absolutely unavoidable'
                
              }

function doGet(request) {
  var template =  HtmlService.createTemplateFromFile('container');
  return template.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename)
                    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
                    .getContent();
}

function getLoggedInUser(){
  var user = Session.getActiveUser().getEmail();
  return user;
}

function getLoggedInUserName(user){

  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var sheet = ss.getSheetByName('domainUsers');
  var range = sheet.getRange(2, 1, sheet.getLastRow()-1, 3);
  var objects = getRowsData(sheet, range);

  for(var i = 0; i < objects.length; i++){
    if(objects[i].email == user){    
      var fname = objects[i].fname;
      var lname = objects[i].lname;
      var name = fname + " " + lname
      break;
    };    
  }  
  return [user, name];
  
}

function getActiveObjects(id){
  
  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var activeSheet = ss.getSheetByName('active');
  var activeRange = activeSheet.getRange(2, 1, activeSheet.getLastRow()-1, activeSheet.getLastColumn());
  var activeObjects = getRowsData(activeSheet, activeRange);
  return [activeObjects, id];
  
}

function processForm(form){  
   
  var ss = SpreadsheetApp.openById('1Z15yn7wcpSWxhgZCruhw2F6wz3gbhddz3vJGgXhm9hA');
  var activeSheet = ss.getSheetByName('active'); 
   
  var dataObjects = getActiveObjects()[0];
  var approver = form.approver;
  var approval_level = form.approval_level;
  var request_id = form.request_id;
  var request_type = form.request_type;
  var decision = form.decision;
  var comment = form.section_comment || 'No comment supplied';
  var now = new Date();
  
  if(form.paid_check == undefined){
    var paid = 0;
  }else{
    var paid = 1;
  };  
  
  for(var i = 0; i < dataObjects.length; i++){
    if(request_id == dataObjects[i].requestid){
      var row = i + 2;
      var userName = dataObjects[i].username;      
      var userMail = dataObjects[i].userid;
      var startDate = dataObjects[i].startdate;
      var startTime = dataObjects[i].starttime;
      var endDate = dataObjects[i].enddate;
      var endTime = dataObjects[i].endtime;
      var reasonText = reason[dataObjects[i].option];

      break;
    }
  }
  
  //SECTION APPROVE OR DECLINE
  if(approval_level == 1 && decision == 'approved'){
    activeSheet.getRange(row, 6, 1, 1).setValue('Awaiting Director approval');
    activeSheet.getRange(row, 17, 1, 6).setValues([[2, 'pmurphy@student.vis.ac.at', comment, decision, now, paid]]);
    level1ApproveMail(userName, startDate, startTime, endDate, endTime, reasonText, request_type);
  }else if(approval_level == 1 && decision == 'declined'){
    activeSheet.getRange(row, 6, 1, 1).setValue('Declined by Section Principal');
    activeSheet.getRange(row, 17, 1, 6).setValues([[0, 'declined', comment, decision, now, paid]]);
    level1DeclineMail(userMail, userName, startDate, startTime, endDate, endTime, reasonText, comment, request_type)
  };
  
  //DIRECTOR APPROVE OR DECLINE
  if(approval_level == 2 && decision == 'approved'){
    activeSheet.getRange(row, 6, 1, 1).setValue('Approved');
    activeSheet.getRange(row, 17, 1, 1).setValue(3); 
    activeSheet.getRange(row, 22, 1, 4).setValues([[paid, comment, decision, now]]);
    level2ApprovalMail(userMail, userName, startDate, startTime, endDate, endTime, reasonText, paid, request_type)
  }else if(approval_level == 2 && decision == 'Declined'){
    activeSheet.getRange(row, 6, 1, 1).setValue('Declined');
    activeSheet.getRange(row, 17, 1, 1).setValue(0);
    activeSheet.getRange(row, 22, 1, 4).setValues([[paid, comment, decision, now]]);
    level2DeclineMail(userMail, userName, startDate, startTime, endDate, endTime, reasonText, comment, request_type)
  }; 
  
  return;
  
}
