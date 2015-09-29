function level1ApproveMail(userName, startDate, startTime, endDate, endTime, reason, requestType){
 
  if(requestType == 'secondary'){
    var sectionOffice = 'sectionOfficeMail';
  }else{
    var sectionOffice = 'sectionOfficeMail';
  };
  
 //SECTION APPROVE
    //MAIL TO DIRECTOR
    MailApp.sendEmail({
          to: "directorMail",
          subject: "Leave request from " + userName + " has been approved by their section Principal",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and approved by their section Principal.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason + "<br><br><br>" +
                    "To perform final approval please access the leave request system here: https://sites.google.com/a/student.vis.ac.at/online-leave/leave-approval</p><br><br>",
          name: "Online leave request system",
          //noReply: true
        });
  
  //MAIL TO SECTION OFFICE
  MailApp.sendEmail({
          to: sectionOffice,
          subject: "Leave request from " + userName + " has been approved by their section Principal",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello, <br><br>" +           
                    "The following leave request has been submitted and approved by their section Principal.<br><br>" +
                    "<b>Name: </b>" + userName + "<br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason + "<br><br><br>" +
                    "To perform final approval please access the leave request system here: https://sites.google.com/a/student.vis.ac.at/online-leave/leave-approval</p><br><br>",
          name: "Online leave request system",
          //noReply: true
        });
    
}


//SECTION DECLINE
function level1DeclineMail(userMail, userName, startDate, startTime, endDate, endTime, reason, approver1comment, requestType){
  

  //MAIL TO USER
  MailApp.sendEmail({
          to: userMail,
          subject: "Your leave request has been declined",
          htmlBody: "<p STYLE='font-family: sans-serif'>" + "Hello " + userName + ", <br><br>" +           
                    "The following leave request has been declined by your section Principal.<br><br>" +
                    "<b>Start date: </b>" + shortDate(startDate) + " at " + shortTime(startTime) + "<br>" +
                    "<b>End date: </b>" + shortDate(endDate) + " at " + shortTime(endTime) + "<br>" +
                    "<b>Reason: </b>" + reason + "<br>" +
                    "<b>Decline comment: </b>" + approver1comment + "<br>",
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
  
    
}
