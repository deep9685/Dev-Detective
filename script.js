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


let currentUserName = "thepranaygupta";
console.log(1);
fetchGitHubData(currentUserName);

async function fetchGitHubData(currentUserName)
{
    try{
        const response = await fetch(`https://api.github.com/users/${currentUserName}`);

        const data = await response.json();
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
        console.log(2)
        currentUserName = "thepranaygupta";
        return
    }
    else
    {
        console.log(3)
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
    JoinDate.innerText = userDataInfo?.created_at;
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