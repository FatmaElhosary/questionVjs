const btnConfirm = document.getElementById("btnConfirm");
const btnTry = document.getElementById("btnTry");
//const btnTrue = document.getElementById("btnTrue");
const btnreason=document.getElementById('btnreason');
const reason=document.getElementById('reason');
const showAns=document.getElementById('showAns');
const btnmore=document.getElementById('btnmore');
const more=document.getElementById('more');
const btnknowAns=document.getElementById('btnknowAns');
const models=document.querySelector('.modal');
/////////////Prevent Bootstrap Modal Popup from closing when clicked outside//////
const trueModal = document.querySelector('#TrueAnswer');
const modalForTrue = bootstrap.Modal.getOrCreateInstance(trueModal); // Returns a Bootstrap modal instance
//////////////////////
const ul=document.querySelector('ul');
/////////////////////////
trueModal.addEventListener('hidden.bs.modal', function (event) {
  // do something...
  console.log('close true answer');
})
let count=0;
let questions;
btnConfirm.addEventListener('click',confirmAnswer);
btnreason.addEventListener('click',showReason);
btnTry.addEventListener('click',tryAgain);
btnmore.addEventListener('click',showMore);
btnknowAns.addEventListener('click',showAnswer);

///read from json ///////////////////////
async function readJson(){
  await 
  fetch('/data.json')
      .then((response) => response.json())
      .then((json) => {console.log(json); questions=json});
  console.log(questions);
}
 readJson();
///////////create question elements//////////
function createQuestion(ques){
  const quesElement = document.createElement("div");
  //quesElement.classList.add(['center-screen','container']);
  quesElement.innerText = ques.question;
  document.body.appendChild(quesElement);
}
///////////////////////////////////////////////    
function confirmAnswer(e){
        e.preventDefault();
        var form = document.getElementById("test");
        const selectedValue=form.elements["answer"].value;
        console.log(selectedValue);
        /////check if the user select answer///////////
        if(selectedValue){
            count++;
            console.log(count);
            //btnConfirm.style.display='none';
            if(count<=2){
                if(selectedValue==='اقرأ ما شئت تستفد'){
                    count=0;
                    console.log('اجابة صحيحة');
                    btnConfirm.removeEventListener('click',confirmAnswer);
                    //btnConfirm.innerText='إجابة صحيحة';                 
                    //btnTrue.style.display='block';
                    modalForTrue.show();
                   // alert('true answer');
                   // count=0;
                    //return;
                }
                else{ 
                    if(count===2){
                        count=0;
                        console.log('تعرف على الاجابة');
                        btnknowAns.style.display='block';
                    }else{
                        console.log('أعد المحاولة');
                        btnTry.style.display='block';
                    }   
                }
              
            }else{
                count=0;
                console.log('تعرف على الاجابة');
                btnknowAns.style.display='block';
                //showAns.style.display='block'
            }
           
        }else{
          //not choose any answer
          //  alert('please choose your answer')
        }

}
function showReason(e){
    btnTrue.style.display='none';
    reason.style.display='block';
}
function tryAgain(){
    btnTry.style.display='none';
    btnConfirm.style.display='block';
}
function showAnswer(e){
    e.preventDefault();
    btnknowAns.style.display='none';
    showAns.style.display='block'
}
function showMore(){
    showAns.style.display='none'
more.style.display='block'
}
////////////////////////// pagination ////////////////////////////////////////
const paginationNumbers = document.getElementById("pagination-numbers");
const paginatedList = document.getElementById("paginated-list");
const listItems = paginatedList.querySelectorAll(".container");
const nextButton = document.getElementById("next-button");
const prevButton = document.getElementById("prev-button");

const paginationLimit = 1;
const pageCount = Math.ceil(listItems.length / paginationLimit);
let currentPage = 1;

const disableButton = (button) => {
  button.classList.add("disabled");
  button.setAttribute("disabled", true);
};

const enableButton = (button) => {
  button.classList.remove("disabled");
  button.removeAttribute("disabled");
};

//////disable in start question /////////////////
const handlePageButtonsStatus = () => {
  if (currentPage === 1) {
    disableButton(prevButton);
  } else {
    enableButton(prevButton);
  }

  if (pageCount === currentPage) {
    disableButton(nextButton);
  } else {
    enableButton(nextButton);
  }
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".pagination-number").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("page-index"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

 const appendPageNumber = (index) => {
  const pageNumber = document.createElement("button");
  pageNumber.className = "pagination-number";
  pageNumber.innerHTML = index;
  pageNumber.setAttribute("page-index", index);
  pageNumber.setAttribute("aria-label", "Page " + index);

  paginationNumbers.appendChild(pageNumber);
};

const getPaginationNumbers = () => {
  for (let i = 1; i <= pageCount; i++) {
    appendPageNumber(i);
  }
}; 

const setCurrentPage = (pageNum) => {
  currentPage = pageNum;

  handleActivePageNumber();
  handlePageButtonsStatus();
  
  const prevRange = (pageNum - 1) * paginationLimit;
  const currRange = pageNum * paginationLimit;

  listItems.forEach((item, index) => {
    item.classList.add("hidden");
    if (index >= prevRange && index < currRange) {
      item.classList.remove("hidden");
    }
  });
};

window.addEventListener("load", () => {
  getPaginationNumbers();
  setCurrentPage(1);

  prevButton.addEventListener("click", () => {
    setCurrentPage(currentPage - 1);
  });

  nextButton.addEventListener("click", () => {
    setCurrentPage(currentPage + 1);
  });

  document.querySelectorAll(".pagination-number").forEach((button) => {
    const pageIndex = Number(button.getAttribute("page-index"));

    if (pageIndex) {
      button.addEventListener("click", () => {
        setCurrentPage(pageIndex);
      });
    }
  });
});
////////////////////////////////////////////////////////////////////////////
const para = document.createElement("p");
para.innerText = questions[0].question;
document.body.appendChild(para);
createQuestion(questions[0]);
console.log(questions);