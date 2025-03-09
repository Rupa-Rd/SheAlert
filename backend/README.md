# Backend Documentation

## Overview

The backend is responsible for processing voice or behavior data to detect distress and managing integrations with messaging services for alerting emergency contacts.

## Key Components

1. **Distress Detection Module:** Utilizes machine learning algorithms to analyze user inputs (e.g., voice data) and identify signs of distress.

2. **Messaging Integration:** Interfaces with messaging platforms to send alerts to emergency contacts when distress is detected.

3. **Real-Time Guidance System:** Provides users with immediate assistance or instructions during unsafe situations.

## Setup Instructions

### Clone the Repository

``` git clone https://github.com/Rupa-Rd/SheAlert.git```

### Navigate to the Backend Directory

```cd SheAlert/backend```

### Install Dependencies

```npm install```


### Configure Environment Variables

Set up necessary environment variables for messaging service APIs and other configurations.

### Run the Backend Server

```nodemon api.js```

The server is host in ```localhost:3000```