const cardBody = document.getElementsByClassName("msg_card_body")[0];
const sendBtn = document.getElementsByClassName(" btn-primary")[0];
const inp = document.getElementsByClassName("chatInput")[0];
const getFallData = [];
let getChatHistory = [];
let  getPredefinedQues=[]
let chatId=0;
const greetings = ["hi", "hello", "hey", "hei", "oi", "hellow"];
const greetingsAnswer = [
  "Hi! How can i help you?",
  "hello! How can i help you?",
  "Hello! Ask me your queries.",
];

const deptArr = ["BTE", "CSE", "CEN", "EEE", "MBA"];

const classTimeArr = ["time", "schedule", "classtime","class"];

const weeksArr = [
  "saturday",
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
];
const subArr = ["course", "subject"];

function getData() {
  fetch("/getData")
    .then((response) => response.json())
    .then((data) => {
      getFallData.push(data);
    });

  fetch("/getChatHistory")
    .then((response) => response.json())
    .then((data) => {
      getChatHistory = data;
      getChatHistory.map((item) => {
        console.log(item);
        getChatHistoryGenerate(item.chat_id,item.user, item.chatbot);
        chatId=item.chat_id
        console.log(chatId);
      });
    });


  //routine

  //holiday


  //predefined 
  fetch("/getPredefinedQues")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    getPredefinedQues=data;
  });

}

inp.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    chatBotGen();

  }
});

//BY CLICK THE BUTTON
sendBtn.addEventListener("click", function (e) {
  chatBotGen();

});

function chatBotGen() {
  let week, batch, room, sub, greet, ques, classTime;
  let answers = [];
  let hasClass = false;
  let question
  //check if input is blank
  if (inp.value == 0) {
    inp.setCustomValidity("This cannot be empty");
    inp.reportValidity();
    return false;
  } else {
    ques=inp.value
    question= ques.replace("?","");
  

  }

  let keyCount = 0;
  const quesArr = question.split(" ");

  //Check if question has 'day' keyword
  quesArr.map((item, i) => {
    greetings.map((el) => {
      if (item.toLowerCase() == el) {
        greet = item.toLowerCase();
      }
    });
    //Check if question has 'day' keyword

    weeksArr.map((el) => {
      if (item.toLowerCase().indexOf(el.toLowerCase()) != -1) {
        week = item;
        keyCount += 1;
      }
    });

    //check if question has 'class time' keyword
    classTimeArr.map((el) => {
      if (item.toLowerCase().indexOf(el.toLowerCase()) != -1) {
        classTime = item;
        keyCount += 1;
      }
    });

    //Check if question has 'batch' keyword

    deptArr.map((el) => {
      if (item.toLowerCase().indexOf(el.toLowerCase()) != -1) {
        //if batch has space between string and number.EX: CSE 19
        const reg = new RegExp("^[0-9]+$");

        const checkHipen = quesArr[i][3] == "-";

        if (reg.test(quesArr[i + 1]) == true) {
          batch =(quesArr[i] + "-" + quesArr[i + 1]).toLowerCase();
        }
        //if batch has number withing r.EX: CSE19
        else if (quesArr[i].length > 3 && checkHipen == false) {
          batch = (quesArr[i].substr(0, 3) + "-" + quesArr[i].substr(3)).toLowerCase();
        } else {
          batch = quesArr[i].toLowerCase();
        }
        keyCount += 1;
        console.log(batch, keyCount, "s");
      }
    });

    //Check if question has 'subject/course' keyword
    subArr.map((el) => {
      if (item.toLowerCase().indexOf(el.toLowerCase()) != -1) {
        sub = item;
        keyCount += 1;
      }
    });

    //Check if question has 'class room' keyword
    if (item.toLowerCase().indexOf("room") != -1) {
      room = item;
      keyCount += 1;
    }
  });

  console.log(week, batch, room, keyCount, sub, greet);

  getFallData[0].map(async (obj) => {
    obj.batch.split(",").find((batches) => {
      //subject name in a day
      if (
        keyCount == 2 &&
        batches.toLowerCase() == batch &&
        obj.day.toLowerCase() == week
      ) {
        answers.push(obj.course_title);
      }

      //room name in a day
      if (
        (keyCount == 3 || keyCount == 4) &&
        room &&
        batches.toLowerCase() == batch &&
        obj.day.toLowerCase() == week
      ) {
        answers.push(obj.course_title + ":" + obj.room_no);
        console.log(obj.room_no);
      }
      //class time
      //room name in a day
      if (
        (keyCount == 3 || keyCount == 4) &&
        classTime &&
        batches.toLowerCase() == batch &&
        obj.day.toLowerCase() == week
      ) {
        answers.push(obj.course_title + ":" + obj.class_time);
        console.log(obj.class_time);
      }
      //single subject

      if (keyCount == 3 && sub && batches.toLowerCase() == batch) {
        if (obj.day.toLowerCase() == week) {
          hasClass = true;
          answers.push(obj.course_title);
        }
      }

      //all subjects

      if (
        keyCount == 2 &&
        sub &&
        batches.toLowerCase() == batch &&
        week == undefined
      ) {
        answers.push(obj.course_title);
        console.log(obj.course_title);
      }
    });
  });


    // check greetings
    if (greet) {
      answers.push(greetingsAnswer[Math.floor(Math.random() * greetingsAnswer.length)]);
  }

  // check if no class
  if (hasClass == false && answers.length == 0 && week) {
      answers[0] = `${batch} has no class in ${week}`;
  }

  //call the answer generator function
  predefinedAnsGen(ques, answers);



  //clear input value after send
  inp.value = "";
}

//predefined question
function predefinedAnsGen(ques,answers){

console.log(getPredefinedQues);
   
    let question= ques.replace("?","");
    let keyCount = 0;
    let queryCount=0;
    let flag=0;
  const quesArr = question.split(" ");
console.log(quesArr);
  //Check if question has 'day' keyword


    getPredefinedQues.map((item,i)=>{
      keyCount = 0;
      queryCount=0;

      //query count
      if(item.query1.length>0){queryCount+=1}
      if(item.query2.length>0){queryCount+=1}
      if(item.query3.length>0){queryCount+=1}
      if(item.query4.length>0){queryCount+=1}


item.query1.split(',').map(e=>{


  quesArr.map((el, i) => {
  if(e.toLowerCase()==el.toLowerCase()){
    keyCount+=1
  }
})
});

item.query2.split(',').map(e=>{


  quesArr.map((el, i) => {
    if(e.toLowerCase()==el.toLowerCase()){
      keyCount+=1
    }
  })
});
item.query3.split(',').map(e=>{

  quesArr.map((el, i) => {
    if(e.toLowerCase()==el.toLowerCase()){
      keyCount+=1
    }
  })
});
item.query4.split(',').map(e=>{

  quesArr.map((el, i) => {
    if(e.toLowerCase()==el.toLowerCase()){
      keyCount+=1
    }
  })
});

console.log(queryCount,keyCount);
if(queryCount==keyCount){
  answers=[]
  answers.push(item.answer)

}

    })


      chatAnsGen(ques, answers);
   
 
    


}



//answer implementation in dom

async function chatAnsGen(ques, ans) {
 
  const audioRcv = document.getElementById("audiorcv");
  const audioSend = document.getElementById("audiosend");
 
  const date = new Date();
  const now=date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
  .toLowerCase();

  let answer = "";
  if (ans.length > 0) {
    ans.map((item, i) => {
      chatId++;
      answer += `${item} <br>`;
    });
  } 
  else {
    chatId++;
    answer = "No answer has been found!!Can you be more specefic?";
  }

  const chatbot = `  <div class="d-flex justify-content-start mb-4">
<div class="img_cont_msg">
<div class="dropdown dropright">
<a href="javascript:void(0)" data-toggle="dropdown" >  
<img src="images/chatbot.png" class="rounded-circle user_img_msg" alt=""/>
</a>
<ul class="dropdown-menu dropdown-menu-right">
    <li class="dropdown-item" onclick="report(${chatId})">
    <i class="fa fa-user-circle text-primary mr-2"></i>Report this as invalid
    </li>
   
</ul>
</div>  

</div>
<div class="msg_cotainer">
    ${answer}
    <span class="msg_time">${now}, Today</span>
</div>
</div>
`;

  const student = `
<div class="d-flex justify-content-end mb-4">

<div class="msg_cotainer_send">
    ${ques}
    <span class="msg_time_send">${now}</span>
</div>
<div class="img_cont_msg ">

<div class="dropdown dropleft">
<a href="javascript:void(0)" data-toggle="dropdown">  <img src="images/user.png" class="rounded-circle user_img_msg" alt=""/></a>
<ul class="dropdown-menu ">
    <li class="dropdown-item" onclick="report(${chatId})">
    <i class="fa fa-user-circle text-primary mr-4"></i>Report this as invalid
    </li>
   
</ul>
</div>
</div>
</div>
`;

  setTimeout(function () {
    cardBody.insertAdjacentHTML("beforeend", student);
 
    audioRcv.play();

  }, 0);

  setTimeout(function () {
    cardBody.insertAdjacentHTML("beforeend", chatbot);
    audioSend.play();
    speechToText(answer) 
  }, 1000);

  setTimeout(function () {
    const element = cardBody.lastElementChild;

    element.scrollIntoView();
    element.scrollIntoView(false);
    element.scrollIntoView({ block: "end" });
    element.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, 1000);

  //chathistory to mongo
  console.log(ques, answer);

  //start chat saved history module
  fetch("/chatHistory", {
    method: "POST",
    body: JSON.stringify({
      chat_id: chatId,
      student: ques,
      chatbot: answer,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      chatId=data[0]
      console.log(chatId,'chatid');
    });

  //end chat saved history module
}


//male voice
function speechToText(txt) {
  const synth = window.speechSynthesis;
  const voices = synth.getVoices();
  let msg = new SpeechSynthesisUtterance();
  msg.voice=voices[1]
  msg.text = txt;
  window.speechSynthesis.speak(msg);
}


function getChatHistoryGenerate(chat_id,ques, answer) {
  const chatbot = `      <div class="d-flex justify-content-start mb-4">
  <div class="img_cont_msg">
  <div class="dropdown dropright">
  <a href="javascript:void(0)" data-toggle="dropdown" >  
  <img src="images/chatbot.png" class="rounded-circle user_img_msg" alt=""/>
  </a>
  <ul class="dropdown-menu dropdown-menu-right">
      <li class="dropdown-item" onclick="report(${chat_id})">
      <i class="fa fa-user-circle text-primary mr-2"></i>Report this as invalid
      </li>
     
  </ul>
</div>
     
  </div>
  <div class="msg_cotainer">
      ${answer}
      <span class="msg_time">8:40 AM, Today</span>
  </div>
  </div>
  `;

  const student = `
  <div class="d-flex justify-content-end mb-4">
  
  <div class="msg_cotainer_send">
      ${ques}
      <span class="msg_time_send">8:55 AM, Today</span>
  </div>
  <div class="img_cont_msg">

  <div class="dropdown dropleft">
  <a href="javascript:void(0)" data-toggle="dropdown">  <img src="images/user.png" class="rounded-circle user_img_msg" alt=""/></a>
  <ul class="dropdown-menu ">
      <li class="dropdown-item" onclick="report(${chatId})">
      <i class="fa fa-user-circle text-primary mr-4"></i>Report this as invalid
      </li>
     
  </ul>
  </div>
  </div>
  </div>
  `;

  cardBody.insertAdjacentHTML("beforeend", student);

  cardBody.insertAdjacentHTML("beforeend", chatbot);

}



function report(i){
  console.log(i);

    //start chat saved history module
    fetch("/reportChat", {
      method: "POST",
      body: JSON.stringify({
        chat_id: i,
       
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }) .then((response) => response.json())
    .then((data) => {
      console.log(data);
    });

}

function delConversation(){
 
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this conversation!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      fetch("/deleteConversation", {
        method: "GET",
     
        headers: {
          "Content-Type": "application/json",
        },
      }) .then((response) => response.json())
      .then((data) => {
        if(data.acknowledged==true){
          cardBody.innerHTML=""
        }
      });
      swal("Poof! Your Conversation has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your Conversation is safe!");
    }
  });

 
}
