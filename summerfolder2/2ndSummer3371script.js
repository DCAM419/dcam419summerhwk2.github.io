// script.js

function updateSliderValue() {
    const slider = document.getElementById("healthSlider");
    const output = document.getElementById("sliderValue");
    output.textContent = slider.value;
}

function reviewForm() {

    // Run password validation first
    if (!validatePasswords()) {
        return;
    }

    // Get form values
    const form = document.getElementById("registrationForm");

    let firstname = form.firstname.value;
    let middle = form.middleinitial.value;
    let lastname = form.lastname.value;
    let dob = form.dob.value;
    let email = form.email.value;
    let phone = form.phone.value;
    let address1 = form.address1.value;
    let address2 = form.address2.value;
    let city = form.city.value;
    let state = form.state.value;
    let zip = form.zip.value;
    let userid = form.userid.value.toLowerCase(); // convert to lowercase
    let slider = form.health.value;
    let symptoms = form.symptoms.value;

    // Update user ID field visually
    form.userid.value = userid;

    // Get selected radio values
    let gender = document.querySelector('input[name="gender"]:checked')?.value || "Not selected";
    let vaccinated = document.querySelector('input[name="vaccinated"]:checked')?.value || "Not selected";
    let insurance = document.querySelector('input[name="insurance"]:checked')?.value || "Not selected";

    // Get checkboxes
let illnesses = [];
document.querySelectorAll('input[name="illness"]:checked').forEach(cb => {
    illnesses.push(cb.value);
});


let today = new Date();
let dobDate = new Date(dob);

let dobMessage = "✅PASS";


if (!dob) {
    dobMessage = "❌ Date of Birth is required";
}
else if (dobDate > today) {
    dobMessage = "❌ Cannot be in the future";
}
else {
    let age = today.getFullYear() - dobDate.getFullYear();
    if (age > 120) {
        dobMessage = "❌ Age cannot exceed 120 years";
    }
}

let emailMessage = email.includes("@") ? "✅PASS" : "❌ ERROR";

let phoneMessage = /^\d{3}-\d{3}-\d{4}$/.test(phone)
    ? "✅PASS"
    : "❌ ERROR: Format must be 123-456-7890";

let zipMessage = /^\d{5}(-\d{4})?$/.test(zip)
    ? "✅PASS"
    : "❌ ERROR: Invalid ZIP";

    // Build output
    let output = `
    <h3>PLEASE REVIEW THIS INFORMATION</h3>
    <p><strong>Name:</strong> ${firstname} ${middle} ${lastname} — ✅PASS</p>
    <p><strong>DOB:</strong> ${dob} — ${dobMessage}</p>
    <p><strong>Email:</strong> ${email} — ${emailMessage}</p>
    <p><strong>Phone:</strong> ${phone} — ${phoneMessage}</p>
    <p><strong>Address:</strong><br>
    ${address1} ${address2}<br>
    ${city}, ${state} ${zip} — ${zipMessage}
    </p>
    <p><strong>Gender:</strong> ${gender}</p>
    <p><strong>Vaccinated:</strong> ${vaccinated}</p>
    <p><strong>Insurance:</strong> ${insurance}</p>
     <p><strong>Illnesses:</strong> ${illnesses.join(", ") || "None"}</p>
    <p><strong>Symptoms:</strong> ${symptoms || "None provided"}</p>
    <p><strong>Health Rating:</strong> ${slider}</p>
    <p><strong>User ID:</strong> ${userid} — ✅PASS</p>
`;

    document.getElementById("reviewOutput").innerHTML = output;
}

function validatePasswords() {
    const password = document.getElementsByName("password")[0].value;
    const repassword = document.getElementsByName("repassword")[0].value;
    const userid = document.getElementsByName("userid")[0].value.toLowerCase();

    // Check if passwords match
    if (password !== repassword) {
        alert("Passwords do not match!");
        return false;
    }

    // Check if password contains user ID
    if (password.toLowerCase().includes(userid)) {
        alert("Password cannot contain your User ID!");
        return false;
    }

    return true;
}

window.onload = function() {
    updateSliderValue();
}