$(function() {
  // ****************************************
  // Google oAuth
  // ****************************************

  // coinz.init({
  //   google: process.env.Client_ID  
  // },{redirect_uri:'http://localhost:7960/home/'});

  // ****************************************
  // format date in html
  //***************************************** */
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;   //   dd = "0" + (dd + 3); adding 3 days to current date.

  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  $("#date-1").attr("value", today);
  $("#date").attr("min", today);

  // ******************************************
  // Signup
//******************************************************* */

$().on("click", e => {
  e.preventDefault()
  console.log("clicked");
  let queryUrl = "/api/userInfo"
  let data = {
            title: req.body.title,
            name: req.body.name, 
            address: req.body.address, 
            phoneNumber: req.body.phoneNumber, 
            email: req.body.email,
            bank_name: req.body.bank_name,
            bank_account_number: req.body.bank_account_number, 
            bvn: req.body.bvn,
            system_account_number: req.body.system_account_number, 
            accountBalance: req.body.accountBalance,
            creation_date: req.body.creation_date
          };
  
 // Call to store user info
    $.ajax({
        url: queryUrl,
        method: "POST",
        data: data
    }).then(response => {
        console.log(response);
    });
        
 });

// ******************************************
  // Signin using phone number
//******************************************************* */

  $("#signIn").on("click", e => {
    e.preventDefault()
    console.log("clicked")
    let password = $("#pword").val().trim();
    let phoneNumber = $("#uname").val().trim();
    let queryUrl2 = "/api/users/user/" + phoneNumber
    // let unameCheck
    // let check

    $.ajax({
      url: queryUrl2,
      method: "GET",
      //data: userInfo
  }).then(response => {
      console.log(response);
  
    if (response.phoneNumber === phoneNumber && 
        response.email === password) {    //  for testing purposes should not be email
            console.log(`Welcome ${response.name}!`);
            window.location.href="../index.html";
            $("phone-1").val = response.phoneNumber
    } else {
        alert(`Invalid Username and/or Password. Please confirm and try again.`);
    };
  });
});

  // ******************************************
  // Signin using email
//******************************************************* */

// $("#signIn").on("click", e => {
//   e.preventDefault()
//   console.log("clicked")
//   let email = $("#uname").val().trim();
//   let password = $("#pword").val().trim();
//   let queryUrl2 = "/api/users/user/email" + email

//   // let unameCheck
//   // let check

//   $.ajax({
//     url: queryUrl2,
//     method: "GET",
//     data: userInfo
// }).then(response => {
//     console.log(response);
//   if (email === response.email && 
//       password === response.check) {
//           console.log(`Welcome ${response.unameCheck}!`);
//   } else {
//       alert(`Invalid Username and/or Password. Please confirm and try again.`);
//   };
// });
// });





  // ******************************************
  // Show account balance on sender phone number field change
  //******************************************************* */
  $("#phone-1").on("change", e => {
    e.preventDefault();
    populate();
  });

  // **************************************
  // Adding additional transfer recipients
  //*************************************** */
  let buildFormClickCount = [];
  let clickCount = 0;
  $(".glyph").on("click", e => {
    e.preventDefault();
    clickCount += 1;
    console.log(`click count = ${clickCount}`);
    buildFormClickCount.push(clickCount);
    console.log(buildFormClickCount);
    buildForm();
  });
  //********************************************************** */

  // *********************************************************
  // Clicking transfer button to initiate transaction
  //********************************************************** */

  $("#transfer").on("click", e => {
    e.preventDefault();
    console.log("clicked");
    let accept = confirm(`Are you sure you want to make this transfer`);
    // let decline = alert(`Transaction Cancelled`)
    !accept?
    alert(`Transaction Cancelled`):  
    transferFund();
     
  });

  // ***********************************************
  // Clicking cancel button to reset form
  //************************************************ */
  $("#cancel").on("click", () => {});
  // ********************************************************
  // function to transfer funds from one account to another
  //********************************************************* */

  let transferFund = () => {
    let transferDate = $("#date")
      .val()
      .trim();
    let transferAmount = $("#amt")
      .val()
      .trim();
    console.log(transferAmount);
    let phoneNumber1 = $("#phone-1")
      .val()
      .trim();
    let phoneNumber2 = $("#phone-2")
      .val()
      .trim();
    let queryUrl = "api/users/user/" + phoneNumber1;
    let queryUrl2 = "api/users/user/" + phoneNumber2;
    let phone1AcctBal = [],
      phone2AcctBal = [],
      newUser1Bal = [],
      newUser2Bal = [];

    // Call to get info of user/sender
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(response => {
      console.log(response);
      phone1AcctBal.push(response.accountBalance);
      console.log(phone1AcctBal);
      $("#balance").text(phone1AcctBal[0]);
      // Transfer calculation
      // Phone-1
      if (response.accountBalance < parseFloat(transferAmount)) {
        alert(`Insufficient funds!`);
        return;
      } else if (phoneNumber1 === phoneNumber2) {
        alert(`Unable to transfer from and into same account!`);
        return;
      } else {
        let accept = confirm(`Are you sure you want to transfer ${transferAmount} to ${phoneNumber2} transaction may not be easily reversed`);
        if (!accept) {
        alert(`Transaction cancelled`);
        } else {        
        let transfer_1 = phone1AcctBal[0] - parseFloat(transferAmount);
        console.log(transfer_1);
        newUser1Bal.push(transfer_1);
        console.log(newUser1Bal);
        let change = { accountBalance: newUser1Bal[0] };
        // Call to Update Sender Account Balance
        $.ajax({
          url: "api/users/user/" + phoneNumber1,
          method: "PATCH",
          contentType: "application/json",
          data: JSON.stringify(change)
        }).then(complete => {
          $("#balance").text(newUser1Bal[0]);
          $("#transactionDate").append("<br>" + transferDate);
          console.log(transferDate)
          $("#transactionInfo").append("<br>" + 
            `Transfer to ${response.name}`
          );
          $("#transactionAmt").append("<br>" + transferAmount)

          // Call to get info of recipient
          $.ajax({
            url: queryUrl2,
            method: "GET"
          }).then(response => {
            console.log(response);
            phone2AcctBal.push(response.accountBalance);
            console.log(phone2AcctBal);

            // Transfer calculation 2
            // Phone-2
            let transfer_2 = phone2AcctBal[0] + parseFloat(transferAmount);
            console.log(transfer_2);
            newUser2Bal.push(transfer_2);
            console.log(newUser2Bal);
            let change = { accountBalance: newUser2Bal[0] };
            // Call to Update Recipient Account Balance
            $.ajax({
              url: "api/users/user/" + phoneNumber2,
              method: "PATCH",
              contentType: "application/json",
              data: JSON.stringify(change)
            });
          });
        });
      }
      }
    });
  };
  //*********************************************************
  // function to update balance
  //********************************************************* */
  let updateBalance = () => {
    // // Call to Update Sender Account Balance
    // $.ajax({
    //     url: queryUrl,
    //     method: "PUT",
    //     data: data
    // }).then(response => {
    //     console.log(response);
    // });
    // // Call to Update Recipient Account Balance
    // $.ajax({
    //     url: queryUrl2,
    //     method: "PUT",
    //     data: newUser2Bal
    // }).then(response => {
    //     console.log(response);
    // });
  };
  //*********************************************************
  // function to get data
  //********************************************************* */
  let populate = () => {
    let queryUrl =
      "/api/users/user/" +
      $("#phone-1")
        .val()
        .trim();
    // Call to get info of user/sender
    $.ajax({
      url: queryUrl,
      method: "GET"
    }).then(response => {
      console.log(response);
      $("#balance").text(response.accountBalance);
    });
  };

  // ********************************************************
  // function to build form fields for additional transfers
  //********************************************************* */
  let buildForm = () => {
    let tagIncrease;
    // let addId = 0;
    // let amountToTransfer = [];
    // // tagIncrease = addId += 1;
    // console.log(tagIncrease);
    // console.log(buildFormClickCount)
    buildFormClickCount.forEach(x => {
      x;
      tagIncrease = x;
    });
    $("#content").append(
      '<div class="row line">' +
        '<div class="col-md-3 content-group"><br>' +
        '<label class="lables" for="Sender Account Number">*Transfer Date</label><br>' +
        "<input id=date-" +
        tagIncrease +
        'type="date" name="transfer date" value="yyyy-MM-dd" min="2019-03-26" placeholder="">' +
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Sender Account Number</label><br>' +
        "<input id=phone-1-" +
        tagIncrease +
        ' type="text" class="inputbox space" placeholder="" name="Sender Account Number">' +
        "<br>" +
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Recipient Account</label><br>' +
        "<input id=phone-2-" +
        tagIncrease +
        ' type="text" class="inputbox" placeholder="" name="Recipient Account Number">' +
        "<br>" +
        "</div>" +
        '<div class="col-md-3 content-group">' +
        "<br>" +
        '<label class="lables" for="Sender Account Number">*Transfer Amount</label><br>' +
        '<input type="number" class="inputbox" id=amt-' +
        tagIncrease +
        ' placeholder="₦" name="Transfer Amount">' +
        "<br>" +
        "</div>" +
        "</div>" +
        "</div>"
    );
  };
});
