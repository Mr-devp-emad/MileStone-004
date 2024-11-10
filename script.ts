function addSkill(): void {
    const skillInput = prompt("Enter a new skill:");
    if (skillInput) {
        const skillList = document.getElementById("skills-list") as HTMLUListElement;
        if (skillList) {
            const newSkill = document.createElement("li");
            newSkill.innerText = skillInput;
            skillList.appendChild(newSkill);
        }
    }
}

// Form submission handler
document.getElementById('resumeForm')?.addEventListener('submit', function (event) {
    event.preventDefault();

    // Get form elements with type assertion for TypeScript
    const profilePictureInput = document.getElementById("profilePicture") as HTMLInputElement;
    const firstNameElement = document.getElementById("firstName") as HTMLInputElement;
    const lastNameElement = document.getElementById("lastName") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const addressElement = document.getElementById("address") as HTMLInputElement;
    const educationElement = document.querySelector("#education p") as HTMLElement;
    const experienceElement = document.querySelector("#work-experience p") as HTMLElement;
    const usernameElement = document.getElementById("username") as HTMLInputElement;

    if (profilePictureInput && firstNameElement && lastNameElement && emailElement && phoneElement && addressElement && educationElement && experienceElement && usernameElement) {
        const firstName = firstNameElement.value;
        const lastName = lastNameElement.value;
        const email = emailElement.value;
        const phone = phoneElement.value;
        const address = addressElement.value;
        const education = educationElement.innerText;
        const experience = experienceElement.innerText;
        const username = usernameElement.value;
        const uniquePath = `resumes/${username.replace(/\s+/g, '_')}_cv.html`;

        const profilePictureFile = profilePictureInput.files?.[0];
        const profilePictureURL = profilePictureFile ? URL.createObjectURL(profilePictureFile) : "";

        // HTML structure for generated resume
        const resumeOutput = `
            <h2>Resume</h2>
            ${profilePictureURL ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">` : ''}
            <p><strong>First Name:</strong> <span class="editable">${firstName}</span></p>
            <p><strong>Last Name:</strong> <span class="editable">${lastName}</span></p>
            <p><strong>Email:</strong> <span class="editable">${email}</span></p>
            <p><strong>Phone Number:</strong> <span class="editable">${phone}</span></p>
            <p><strong>Address:</strong> <span class="editable">${address}</span></p>
            <h3>Education</h3>
            <p class="editable">${education}</p>
            <h3>Experience</h3>
            <p class="editable">${experience}</p>
            <h3>Skills</h3>
            <ul id="skills-list"></ul>
        `;

        // Populate skills list
        const skillItems = document.querySelectorAll("#skills-list li");
        const skillsArray: string[] = [];
        skillItems.forEach((item) => {
            const liElement = item as HTMLLIElement;
            skillsArray.push(liElement.innerText);
        });
        const skillsOutput = skillsArray.map(skill => `<li>${skill}</li>`).join('');
        const finalResumeOutput = resumeOutput.replace('<ul id="skills-list"></ul>', `<ul>${skillsOutput}</ul>`);

        const resumeOutputElement = document.getElementById('resumeOutput') as HTMLElement;
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = finalResumeOutput;
            makeEditable(resumeOutputElement, uniquePath);
        }
    } else {
        console.error('One or more input elements are missing');
    }
});

// Function to make fields editable
function makeEditable(resumeOutputElement: HTMLElement, uniquePath: string): void {
    const editableElements = resumeOutputElement.querySelectorAll('.editable');
    editableElements.forEach(element => {
        element.addEventListener('click', function () {
            const currentElement = element as HTMLElement;
            const currentValue = currentElement.textContent || "";

            if (currentElement.tagName === "P" || currentElement.tagName === "SPAN") {
                const input = document.createElement('input');
                input.type = 'text';
                input.value = currentValue;
                input.classList.add('editing-input');

                input.addEventListener('blur', function () {
                    currentElement.textContent = input.value;
                    currentElement.style.display = 'inline';
                    input.remove();
                });

                currentElement.style.display = 'none';
                currentElement.parentNode?.insertBefore(input, currentElement);
                input.focus();
            }
        });
    });

    // Download link for resume
    const downloadLink = document.createElement('a');
    downloadLink.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(resumeOutputElement.innerHTML);
    downloadLink.download = uniquePath;
    downloadLink.textContent = "Download Your 2024 Resume";
    resumeOutputElement.appendChild(downloadLink);
    resumeOutputElement.style.display = "block";
}
