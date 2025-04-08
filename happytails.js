/**************************************************************************************/
/*Student Name: Martha Mrozek
Student I.D.: 40180784

Course Code: SOEN-287 (Section S)
Course Title: Web Programming
Semester: Winter 2024
Due: Sunday, March 31 2024

Instructor: Dr. Y. Yan
Assesment Title: Assignment 02*/

/**************************************************************************************/
//Adding the time and date to the header
//Creating a function to update the date and time:
function updateDateTime() {
    //Creating a new "Date" object:
    const now = new Date();

    //Getting the current date and time as a string:
    const currentDateTime = now.toLocaleString();

    //Updating the "textContent" property of the "span" element with the "id" of "datetime":
    document.querySelector('#datetime').textContent = currentDateTime;
  }

  //Calling the "updateDateTime" function every second:
  setInterval(updateDateTime, 1000);
  console.log(currentDateTime);
/**************************************************************************************/



/**************************************************************************************/
document.getElementById('catFindForm').addEventListener('submit', function(event) {
    var questions = document.querySelectorAll('.question');
    var allChecked = true;
    
    questions.forEach(function(question) {
        var checkboxes = question.querySelectorAll('input[type="checkbox"]');
        var checked = false;
        
        checkboxes.forEach(function(checkbox) {
            if (checkbox.checked) {
                checked = true;
            }
        });
        
        if (!checked) {
            allChecked = false;
        }
    });
    
    if (!allChecked) {
        alert('Please select at least one option for each question.');
        event.preventDefault(); // Prevent form submission
    }
});
/**************************************************************************************/





/**************************************************************************************/
//Creating the client side validation process for the cat contact form:
    function validateCatForm(event) {
        event.preventDefault(); // Prevent form submission

        // Get form elements
        var form = document.getElementById("catFindForm");
        var breedCheckboxes = form.querySelectorAll('input[name^="catbreed"]');
        var ageCheckboxes = form.querySelectorAll('input[name^="catage"]');
        var genderRadios = form.querySelectorAll('input[name="catgender"]');
        var compatibilityCheckboxes = form.querySelectorAll('input[name^="catcompatible"]');

        // Check if any field is blank
        var isBlank = false;
        if (!isCheckboxChecked(breedCheckboxes) || !isCheckboxChecked(ageCheckboxes) || !isRadioChecked(genderRadios) || !isCheckboxChecked(compatibilityCheckboxes)) {
            isBlank = true;
        }

        // Display error message if any field is blank
        if (isBlank) {
            alert("Please fill out all fields.");
            return false; // Return false to prevent form submission
        }

        // If all fields are filled, submit the form
        form.submit();
    }

    // Helper function to check if at least one checkbox is checked
    function isCheckboxChecked(checkboxes) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Helper function to check if at least one radio button is checked
    function isRadioChecked(radios) {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

/**************************************************************************************/





/**************************************************************************************/
//Creating the client side validation process for the dog contact form:

    function validateDogForm(event) {
        event.preventDefault(); // Prevent form submission

        // Get form elements
        var form = document.getElementById("dogFindForm");
        var breedCheckboxes = form.querySelectorAll('input[name^="dogbreed"]');
        var ageCheckboxes = form.querySelectorAll('input[name^="dogage"]');
        var genderRadios = form.querySelectorAll('input[name="doggender"]');
        var compatibilityCheckboxes = form.querySelectorAll('input[name^="dogcompatible"]');

        // Check if any field is blank
        var isBlank = false;
        if (!isCheckboxChecked(breedCheckboxes) || !isCheckboxChecked(ageCheckboxes) || !isRadioChecked(genderRadios) || !isCheckboxChecked(compatibilityCheckboxes)) {
            isBlank = true;
        }

        // Display error message if any field is blank
        if (isBlank) {
            alert("Please fill out all fields.");
            return false; // Return false to prevent form submission
        }

        // If all fields are filled, submit the form
        form.submit();
    }

    // Helper function to check if at least one checkbox is checked
    function isCheckboxChecked(checkboxes) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Helper function to check if at least one radio button is checked
    function isRadioChecked(radios) {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }
/**************************************************************************************/





/**************************************************************************************/
//Code for 'have a pet to give away' form validation:

    function validatePetGiveawayForm(event) {
        event.preventDefault(); // Prevent form submission

        // Get form elements
        var form = document.getElementById("petGiveawayForm");
        var petTypeRadios = form.querySelectorAll('input[name="cat"], input[name="dog"]');
        var breedCheckboxes = form.querySelectorAll('input[name^="catbreed"], input[name^="dogbreed"]');
        var ageSelect = form.querySelector('select[name="age"]');
        var genderRadios = form.querySelectorAll('input[name="gender"]');
        var compatibilityCheckboxes = form.querySelectorAll('input[name^="compatible"]');
        var emailInput = form.querySelector('input[type="email"]');
        var nameInput = form.querySelector('input[name="fullname"]');
        var messageTextarea = form.querySelector('textarea[name="message"]');

        // Check if any field is blank
        var isBlank = false;
        if (!isRadioChecked(petTypeRadios) || !isCheckboxChecked(breedCheckboxes) || !ageSelect.value || !isRadioChecked(genderRadios) || !isCheckboxChecked(compatibilityCheckboxes) || !isValidEmail(emailInput.value) || !nameInput.value.trim() || !messageTextarea.value.trim()) {
            isBlank = true;
        }

        // Display error message if any field is blank
        if (isBlank) {
            alert("Please fill out all fields and provide a valid email address.");
            return false; // Return false to prevent form submission
        }

        // If all fields are filled, submit the form
        form.submit();
    }

    // Helper function to check if at least one radio button is checked
    function isRadioChecked(radios) {
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Helper function to check if at least one checkbox is checked
    function isCheckboxChecked(checkboxes) {
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                return true;
            }
        }
        return false;
    }

    // Helper function to validate email format
    function isValidEmail(email) {
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

/**************************************************************************************/