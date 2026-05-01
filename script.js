// Navigation Functionality
function goToPage(pageNumber) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show selected page
    document.getElementById(`page-${pageNumber}`).classList.add('active');
}

// Proposal Logic (Page 4)
let rejectCount = 0;
const rejectionMessages = [
    "Think again, you won't find anyone else like me! God sent me for you. 💖",
    "Please think carefully... we'd make a really cute couple! 😉",
    "Come on! We are a match made in heaven. Give us a chance! 🥰"
];

function rejectProposal() {
    const msgElement = document.getElementById("proposal-msg");

    if (rejectCount < rejectionMessages.length) {
        msgElement.innerText = rejectionMessages[rejectCount];
        rejectCount++;
    } else {
        msgElement.innerText = "Okay, I won't let you reject anymore! Give it a chance! 🌹";
    }

    // Sends the reject choice to the Formspree endpoint
    sendAnalytics("Reject");
}

function acceptProposal() {
    goToPage(5);
    sendAnalytics("Accept");
}

// OPERATOR TRACKING SYSTEM:
function sendAnalytics(choice) {
    // Your Formspree endpoint integrated here
    const trackingEndpoint = "https://formspree.io/f/mwvypvoe";

    fetch(trackingEndpoint, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            buttonClicked: choice,
            time: new Date().toLocaleString()
        })
    }).catch(error => {
        console.log("Tracking sent (or endpoint not configured yet).");
    });
}