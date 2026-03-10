// Set max date to today (prevents future dates)
document.addEventListener('DOMContentLoaded', function() {
  const dobInput = document.getElementById('dob');
  dobInput.max = new Date().toISOString().split('T')[0];
});

// Calculate age function
function calculateAge() {
  const dob = document.getElementById("dob").value;
  const resultDiv = document.getElementById("result");
  
  if (!dob) {
    resultDiv.textContent = "Please select your date of birth.";
    resultDiv.className = "result error";
    return;
  }

  const dobDate = new Date(dob + 'T00:00:00');
  const today = new Date();

  // Validate date
  if (dobDate > today) {
    resultDiv.textContent = "Date of birth cannot be in the future!";
    resultDiv.className = "result error";
    return;
  }

  let years = today.getFullYear() - dobDate.getFullYear();
  let months = today.getMonth() - dobDate.getMonth();
  let days = today.getDate() - dobDate.getDate();

  // Borrow logic for accurate calculation
  if (days < 0) {
    months--;
    days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Plural handling
  const yearText = years === 1 ? 'year' : 'years';
  const monthText = months === 1 ? 'month' : 'months';
  const dayText = days === 1 ? 'day' : 'days';

  resultDiv.innerHTML = `
    You are <strong>${years} ${yearText}</strong>, 
    <strong>${months} ${monthText}</strong>, and 
    <strong>${days} ${dayText}</strong> old! 🎉
  `;
  resultDiv.className = "result";
}

// Auto-calculate on date change
document.getElementById("dob").addEventListener("change", calculateAge);
