document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    const searchForm = document.getElementById('searchForm');
    const donorListItems = document.getElementById('donorListItems');

    // Handle donor registration
    registrationForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Get the values from the registration form
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;
        const bloodType = document.getElementById('bloodType').value;
        const location = document.getElementById('location').value;

        // Save the donor details in localStorage
        const donor = {
            name,
            email,
            contact,
            bloodType,
            location
        };

        let donors = JSON.parse(localStorage.getItem('donors')) || [];
        donors.push(donor);
        localStorage.setItem('donors', JSON.stringify(donors));

        // Show a success message (optional)
        alert("Donor registered successfully!");

        // Clear the form fields
        registrationForm.reset();
    });

    // Handle donor search
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const searchBloodType = document.getElementById('searchBloodType').value;
        const searchLocation = document.getElementById('searchLocation').value;

        // Clear the previous search results
        donorListItems.innerHTML = '';

        // Get the list of registered donors from localStorage
        const donors = JSON.parse(localStorage.getItem('donors')) || [];

        // Filter the donors based on search criteria
        const filteredDonors = donors.filter(donor => {
            const matchesBloodType = searchBloodType ? donor.bloodType === searchBloodType : true;
            const matchesLocation = searchLocation ? donor.location === searchLocation : true;
            return matchesBloodType && matchesLocation;
        });

        // Display the filtered donors
        if (filteredDonors.length > 0) {
            filteredDonors.forEach(donor => {
                const donorItem = document.createElement('p');
                donorItem.innerHTML = `
                    <span>Name:</span> ${donor.name} <br>
                    <span>Blood Type:</span> ${donor.bloodType} <br>
                    <span>Location:</span> ${donor.location} <br>
                    <span>Contact:</span> ${donor.contact}
                `;
                donorListItems.appendChild(donorItem);
            });
        } else {
            donorListItems.innerHTML = '<p>No donors found matching your criteria.</p>';
        }
    });
});
