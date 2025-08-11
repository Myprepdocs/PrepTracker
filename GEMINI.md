# Guide Dog PREP Tracker

## Purpose

The Guide Dog PREP Tracker is a Progressive Web Application (PWA) designed to help puppy raisers track progress for **multiple puppies** through the **Puppy Raising and Education Programme (PREP)** for guide dog training. The app provides a structured way to monitor development across key training areas and age milestones for unlimited puppy profiles, ensuring comprehensive preparation for future guide dog work.

## Core Functionality

The application serves as a digital companion for puppy raisers, allowing them to:

- **Multi-Puppy Management**: Add, edit, delete, and switch between unlimited puppy profiles
- **Track Progress**: Monitor development across 10 essential training areas per puppy
- **Age-Based Milestones**: View specific goals and expectations for different developmental stages
- **Activity Logging**: Record training sessions, observations, and video evidence for each puppy
- **Document Management**: Access supporting materials and guidance documents
- **Data Management**: Backup, restore, and manage training data across all puppies
- **Profile Switching**: Seamlessly switch between puppies while maintaining context

## Target Users

- Guide dog puppy raisers managing multiple puppies
- Puppy training coordinators overseeing multiple litters
- Guide dog organizations with breeding programs
- Volunteers participating in puppy raising programs
- Foster families raising successive puppies

## Application Structure

### 1. **Multi-Puppy Profile System**
- **Purpose**: Manage unlimited puppy profiles with complete data isolation
- **Key Features**:
  - **Profile Management**: Create, edit, delete puppy profiles
  - **Quick Switching**: Select active puppy from dashboard
  - **Data Isolation**: Each puppy's progress is completely separate
  - **Persistent Selection**: Remembers last selected puppy
- **Data Collected**:
  - Puppy name
  - Computer/ID number
  - Date of birth (for automatic age calculation)
  - Breed information
  - Individual training progress and history
- **Age Calculation**: Automatically determines current developmental stage based on birth date for each puppy

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

#### **Progress Indicators** (Per Puppy)
- **Individual Age Selection**: Each training area has radio buttons to select the relevant age stage
- **Progress Sliders**: Visual percentage tracking (0-100%) for each area/age combination per puppy
- **Milestone Text**: Age-specific behavioral expectations and goals
- **Activity Logging**: Detailed training session records with dates, notes, and video attachments for each puppy
- **Data Separation**: All progress data is isolated per puppy profile

### 3. **Supporting Documents System**
Educational resources covering specialized topics:
- **Mouthing** 🦷 - Managing puppy biting behavior
- **Whistle Association** 🎵 - Building whistle recall conditioning
- **Observing Traffic** 🚗 - Safe traffic exposure protocols
- **T-Touch Harness** 🦮 - Equipment fitting and usage
- **Adolescence** 🌱 - Managing teenage dog behaviors
- **Stairs and Steps** 🪜 - Safe navigation training

### 4. **Puppy Management Dashboard**
- **Current Puppy Display**: Shows selected puppy's key information and quick actions
- **Puppy List**: Grid view of all puppy profiles with management controls
- **Profile Cards**: Individual cards showing puppy details, age, and status
- **Management Actions**:
  - **Add New Puppy**: Create additional puppy profiles
  - **Edit Profile**: Modify existing puppy information
  - **Delete Puppy**: Remove puppy profiles with confirmation (prevents deletion of last puppy)
  - **Select Puppy**: Switch active puppy context
- **Visual Indicators**: Current puppy highlighting and status badges

### 5. **Data Management Tools**
- **Multi-Puppy Export/Backup**: JSON-based data export including all puppy profiles
- **Import/Restore**: Ability to restore previous backups with multiple puppies
- **Reset Function**: Complete data clearing for fresh start
- **Debug Tools**: Development utilities for troubleshooting
- **Data Isolation**: Complete separation of data between puppy profiles

## Technical Architecture

### **Frontend Technologies**
- **HTML5**: Semantic markup with PWA manifest
- **CSS3**: Modern responsive design with CSS custom properties
- **Vanilla JavaScript**: ES6+ with modular class-based architecture
- **Service Worker**: Offline functionality and update management

### **Data Storage**
- **Primary**: IndexedDB for robust client-side data persistence
- **Fallback**: localStorage for browsers with limited IndexedDB support
- **Multi-Puppy Architecture**: 
  - **Profiles**: Each puppy has a unique ID and separate profile record
  - **Progress Data**: Keyed by `profileId_trainingArea_ageRange` for complete isolation
  - **Activities**: All training logs include `profileId` for proper filtering
  - **Data Separation**: Zero cross-contamination between puppy profiles

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
├── index.html              # Main application shell with multi-puppy interface
├── manifest.json           # PWA manifest configuration
├── sw.js                   # Service worker with version management
├── js/
│   ├── app.js              # Main application controller with multi-puppy logic
│   └── storage.js          # Data management with multi-puppy IndexedDB interface
├── styles/
│   └── main.css            # Complete application styling including puppy management
├── icons/                  # PWA icons and assets
└── GEMINI.md              # This documentation file
```

## Key Design Decisions

### **User Experience**
- **Multi-Puppy Dashboard**: Central hub for managing and switching between puppy profiles
- **Age-Specific Interface**: Radio buttons in each training area allow age-specific milestone viewing per puppy
- **Visual Progress Tracking**: Color-coded sliders with 5% increments for precise progress indication per puppy
- **Contextual Actions**: Each training area provides relevant action buttons (Progress Log, Training Activities)
- **Profile Context**: Always shows which puppy is currently selected
- **Seamless Switching**: Change puppy context without losing current view or progress
- **Responsive Design**: Mobile-first approach with touch-friendly controls

### **Data Integrity**
- **Complete Data Isolation**: Each puppy's data is completely separate with zero cross-contamination
- **Automatic Age Calculation**: Reduces user error in age classification per puppy
- **Structured Data Model**: Consistent data formats across all storage operations with puppy-specific keys
- **Multi-Puppy Backup/Restore**: JSON-based exports include all puppy profiles and their data
- **Version Control**: Database recreation ensures clean slate with app updates while preserving puppy separation
- **Safe Deletion**: Prevents deletion of the last remaining puppy profile

### **Accessibility & Performance**
- **Semantic HTML**: Proper heading structure and ARIA labels
- **Keyboard Navigation**: Full keyboard accessibility
- **Progressive Enhancement**: Core functionality works without JavaScript
- **Efficient Storage**: Optimized data structures minimize storage requirements

## Usage Workflow

### **Initial Setup**
1. **First Time Users**: Click "Add Your First Puppy" to create initial profile
2. **App Setup**: App calculates current age stage automatically per puppy
3. **Dashboard Access**: Training areas populate with age-appropriate milestones for selected puppy

### **Multi-Puppy Management**
1. **Puppy Dashboard**: Start at "My Puppies" to view all profiles and select active puppy
2. **Add Puppies**: Use "Add New Puppy" button to create additional profiles
3. **Switch Context**: Click "Select" on any puppy card to change active puppy
4. **Edit/Delete**: Use individual puppy card actions for profile management

### **Daily Usage** (Per Puppy)
1. **Select Puppy**: Choose active puppy from dashboard
2. **View Progress**: Navigate to Progress Chart to see current puppy's development
3. **Age Selection**: Use radio buttons in training areas to select relevant age stage
4. **Review Milestones**: Check age-specific expectations for each training area
5. **Log Activities**: Record training sessions with notes and optional video for current puppy
6. **Update Progress**: Adjust sliders as skills develop for the selected puppy
7. **E-Learning**: Access materials via file icons in headers

### **Progress Monitoring** (Multi-Puppy)
1. **Individual Tracking**: Each puppy has separate visual progress indicators
2. **Puppy-Specific Logs**: Activity histories are maintained per puppy
3. **Comparative Overview**: Dashboard shows all puppies' current status
4. **Age-Stage Guidance**: Training focus guides adapt to each puppy's development stage

### **Data Management** (All Puppies)
1. **Comprehensive Backups**: Export includes all puppy profiles and their complete data
2. **Multi-Device Sync**: Import/export enables data sharing with all puppy information
3. **Safe Operations**: Reset functionality preserves data integrity across puppies
4. **Profile Protection**: System prevents accidental deletion of last remaining puppy

## Development Status

The application is feature-complete for comprehensive multi-puppy training tracking functionality, with a robust foundation for future enhancements such as:
- Cloud synchronization across devices
- Training plan templates
- Progress analytics and reporting across multiple puppies
- Advanced multi-puppy comparison dashboards
- Trainer/coordinator oversight panels
- Breeding program integration
- Cross-puppy statistical analysis

## Multi-Puppy System Benefits

### **For Individual Raisers**
- **Successive Puppies**: Track multiple puppies over time as you raise different dogs
- **Comparison**: See how different puppies progress through similar stages
- **Experience Building**: Learn from patterns across multiple training journeys

### **For Organizations**
- **Litter Tracking**: Monitor entire litters through the PREP program
- **Volunteer Management**: Support volunteers raising multiple puppies
- **Program Oversight**: Aggregate data across multiple puppy raisers

### **Technical Advantages**
- **Scalability**: Unlimited puppy profiles without performance impact
- **Data Isolation**: Complete separation ensures training records never mix
- **Backwards Compatibility**: Existing single-puppy installations work seamlessly
- **Storage Efficiency**: Optimized data structures minimize storage overhead per puppy

This PWA represents a comprehensive digital solution for guide dog puppy raising programs, combining structured multi-puppy tracking with user-friendly design and robust technical implementation. The system scales from individual puppy raisers to organizational breeding programs while maintaining data integrity and user experience excellence.