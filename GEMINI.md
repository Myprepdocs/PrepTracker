# Guide Dog PREP Tracker

## Purpose

The Guide Dog PREP Tracker is a Progressive Web Application (PWA) designed to help puppy raisers track their puppy's progress through the **Puppy Raising and Education Programme (PREP)** for guide dog training. The app provides a structured way to monitor development across key training areas and age milestones, ensuring comprehensive preparation for future guide dog work.

## Core Functionality

The application serves as a digital companion for puppy raisers, allowing them to:

- **Track Progress**: Monitor development across 10 essential training areas
- **Age-Based Milestones**: View specific goals and expectations for different developmental stages
- **Activity Logging**: Record training sessions, observations, and video evidence
- **Document Management**: Access supporting materials and guidance documents
- **Data Management**: Backup, restore, and manage training data

## Target Users

- Guide dog puppy raisers
- Puppy training coordinators
- Guide dog organizations
- Volunteers participating in puppy raising programs

## Application Structure

### 1. **Puppy Profile System**
- **Purpose**: Establish individual puppy identity and calculate age-appropriate milestones
- **Data Collected**:
  - Puppy name
  - Computer/ID number
  - Date of birth (for automatic age calculation)
  - Breed information
- **Age Calculation**: Automatically determines current developmental stage based on birth date

### 2. **Progress Tracking System**

#### **Training Areas** (10 Core Areas)
1. **Toileting Routine** 🚽 - House training and elimination management
2. **Learning to Play** 🧸 - Appropriate play behavior and toy interaction
3. **Greeting People** 👋 - Social interactions with humans
4. **Learning Manners** 🎯 - Basic obedience and polite behavior
5. **Travel and Transport** 🚗 - Vehicle comfort and public transport exposure
6. **Walking on a Lead** 🚶 - Leash training and controlled movement
7. **Recall and Off Lead Exercise** 📞 - Coming when called and off-leash control
8. **Handling, Grooming and Equipment** ✂️ - Physical handling and equipment acceptance
9. **Being Out and About** 🌍 - Public access and environmental exposure
10. **Social Behaviours and Settling** 🤝 - Calm behavior in various situations

#### **Age Milestones** (4 Developmental Stages)
- **12 Weeks**: Early puppy foundation skills
- **Juvenile**: Building confidence and basic training
- **Adolescent**: Developing reliability and managing teenage behaviors
- **12 Months**: Pre-advanced training readiness

#### **Progress Indicators**
- **Individual Age Selection**: Each training area has radio buttons to select the relevant age stage
- **Progress Sliders**: Visual percentage tracking (0-100%) for each area/age combination
- **Milestone Text**: Age-specific behavioral expectations and goals
- **Activity Logging**: Detailed training session records with dates, notes, and video attachments

### 3. **Supporting Documents System**
Educational resources covering specialized topics:
- **Mouthing** 🦷 - Managing puppy biting behavior
- **Whistle Association** 🎵 - Building whistle recall conditioning
- **Observing Traffic** 🚗 - Safe traffic exposure protocols
- **T-Touch Harness** 🦮 - Equipment fitting and usage
- **Adolescence** 🌱 - Managing teenage dog behaviors
- **Stairs and Steps** 🪜 - Safe navigation training

### 4. **Data Management Tools**
- **Export/Backup**: JSON-based data export for backup purposes
- **Import/Restore**: Ability to restore previous backups
- **Reset Function**: Complete data clearing for fresh start
- **Debug Tools**: Development utilities for troubleshooting

## Technical Architecture

### **Frontend Technologies**
- **HTML5**: Semantic markup with PWA manifest
- **CSS3**: Modern responsive design with CSS custom properties
- **Vanilla JavaScript**: ES6+ with modular class-based architecture
- **Service Worker**: Offline functionality and update management

### **Data Storage**
- **Primary**: IndexedDB for robust client-side data persistence
- **Fallback**: localStorage for browsers with limited IndexedDB support
- **Structure**: Separate object stores for profiles, progress, activities, and documents

### **PWA Features**
- **Offline Capability**: Full functionality without internet connection
- **App-like Experience**: Installable on devices with native app feel
- **Background Sync**: Planned feature for data synchronization
- **Push Notifications**: Framework ready for training reminders

### **Version Management System**
- **Coordinated Versioning**: Service worker and app maintain synchronized version numbers
- **Database Migration**: Automatic database recreation when versions change
- **Update Notifications**: User-friendly update prompts with manual control
- **Graceful Fallbacks**: Multiple update strategies for reliability

## File Structure

```
PrepTracker/
├── index.html              # Main application shell
├── manifest.json           # PWA manifest configuration
├── sw.js                   # Service worker with version management
├── js/
│   ├── app.js              # Main application controller
│   └── storage.js          # Data management and IndexedDB interface
├── styles/
│   └── main.css            # Complete application styling
├── icons/                  # PWA icons and assets
├── test-version.html       # Development testing utilities
└── GEMINI.md              # This documentation file
```

## Key Design Decisions

### **User Experience**
- **Age-Specific Interface**: Radio buttons in each training area allow age-specific milestone viewing
- **Visual Progress Tracking**: Color-coded sliders with 5% increments for precise progress indication
- **Contextual Actions**: Each training area provides relevant action buttons (Progress Log, Training Activities)
- **Responsive Design**: Mobile-first approach with touch-friendly controls

### **Data Integrity**
- **Automatic Age Calculation**: Reduces user error in age classification
- **Structured Data Model**: Consistent data formats across all storage operations
- **Backup/Restore**: JSON-based exports ensure data portability
- **Version Control**: Database recreation ensures clean slate with app updates

### **Accessibility & Performance**
- **Semantic HTML**: Proper heading structure and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Efficient Storage**: Optimized data structures minimize storage requirements

## Usage Workflow

### **Initial Setup**
1. User creates puppy profile with basic information
2. App calculates current age stage automatically
3. Training areas populate with age-appropriate milestones

### **Daily Usage**
1. User selects relevant age stage using radio buttons in any training area
2. Reviews milestone expectations for each training area
3. Logs training activities with notes and optional video
4. Updates progress sliders as skills develop
5. Accesses e-learning materials via file icons in headers

### **Progress Monitoring**
1. Visual progress indicators show development over time
2. Activity logs maintain detailed training history
3. Age-stage progression guides training focus
4. Supporting documents provide specialized guidance

### **Data Management**
1. Regular backups ensure data security
2. Import/export enables data sharing between devices
3. Reset functionality allows fresh starts when needed

## Development Status

The application is feature-complete for core puppy training tracking functionality, with a robust foundation for future enhancements such as:
- Cloud synchronization
- Training plan templates
- Progress analytics and reporting
- Multi-puppy management
- Trainer/coordinator dashboards

This PWA represents a comprehensive digital solution for guide dog puppy raising programs, combining structured tracking with user-friendly design and robust technical implementation.