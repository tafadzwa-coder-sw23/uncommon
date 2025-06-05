// js/main.js
import { fetchHubs, fetchSchoolsByHub } from './api.js';

const hubsContainer = document.getElementById('hubs-container');
const hubsSection = document.getElementById('hubs-section');
const schoolDetailsSection = document.getElementById('school-details-section');
const backToHubsButton = document.getElementById('back-to-hubs');

const schoolNameElem = document.getElementById('school-name');
const schoolLogoElem = document.getElementById('school-logo');
const schoolLocationElem = document.getElementById('school-location');
const schoolStudentCountElem = document.getElementById('school-student-count');
const schoolPicturesContainer = document.getElementById('school-pictures');
const instructorListElem = document.getElementById('instructor-list');
const schoolTimetableElem = document.getElementById('school-timetable');
const weeklyLessonsElem = document.getElementById('weekly-lessons');

let allHubs = [];
let allSchools = {}; // To store schools by hub for quick access

// --- Functions to Render UI ---

function renderHubs(hubs) {
    hubsContainer.innerHTML = ''; // Clear existing content
    hubs.forEach(hub => {
        const hubCard = document.createElement('div');
        hubCard.classList.add('hub-card');

        // Use a default logo if the hub.logo path is missing or invalid
        const hubLogoSrc = hub.logo && hub.logo.trim() !== '' ? hub.logo : 'images/placeholders/default-hub-logo.png';

        hubCard.innerHTML = `
            <img src="${hubLogoSrc}" alt="${hub.name} Logo" class="logo">
            <h3>${hub.name}</h3>
            <p>${hub.location}</p>
            <button data-hub-id="${hub.id}">View Schools</button>
        `;
        hubsContainer.appendChild(hubCard);
    });

    // Add event listeners after all hub cards are rendered
    hubsContainer.querySelectorAll('button[data-hub-id]').forEach(button => {
        button.addEventListener('click', (event) => {
            const hubId = event.target.dataset.hubId;
            displaySchoolsForHub(hubId);
        });
    });
}

async function displaySchoolsForHub(hubId) {
    // Hide hubs, show school details section
    hubsSection.classList.add('hidden');
    schoolDetailsSection.classList.remove('hidden');

    // In a real app, you'd fetch schools for this specific hub
    const schools = await fetchSchoolsByHub(hubId);
    allSchools[hubId] = schools; // Store for later reference if needed

    // For simplicity, let's just pick the first school for now
    // You'd ideally render a list of schools for the hub here
    // And then allow the user to select a school to see its details.
    if (schools.length > 0) {
        renderSchoolDetails(schools[0]); // Render the first school's details
    } else {
        // Handle case where no schools are found for the hub
        schoolNameElem.textContent = 'No schools found for this hub.';
        schoolLogoElem.src = 'images/placeholders/default-school-logo.png';
        schoolLocationElem.textContent = '';
        schoolStudentCountElem.textContent = '';
        schoolPicturesContainer.innerHTML = `<img src="images/placeholders/default-photo.jpg" alt="No school pictures available" class="gallery-img">`;
        instructorListElem.innerHTML = '<li>No instructors listed.</li>';
        schoolTimetableElem.innerHTML = '<p>No timetable available.</p>';
        weeklyLessonsElem.innerHTML = '<p>No lessons planned.</p>';
    }
}


function renderSchoolDetails(school) {
    schoolNameElem.textContent = school.name;

    // Use default logo if school.logo is missing
    const schoolLogoSrc = school.logo && school.logo.trim() !== '' ? school.logo : 'images/placeholders/default-school-logo.png';
    schoolLogoElem.src = schoolLogoSrc;
    schoolLogoElem.alt = `${school.name} Logo`; // Update alt text dynamically

    schoolLocationElem.textContent = school.location;
    schoolStudentCountElem.textContent = school.studentCount;

    // Render school pictures
    schoolPicturesContainer.innerHTML = ''; // Clear previous pictures
    if (school.pictures && school.pictures.length > 0) {
        school.pictures.forEach(picPath => {
            const img = document.createElement('img');
            img.src = picPath;
            img.alt = `Photo of ${school.name}`; // More descriptive alt text
            img.classList.add('gallery-img');
            schoolPicturesContainer.appendChild(img);
        });
    } else {
        // Fallback if no specific pictures are provided
        const img = document.createElement('img');
        img.src = 'images/placeholders/default-photo.jpg';
        img.alt = `No photos available for ${school.name}`;
        img.classList.add('gallery-img');
        schoolPicturesContainer.appendChild(img);
    }

    // Render instructors
    instructorListElem.innerHTML = '';
    if (school.instructors && school.instructors.length > 0) {
        school.instructors.forEach(instructor => {
            const li = document.createElement('li');
            li.textContent = `${instructor.name} (${instructor.contact})`;
            instructorListElem.appendChild(li);
        });
    } else {
        instructorListElem.innerHTML = '<li>No instructors listed for this school.</li>';
    }

    // Render timetable
    schoolTimetableElem.innerHTML = `<p>${school.timetable || 'No timetable available.'}</p>`;

    // Render weekly lessons
    weeklyLessonsElem.innerHTML = '';
    if (school.lessons && school.lessons.length > 0) {
        const ul = document.createElement('ul');
        school.lessons.forEach(lesson => {
            const li = document.createElement('li');
            li.textContent = lesson;
            ul.appendChild(li);
        });
        weeklyLessonsElem.appendChild(ul);
    } else {
        weeklyLessonsElem.innerHTML = '<p>No weekly lessons planned yet.</p>';
    }

    // (You'd add similar logic for student attendance and reports here)
}

// --- Event Listeners & Initialization ---

// Handle click on "Back to Hubs" button
backToHubsButton.addEventListener('click', () => {
    schoolDetailsSection.classList.add('hidden');
    hubsSection.classList.remove('hidden');
});

// Initial load: Fetch and display hubs when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    allHubs = await fetchHubs();
    renderHubs(allHubs);
});