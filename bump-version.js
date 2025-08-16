#!/usr/bin/env node

/**
 * Version Bump Script for PrepTracker PWA
 * 
 * Usage: node bump-version.js [new-version]
 * Example: node bump-version.js 1.0.30
 * 
 * This script:
 * 1. Updates js/version.js with the new version
 * 2. Updates js/version-sw.js with the new version
 * 3. Optionally adds a new entry to changelog.json
 */

const fs = require('fs');
const path = require('path');

// Get new version from command line arguments
const newVersion = process.argv[2];

if (!newVersion) {
    console.error('❌ Error: Please provide a version number');
    console.log('Usage: node bump-version.js [new-version]');
    console.log('Example: node bump-version.js 1.0.30');
    process.exit(1);
}

// Validate version format (basic semver check)
const versionRegex = /^\d+\.\d+\.\d+$/;
if (!versionRegex.test(newVersion)) {
    console.error('❌ Error: Invalid version format. Use semantic versioning (e.g., 1.0.30)');
    process.exit(1);
}

console.log(`🚀 Bumping version to ${newVersion}...`);

try {
    // 1. Update js/version.js
    const versionJsPath = path.join(__dirname, 'js', 'version.js');
    const versionJsContent = `// Shared version constant for the PrepTracker app
// This version is used by both the main app and service worker
export const APP_VERSION = '${newVersion}';`;
    
    fs.writeFileSync(versionJsPath, versionJsContent);
    console.log('✅ Updated js/version.js');

    // 2. Update js/version-sw.js
    const versionSwJsPath = path.join(__dirname, 'js', 'version-sw.js');
    const versionSwJsContent = `// Service Worker version constant
// This file provides the version constant to the service worker
// It must be kept in sync with js/version.js
self.APP_VERSION = '${newVersion}';`;
    
    fs.writeFileSync(versionSwJsPath, versionSwJsContent);
    console.log('✅ Updated js/version-sw.js');

    // 3. Update changelog.json (add empty entry for new version)
    const changelogPath = path.join(__dirname, 'changelog.json');
    let changelogData = {};
    
    try {
        const changelogContent = fs.readFileSync(changelogPath, 'utf8');
        changelogData = JSON.parse(changelogContent);
    } catch (error) {
        console.warn('⚠️  Warning: Could not read existing changelog.json, creating new one');
    }

    // Add new version entry if it doesn't exist
    if (!changelogData[newVersion]) {
        const newChangelog = {
            [newVersion]: [
                // Placeholder entry - update with actual changes
            ],
            ...changelogData
        };

        fs.writeFileSync(changelogPath, JSON.stringify(newChangelog, null, 2) + '\n');
        console.log('✅ Added new version entry to changelog.json');
        console.log('📝 Remember to add changelog entries for version ' + newVersion);
    } else {
        console.log('ℹ️  Version ' + newVersion + ' already exists in changelog.json');
    }

    console.log('\n🎉 Version bump complete!');
    console.log(`📋 Next steps:`);
    console.log(`   1. Update the changelog entry for ${newVersion} with actual changes`);
    console.log(`   2. Test the app to ensure version update flow works`);
    console.log(`   3. Deploy the updated app`);
    console.log(`   4. Verify that PWA updates correctly for existing users`);

} catch (error) {
    console.error('❌ Error updating version:', error.message);
    process.exit(1);
}
