// js/api.js (Example with dummy data)
const DUMMY_HUBS = [
    {
        id: 'hub1',
        name: 'Harare Central Hub',
        location: 'Harare, Zimbabwe',
        logo: 'images/hubs/harare-central-logo.png', // Path to specific logo
        pictures: ['images/hubs/harare-central-pic1.jpg', 'images/hubs/harare-central-pic2.jpg'],
        description: 'Serving schools in the heart of Harare.'
    },
    {
        id: 'hub2',
        name: 'Bulawayo North Hub',
        location: 'Bulawayo, Zimbabwe',
        logo: 'images/hubs/bulawayo-north-logo.png',
        pictures: ['images/hubs/bulawayo-north-pic1.jpg'],
        description: 'Covering the northern districts of Bulawayo.'
    }
];

const DUMMY_SCHOOLS = {
    'hub1': [ // Schools for Harare Central Hub
        {
            id: 'school-a',
            name: 'Mufakose Primary',
            location: 'Mufakose, Harare',
            studentCount: 120,
            logo: 'images/schools/mufakose-primary-logo.png',
            pictures: ['images/schools/mufakose-primary-pic1.jpg', 'images/schools/mufakose-primary-pic2.jpg'],
            instructors: [{name: 'Mr. John Doe', contact: 'john@example.com'}, {name: 'Ms. Jane Smith', contact: 'jane@example.com'}],
            timetable: 'Mondays & Wednesdays, 2 PM - 4 PM',
            lessons: ['Week 1: Introduction to Scratch', 'Week 2: Animation Basics']
        },
        {
            id: 'school-b',
            name: 'Highfield High School',
            location: 'Highfield, Harare',
            studentCount: 80,
            logo: 'images/schools/highfield-high-logo.png',
            pictures: ['images/schools/highfield-high-pic1.jpg'],
            instructors: [{name: 'Mr. Peter Jones', contact: 'peter@example.com'}],
            timetable: 'Tuesdays & Thursdays, 3 PM - 5 PM',
            lessons: ['Week 1: Game Design Principles', 'Week 2: Interactive Stories']
        }
    ],
    'hub2': [ // Schools for Bulawayo North Hub
        {
            id: 'school-c',
            name: 'North End Primary',
            location: 'North End, Bulawayo',
            studentCount: 90,
            logo: 'images/schools/north-end-primary-logo.png',
            pictures: ['images/schools/north-end-primary-pic1.jpg'],
            instructors: [{name: 'Ms. Emily White', contact: 'emily@example.com'}],
            timetable: 'Fridays, 1 PM - 3 PM',
            lessons: ['Week 1: First Scratch Project', 'Week 2: Character Movement']
        }
    ]
};

export async function fetchHubs() {
    return Promise.resolve(DUMMY_HUBS); // In real app: fetch('/api/hubs').then(res => res.json())
}

export async function fetchSchoolsByHub(hubId) {
    return Promise.resolve(DUMMY_SCHOOLS[hubId] || []); // In real app: fetch(`/api/hubs/${hubId}/schools`).then(res => res.json())
}