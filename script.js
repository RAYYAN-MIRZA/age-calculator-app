const day = document.querySelector(".input-day");
const month = document.querySelector(".input-month");
const year = document.querySelector(".input-year");
const div_day = document.querySelector(".final-day");
const div_month = document.querySelector(".final-month");
const div_year = document.querySelector(".final-year");
const div_valid_day = document.querySelector(".valid-day");
const div_valid_month = document.querySelector(".valid-month");
const div_valid_year = document.querySelector(".valid-year");
const input_boxes = document.querySelectorAll("input");
const text_above_input = document.getElementsByClassName("inp-text");

let inp_Day;
let inp_Month;
let inp_Year;
let curr_year_bool = false;
let inp_year_bool = false;

day.addEventListener("input", (e) => {
    inp_Day = e.target.value;
    inp_Day = parseInt(inp_Day);
});

month.addEventListener("input", (e) => {
    inp_Month = e.target.value;
    inp_Month = parseInt(inp_Month);
});

year.addEventListener("input", (e) => {
    inp_Year = e.target.value;
    inp_Year = parseInt(inp_Year);
});

const currentDate = new Date();
const curr_year = currentDate.getFullYear();
const curr_month = currentDate.getMonth() + 1; // Note: Months are zero-based, so we usually add 1
const curr_day = currentDate.getDate();

function empty_input() {
    inp_Day = ""; inp_Month = ""; inp_Year = "";
}

function if_input_is_invalid() {
    let check = true;
    if (inp_Year === undefined) {
        div_valid_year.textContent = "this is a required field ";
        check = false;
    }
    if (inp_Day === undefined) {
        div_valid_day.textContent = "this is a required field";
        check = false;
    }
    if (inp_Month === undefined) {
        div_valid_month.textContent = "this is a required field";
        check = false;
    }
    if (inp_Day <= 0) {
        div_valid_day.textContent = "Must be valid day";
        check = false;
    }
    if (inp_Month <= 0) {
        div_valid_month.textContent = "Must be valid month";
        check = false;

    }
    if (inp_Year <= 0) {
        div_valid_year.textContent = "Must be valid  year";
        check = false;
    }
    if (inp_Year > curr_year) {              // date must be in the past
        div_valid_year.textContent = "Must be a valid year";
        check = false;
    }
    if (inp_Year === curr_year) {              // date must be in the past
        if (inp_Month > curr_month) {
            div_valid_month.textContent = "Must be a valid month";
            check = false;
        }
        else if (inp_Month <= curr_month) {
            if (inp_Day > curr_day) {
                div_valid_day.textContent = "Must be a valid day";
                check = false;
            }
        }
    }
    if (inp_Month > 12) {
        div_valid_month.textContent = "Must be valid month";
        check = false;
    }

    if (inp_Month === 4 || inp_Month === 6 || inp_Month === 9 || inp_Month === 11) {
        if (inp_Day > 30) {
            div_valid_day.textContent = "Must be valid day";
            check = false;
        }
    }

    if (inp_Month === 1 || inp_Month === 3 || inp_Month === 5 || inp_Month === 7 || inp_Month === 8 || inp_Month === 10 || inp_Month === 12) {
        if (inp_Day > 31) {
            div_valid_day.textContent = "Must be valid day";
            check = false;
        }
    }
    if (inp_Month === 2) {
        if (check_leap(inp_Year)) {
            if (inp_Day > 29) {
                div_valid_day.textContent = "Must be valid day";
                check = false;
            }
        }
        else {
            if (inp_Day > 28) {
                div_valid_day.textContent = "Must be valid day";
                check = false;
            }
        }
    }
    return check;
}

function check_leap() {
    /*    How to determine whether a year is a leap year
    To determine whether a year is a leap year, follow these steps:
    
    1-If the year is evenly divisible by 4, go to step 2. Otherwise, go to step 5.
    2-If the year is evenly divisible by 100, go to step 3. Otherwise, go to step 4.
    3- If the year is evenly divisible by 400, go to step 4. Otherwise, go to step 5.
    4- The year is a leap year (it has 366 days).
    5 -The year is not a leap year (it has 365 days).`*/
    if (inp_Year % 4 === 0) {
        if (inp_Year % 100 === 0) {

            if (inp_Year % 400 === 0) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return true;
        }
    }
    else {
        //not leap
        return false;
    }
}
function cal() {
    if (if_input_is_invalid() === false) {

        // Loop through the input elements and set their border color
        input_boxes.forEach(function (input) {
            input.style.border = '0.5px solid red';
        });
        for (let i = 0; i < text_above_input.length; i++) {
            text_above_input[i].style.color = "red";
        }
        empty_input();
        return;
    }
    // reverting the changes 
    input_boxes.forEach(function (input) {
        input.style.border = '0.5px solid black';
    });

    // Iterate through the input elements
    for (let i = 0; i < text_above_input.length; i++) {
        text_above_input[i].style.color = "black";
    }

    div_valid_day.textContent = "";
    div_valid_month.textContent = "";
    div_valid_year.textContent = "";
    const today = new Date();

    const age = calculateAge(today.getDate(), today.getMonth(), today.getFullYear(), inp_Day, inp_Month, inp_Year);

    div_day.textContent = `${age.days}`;
    div_month.textContent = `${age.months}`;
    div_year.textContent = `${age.years}`;
    empty_input();
}

function calculateAge(currentDate, currentMonth, currentYear, dob, dobMonth, dobYear) {
    const months = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (dob > currentDate) {
        currentDate += months[dobMonth - 1];
        currentMonth -= 1;
    }

    if (dobMonth > currentMonth) {
        currentYear -= 1;
        currentMonth += 12;
    }

    const ageDays = currentDate - dob;
    const ageMonths = currentMonth - dobMonth + 1;
    const ageYears = currentYear - dobYear;

    return {
        years: ageYears,
        months: ageMonths,
        days: ageDays
    };
}
