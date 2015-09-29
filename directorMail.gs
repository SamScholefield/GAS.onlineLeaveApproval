function level2ApprovalMail(userMail, userName, startDate, startTime, endDate, endTime, reason, paid, requestType){
 
  //MAIL TO USER
  
  if(paid == 0){
      MailApp.sendEmail({
          to: userMail,
          subject: "Your leave request has been approved",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello " + userName + ", <br><br>" +           
                    "The following leave request has been approved.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason + "<br><br><br>" +
                    "<b>Paid leave:</b> No<br>",
          name: "Online leave request system",
          //noReply: true
        });
    };
    
    if(paid == 1){    
        MailApp.sendEmail({
          to: userMail,
          subject: "Your leave request has been approved",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello " + userName + ", <br><br>" +           
                    "The following leave request has been approved.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason + "<br><br><br>" +
                    "<b>Paid leave:</b> Yes<br>",
          name: "Online leave request system",
          //noReply: true
        });
    };
        
   //MAIL TO SECTION OFFICE
   MailApp.sendEmail({
          to: 'sectionOfficeMail',
          subject: "A leave request has received final approval",
          htmlBody: "<p STYLE='font-family: sans-serif'>Hello,<br><br>" +           
                    "The following leave request has been approved.<br><br>" +
                    "<b>Name: </b>" + userName  + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>",
          name: "Online leave request system",
          //noReply: true
  });
  
  //MAIL TO PAYROLL AND HR
  if(paid == 1){
    MailApp.sendEmail({
          to: 'payrollmail, hrMail',
          subject: "A paid leave request has been approved",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following unpaid leave request has been approved.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>",
          name: "Online leave request system",
          //noReply: true
        });  
  };
  
  if(paid == 0){
    MailApp.sendEmail({
          to: 'payrollmail, hrMail',
          subject: "An unpaid leave request has been approved",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following unpaid leave request has been approved.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>",
          name: "Online leave request system",
          //noReply: true
        });  
  };

}

function level2DeclineMail(userMail, userName, startDate, startTime, endDate, endTime, reason, approver2comment, requestType){
  
  /*if(requestType == 'primary'){var secPrin = 'primaryPrincipal'}else{var secPrin = 'secondaryPrincipal'};*/  
  
  //MAIL TO USER
  MailApp.sendEmail({
          to: userMail,
          subject: "Your leave request has been declined",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello " + userName + ", <br><br>" +           
                    "The following leave request has been declined.<br><br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason + "<br>" +
                    "<b>Decline comment: </b>" + approver2comment + "<br>",
          name: "Online leave request system",
          //noReply: true
        });
        
   //MAIL TO SECTION OFFICE
   MailApp.sendEmail({
          to: 'sectionOffice',
          subject: "A leave request has been declined",
          htmlBody: "<p STYLE='font-family: sans-serif'>Hello,<br><br>" +           
                    "The following leave request has been declined.<br><br>" +
                    "<b>Name: </b>" + userName  + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>",
          name: "Online leave request system",
          //noReply: true
  });
  
  //MAIL TO SECTION PRINCIPAL
   MailApp.sendEmail({
          to: secPrin,
          subject: "A leave request has been declined",
          htmlBody: "<p STYLE='font-family: sans-serif'>Hello,<br><br>" +           
                    "The following leave request has been declined.<br><br>" +
                    "<b>Name: </b>" + userName  + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Director comment: </b>" + approver2comment,
          name: "Online leave request system",
          //noReply: true
  });

}
