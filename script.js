var _a;
function addSkill() {
    var skillInput = prompt("Enter a new skill:");
    if (skillInput) {
        var skillList = document.getElementById("skills-list");
        if (skillList) {
            var newSkill = document.createElement("li");
            newSkill.innerText = skillInput;
            skillList.appendChild(newSkill);
        }
    }
}
// Form submission handler
(_a = document.getElementById('resumeForm')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    // Get form elements with type assertion for TypeScript
    var profilePictureInput = document.getElementById("profilePicture");
    var firstNameElement = document.getElementById("firstName");
    var lastNameElement = document.getElementById("lastName");
    var emailElement = document.getElementById("email");
    var phoneElement = document.getElementById("phone");
    var addressElement = document.getElementById("address");
    var educationElement = document.querySelector("#education p");
    var experienceElement = document.querySelector("#work-experience p");
    var usernameElement = document.getElementById("username");
    if (profilePictureInput && firstNameElement && lastNameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && usernameElement) {
        var firstName = firstNameElement.value;
        var lastName = lastNameElement.value;
        var email = emailElement.value;
        var phone = phoneElement.value;
        var address = addressElement.value;
        var education = educationElement.innerText;
        var experience = experienceElement.innerText;
        var username = usernameElement.value;
        var uniquePath = "resumes/".concat(username.replace(/\s+/g, '_'), "_cv.html");
        var profilePictureFile = (_a = profilePictureInput.files) === null || _a === void 0 ? void 0 : _a[0];
        var profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";
        // HTML structure for generated resume
        var resumeOutput = "\n            <h2>Resume</h2>\n            ".concat(profilePictureURL ? "<img src=\"".concat(profilePictureURL, "\" alt=\"Profile Picture\" class=\"profilePicture\">") : '', "\n            <p><strong>First Name:</strong> <span class=\"editable\">").concat(firstName, "</span></p>\n            <p><strong>Last Name:</strong> <span class=\"editable\">").concat(lastName, "</span></p>\n            <p><strong>Email:</strong> <span class=\"editable\">").concat(email, "</span></p>\n            <p><strong>Phone Number:</strong> <span class=\"editable\">").concat(phone, "</span></p>\n            <p><strong>Address:</strong> <span class=\"editable\">").concat(address, "</span></p>\n            <h3>Education</h3>\n            <p class=\"editable\">").concat(education, "</p>\n            <h3>Experience</h3>\n            <p class=\"editable\">").concat(experience, "</p>\n            <h3>Skills</h3>\n            <ul id=\"skills-list\"></ul>\n        ");
        // Populate skills list
        var skillItems = document.querySelectorAll("#skills-list li");
        var skillsArray_1 = [];
        skillItems.forEach(function (item) {
            var liElement = item;
            skillsArray_1.push(liElement.innerText);
        });
        var skillsOutput = skillsArray_1.map(function (skill) { return "<li>".concat(skill, "</li>"); }).join('');
        var finalResumeOutput = resumeOutput.replace('<ul id="skills-list"></ul>', "<ul>".concat(skillsOutput, "</ul>"));
        var resumeOutputElement = document.getElementById('resumeOutput');
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = finalResumeOutput;
            makeEditable(resumeOutputElement, uniquePath);
        }
    }
    else {
        console.error('One or more input elements are missing');
    }
});
// Function to make fields editable
function makeEditable(resumeOutputElement, uniquePath) {
    var editableElements = resumeOutputElement.querySelectorAll('.editable');
    editableElements.forEach(function (element) {
        element.addEventListener('click', function () {
            var _a;
            var currentElement = element;
            var currentValue = currentElement.textContent || "";
            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                var input_1 = document.createElement('input');
                input_1.type = 'text';
                input_1.value = currentValue;
                input_1.classList.add('editing-input');
                input_1.addEventListener('blur', function () {
                    currentElement.textContent = input_1.value;
                    currentElement.style.display = 'inline';
                    input_1.remove();
                });
                currentElement.style.display = 'none';
                (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                input_1.focus();
            }
        });
    });
    // Download link for resume
    var downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutputElement.innerHTML);
    downloadLink.download = uniquePath;
    downloadLink.textContent = "Download Your 2024 Resume";
    resumeOutputElement.appendChild(downloadLink);
    resumeOutputElement.style.display = "block";
}
