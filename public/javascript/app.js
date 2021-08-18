$(function () {
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
    dd = "0" + dd; //   dd = "0" + (dd + 3); adding 3 days to current date.
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;
  console.log(today);
  $("#date-1").attr("value", today);
  $("#date").attr("min", today);

  // *******************************************
  // Global Variables
  // **************************************************** */
  var hold = [];


  // ******************************************
  // Account Number Format
  //******************************************************* */
  let prefix; // first three digits of bank code
  let internalCode; // six digits of account numbers
  let checkDigit; // one digit from modulus check
  let accountNumber; // prefix plus internalCode plus checkDigit

  // ******************************************
  // Signup
  //******************************************************* */

  $().on("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    let queryUrl = "/api/userInfo";
    let data = {
      title: req.body.title,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      email: req.body.email,
      bank_name: req.body.bank_name,
      bank_account_number: req.body.bank_account_number,
      bvn: req.body.bvn,
      system_account_number: req.body.system_account_number,
      accountBalance: req.body.accountBalance,
      creation_date: req.body.creation_date,
    };

    // Call to store user info
    $.ajax({
      url: queryUrl,
      method: "POST",
      data: data,
    }).then((response) => {
      console.log(response);
    });
  });

  // ******************************************
  // Signin using phone number
  //******************************************************* */
  // var hold = [];
  // setValue(hold[0]) // delete this
  
  $("#signIn").on("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    let password = $("#pword").val().trim();
    let phoneNumber = $("#uname").val().trim();
    let queryUrl2 = "/api/users/user/" + phoneNumber;
    console.log(phoneNumber);
    console.log(password);
    // let unameCheck
    // let check

    $.ajax({
      url: queryUrl2,
      method: "GET",
      //data: userInfo
    }).then((response) => {
      console.log(response);
      console.log(response.phoneNumber);
      console.log(response.email);

      if (
        JSON.stringify(response.phoneNumber) === phoneNumber &&
        response.email === password
      ) {
        //  for testing purposes should not be email
        window.location.href = "../index.html";
        console.log(`Welcome ${response.firstName}!`);
      } else {
        alert(
          `Invalid Username and/or Password. Please confirm and try again.`
        );
        window.location.href = "/";
      }
    });
  });

  // ******************************************
  // Signin using email
  //******************************************************* */

  $("#signIn").on("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    let email = $("#uname").val().trim();
    let password = $("#pword").val().trim();
    let queryUrl2 = "/api/users/user/email/" + email;
    console.log(email);
    console.log(password);
    // hold.push(password)

    // let unameCheck
    // let check
    //*********************************** */
    // httpRequest
    //******************************************* */

//     let httpRequest;
//     function makeRequest() {
//     httpRequest = new XMLHttpRequest();

//     if (!httpRequest) {
//       alert('Giving up :( Cannot create an XMLHTTP instance');
//       return false;
//     }

//     httpRequest.onreadystatechange = displayContents;
//       // Process the server response here.
//       httpRequest.open('GET', queryUrl2, true);
//       httpRequest.send();
//   }
  
//   function displayContents() {
//     // let email = $("#uname").val().trim();
//     // let password = $("#pword").val().trim();
//   if (httpRequest.readyState === XMLHttpRequest.DONE) {
//     // Everything is good, the response was received.
//     if (httpRequest.status === 200) {
//       console.log("Perfect!")
//       console.log(httpRequest)
//       console.log(httpRequest.responseText)
//       let jsonResponse = JSON.parse(httpRequest.responseText)
//       let verifyEmail = jsonResponse["email"]
//       let verifyPhone = jsonResponse["phoneNumber"]
//       console.log(jsonResponse)
//       console.log(jsonResponse["email"])
//       console.log(verifyEmail)
//       console.log(email)
//       console.log(jsonResponse["phoneNumber"])
//       console.log(verifyPhone)
//       console.log(password)
//         if (
//       email === verifyEmail &&
//       password === JSON.stringify(verifyPhone)
//       ) {

//       hold.push(JSON.stringify(jsonResponse["phoneNumber"]));
//       storeLocal(hold)

//       function storeLocal(data){
//           localStorage.setItem('userData', data);
//       }
//       console.log(hold[0]);
//       // setValue(hold[0])
//     //         hold.push(JSON.stringify(response.phoneNumber).trim());
//             console.log("pushed")
//     //       //   console.log(`This is the hold variable: ${hold[0]}`);
//           window.location.replace("../index.html");
//           // return hold[0]
//     } else {
//       // There was a problem with the request.
//       // For example, the response may have a 404 (Not Found)
//       // or 500 (Internal Server Error) response code.
//       console.log(`error: there was a problem`)
//     }
//     // Not ready yet.
//       }
//     }
//   }
// // }
// makeRequest();
//********************************************** */
    
// if (httpRequest.readyState === XMLHttpRequest.DONE) {
  window.onload = function windowLoad(event) {
        event.preventDefault()
      $.ajax({
        url: queryUrl2,
        method: "GET",
        success: function (response) {
          // setValue(JSON.stringify(response.phoneNumber))
      //     if (
      //       email === response.email &&
      //       password === JSON.stringify(response.phoneNumber)
      //       ) {
      //         console.log(JSON.stringify(response.phoneNumber));
      //           hold.push(JSON.stringify(response.phoneNumber).trim());
      //           console.log("pushed")
      //         //   console.log(`This is the hold variable: ${hold[0]}`);
      //         // window.location.replace("../index.html");
      //         // return hold[0];
      //         function makeRequest() {
      //         httpRequest = new XMLHttpRequest();
            
      //         if (!httpRequest) {
      //           alert('Giving up :( Cannot create an XMLHTTP instance');
      //           return false;
      //         }
            
      //         httpRequest.onreadystatechange = displayContents;
      //           // Process the server response here.
      //           httpRequest.open('GET', "../index.html", true);
      //           httpRequest.send();
      //       }
            
      //       function displayContents() {
      //       if (httpRequest.readyState === XMLHttpRequest.DONE) {
      //         // Everything is good, the response was received.
      //         if (httpRequest.status === 200) {
      //           // Perfect!
      //           console.log(httpRequest);
      //           window.location.replace(httpRequest.responseURL);
      //           setValue(hold[0])
      //       } else {
      //           // There was a problem with the request.
      //           // For example, the response may have a 404 (Not Found)
      //           // or 500 (Internal Server Error) response code.
      //           console.log(`error: there was a problem`)
      //         }
      //         // Not ready yet.
      //         // }
      //       }
      //       }
      //       makeRequest();
      // } else {
      //   alert(
      //     `Invalid Username and/or Password. Please confirm and try again.`
      //   );
      //   window.location.href = "/";
      // }
      // },
      // error: function () {
      //   alert("Something went wrong!");
      },
      // data: userInfo
    }).then((response) => {
      console.log(response);
      console.log(response.phoneNumber);
      console.log(response.email); 

      // if (
      //   email === response.email &&
      //   password === JSON.stringify(response.phoneNumber)
      // ) {
      //   console.log(JSON.stringify(response.phoneNumber));
      //   hold.push(JSON.stringify(response.phoneNumber).trim());
      //   console.log(`This is the hold variable: ${hold[0]}`);
      //   // window.location.replace("../index.html");
      //   // $(window).ready(() => {
      //   // $("input #phone-1").val(hold);
      //   //   let setNum = () => {
      //   //      console.log(hold)
      //   //      // setValues(hold)
      //   //      $("#date").val(today);
      //   //      $("input #phone-1").val(hold);
      //   //      $("#phone-2").focus();
      //   //      };
      //   //      setNum();
      //   //  }); 


        $(window).ready(() => {
      //   //   setTimeout(() => {
        setValue(hold[0]);
      //   //   console.log(`This is the lost hold variable: ${hold}`);
      //   //   }, 1000)
        });

      //     window.onload = (event) => {
      //       // this.location.href="../index.html";
      //   setNum(hold[0]);
      //       console.log('The page has fully loaded');
        // };

      //   // if ( window.location.href="../index.html") {
      //   //     // asyncCall()
      //   //    hold = $("#phone-1").val(response.phoneNumber)
      //   // }
      //   return hold[0];
      // } else {
      //   alert(
      //     `Invalid Username and/or Password. Please confirm and try again.`
      //   );
      //   window.location.href = "/";
      // }
      // console.log(`This is the hold variable again: ${hold[0]}`);
      //  setValues(hold[0])
      //  return hold;
    });
  
  


    // $(window).ready(() => {
    //   $.ajax({
    //     url: queryUrl2,
    //     method: "GET",
    //     success: function (response) {
    //       setValue(JSON.stringify(response.phoneNumber))
    //     }
    //   }).then((response) => {
    //     console.log(response);
    //     console.log(response.phoneNumber);
    //     console.log(response.email);

    //     hold.push(JSON.stringify(response.phoneNumber).trim());
    //     setValue(hold[0])

    //   }) 
    // });

      }
  });
  
  // $(window).ready(() => {
  //   $.ajax({
  //     url: queryUrl2,
  //     method: "GET",
  //     success: function (response) {
  //       setValue(JSON.stringify(response.phoneNumber))
  //     }
  //   }).then((response) => {
  //     console.log(response);
  //     console.log(response.phoneNumber);
  //     console.log(response.email);
  //   }) 
  // });

  
  // *********************************************************
  // Set phone number value function after successful sign in
  // **********************************************************
  let setValues = (x) => {
    $("#phone-1").empty();
    $("#phone-1").val(x);
  };

  let setNum = () => {
    $("#date").val(today);
    $("#phone-1").val(hold);
    $("#phone-2").focus();
  };
  
  let setValue = (x) => {
    x = x;
    console.log(x);
    // setValues(hold)
    $("#sphone-1").text(x);
    $("#phone-1").val(x);
    $("#phone-2").focus();
  };
  
  //  let setValues = (x) => {
    //   //  $(function() {
      //   //  $("../index.html").load( e => {
        //   //    e.preventDefault()
        //     // window.document.$("#phone-1").val(x);
        //     // setValue(JSON.stringify(response.phoneNumber));
        //     window.location.href = "../index.html";
        //     $("#phone-1").val(JSON.stringify(x));
        //     $("#phone-2").focus()
        //     // $("#phone-1").prev('input').val(response.phoneNumber)
        //     // })
        //   // })
        //  }
        
  //       let resolveAfter2Seconds = () => {
  //         return new Promise((resolve) => {
  //           setTimeout(() => {
  //             console.log(hold[0])
  //             resolve($("#phone-1").val(hold[0]));
  //           }, 2000);
  //         });
  //       };
        
  //       let asyncCall = async () => {
  //         console.log("calling");
  //   const result = await resolveAfter2Seconds();
  //   $("#phone-2").focus();
  //   console.log(result);
  //   // expected output: "resolve()"
  // };
  
  // asyncCall();
  // ******************************************
  // Show account balance on sender phone number field change
  //******************************************************* */
  $("#phone-1").on("change", (e) => {
    e.preventDefault();
    populate();
  });

  // **************************************
  // Adding additional transfer recipients
  //*************************************** */
  let buildFormClickCount = [];
  let clickCount = 0;
  $(".glyph").on("click", (e) => {
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

  $("#transfer").on("click", (e) => {
    e.preventDefault();
    console.log("clicked");
    let accept = confirm(`Are you sure you want to make this transfer`);
    // let decline = alert(`Transaction Cancelled`)
    !accept ? alert(`Transaction Cancelled`) : transferFund();
  });

  // ***********************************************
  // Clicking cancel button to reset form
  //************************************************ */
  $("#cancel").on("click", () => {});
  // ********************************************************
  // function to transfer funds from one account to another
  //********************************************************* */

  let transferFund = () => {
    let transferDate = $("#date").val().trim();
    let transferAmount = $("#amt").val().trim();
    console.log(transferAmount);
    let phoneNumber1 = $("#phone-1").val().trim();
    let phoneNumber2 = $("#phone-2").val().trim();
    let queryUrl = "api/users/user/" + phoneNumber1;
    let queryUrl2 = "api/users/user/" + phoneNumber2;
    let phone1AcctBal = [],
      phone2AcctBal = [],
      newUser1Bal = [],
      newUser2Bal = [];

    // Call to get info of user/sender
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then((response) => {
      console.log(response);
      phone1AcctBal.push(response.accountBalance);
      console.log(phone1AcctBal);
      $("#balance").text(phone1AcctBal[0]);
      // Transfer calculation
      // Phone-1
      if (transferDate === " ") {
        alert(`Please select a transfer date!`);
        return;
      } else if (transferDate !== today) {
        console.log(transferDate, today);
        confirm(
          `Transfer scheduled for later date, and will be executed on ${transferDate}`
        );
        alert(
          `Future transfer capabilities will be enabled in the near "Future"!`
        );
        // add ajax and database to store pending transactions
        return;
      } else if (response.accountBalance < parseFloat(transferAmount)) {
        alert(`Insufficient funds!`);
        return;
      } else if (phoneNumber1 === phoneNumber2) {
        alert(`Unable to transfer from and into same account!`);
        return;
      } else if (phoneNumber1 === " " || phoneNumber2 === " ") {
        alert(`Please enter a valid phone Number!`);
        return;
      } else {
        let accept = confirm(
          `Are you sure you want to transfer ${transferAmount} to ${phoneNumber2} transaction may not be easily reversed`
        );
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
            data: JSON.stringify(change),
          }).then((complete) => {
            $("#balance").text(newUser1Bal[0]);
            $("#transactionDate").append("<br>" + transferDate);
            console.log(transferDate);
            $("#transactionInfo").append(
              "<br>" + `Transfer to ${response.firstName} ${response.lastName}`
            );
            $("#transactionAmt").append("<br>" + transferAmount);

            // Call to get info of recipient
            $.ajax({
              url: queryUrl2,
              method: "GET",
            }).then((response) => {
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
                data: JSON.stringify(change),
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
    let queryUrl = "/api/users/user/" + $("#phone-1").val().trim();
    // Call to get info of user/sender
    $.ajax({
      url: queryUrl,
      method: "GET",
    }).then((response) => {
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
    buildFormClickCount.forEach((x) => {
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

// ******************************************
// Supplimental code to be added for future transfer
//******************************************************* */

// if (transferDate !== Date.today()) {
//   alert(`Transfer scheduled for later date, and will be executed on ${transferDate}`);
//   // add ajax and database to store pending transactions
//   return;
// }

// // add daily ajax calls to pending transfer database
// if (transferDate === Date.today() && transferAmmount <= accountBalance) {
//   // get and process transaction or transfer sender, recipient, and ammount information
//   return;
// }
