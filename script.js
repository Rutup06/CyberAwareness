let quizData = {
    easy: [
        {question:"OTP should be shared with?", options:["Bank staff","No one","Friends"], answer:1,
         explanation:"Never share OTP with anyone. Banks never ask for OTP over phone or SMS."},
        {question:"Phishing usually happens via?", options:["Fake emails","TV","Newspaper"], answer:0,
         explanation:"Phishing uses fake emails or websites to steal login credentials."},
        {question:"Strong password includes?", options:["12345","Name","Letters+Numbers+Symbols"], answer:2,
         explanation:"Use a combination of letters, numbers, and symbols to make passwords strong."},
        {question:"Unknown link received?", options:["Click","Ignore","Share"], answer:1,
         explanation:"Never click unknown links. Always verify source before visiting."},
        {question:"Public WiFi risk?", options:["Free speed","Data theft","No risk"], answer:1,
         explanation:"Public WiFi can be intercepted by attackers. Use VPN or avoid sensitive transactions."},
        {question:"Prize message but not participated?", options:["Claim","Ignore","Pay fee"], answer:1,
         explanation:"Ignore suspicious prize messages; they may be scams."},
        {question:"ATM PIN safety?", options:["Share","Hide while typing","Tell friend"], answer:1,
         explanation:"Always hide your PIN while entering; never share it."},
        {question:"KYC call asking OTP?", options:["Share","Cut call","Ask reason"], answer:1,
         explanation:"Banks never ask OTP over call. Verify directly with bank."},
        {question:"Spam email?", options:["Open attachment","Delete","Reply"], answer:1,
         explanation:"Delete spam emails. Never open attachments or reply."},
        {question:"Cyberbullying means?", options:["Online harassment","Gaming","Coding"], answer:0,
         explanation:"Cyberbullying is online harassment and should be reported."}
    ],
    medium: [
        {question:"Two-factor authentication adds?", options:["Extra security","Speed","Ads"], answer:0,
         explanation:"2FA adds an extra layer of security, usually via OTP or authenticator app."},
        {question:"HTTPS means?", options:["Secure site","Hack site","Fake site"], answer:0,
         explanation:"HTTPS ensures data sent to the website is encrypted and secure."},
        {question:"Malware is?", options:["Security tool","Virus software","Browser"], answer:1,
         explanation:"Malware is malicious software that can harm your system or data."},
        {question:"Social engineering is?", options:["Coding","Manipulating people","Networking"], answer:1,
         explanation:"Social engineering manipulates people into giving sensitive information."},
        {question:"Firewall protects from?", options:["Unauthorized access","Rain","Heat"], answer:0,
         explanation:"Firewalls prevent unauthorized access to your network or system."},
        {question:"Ransomware does?", options:["Encrypt files","Boost speed","Clean virus"], answer:0,
         explanation:"Ransomware encrypts files and demands payment to unlock them."},
        {question:"Data backup helps in?", options:["Recovery","Hacking","Deleting"], answer:0,
         explanation:"Regular backups help restore data after loss or attacks."},
        {question:"Secure password length?", options:["4","8+","2"], answer:1,
         explanation:"Passwords should be at least 8 characters long for security."},
        {question:"Fake website check?", options:["URL spelling","Color","Font size"], answer:0,
         explanation:"Always check URL spelling to identify fake websites."},
        {question:"VPN is used for?", options:["Secure connection","Gaming","Printing"], answer:0,
         explanation:"VPNs encrypt your internet connection to enhance security."}
    ],
    hard: [
        {question:"Zero-day attack means?", options:["Known patch","Unknown vulnerability","Expired virus"], answer:1,
         explanation:"Zero-day exploits an unknown vulnerability before a patch is available."},
        {question:"Brute force attack tries?", options:["Random passwords","Emails","Firewall"], answer:0,
         explanation:"Brute force attacks try many passwords until the correct one is found."},
        {question:"SQL injection targets?", options:["Database","Monitor","Keyboard"], answer:0,
         explanation:"SQL injection attacks target databases by inserting malicious queries."},
        {question:"DDoS attack floods?", options:["Network traffic","Electricity","Password"], answer:0,
         explanation:"DDoS attacks flood network resources, making services unavailable."},
        {question:"Encryption converts data into?", options:["Readable text","Cipher text","Image"], answer:1,
         explanation:"Encryption converts readable data into cipher text to secure it."},
        {question:"Man-in-the-middle attack intercepts?", options:["Communication","Keyboard","Monitor"], answer:0,
         explanation:"It intercepts communication between two parties to steal data."},
        {question:"Biometric security uses?", options:["Fingerprint","Password","PIN only"], answer:0,
         explanation:"Biometrics use fingerprints, face, or retina scans to authenticate."},
        {question:"Hashing ensures?", options:["Data integrity","Speed","Ads"], answer:0,
         explanation:"Hashing ensures data integrity by creating unique data signatures."},
        {question:"Trojan horse is?", options:["Malware disguised","Antivirus","Firewall"], answer:0,
         explanation:"Trojan is malware disguised as legitimate software."},
        {question:"Ethical hacking is?", options:["Illegal","Authorized security testing","Gaming"], answer:1,
         explanation:"Ethical hacking is authorized testing of systems for security flaws."}
    ]
};

let currentLevel = "";
let questions = [];
let currentQuestion = 0;
let score = 0;
let answered = false;

// Show level selection from intro page
function showLevels() {
    document.getElementById("intro").style.display = "none";
    document.getElementById("levels").style.display = "block";
}

// Start quiz for selected level
function startQuiz(level) {
    currentLevel = level;
    questions = quizData[level];
    currentQuestion = 0;
    score = 0;

    document.getElementById("levels").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById("finalScore").innerText = "";
    document.getElementById("levelTitle").innerText =
        "Level: " + level.toUpperCase();

    loadQuestion();
}

// Load current question
function loadQuestion() {
    answered = false;

    document.getElementById("questionNumber").innerText =
        "Question " + (currentQuestion + 1) + " of 10";

    document.getElementById("question").innerText =
        questions[currentQuestion].question;

    for (let i = 0; i < 3; i++) {
        let btn = document.getElementById("opt" + i);
        btn.innerText = questions[currentQuestion].options[i];
        btn.disabled = false;
        btn.className = "";
    }

    document.getElementById("result").innerText = "";
    document.getElementById("nextBtn").disabled = true;
}

// Check answer and show best practice / explanation
function checkAnswer(selected) {
    if (answered) return;
    answered = true;

    let correct = questions[currentQuestion].answer;
    let explanation = questions[currentQuestion].explanation;

    for (let i = 0; i < 3; i++) {
        let btn = document.getElementById("opt" + i);
        btn.disabled = true;

        if (i === correct) btn.classList.add("correct");
        if (i === selected && i !== correct) btn.classList.add("wrong");
    }

    if (selected === correct) {
        score += 10;
        document.getElementById("result").innerHTML =
            "✅ Correct!<br><br>💡 Best Practice: " + explanation;
    } else {
        document.getElementById("result").innerHTML =
            "❌ Wrong!<br><br>✅ Correct Answer: " +
            questions[currentQuestion].options[correct] +
            "<br><br>💡 Best Practice: " + explanation;
    }

    document.getElementById("nextBtn").disabled = false;
}

// Go to next question or finish level
function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < 10) {
        loadQuestion();
    } else {
        // Hide quiz
        document.getElementById("quiz").style.display = "none";

        // Show final score
        document.getElementById("finalScore").innerText =
            "🎉 Level Completed! Your Score: " + score + " / 100";

        
    }
}