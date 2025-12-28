# AI Supply Chain Risk Monitor

## Overview
AI Supply Chain Risk Monitor is a full-stack web application that analyzes logistics shipment risk based on distance, transport mode, weather impact, and delivery delays. The system classifies shipment risk as Low, Medium, or High and visualizes routes on an interactive map.

## Features
- Create and manage shipments
- Run risk analysis on demand
- Distance and ETA calculation using geolocation
- Risk visualization on an interactive world map
- MongoDB persistence for all shipment data
- Fallback logic for external API failures

## Tech Stack
- Frontend: React, Axios, Leaflet
- Backend: Node.js, Express
- Database: MongoDB, Mongoose

## Risk Evaluation Logic
Risk is calculated using a weighted model based on:
- Route distance
- Selected transport mode (Air / Road / Sea)
- Weather severity (with fallback handling)
- Delay probability

The final risk score is categorized as Low, Medium, or High.

## Architecture
The project follows a clean layered architecture:
- UI layer for input and visualization
- API layer for orchestration
- Domain layer for risk computation
- Data layer for persistence and external services

## Usage
1. Create a shipment using the dashboard form
2. Trigger risk analysis for a shipment
3. View risk level, ETA, and route visualization

## Reliability
The system is designed to continue risk evaluation even if external services (e.g., weather APIs) are unavailable, ensuring stable and consistent results.
