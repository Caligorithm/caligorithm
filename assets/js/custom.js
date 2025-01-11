async function sendMessage() {
  if (!hasValidForm()) {
    return;
  }

  const name = document.getElementById("name").value?.trim();
  const email = document.getElementById("email").value?.trim();
  const message = document.getElementById("message").value?.trim();

  // Google Form URL (action URL from the Google Form's HTML form)
  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScIcR3vuEobgxqwdInC11rO7G4gQM8yEbjrSYzZPJlH659YzQ/formResponse";

  // Prepare the data to be sent to Google Form
  const formData = new FormData();
  formData.append("entry.1334123298", name); // Name field ID
  formData.append("entry.215327729", email); // Email field ID
  formData.append("entry.1723437030", message); // Message field ID

  // Submit the form to Google Form
  try {
    const formResponse = await fetch(googleFormUrl, {
      method: "POST",
      mode: "no-cors", // Add 'no-cors' for cross-origin requests
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(formData),
    });

    if (formResponse) {
      // Show the success dialog
      document.getElementById("successDialog").showModal();
      document.getElementById("contactForm").reset(); // Reset form
    } else {
      document.getElementById("failureDialog").showModal();
    }
  } catch (error) {
    document.getElementById("failureDialog").showModal();
  }
}

function hasValidForm() {
  const name = document.getElementById("name").value?.trim();
  const email = document.getElementById("email").value?.trim();
  const message = document.getElementById("message").value?.trim();

  // Error fields
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  // Validation state
  let isValid = true;

  // Validate Name
  if (!name?.length) {
    nameError.style.display = "block";
    isValid = false;
  } else {
    nameError.style.display = "none";
  }

  // Validate Email
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email?.length || !emailPattern.test(email)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  // Validate Message
  if (!message?.length) {
    messageError.style.display = "block";
    isValid = false;
  } else {
    messageError.style.display = "none";
  }

  return isValid;
}

function closeDialog(dialogId) {
  document.getElementById(dialogId).close();
  window.location.reload();
}
