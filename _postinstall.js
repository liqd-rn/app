const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Read the package.json file
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Extract peerDependencies from package.json
const peerDependencies = packageJson.peerDependencies ? Object.keys(packageJson.peerDependencies) : [];

// Function to install a dependency if it is not already installed
const installDependency = (dependency) => {
  exec(`npm ls ${dependency} --json`, (err, stdout) => {
    if (err) {
      console.error(`Error checking ${dependency}: ${err.message}`);
      return;
    }

    const output = JSON.parse(stdout);
    if (!output.dependencies || !output.dependencies[dependency]) {
      console.log(`${dependency} not found. Installing...`);
      exec(`npm install ${dependency}`, (installErr, installStdout) => {
        if (installErr) {
          console.error(`Error installing ${dependency}: ${installErr.message}`);
          return;
        }
        console.log(`${dependency} installed successfully.`);
      });
    } else {
      console.log(`${dependency} is already installed.`);
    }
  });
};

// Install each peer dependency
peerDependencies.forEach(installDependency);