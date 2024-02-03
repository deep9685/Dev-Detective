const searchTab = document.querySelector("[data-searchform]");
const searchInput = document.querySelector("[input-bar]");
const searchForm = document.querySelector(".search-form");

// profile data
const userImage = document.querySelector("[profile-image]");
const Name = document.querySelector("[name-data]");
const userName = document.querySelector("[github-url]");
const JoinDate = document.querySelector("[join-date]");

const BioData = document.querySelector("[bio-data]");

const repoNum = document.querySelector("[repo-data]");
const followerNum = document.querySelector("[follower-data]");
const followingNum = document.querySelector("[following-data]");


const userLocation = document.querySelector("[location]");
const portfolioLink = document.querySelector("[portfolio-url]");
const twitterLink = document.querySelector("[twitter-url]");
const companyName = document.querySelector("[company-url]");
const root = document.documentElement.style;

let darkMode = false;

const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
let currentUserName = "thepranaygupta";
console.log(1);
fetchGitHubData(currentUserName);

async function fetchGitHubData(currentUserName)
{
    try{
        const response = await fetch(`https://api.github.com/users/${currentUserName}`);

        const data = await response.json();

        if(data?.message == "Not Found")
        {
            // console.log("hahaha");
            searchInput.value = "";
            alert("user not found");
            
            return;
        }
        else
        renderUserData(data);
    }
    catch(e)
    {

    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();

    currentUserName = searchInput.value;
    console.log("i am here");
    if(currentUserName == "")
    {
        // console.log(2)
        currentUserName = "thepranaygupta";
        fetchGitHubData(currentUserName);
        return
    }
    else
    {
        // console.log(3)
        fetchGitHubData(currentUserName);
    }
})


function renderUserData(userDataInfo)
{
    // put fetch data on ui
    const img_id = userDataInfo?.id;
    
    userImage.src = `https://avatars.githubusercontent.com/u/${img_id}?v=4`;
    Name.innerText = userDataInfo?.name;
    userName.innerText = `@${userDataInfo?.login}`;
    userName.href = `https://github.com/${userDataInfo?.login}`;
    
    const createdAtDate = new Date(userDataInfo?.created_at);
    // extract month
    const day = createdAtDate.getDay();
    const month = createdAtDate.getMonth();
    const year = createdAtDate.getFullYear();
    
    
    JoinDate.innerText = `Joined ${day} ${months[month]} ${year}`;
    
    
    // JoinDate.innerText = userDataInfo?.created_at;
    BioData.innerText = userDataInfo?.bio;
    repoNum.innerText = userDataInfo?.public_repos;
    followerNum.innerText = userDataInfo?.followers;
    followingNum.innerText = userDataInfo?.following;
    userLocation.innerText = userDataInfo?.location;

    portfolioLink.innerText = userDataInfo?.blog;
    portfolioLink.href = `https://codehelp-devdetective.netlify.app/${userDataInfo?.blog}`

    twitterLink.innerText = userDataInfo?.twitter_username;
    const twitterUserName = userDataInfo?.twitter_username;
    twitterLink.href = `https://twitter.com/${twitterUserName}`;
    
    companyName.innerText = userDataInfo?.company;

}

const mode = document.querySelector(".mode-container");
const modeText = document.querySelector("[mode-text]");
const modeIcon = document.querySelector("[mode-icon]");


mode.addEventListener("click", function () {
    if (darkMode == false) {
      darkModeProperties();
    } else {
      lightModeProperties();
    }
  });


// This code checks if the user's device has a preference for dark mode
const perfersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme : dark)").matches;

// Check if there is a value for "dark-mode" in the user's localStorage
if(localStorage.getItem("dark-mode") === null){
      // If there is no value for "dark-mode" in localStorage, check the device preference
      if(perfersDarkMode){
            // If the device preference is for dark mode, apply dark mode properties
            darkModeProperties();
      }
      else{
            // If the device preference is not for dark mode, apply light mode properties
            lightModeProperties();
      }
}
else{
      // If there is a value for "dark-mode" in localStorage, use that value instead of device preference
      if(localStorage.getItem("dark-mode") === "true"){
            // If the value is "true", apply dark mode properties
            darkModeProperties();
      }
      else{
            // If the value is not "true", apply light mode properties
            lightModeProperties();
      }
}



function darkModeProperties(){
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgb(70,88,109,0.15)");
    modeText.innerText = "LIGHT";
    modeIcon.src = "sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = true;
    localStorage.setItem("dark-mode", true);

}

function lightModeProperties() {
    root.setProperty("--lm-bg", "#F6F8FF");
    root.setProperty("--lm-bg-content", "#FEFEFE");
    root.setProperty("--lm-text", "#4B6A9B");
    root.setProperty("--lm-text-alt", "#2B3442");
    root.setProperty("--lm-shadow-xl", "rgba(70, 88, 109, 0.25)");
    modeText.innerText = "DARK";
    modeIcon.src = "moon-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(100%)");
    darkMode = false;
    localStorage.setItem("dark-mode", false);
  }


// const mode = document.querySelector(".mode-container");

// const wrapperClass = document.querySelector("body");
// const headContainerClass = document.querySelector(".head-container");
// const headContainerH1 = document.querySelector("[heading]");

// let defaultModeText = "DARK"

// modeText.innerText = defaultModeText;

// modeIcon.src = "moon-icon.svg";

// mode.addEventListener('click', (e) => {
//     e.preventDefault();

//     if(defaultModeText == "DARK")
//     {
//         defaultModeText = "LIGHT";
//         modeText.innerText = defaultModeText;

//         modeIcon.src = "sun-icon.svg";

//         wrapperClass.classList.add("dark");
//         headContainerH1.classList.add("h1-dark");

//     }
//     else{
//         defaultModeText = "DARK"
//         modeText.innerText = defaultModeText;
//         modeIcon.src = "moon-icon.svg";
//         wrapperClass.classList.remove("dark");
//         headContainerH1.classList.remove("h1-dark");
//     }
// })