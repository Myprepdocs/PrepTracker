// Calculate target ages for each milestone (in days from birth)
// 12weeks: 0-112 days (0-16 weeks)
// juvenile: 112-168 days (16-24 weeks)  
// adolescent: 168-280 days (24-40 weeks)
// 12months: 280-365 days (40-52+ weeks)

const today = new Date();

// Helper function to calculate date of birth for specific age in days
function getDateOfBirth(targetAgeDays) {
  const dob = new Date(today);
  dob.setDate(dob.getDate() - targetAgeDays);
  return dob.toISOString().split('T')[0];
}

const testData = {
  "profiles": [
    {
      "id": "1",
      "puppyName": "Luna",
      "computerNumber": "GD2024-001",
      "dateOfBirth": getDateOfBirth(75), // 10.7 weeks - in 12weeks milestone
      "breed": "Labrador Retriever"
    },
    {
      "id": "2", 
      "puppyName": "Charlie",
      "computerNumber": "GD2024-002",
      "dateOfBirth": getDateOfBirth(145), // 20.7 weeks - in juvenile milestone
      "breed": "Golden Retriever"
    },
    {
      "id": "3",
      "puppyName": "Bella", 
      "computerNumber": "GD2024-003",
      "dateOfBirth": getDateOfBirth(210), // 30 weeks - in adolescent milestone
      "breed": "German Shepherd Cross"
    },
    {
      "id": "4",
      "puppyName": "Max",
      "computerNumber": "GD2024-004", 
      "dateOfBirth": getDateOfBirth(320), // 45.7 weeks - in 12months milestone
      "breed": "Labrador/Golden Retriever Cross"
    }
  ],
  "currentProfileId": "1",
  "progress": {},
  "trainingLogs": {}
};

const trainingAreas = [
  "toileting", "play", "greeting", "manners", 
  "transport", "walking", "recall", "handling", 
  "outing", "social"
];

const ageRanges = ["12weeks", "juvenile", "adolescent", "12months"];

// Generate age-appropriate progress values for each puppy
testData.profiles.forEach(profile => {
  // Calculate puppy age in days
  const puppyDob = new Date(profile.dateOfBirth);
  const puppyAgeDays = Math.floor((today - puppyDob) / (1000 * 60 * 60 * 24));
  
  // Determine which milestone the puppy is in
  let currentMilestone;
  if (puppyAgeDays < 112) {
    currentMilestone = "12weeks";
  } else if (puppyAgeDays < 168) {
    currentMilestone = "juvenile";
  } else if (puppyAgeDays < 280) {
    currentMilestone = "adolescent";
  } else {
    currentMilestone = "12months";
  }
  
  // Calculate progress through current milestone (as percentage)
  let milestoneProgress;
  if (currentMilestone === "12weeks") {
    milestoneProgress = (puppyAgeDays / 112) * 100;
  } else if (currentMilestone === "juvenile") {
    milestoneProgress = ((puppyAgeDays - 112) / (168 - 112)) * 100;
  } else if (currentMilestone === "adolescent") {
    milestoneProgress = ((puppyAgeDays - 168) / (280 - 168)) * 100;
  } else { // 12months
    milestoneProgress = ((puppyAgeDays - 280) / (365 - 280)) * 100;
  }
  
  // Generate age-appropriate progress values for each training area
  trainingAreas.forEach(area => {
    // Only generate progress for current and previous milestones
    ageRanges.forEach(ageRange => {
      // Determine if this milestone is available for this puppy
      const isMilestoneAvailable = 
        (ageRange === "12weeks") || 
        (ageRange === "juvenile" && puppyAgeDays >= 112) ||
        (ageRange === "adolescent" && puppyAgeDays >= 168) ||
        (ageRange === "12months" && puppyAgeDays >= 280);
      
      if (isMilestoneAvailable) {
        // If current milestone, base progress on milestone progress with some randomness
        let progressValue;
        if (ageRange === currentMilestone) {
          // Generate progress around the milestone progress with ±20% variation
          const variation = Math.random() * 40 - 20; // -20 to +20
          progressValue = Math.max(0, Math.min(100, milestoneProgress + variation));
        } else {
          // For completed milestones, generate high progress values (70-100%)
          progressValue = 70 + Math.random() * 30;
        }
        
        // Special handling for certain behaviors to make more realistic
        if (area === "toileting" && ageRange !== "12weeks") {
          progressValue = Math.max(progressValue, 85); // Toileting usually advanced
        }
        if (area === "recall" && ageRange === "12weeks") {
          progressValue = Math.min(progressValue, 60); // Recall starts basic
        }
        
        // Round to nearest 5
        progressValue = Math.round(progressValue / 5) * 5;
        
        // Save progress
        const key = `${profile.id}_${area}_${ageRange}`;
        testData.progress[key] = progressValue;
      }
    });
  });
  
  // Initialize empty training logs array
  testData.trainingLogs[profile.id] = [];
});

// Define common variables for generating realistic training logs
const locations = [
  "Home", "Garden", "Kitchen", "Living Room", "Park", "Quiet Street", 
  "Training Class", "Neighborhood Walk", "Pet Store", "Friend's Home",
  "Veterinary Clinic", "Cafe Patio", "Puppy Playgroup", "Busy Street"
];

const durations = [5, 10, 15, 20, 25, 30];

const timeOfDay = [
  "Morning", "Afternoon", "Evening", "Before breakfast", "After dinner", 
  "Before bedtime", "Midday", "Early morning"
];

const outcomes = [
  "Excellent", "Good progress", "Making progress", "Some improvement", 
  "Needs more work", "Struggled today", "Excellent focus", "Distracted but tried",
  "Very enthusiastic", "Tired but participated", "Brief but productive session"
];

const toiletingEntries = [
  "Used designated area without prompting",
  "Responded to 'busy-busy' cue immediately",
  "No indoor accidents today",
  "Indicated need to go outside by standing at door",
  "Successfully used leash relief in new location",
  "No interest in other dogs' waste during walk",
  "First time using grass surface outside of home",
  "Slight hesitation on new surface but successful",
  "Extended time between bathroom breaks - developing control",
  "Asked to go outside during training session",
  "Beginning to show predictable toileting pattern",
  "Successfully relieved on concrete for first time",
  "Accident in house after 3 hours - need to adjust schedule",
  "Reliably using garden area with consistent cue response",
  "Successful toilet training session in busier environment"
];

const playEntries = [
  "Gentle mouthing during tug play, redirected successfully",
  "Enjoyed interactive food toy for 20 minutes independently",
  "Showing improved 'drop it' response during play",
  "Swapped high-value toy without any resource guarding",
  "First successful 'find it' game with hidden treats",
  "Reduced mouthing intensity during excited play",
  "Engaged with toys instead of furniture chewing",
  "Showed appropriate play with visiting puppy",
  "Enjoyed water play in shallow pool",
  "Successfully used food puzzle at level 2 difficulty",
  "Interactive play with no jumping or nipping",
  "Selected appropriate chew toys independently",
  "No resource guarding when approached during KONG time",
  "Self-settled after play session without intervention",
  "Used toy to redirect from inappropriate chewing"
];

const greetingEntries = [
  "Remained calm when greeted by familiar visitor",
  "Four paws on floor when greeting children",
  "Successfully greeted elderly person without jumping",
  "Minimal excitement when visitor arrived - great progress",
  "Calm greeting with mail carrier at door",
  "Sat for greeting after initial excitement",
  "Greeted other puppy calmly on lead",
  "Remained seated during entire greeting practice",
  "Needed redirection once during new visitor greeting",
  "Met three new people with good manners",
  "Recovered quickly after initial excitement",
  "Brief jumping but responded to redirection",
  "Controlled greeting with favorite person - significant progress",
  "Greeted person in wheelchair appropriately",
  "Maintained calm demeanor with excitable visitor"
];

const mannersEntries = [
  "Reliable sit response to verbal cue only",
  "First successful down-stay for 30 seconds",
  "Responded to name first time in distracting environment",
  "Taking treats gently from hand consistently",
  "Responded to sit cue while playing - good impulse control",
  "Waited at door until released - no rushing",
  "Responded to hand signal for sit at distance",
  "Stand cue successful 3/5 attempts",
  "Down position held during minor distractions",
  "Responded to sit cue first time in new environment",
  "Practiced sits at curbs during neighborhood walk",
  "Alternated between sit, down and stand with verbal cues only",
  "Settled on mat during dinner preparation",
  "Responded to name first time in each new room",
  "Practiced wait cue at doorways with increasing duration"
];

const transportEntries = [
  "Entered car eagerly with tail wagging",
  "Settled in crate during 15-minute journey",
  "First bus ride - initially anxious but settled well",
  "Remained calm at traffic stops with car engine off",
  "Used calming mat in car with positive association",
  "Comfortable with car doors closing - no anxiety",
  "Practiced loading and unloading calmly 5 times",
  "First train ride - settled after initial curiosity",
  "Waited calmly before being invited into car",
  "Recovered quickly from sudden brake application",
  "Remained calm with window partially open",
  "Longer 30-minute journey with only brief restlessness",
  "Practiced entering/exiting different sides of vehicle",
  "Maintained calm during busy traffic conditions",
  "Used travel crate in new vehicle successfully"
];

const walkingEntries = [
  "First loose lead walking for full block without pulling",
  "Responded to direction changes with minimal guidance",
  "Reduced pulling behavior with treat targeting",
  "Practiced 'let's go' cue for attention during walk",
  "Automatic sit at curbs developing nicely",
  "Successfully navigated around pedestrians without lunging",
  "Loose lead maintained with moderate distractions",
  "Reduced excitement at walk start with calm departure routine",
  "Brief focus moments in high-distraction environment",
  "Practiced emergency U-turns successfully",
  "Responded to name during walk with immediate attention",
  "Walked nicely on lead past playing children",
  "Maintained heel position for 20 steps consistently",
  "Recovery after cat distraction quicker than last attempt",
  "First successful walk in light rain conditions"
];

const recallEntries = [
  "Immediate recall from play with other puppy",
  "Successful recall in fenced area with toys present",
  "Recall from 15 meters with moderate distraction",
  "Responded to whistle recall first time in new location",
  "Recalled away from interesting scent immediately",
  "Practiced emergency recall with high-value reward",
  "Multiple successful recalls in rotating locations",
  "Recalled past another dog without deviation",
  "Returned to hand target position without jumping",
  "Maintained recall reliability in familiar park",
  "Responded to recall cue despite wildlife distraction",
  "Returned immediately when called from short distance",
  "Recall from play successful 5/5 attempts",
  "Responded to both verbal and whistle recall cues",
  "Recalled and sat in front position without prompting"
];

const handlingEntries = [
  "Calm for full body brush with no restraint needed",
  "Allowed nail trim on front paws without resistance",
  "Teeth examination accepted with positive association",
  "Ear check and cleaning with minimal restraint",
  "Comfortable with collar adjustment and equipment checks",
  "Paw handling for all four feet with relaxed body language",
  "Accepted new harness fitting with tail wagging",
  "Remained still for mock veterinary examination",
  "Allowed eye cleaning with gentle approach",
  "Coat check for parasites with calm acceptance",
  "Full groom session including sensitive areas",
  "Introduced new handling tool with positive response",
  "Tolerated moderate restraint for health check",
  "Remained calm during bath time with reduced support",
  "Practice wearing guide dog jacket for 10 minutes"
];

const outingEntries = [
  "First cafe visit - settled under table for 15 minutes",
  "Calmly observed busy playground from safe distance",
  "Walking past construction site with minimal reaction",
  "Maintained focus despite bicycle passing nearby",
  "First successful hardware store visit with good focus",
  "Neutral response to vacuum cleaner in another room",
  "Calmly observed livestock from appropriate distance",
  "Appropriate interaction with cat in controlled setting",
  "Minimal reaction to sudden loud noise during walk",
  "Successfully navigated through crowd at market",
  "Neutral response to children playing nearby",
  "Calm behavior during outdoor dining experience",
  "Observed traffic at busy intersection with confidence",
  "Walked past barking dog behind fence with guidance",
  "Positive experience with controlled exposure to lawn mower"
];

const socialEntries = [
  "Self-settled in new environment within 5 minutes",
  "Remained on mat during dinner with occasional reminders",
  "First one-hour alone time with appropriate enrichment",
  "Calm settling while visitors in home",
  "Handled brief separation during outdoor cafe visit",
  "Chose to rest in crate independently during activity",
  "Remained settled during zoom call with movement on screen",
  "Two-hour alone time with no signs of distress",
  "Appropriate greeting then settling with new dog present",
  "Maintained settle position during food preparation",
  "Calm behavior during family movie night",
  "Ignored dropped food item during settling practice",
  "Successful crate time during family meal",
  "Relaxed but alert observation during household activity",
  "Settled quickly in new location after brief exploration"
];

// Map areas to their specific entry types
const areaSpecificEntries = {
  "toileting": toiletingEntries,
  "play": playEntries,
  "greeting": greetingEntries,
  "manners": mannersEntries,
  "transport": transportEntries,
  "walking": walkingEntries,
  "recall": recallEntries,
  "handling": handlingEntries,
  "outing": outingEntries,
  "social": socialEntries
};

// Generate realistic training logs for each puppy
testData.profiles.forEach(profile => {
  const puppyDob = new Date(profile.dateOfBirth);
  const puppyAgeDays = Math.floor((today - puppyDob) / (1000 * 60 * 60 * 24));
  const logs = [];
  let logIdCounter = 1;

  // Determine which milestones are available for this puppy
  const availableMilestones = [];
  if (puppyAgeDays >= 0) availableMilestones.push("12weeks");
  if (puppyAgeDays >= 112) availableMilestones.push("juvenile");
  if (puppyAgeDays >= 168) availableMilestones.push("adolescent");
  if (puppyAgeDays >= 280) availableMilestones.push("12months");

  // Determine current milestone
  let currentMilestone;
  if (puppyAgeDays < 112) {
    currentMilestone = "12weeks";
  } else if (puppyAgeDays < 168) {
    currentMilestone = "juvenile";
  } else if (puppyAgeDays < 280) {
    currentMilestone = "adolescent";
  } else {
    currentMilestone = "12months";
  }

  // Calculate appropriate log distribution based on puppy age
  // Focus more logs on current milestone, but include some from previous ones
  const logsPerMilestone = {};
  availableMilestones.forEach(milestone => {
    if (milestone === currentMilestone) {
      logsPerMilestone[milestone] = 60; // 60% of logs from current milestone
    } else {
      // Distribute remaining 40% among previous milestones
      const previousMilestones = availableMilestones.filter(m => m !== currentMilestone);
      logsPerMilestone[milestone] = Math.floor(40 / previousMilestones.length);
    }
  });
  
  // Calculate logs per area for each milestone
  const totalLogsToGenerate = 50; // Number of logs to generate per puppy
  
  // Generate logs for each milestone and area
  availableMilestones.forEach(milestone => {
    const numLogsForMilestone = Math.floor(totalLogsToGenerate * (logsPerMilestone[milestone] / 100));
    
    // Distribute logs across training areas with emphasis on age-appropriate areas
    const areaWeights = {};
    trainingAreas.forEach(area => {
      // Different emphasis based on milestone
      if (milestone === "12weeks") {
        if (["toileting", "play", "handling", "manners"].includes(area)) {
          areaWeights[area] = 2.0; // Higher priority for young puppies
        } else if (["social", "walking"].includes(area)) {
          areaWeights[area] = 1.0; // Medium priority
        } else {
          areaWeights[area] = 0.5; // Lower priority
        }
      } else if (milestone === "juvenile") {
        if (["walking", "play", "recall", "manners"].includes(area)) {
          areaWeights[area] = 1.5;
        } else {
          areaWeights[area] = 1.0;
        }
      } else if (milestone === "adolescent") {
        if (["recall", "outing", "walking", "social"].includes(area)) {
          areaWeights[area] = 1.5;
        } else {
          areaWeights[area] = 1.0;
        }
      } else { // 12months
        if (["outing", "transport", "social", "recall"].includes(area)) {
          areaWeights[area] = 1.5;
        } else {
          areaWeights[area] = 1.0;
        }
      }
    });
    
    // Calculate total weight
    const totalWeight = Object.values(areaWeights).reduce((sum, weight) => sum + weight, 0);
    
    // Calculate logs per area
    const logsPerArea = {};
    trainingAreas.forEach(area => {
      logsPerArea[area] = Math.max(1, Math.round((areaWeights[area] / totalWeight) * numLogsForMilestone));
    });
    
    // Generate logs for each area in this milestone
    for (const area in logsPerArea) {
      const entries = areaSpecificEntries[area];
      const numLogs = logsPerArea[area];
      
      for (let i = 0; i < numLogs; i++) {
        // Calculate a realistic date for this log entry
        let minAgeDays, maxAgeDays;
        
        // Set appropriate date range based on milestone
        if (milestone === "12weeks") {
          minAgeDays = 56; // 8 weeks - typical placement age
          maxAgeDays = Math.min(puppyAgeDays, 112);
        } else if (milestone === "juvenile") {
          minAgeDays = 112;
          maxAgeDays = Math.min(puppyAgeDays, 168);
        } else if (milestone === "adolescent") {
          minAgeDays = 168;
          maxAgeDays = Math.min(puppyAgeDays, 280);
        } else { // 12months
          minAgeDays = 280;
          maxAgeDays = puppyAgeDays;
        }
        
        // Generate random age within range
        const logAgeDays = minAgeDays + Math.floor(Math.random() * (maxAgeDays - minAgeDays));
        const logDate = new Date(puppyDob);
        logDate.setDate(logDate.getDate() + logAgeDays);
        
        // Create log entry
        const entryText = entries[Math.floor(Math.random() * entries.length)];
        const location = locations[Math.floor(Math.random() * locations.length)];
        const duration = durations[Math.floor(Math.random() * durations.length)];
        const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        const timeContext = timeOfDay[Math.floor(Math.random() * timeOfDay.length)];
        
        // Create detailed, realistic notes
        const notes = `${timeContext}: ${entryText}. ${outcome} during this ${duration}-minute session at ${location}.`;
        
        logs.push({
          id: `${profile.id}-${logIdCounter++}`,
          date: logDate.toISOString().split('T')[0],
          trainingArea: area,
          ageRange: milestone,
          activity: `${area.charAt(0).toUpperCase() + area.slice(1)} training - ${location}`,
          notes: notes,
          location: location,
          duration: duration
        });
      }
    }
  });
  
  // Sort logs by date (newest first)
  logs.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Store logs
  testData.trainingLogs[profile.id] = logs;
});

// Define realistic activities for specific areas (for the training sections)
const initialTrainingActivities = {
  "play": [
    { "id": "play-001", "title": "Managing Mouthing - Basic Redirection" },
    { "id": "play-002", "title": "Learning to Swap Items - Basic Exchange" },
    { "id": "play-003", "title": "Tug Games - Stage 1: Engaging with Toy" },
    { "id": "play-004", "title": "Tug Games - Stage 2: Teaching 'Drop'" },
    { "id": "play-005", "title": "Interactive Food Toys - KONG Introduction" }
  ],
  "toileting": [
    { "id": "toileting-001", "title": "House Training Setup - First Week" },
    { "id": "toileting-002", "title": "Teaching 'Busy-Busy' Cue - Stage 1" },
    { "id": "toileting-003", "title": "Developing Cue Timing - Stage 2" },
    { "id": "toileting-004", "title": "Leash Relieving - Stage 4" },
    { "id": "toileting-005", "title": "Different Surfaces - Stage 5" }
  ],
  "greeting": [
    { "id": "greeting-001", "title": "Calm Settling with Known People" },
    { "id": "greeting-002", "title": "Meeting Unfamiliar People" }
  ],
  "manners": [
    { "id": "manners-001", "title": "Name Recognition and Attention" },
    { "id": "manners-002", "title": "Sit Using Lure" },
    { "id": "manners-003", "title": "Taking Food Politely" }
  ],
  "walking": [
    { "id": "walking-001", "title": "Lead and Collar Introduction" },
    { "id": "walking-002", "title": "Lead Walking at Home" }
  ]
};

// Make testData globally accessible
window.testData = testData;

// Debug: Log that testData has been loaded
console.log('testData loaded:', testData);
console.log('testData profiles count:', testData.profiles.length);
console.log('testData progress keys:', Object.keys(testData.progress).length);
console.log('testData training logs keys:', Object.keys(testData.trainingLogs));
