Develop a mobile Progressive Web App (PWA) for tracking guide dog puppy training progress.
Core Requirements:
    1. Persistence Layer: The app must utilise IndexedDB for all persistent data storage.
    2. Puppy Profile Management:
        ○ Upon first launch, the app must prompt the user to set up a puppy profile.
        ○ The puppy profile must include the following fields: 
            § Puppy Name
            § Computer Number
            § Date of Birth
            § Breed
        ○ All subsequent app data and progress tracking must be directly linked to this puppy profile.
    3. Main Progress View (Based on Puppy Progression Chart):
        ○ The app's primary display should mirror the structure and categories found in the "Puppy progression chart" PDF document, but with controls for setting which age-related data (columns 2-5 of the progress chart, see below)
        ○ Source for Puppy Progress Chart Structure and Categories: {{/Users/alanreeves/GEMINI CODE PROJECTS/PrepTracker/docs/prepdocs/C801a_Puppy progress chart v1.1.pdf}} (specifically, Column 1 for behaviour categories and Columns 2-5 for age ranges and proficiency levels).
        ○ Age Range Selection: Implement a selection button (e.g., a segmented control) that allows the user to choose an age range from the "Puppy progression chart" (12 weeks, Juvenile, Adolescent, 12 months).
        ○ Behaviour Category Display: For the selected age range, display all behaviour categories listed in Column 1 of the chart. For each category, show the text from the chosen age column, a status indicator showing one of ,"not started", "shaping" or "proofing", and a corresponding proficiency slider that the user can set. Also add a button which when clicked will open the related behaviour PDF; set a dummy placeholder url initially, I will paste in the actual url's later.
    
    4. User Interaction - Single Click for Progress Tracking:
        ○ When a user performs a single click on a displayed behaviour category from the main progress view: 
            § A collapsible concertina panel must appear.
            § This panel should allow the user to log progress for that specific behaviour within the selected age range. The logger should open up a modal for entering date, time, log text, and an optional uploaded video. When uploaded the video to be stored in IndexedDB storage.Log text to be able to be rich text formatted.
    5. User Interaction - Double Click for Training Activities:
        ○ When a user performs a double click on a displayed behaviour category from the main progress view: 
            § A new view or modal must appear, displaying a comprehensive list of actionable training activities relevant to that behaviour.
            § These training activities must be compiled and extracted specifically from the "Teaching foundations" sections of the training PDF documents in the folder {{/Users/alanreeves/GEMINI CODE PROJECTS/PrepTracker/docs/prepdocs}} Please identify and present the step-by-step guides, stages, and practical advice provided within these sections.
    6. In addition to the Main progress view there should be another view for Supporting Documents, to cover activities documented in the "Supporting Documents " page of the puppy progress chart. This view should largely follow the structure of the main view and also have single and double click facility for logging progress and showing actionable training activities.
    7. There should be a "Tools" menu button, initially containing 2 options; (1) Backup data. This will copy all data from IndexedDB to a saved backup file(2) Refresh data from backup. This will re-load all data from a previous backup file.
General Directives:
    • Prioritise a clean, intuitive, colourful and beautifully designed and user-friendly mobile interface. Where boxes are shown, a rounded corner format is preferred.
    • Ensure responsive design for various screen sizes.
    • The app should be designed as a Progressive Web App (PWA), allowing for offline access and installability.
    • The app to be built with html, CSS, and JavaScript. No React framework.
    • No user authentication needed, this is a local only app.
    The application root file called PREPTRACKER is already created and opened in VScode. Please build from there.
