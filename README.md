SheAlert is an AI-powered virtual assistant designed to detect distress in a user's voice or behavior. It integrates with messaging services to alert emergency contacts and provides real-time guidance in unsafe situations.

## Our Mission

Our mission is to create a world where women feel safe, supported, and empowered in every situation. Through
cutting-edge AI technology, we aim to provide a virtual assistant that can detect distress in a woman's voice or
behavior, offering real-time alerts and guidance when it’s needed most.
 
By seamlessly integrating with messaging services, our app ensures that emergency contacts are notified
instantly, and immediate assistance is provided. We are dedicated to helping women navigate unsafe situations
with confidence, providing both emotional support and practical solutions to protect their well-being. Our goal
is to empower women to take control of their safety, knowing that they are never alone, even in their most
vulnerable moments.

## Problem Statement

Despite significant progress in gender equality, women continue to face safety concerns in their daily lives, from
harassment to more severe threats. In moments of distress, many women may struggle to get help in time, often
unable to alert others or access immediate support when needed.

Current solutions, like emergency contact alerts or safety apps, lack real-time emotional analysis or fail to provide
quick, personalized assistance. The challenge is to create an accessible and intuitive platform that detects distress
in a woman's voice or behavior, enabling immediate action, connecting them to emergency contacts, and offering
real-time guidance to ensure their safety and well-being.

## Approached Solution

1. **Emotion Detection:** The app uses advanced AI to detect emotions such as joy, sadness, fear, and anger by analyzing vocal cues and behavioral patterns in real-time. This only happens when the app is open and actively
running, ensuring that the app respects the user’s privacy when not in use.
2. **Personalized Guidelines:** Based on the detected emotional state, the app provides tailored, real-time guidelines and advice to help the user navigate the situation—whether it's calming techniques for fear or specific advice
 for handling anger.
3. **Real-Time Alerts:** Once distress is confirmed by the user, the app sends immediate alerts to pre-set emergency contacts, including the user's location and the context of their emotional state, ensuring swift suppor

## Architecture Diagram

![image](https://github.com/user-attachments/assets/17113855-5dfa-48c2-940d-cddf70ae0db8)

## Features Supported

- Multi Language Voice Detection
- Real-Time Emotion Detection
- Emergency Call
- Location Tracking
- Alerting System
- Personalized Guidance

## Implementation

1. **React Native:** Use React Native to develop the cross-platform mobile app for Android and iOS.
2. **Audio Recording:** Integrate audio recording features using react-native-audio or react-native-sound.
3. **Node Backend:** Deploy a Rest API backend to process transcription and emotion detection requests.
4. **Whisper for Transcription:** Use OpenAI Whisper model for real-time speech-to-text transcription in the backend.
5. **Emotion Detection:** Implement emotion detection using XLM-RoBERTa or similar models for text analysis.
6. **Real-Time Notifications:** Implement Firebase Cloud Messaging (FCM) for real-time alerts and notifications.
7. **Location Sharing:** Use React Native’s Geolocation API for sharing real-time location with emergency contacts.
8. **Data Privacy:** Ensure data privacy by processing data securely on the device and backend, with proper encryption


## Execution

