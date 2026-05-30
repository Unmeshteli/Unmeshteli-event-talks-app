
const talksData = [
    {
        title: "Placeholder Talk 1: Topic A Deep Dive",
        speakers: ["Dr. Jane Doe"],
        category: ["Technology", "Innovation"],
        description: "A comprehensive look into the advancements and future prospects of Topic A in the tech world. Expect insights and discussions on groundbreaking research."
    },
    {
        title: "Placeholder Talk 2: The Art of Modern UX Design",
        speakers: ["John Smith", "Emily White"],
        category: ["Design", "User Experience", "Frontend"],
        description: "Explore the principles and practices behind creating intuitive and engaging user experiences. This session will cover contemporary design tools and methodologies."
    },
    {
        title: "Placeholder Talk 3: Cybersecurity Fundamentals for Developers",
        speakers: ["Michael Green"],
        category: ["Security", "Development"],
        description: "Learn essential cybersecurity concepts and best practices that every developer should know to build more secure applications from the ground up."
    },
    {
        title: "Placeholder Talk 4: Cloud Computing Strategies for Scale",
        speakers: ["Sarah Brown"],
        category: ["Cloud", "Architecture", "Scalability"],
        description: "Discover effective strategies for designing and implementing cloud-native applications that can scale efficiently to meet growing demands."
    },
    {
        title: "Placeholder Talk 5: Agile Project Management in Practice",
        speakers: ["David Lee", "Laura Chen"],
        category: ["Agile", "Management"],
        description: "An interactive session on applying Agile methodologies to real-world software projects, focusing on practical tips and common challenges."
    },
    {
        title: "Placeholder Talk 6: Introduction to Quantum Computing",
        speakers: ["Dr. Alice Johnson"],
        category: ["Quantum Computing", "Future Tech"],
        description: "A beginner-friendly introduction to the fascinating world of quantum computing, explaining its basic principles and potential impact on various industries."
    }
];

function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return hours + ':' + minutes + ' ' + ampm;
}

function generateSchedule(talks) {
    let currentHour = 10;
    let currentMinute = 0;
    const schedule = [];
    const talkDuration = 60; // minutes
    const transitionDuration = 10; // minutes
    const lunchDuration = 60; // minutes

    let talkIndex = 0;
    while (talkIndex < talks.length) {
        const startTime = new Date(2026, 4, 30, currentHour, currentMinute); // May 30, 2026
        let endTime = new Date(startTime.getTime() + talkDuration * 60 * 1000);

        // Check for lunch break
        if (talkIndex === 2) { // Lunch after the second talk
            schedule.push({
                type: 'break',
                title: 'Lunch Break',
                startTime: formatTime(startTime),
                endTime: formatTime(new Date(startTime.getTime() + lunchDuration * 60 * 1000))
            });
            currentMinute += lunchDuration; // Add lunch duration
            currentMinute += transitionDuration; // Add transition after lunch
            talkIndex++; // Increment talkIndex to prevent re-adding lunch
            continue; // Skip to next iteration to calculate new talk start time
        }
        
        schedule.push({
            type: 'talk',
            title: talks[talkIndex].title,
            speakers: talks[talkIndex].speakers,
            category: talks[talkIndex].category,
            description: talks[talkIndex].description,
            startTime: formatTime(startTime),
            endTime: formatTime(endTime)
        });

        currentMinute += talkDuration;
        if (talkIndex < talks.length - 1) { // Add transition for all but the last talk
            currentMinute += transitionDuration;
        }

        // Adjust hours and minutes
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
        talkIndex++;
    }
    return schedule;
}


const fullSchedule = generateSchedule(talksData);

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tech Talks Event Schedule</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            background-color: #f4f7f6;
            color: #333;
            line-height: 1.6;
        }
        header {
            background-color: #2c3e50;
            color: #ecf0f1;
            padding: 1.5rem 0;
            text-align: center;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        header h1 {
            margin: 0;
            font-size: 2.5rem;
        }
        .container {
            max-width: 1200px;
            margin: 20px auto;
            padding: 0 20px;
        }
        .search-container {
            margin-bottom: 30px;
            text-align: center;
            background-color: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        .search-container input[type="text"] {
            width: 100%;
            max-width: 400px;
            padding: 12px 15px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 1rem;
            box-sizing: border-box;
            transition: border-color 0.3s ease;
        }
        .search-container input[type="text"]:focus {
            border-color: #3498db;
            outline: none;
        }
        .schedule {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 25px;
        }
        .talk-card, .break-card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0,0,0,0.08);
            padding: 25px;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            position: relative;
        }
        .talk-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.12);
        }
        .talk-card h2 {
            color: #2c3e50;
            margin-top: 0;
            font-size: 1.6rem;
            margin-bottom: 10px;
        }
        .talk-card .time {
            font-size: 0.95rem;
            color: #7f8c8d;
            margin-bottom: 15px;
            font-weight: bold;
        }
        .talk-card .speakers {
            color: #3498db;
            font-weight: 600;
            margin-bottom: 10px;
        }
        .talk-card .category {
            font-size: 0.85rem;
            color: #666;
            margin-bottom: 15px;
        }
        .talk-card .description {
            font-size: 0.9rem;
            color: #555;
            margin-bottom: 15px;
        }
        .break-card {
            background-color: #f1c40f;
            color: #fff;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        .break-card h2 {
            margin: 0;
            font-size: 2rem;
            color: #fff;
        }
        .break-card .time {
            font-size: 1.2rem;
            font-weight: bold;
            margin-top: 10px;
        }
        .no-results {
            text-align: center;
            grid-column: 1 / -1;
            font-size: 1.2rem;
            color: #7f8c8d;
            padding: 40px;
        }
        footer {
            text-align: center;
            padding: 30px 20px;
            margin-top: 40px;
            background-color: #2c3e50;
            color: #ecf0f1;
            font-size: 0.9rem;
        }
        @media (max-width: 768px) {
            header h1 {
                font-size: 2rem;
            }
            .talk-card h2 {
                font-size: 1.4rem;
            }
            .break-card h2 {
                font-size: 1.6rem;
            }
        }
    </style>
</head>
<body>
    <header>
        <h1>Tech Talks Event Schedule</h1>
    </header>
    <div class="container">
        <div class="search-container">
            <input type="text" id="categorySearch" placeholder="Search by category (e.g., AI, Frontend)">
        </div>
        <div class="schedule" id="scheduleList">
            <!-- Schedule items will be rendered here by JavaScript -->
        </div>
    </div>
    <footer>
        <p>&copy; 2026 Tech Talks Event. All rights reserved.</p>
    </footer>

    <script>
        const talksData = ${JSON.stringify(talksData, null, 2)};
        const fullSchedule = ${JSON.stringify(fullSchedule, null, 2)};

        function renderSchedule(scheduleToRender) {
            const scheduleList = document.getElementById('scheduleList');
            scheduleList.innerHTML = ''; // Clear previous results

            if (scheduleToRender.length === 0) {
                scheduleList.innerHTML = '<div class="no-results">No talks found matching your search criteria.</div>';
                return;
            }

            scheduleToRender.forEach(item => {
                let cardHtml = '';
                if (item.type === 'talk') {
                    cardHtml = '<div class="talk-card">' +
                            '<div class="time">' + item.startTime + ' - ' + item.endTime + '</div>' +
                            '<h2>' + item.title + '</h2>' +
                            '<div class="speakers">Speakers: ' + item.speakers.join(' & ') + '</div>' +
                            '<div class="category">Categories: ' + item.category.join(', ') + '</div>' +
                            '<p class="description">' + item.description + '</p>' +
                        '</div>';
                } else if (item.type === 'break') {
                    cardHtml = '<div class="break-card">' +
                            '<h2>' + item.title + '</h2>' +
                            '<div class="time">' + item.startTime + ' - ' + item.endTime + '</div>' +
                        '</div>';
                }
                scheduleList.innerHTML += cardHtml;
            });
        }

        function searchTalks() {
            const query = document.getElementById('categorySearch').value.toLowerCase();
            let filteredSchedule = fullSchedule.filter(item => {
                if (item.type === 'talk') {
                    return item.category.some(cat => cat.toLowerCase().includes(query));
                }
                return true; // Always show breaks regardless of search query
            });
            renderSchedule(filteredSchedule);
        }

        document.addEventListener('DOMContentLoaded', () => {
            renderSchedule(fullSchedule); // Render initial full schedule
            document.getElementById('categorySearch').addEventListener('keyup', searchTalks);
        });
    </script>
</body>
</html>
