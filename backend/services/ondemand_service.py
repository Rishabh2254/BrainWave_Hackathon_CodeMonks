import requests
import os
import re
from dotenv import load_dotenv

load_dotenv()

class OnDemandService:
    BASE_URL = "https://api.on-demand.io/chat/v1"
    API_KEY = os.getenv('ONDEMAND_API_KEY')
    AGENT_ID = os.getenv('ONDEMAND_AGENT_ID')
    ENDPOINT_ID = os.getenv('ONDEMAND_ENDPOINT_ID', 'predefined-openai-gpt4o')
    
    @staticmethod
    def remove_markdown(text):
        """Remove markdown formatting from text"""
        if not text:
            return text
        
        # Remove code blocks
        text = re.sub(r'```[\s\S]*?```', '', text)
        text = re.sub(r'`[^`\n]+`', '', text)
        
        # Remove headers
        text = re.sub(r'#{1,6}\s+', '', text)
        
        # Remove bold and italic
        text = re.sub(r'\*\*\*(.+?)\*\*\*', r'\1', text)
        text = re.sub(r'\*\*(.+?)\*\*', r'\1', text)
        text = re.sub(r'\*(.+?)\*', r'\1', text)
        text = re.sub(r'___(.+?)___', r'\1', text)
        text = re.sub(r'__(.+?)__', r'\1', text)
        text = re.sub(r'_(.+?)_', r'\1', text)
        
        # Remove links but keep text
        text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)
        
        # Remove images
        text = re.sub(r'!\[([^\]]*)\]\([^\)]+\)', '', text)
        
        # Remove horizontal rules
        text = re.sub(r'^\s*[-*_]{3,}\s*$', '', text, flags=re.MULTILINE)
        
        # Remove blockquotes
        text = re.sub(r'^>\s+', '', text, flags=re.MULTILINE)
        
        # Remove list markers
        text = re.sub(r'^\s*[-*+]\s+', '', text, flags=re.MULTILINE)
        text = re.sub(r'^\s*\d+\.\s+', '', text, flags=re.MULTILINE)
        
        # Clean up extra whitespace
        text = re.sub(r'\n{3,}', '\n\n', text)
        
        return text.strip()
    
    @staticmethod
    def create_session(external_user_id):
        """Create a chat session with OnDemand API"""
        url = f"{OnDemandService.BASE_URL}/sessions"
        headers = {
            "apikey": OnDemandService.API_KEY,
            "Content-Type": "application/json"
        }
        
        # Use hardcoded unique externalUserId as required by OnDemand API
        payload = {
            "externalUserId": "brainwave-assessment-user",
            "pluginIds": []
        }
        
        try:
            print(f"Creating session with payload: {payload}")
            response = requests.post(url, json=payload, headers=headers)
            print(f"Session creation response: {response.status_code}")
            print(f"Response body: {response.text}")
            response.raise_for_status()
            return response.json(), None
        except requests.exceptions.RequestException as e:
            print(f"Session creation error: {str(e)}")
            if e.response is not None:
                print(f"Response body: {e.response.text}")
            return None, str(e)
    
    @staticmethod
    def submit_query(session_id, query, reasoning_mode="medium"):
        """Submit a query to the chat session"""
        url = f"{OnDemandService.BASE_URL}/sessions/{session_id}/query"
        headers = {
            "apikey": OnDemandService.API_KEY,
            "Content-Type": "application/json"
        }
        
        payload = {
            "query": query,
            "endpointId": OnDemandService.ENDPOINT_ID,
            "pluginIds": [],
            "responseMode": "sync"
        }
        
        try:
            print(f"Submitting query with payload: {payload}")
            response = requests.post(url, json=payload, headers=headers)
            print(f"Query response: {response.status_code}")
            print(f"Response body: {response.text}")
            response.raise_for_status()
            return response.json(), None
        except requests.exceptions.RequestException as e:
            print(f"Query error: {str(e)}")
            if e.response is not None:
                print(f"Response body: {e.response.text}")
            return None, str(e)
    
    @staticmethod
    def generate_assessment_report(assessment_data, parent_id):
        """Generate a report from assessment data using OnDemand AI"""
        # Create session
        session_response, error = OnDemandService.create_session(parent_id)
        if error:
            return None, f"Failed to create session: {error}"
        
        session_id = session_response.get('data', {}).get('id')
        if not session_id:
            return None, "No session ID returned"
        
        # Prepare query with assessment data
        child_info = assessment_data.get('child_info', {})
        test_results = assessment_data.get('test_results', [])
        observations = assessment_data.get('observations', {})
        
        # Format test results with detailed analysis request
        test_results_text = "\n".join([
            f"- {test.get('testName', test.get('name', 'Unknown Test'))}: {test.get('timeInSeconds', test.get('time', 'N/A'))} seconds"
            for test in test_results
        ])
        
        query = f"""
As a pediatric occupational therapist specializing in autism assessment and hand function evaluation, please analyze the following Jebsen Hand Function Test (JHFT) results and provide a comprehensive clinical report.

CHILD INFORMATION:
- Name: {child_info.get('name', 'N/A')}
- Age: {child_info.get('age', 'N/A')} years
- Dominant Hand: {child_info.get('dominantHand', 'N/A')}
- Previous Assessments: {child_info.get('previousAssessments', 'None')}
- Specific Concerns: {child_info.get('specificConcerns', 'None')}

TEST RESULTS (Time in Seconds):
{test_results_text}

CLINICAL OBSERVATIONS:
Motor Skills: {observations.get('motorSkills', 'Not noted')}
Concentration: {observations.get('concentration', 'Not noted')}
Frustration Level: {observations.get('frustrationLevel', 'Not noted')}
Cooperation Level: {observations.get('cooperationLevel', 'Not noted')}
Additional Notes: {observations.get('additionalNotes', 'None')}

ANALYSIS REQUIREMENTS:
1. For EACH test, provide detailed analysis:
   - Compare the child's time against age-appropriate normative data and interquartile ranges for the Jebsen Hand Function Test
   - Calculate standard deviation from the mean for the child's age group
   - Clearly state if the performance is: Within Normal Range, Mildly Delayed, Moderately Delayed, or Significantly Delayed
   - Explain what this specific test measures (fine motor control, dexterity, coordination, speed, etc.)
   - Identify specific motor skills demonstrated or lacking

2. Statistical Performance Overview:
   - Calculate overall performance relative to normative standards
   - Identify which subtests fall outside the interquartile range (IQR)
   - Note any patterns in delays (e.g., bilateral vs unilateral tasks, speed vs precision)

3. Clinical Interpretation:
   - Synthesize findings into a cohesive performance profile
   - Relate findings to developmental milestones for the child's age
   - Consider the observations in context with test results

4. Strengths and Challenges:
   - List specific motor strengths demonstrated
   - Identify areas requiring support with evidence from test scores
   - Note behavioral factors affecting performance (concentration, frustration, cooperation)

5. Developmental Recommendations:
   - Suggest specific occupational therapy interventions
   - Recommend adaptive equipment if needed
   - Provide home-based activities for each area of concern

6. Follow-up Plan:
   - Recommend reassessment timeline based on severity of delays
   - Suggest additional assessments if indicated
   - Set measurable goals for improvement

FORMAT GUIDELINES:
- Use clear section headings
- Be specific with numbers and comparisons
- Avoid medical jargon; explain technical terms in parent-friendly language
- Include actionable next steps
- Maintain a supportive, encouraging tone while being clinically accurate
- Focus on the child's unique profile rather than generic recommendations
"""
        
        # Submit query
        response, error = OnDemandService.submit_query(session_id, query)
        if error:
            return None, f"Failed to generate report: {error}"
        
        answer = response.get('data', {}).get('answer')
        if not answer:
            return None, "No report generated"
        
        # Remove markdown formatting from the report
        clean_answer = OnDemandService.remove_markdown(answer)
        
        return {
            'session_id': session_id,
            'report': clean_answer,
            'message_id': response.get('data', {}).get('messageId')
        }, None

def generate_ice_breaker_response(user_message):
    """Generate friendly, autism-appropriate chatbot response"""
    
    # Create or get session
    session_response, error = OnDemandService.create_session("ice-breaker-chat")
    if error:
        # Return fallback response
        return get_fallback_response(user_message)
    
    session_id = session_response.get('data', {}).get('id')
    if not session_id:
        return get_fallback_response(user_message)
    
    # Create autism-friendly prompt
    query = f"""You are a friendly, patient chatbot designed to help children with autism feel comfortable and practice social communication. 

GUIDELINES:
- Use simple, clear language
- Be warm, encouraging, and positive
- Ask one question at a time
- Show interest in what the child shares
- Avoid sarcasm, idioms, or abstract concepts
- Use emojis sparingly but appropriately 😊
- Keep responses short (2-3 sentences max)
- Validate the child's feelings and responses
- Be predictable and consistent in tone
- Offer choices when possible
- Celebrate small victories in communication

TOPICS TO EXPLORE:
- Favorite things (colors, animals, foods, toys)
- Daily activities and routines
- Feelings and emotions (simple ones)
- Family and pets
- Hobbies and interests
- Simple yes/no questions
- Preferences and choices

AVOID:
- Complex questions
- Multiple questions at once
- Abstract or hypothetical scenarios
- Pressure to share if child is hesitant
- Sudden topic changes
- Negative or corrective language

The child said: "{user_message}"

Respond in a friendly, supportive way that encourages continued conversation and helps the child feel safe and understood."""
    
    # Submit query
    response, error = OnDemandService.submit_query(session_id, query)
    if error:
        return get_fallback_response(user_message)
    
    answer = response.get('data', {}).get('answer')
    if not answer:
        return get_fallback_response(user_message)
    
    # Clean up the response
    clean_answer = OnDemandService.remove_markdown(answer)
    
    return clean_answer

def get_fallback_response(user_message):
    """Provide fallback responses when API is unavailable"""
    message_lower = user_message.lower()
    
    # Pattern-based responses
    if any(word in message_lower for word in ['hi', 'hello', 'hey']):
        return "Hi there! 👋 I'm happy to talk with you! What would you like to chat about?"
    
    elif any(word in message_lower for word in ['name', 'who are you']):
        return "I'm your friendly chat buddy! I'm here to talk and listen. What's your name?"
    
    elif any(word in message_lower for word in ['happy', 'good', 'great']):
        return "That's wonderful! 😊 I'm so glad you're feeling good! What makes you happy?"
    
    elif any(word in message_lower for word in ['sad', 'bad', 'upset']):
        return "I'm sorry you're feeling that way. It's okay to have big feelings. Do you want to tell me more?"
    
    elif any(word in message_lower for word in ['like', 'love', 'favorite']):
        return "That sounds really cool! Tell me more about what you like! 🌟"
    
    elif any(word in message_lower for word in ['animal', 'dog', 'cat', 'pet']):
        return "Animals are awesome! Do you have a favorite animal? I love hearing about pets! 🐶🐱"
    
    elif any(word in message_lower for word in ['color', 'colours']):
        return "Colors are so fun! What's your favorite color? Mine changes all the time! 🌈"
    
    elif 'joke' in message_lower:
        return "Here's a silly one: Why did the teddy bear say no to dessert? Because she was stuffed! 🧸 Do you like jokes?"
    
    else:
        # Generic encouraging responses
        responses = [
            "That's really interesting! Can you tell me more about that? 😊",
            "I love hearing what you have to say! What else would you like to talk about?",
            "You're doing a great job sharing! Do you have a favorite thing to do?",
            "That's so cool! Would you like to tell me something else?",
            "Thanks for sharing that with me! What makes you smile? 😊",
        ]
        import random
        return random.choice(responses)
