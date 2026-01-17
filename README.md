# EchoMind by Team CodeMonks

EchoMind is an **AI powered support platform built exclusively for parents of autistic children**.

It helps parents **understand behavior, automate care insights, guide communication, and simplify daily therapy routines**, while providing a child friendly communication interface that parents control and customize.

EchoMind is not just an AAC tool.  
It is a **parent first AI assistant for autism care management**.

   
## Our Problem Statement

Globally, autism spectrum disorder (ASD) affects approximately **1 in 100 children**, according to international health organizations.  
Studies estimate that **30–40% of autistic children are non verbal or minimally verbal**, requiring alternative communication methods.

Parents of autistic children manage an average of **15–25 hours per week** of home based care activities, including communication support, therapy exercises, behavior monitoring, and routine planning.

Common challenges include:

  Interpreting non verbal communication signals, affecting up to **70% of early stage autism households**  
  Managing multiple therapy schedules and home programs, often across **2–4 parallel interventions**  
  Adjusting AAC communication strategies as children develop  
  Tracking behavioral patterns and progress over time without automated tools  
  Using fragmented platforms for communication, documentation, and progress monitoring  

Most existing AAC tools primarily focus on child facing interfaces. However, parents report that **over 60% of care related decisions are made at home without continuous professional supervision**, creating a gap between therapy sessions and real world daily care.

This results in limited structured feedback, manual tracking, and inconsistent personalization of communication support.

## Our Solution

EchoMind is built around **two connected interfaces: a Parent Dashboard and a Child Interface**, designed to work together as a unified care system.

The **Child Interface** operates in a secure *Child Lock mode* and provides structured, guided activities including:

  Daily Task Scheduler  
  Cognitive Tests and Analysis (including Jebsen Hand Function Test)  
  Emotional Response Assessment  
  Speech and Communication Exercises  
  AI assisted interactive activities  

These activities are partially managed by AI to adapt difficulty, timing, and content based on the child’s engagement and performance.

The **Parent Dashboard** acts as the control and monitoring center. Parents can:

  Track child progress over time  
  View AI generated performance summaries  
  Monitor activity completion and behavioral trends  
  Receive personalized care and communication recommendations  
  Configure activity schedules and AAC settings  

By combining AI managed child activities with parent side monitoring and guidance, EchoMind creates a closed feedback loop that improves personalization, consistency, and daily care efficiency.

## Technology Stack

  React + Vite  
  Tailwind CSS  
  Flask  
  On Demand
  Auth0 Authentication  
  MongoDB  
  Cloudinary  

## Installation and Setup

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **Python** (v3.9 or higher) - [Download here](https://www.python.org/downloads/)
- **MongoDB** - [Installation guide](https://www.mongodb.com/docs/manual/installation/)
- **Git** - [Download here](https://git-scm.com/downloads/)

### Environment Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/your-username/BrainWave_Hackathon_CodeMonks.git
cd BrainWave_Hackathon_CodeMonks
```

#### 2. Backend Setup

Navigate to the backend directory and install dependencies:

```bash
cd backend
pip install -r requirements.txt
```

Create a `.env` file in the `backend` directory with the following variables:

```env
# MongoDB Configuration
MONGO_URI=your_mongodb_connection_string

# Auth0 Configuration
AUTH0_DOMAIN=your_auth0_domain
AUTH0_CLIENT_ID=your_auth0_client_id
AUTH0_CLIENT_SECRET=your_auth0_client_secret

# OnDemand API Configuration
ONDEMAND_API_KEY=your_ondemand_api_key
ONDEMAND_AGENT_ID=your_ondemand_agent_id
ONDEMAND_ENDPOINT_ID=predefined-openai-gpt4o

# Cloudinary Configuration (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Application Configuration
SECRET_KEY=your_secret_key_for_sessions
FRONTEND_URL=http://localhost:5173
```

#### 3. Frontend Setup

Navigate to the frontend directory and install dependencies:

```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend` directory with the following variables:

```env
# API Configuration
VITE_API_URL=http://localhost:5000

# Auth0 Configuration (must match backend)
VITE_AUTH0_DOMAIN=your_auth0_domain
VITE_AUTH0_CLIENT_ID=your_auth0_client_id
```

### Running the Application

#### Start the Backend Server

In the `backend` directory:

```bash
python app.py
```

The backend server will start on `http://localhost:5000`

#### Start the Frontend Development Server

In a new terminal, navigate to the `frontend` directory:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

### Database Setup

The application will automatically create the necessary MongoDB collections on first run. Ensure your MongoDB instance is running and the connection string in your `.env` file is correct.

Collections created:
- `users` - User authentication and profiles
- `assessments` - Jebsen Hand Function Test data
- `speech_practice` - Speech practice session records
- `daily_schedule_activities` - Daily task completion tracking

### Default Login

For testing purposes, you can create an account through Auth0's authentication flow or use the parent/child selection interface.

**Parent Mode**: Full access to dashboard and analytics  
**Child Mode**: Protected by password (default: `12345`)

### API Endpoints

Once running, you can access:

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health
- **API Documentation**: http://localhost:5000/

### Troubleshooting

#### Port Already in Use

If port 5000 or 5173 is already in use, you can change them:

**Backend**: Edit `app.py` and modify:
```python
app.run(host='0.0.0.0', port=5001, debug=True)
```

**Frontend**: Edit `vite.config.ts` and add:
```typescript
server: {
  port: 5174
}
```

#### MongoDB Connection Issues

- Ensure MongoDB is running: `mongod` or check your MongoDB service
- Verify your `MONGO_URI` is correctly formatted
- Check firewall settings if using remote MongoDB

#### Auth0 Configuration Issues

- Verify all Auth0 credentials match between frontend and backend
- Check that callback URLs are properly configured in Auth0 dashboard
- Ensure the Auth0 application is set to "Regular Web Application" type

#### Missing Dependencies

If you encounter import errors:

**Backend**:
```bash
pip install flask flask-cors pymongo python-dotenv requests authlib
```

**Frontend**:
```bash
npm install react react-dom react-router-dom lucide-react chart.js react-chartjs-2
```

### Development Notes

- The application uses **Child Lock mode** for the child interface - password required to exit
- All AI features require valid **OnDemand API** credentials
- Speech-to-text features use browser's built-in Web Speech API
- Camera features require permission grants from the browser

### Building for Production

#### Frontend Build

```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist` directory.

#### Backend Deployment

For production deployment:
1. Set `debug=False` in `app.py`
2. Use a production WSGI server like **Gunicorn**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -b 0.0.0.0:5000 app:app
   ```
3. Configure environment variables on your hosting platform
4. Use a reverse proxy like Nginx for serving both frontend and backend

   
## FlowDiagram
![flow diagram](images/flow_diagram.png)

   
## Our Team
Registered as **Team CodeMonks**
