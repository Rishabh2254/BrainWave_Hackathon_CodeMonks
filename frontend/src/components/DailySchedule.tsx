import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, CheckCircle, Circle, ChevronRight, ChevronLeft, Clock, ListChecks, Camera, CameraOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Task {
  id: number;
  title: string;
  emoji: string;
  time: string;
  description: string;
  completed: boolean;
}

interface Preset {
  id: string;
  name: string;
  emoji: string;
  description: string;
  color: string;
  tasks: Omit<Task, 'completed'>[];
}

const PRESETS: Preset[] = [
  {
    id: 'getting-dressed',
    name: 'Getting Dressed',
    emoji: '👕',
    description: 'Step-by-step guide for wearing clothes',
    color: '#0A84FF',
    tasks: [
      { id: 1, title: 'Choose Clothes', emoji: '👔', time: 'Step 1', description: 'Pick out shirt, pants, underwear, and socks. Lay them on the bed in order.' },
      { id: 2, title: 'Check Comfort', emoji: '✋', time: 'Step 2', description: 'Touch each piece. Do the tags scratch? Is the fabric soft? Remove anything uncomfortable.' },
      { id: 3, title: 'Put On Underwear', emoji: '🩲', time: 'Step 3', description: 'Sit down. Put both legs through holes. Pull up slowly. Stand and adjust.' },
      { id: 4, title: 'Put On Shirt', emoji: '👕', time: 'Step 4', description: 'Find the tag - it goes in back. Put head through first. Then one arm, then other arm.' },
      { id: 5, title: 'Put On Pants', emoji: '👖', time: 'Step 5', description: 'Sit down. Put one leg in, then other leg. Stand up and pull up pants. Button and zip if needed.' },
      { id: 6, title: 'Put On Socks', emoji: '🧦', time: 'Step 6', description: 'Sit down. Scrunch one sock. Put toes in first. Pull up over heel. Do other foot.' },
      { id: 7, title: 'Put On Shoes', emoji: '👟', time: 'Step 7', description: 'Put right shoe on right foot (check inside for L/R). Then left shoe. Velcro or tie laces.' },
      { id: 8, title: 'Check Mirror', emoji: '🪞', time: 'Step 8', description: 'Look in mirror. Is everything on right? Do you feel okay? Great job getting dressed!' },
    ],
  },
  {
    id: 'sensory-friendly',
    name: 'Sensory-Friendly Day',
    emoji: '🎧',
    description: 'Schedule for managing sensory sensitivities',
    color: '#30D158',
    tasks: [
      { id: 1, title: 'Morning Sensory Check', emoji: '🌤️', time: '7:00 AM', description: 'Notice how you feel. Is anything too loud? Too bright? Too itchy? Tell someone.' },
      { id: 2, title: 'Gentle Wake Up', emoji: '🛌', time: '7:05 AM', description: 'Sit up slowly. No sudden movements. Give your body time to wake up.' },
      { id: 3, title: 'Soft Clothing', emoji: '🧵', time: '7:15 AM', description: 'Wear clothes with no tags. Choose soft fabrics that feel good on your skin.' },
      { id: 4, title: 'Quiet Breakfast', emoji: '🥣', time: '7:30 AM', description: 'Eat in a calm space. Try foods with textures you like. It\'s okay to be picky.' },
      { id: 5, title: 'Noise-Canceling Time', emoji: '🎧', time: '8:00 AM', description: 'Put on headphones if sounds are too much. Listen to calming music or white noise.' },
      { id: 6, title: 'Deep Pressure', emoji: '🤗', time: '9:00 AM', description: 'Wrap in weighted blanket or get a firm hug. Pressure helps calm your nervous system.' },
      { id: 7, title: 'Dim Lighting Break', emoji: '💡', time: '10:00 AM', description: 'Turn off bright lights. Sit in soft lighting. Rest your eyes and mind.' },
      { id: 8, title: 'Texture Exploration', emoji: '🧸', time: '11:00 AM', description: 'Touch things you like: soft toys, smooth stones, squishy balls. Avoid things that feel bad.' },
      { id: 9, title: 'Calm Lunch Space', emoji: '🍽️', time: '12:00 PM', description: 'Eat away from noise. Try one food at a time. Chewing slowly is okay.' },
      { id: 10, title: 'Sensory Bin Play', emoji: '🌾', time: '1:00 PM', description: 'Play with rice, beans, or sand. Let it flow through your fingers. Calming and fun!' },
      { id: 11, title: 'Movement Break', emoji: '🦘', time: '2:00 PM', description: 'Jump on trampoline, swing, or rock back and forth. Movement helps regulate.' },
      { id: 12, title: 'Aromatherapy', emoji: '🌸', time: '3:00 PM', description: 'Smell calming scents like lavender. Or your favorite safe smell.' },
      { id: 13, title: 'Low-Stimulation Dinner', emoji: '🍲', time: '5:30 PM', description: 'Quiet dinner time. No TV or loud talking. Just peaceful eating.' },
      { id: 14, title: 'Warm Bath', emoji: '🛁', time: '7:00 PM', description: 'Water temperature just right. Use gentle soap. Bath time can be very calming.' },
      { id: 15, title: 'Weighted Blanket Sleep', emoji: '😴', time: '8:00 PM', description: 'Get under your weighted blanket. Feel the gentle pressure. Safe and cozy.' },
    ],
  },
  {
    id: 'communication-practice',
    name: 'Communication Practice',
    emoji: '🗣️',
    description: 'Activities for verbal and non-verbal communication',
    color: '#FF9F0A',
    tasks: [
      { id: 1, title: 'Morning Greeting', emoji: '👋', time: '7:30 AM', description: 'Try to say "good morning" or wave hello. Any greeting is perfect!' },
      { id: 2, title: 'Point to Wants', emoji: '☝️', time: '8:00 AM', description: 'Point to what you want for breakfast. Pointing is communicating!' },
      { id: 3, title: 'Yes/No Practice', emoji: '✓', time: '9:00 AM', description: 'Nod for yes, shake head for no. Or use thumbs up/down. Practice with simple questions.' },
      { id: 4, title: 'Picture Cards', emoji: '🖼️', time: '9:30 AM', description: 'Point to picture cards to show what you need: bathroom, water, help, break.' },
      { id: 5, title: 'Sound Making', emoji: '🎵', time: '10:00 AM', description: 'Make any sounds you can. "Mmm", "ahhh", humming. All sounds are communication!' },
      { id: 6, title: 'Eye Contact Try', emoji: '👀', time: '11:00 AM', description: 'Try looking at someone\'s face for 1 second. Even quick glances count!' },
      { id: 7, title: 'Sign Language', emoji: '🤟', time: '11:30 AM', description: 'Learn simple signs: "more", "help", "all done", "please". Signs help communicate!' },
      { id: 8, title: 'Request Snack', emoji: '🍪', time: '12:00 PM', description: 'Ask for snack however you can: word, sign, picture, or pointing. You did it!' },
      { id: 9, title: 'Imitate Sounds', emoji: '🦜', time: '1:00 PM', description: 'Listen to sounds and try to copy: animal sounds, simple words, or rhythms.' },
      { id: 10, title: 'Choose Activity', emoji: '🎯', time: '2:00 PM', description: 'Show what activity you want: point to toy, picture, or lead someone there.' },
      { id: 11, title: 'Tablet Communication', emoji: '📱', time: '2:30 PM', description: 'Use communication app on tablet. Touch pictures to make sentences.' },
      { id: 12, title: 'Express Feelings', emoji: '😊', time: '3:30 PM', description: 'Show how you feel: point to emotion faces, or show with your face/body.' },
      { id: 13, title: 'Say "Help"', emoji: '🆘', time: '4:30 PM', description: 'When something is hard, try to say or sign "help". Asking for help is important!' },
      { id: 14, title: 'Goodbye Wave', emoji: '👋', time: '8:00 PM', description: 'Wave goodnight to family. Or blow a kiss. Or just smile. All ways to say bye!' },
    ],
  },
  {
    id: 'transitions-changes',
    name: 'Managing Transitions',
    emoji: '🔄',
    description: 'Helping with changes and moving between activities',
    color: '#FF453A',
    tasks: [
      { id: 1, title: 'Morning Visual Schedule', emoji: '📅', time: '7:00 AM', description: 'Look at picture schedule for today. See what comes first, next, and later.' },
      { id: 2, title: '5-Minute Warning', emoji: '⏰', time: '7:55 AM', description: 'Timer says 5 minutes until breakfast ends. Get ready to switch activities.' },
      { id: 3, title: 'Transition Object', emoji: '🧸', time: '8:00 AM', description: 'Carry your favorite toy to next activity. This helps with moving.' },
      { id: 4, title: 'Count to 10 Transition', emoji: '🔢', time: '9:00 AM', description: 'Count to 10 before changing activity. 1...2...3... helps prepare brain.' },
      { id: 5, title: 'Check Schedule Again', emoji: '📋', time: '10:00 AM', description: 'Look at schedule. Cross off what you finished. See what comes next.' },
      { id: 6, title: 'Deep Breaths for Change', emoji: '🌬️', time: '11:00 AM', description: 'Time to change activity. Take 3 deep breaths first. You can do this!' },
      { id: 7, title: 'Finish & Cleanup', emoji: '🧹', time: '11:55 AM', description: 'Activity ending in 5 minutes. Start putting things away. Cleanup helps transition.' },
      { id: 8, title: 'Announce Next Activity', emoji: '📢', time: '12:00 PM', description: 'Say out loud what comes next: "Now it is lunch time." Saying it helps.' },
      { id: 9, title: 'Take Comfort Item', emoji: '🎀', time: '1:00 PM', description: 'If change feels hard, hold your comfort item. It travels with you!' },
      { id: 10, title: 'First-Then Card', emoji: '➡️', time: '2:00 PM', description: 'First do this task, THEN get reward. See the card showing both.' },
      { id: 11, title: 'Timer for End Time', emoji: '⏱️', time: '3:00 PM', description: 'Set timer for when activity ends. When it beeps, time to change.' },
      { id: 12, title: 'Transition Song', emoji: '🎶', time: '4:00 PM', description: 'Sing cleanup song or transition song. Music makes changes easier!' },
      { id: 13, title: 'What Comes Next?', emoji: '❓', time: '5:00 PM', description: 'Parent asks: "What comes next?" You find it on your schedule. You remembered!' },
      { id: 14, title: 'Bedtime Countdown', emoji: '🌙', time: '7:30 PM', description: '30 minutes until bed. Then 15 minutes. Then 5. Counting down helps prepare.' },
    ],
  },
  {
    id: 'social-skills',
    name: 'Social Skills Practice',
    emoji: '🤝',
    description: 'Learning to interact and play with others',
    color: '#BF5AF2',
    tasks: [
      { id: 1, title: 'Personal Space', emoji: '📏', time: '8:00 AM', description: 'Stand arm\'s length away from others. This is good personal space.' },
      { id: 2, title: 'Greet Someone', emoji: '👋', time: '8:30 AM', description: 'Say hi, wave, or smile at family member. Greeting is important!' },
      { id: 3, title: 'Take Turns Practice', emoji: '🔄', time: '9:00 AM', description: 'Play with toy for 2 minutes. Then give to someone else. Then get it back. Taking turns!' },
      { id: 4, title: 'Share a Toy', emoji: '🎁', time: '10:00 AM', description: 'Let someone else use your toy for a bit. Sharing is hard but you\'re trying!' },
      { id: 5, title: 'Watch Others Play', emoji: '👁️', time: '11:00 AM', description: 'Watch how others play. You can learn by watching. Joining later is okay!' },
      { id: 6, title: 'Parallel Play', emoji: '🧩', time: '11:30 AM', description: 'Play next to someone doing same thing. You don\'t have to talk yet. Just being near is social!' },
      { id: 7, title: 'Ask to Join', emoji: '🙋', time: '12:30 PM', description: 'Try asking "Can I play?" Point or use words. Asking is brave!' },
      { id: 8, title: 'Copy Actions', emoji: '🪞', time: '1:00 PM', description: 'Watch someone and copy what they do. Imitation is how we learn to play together!' },
      { id: 9, title: 'Say "Please"', emoji: '🙏', time: '2:00 PM', description: 'When you want something, try to say or sign "please". Polite words help!' },
      { id: 10, title: 'Listen for Name', emoji: '👂', time: '2:30 PM', description: 'When someone says your name, try to look or respond. They want your attention!' },
      { id: 11, title: 'High Five Practice', emoji: '✋', time: '3:00 PM', description: 'Give someone a high five! It\'s a fun way to connect. Gentle touch is social!' },
      { id: 12, title: 'Show and Tell', emoji: '🎨', time: '3:30 PM', description: 'Show someone something you made or like. Sharing interests connects people!' },
      { id: 13, title: 'Say "Thank You"', emoji: '💝', time: '4:00 PM', description: 'When someone gives you something, try saying "thank you" any way you can!' },
      { id: 14, title: 'Goodnight Routine', emoji: '🌟', time: '8:00 PM', description: 'Hug, wave, or say goodnight to each family member. Ending day socially!' },
    ],
  },
  {
    id: 'motor-skills',
    name: 'Motor Skills Practice',
    emoji: '✋',
    description: 'Fine and gross motor skill development',
    color: '#00C7BE',
    tasks: [
      { id: 1, title: 'Finger Stretches', emoji: '🖐️', time: '7:30 AM', description: 'Open and close hands 10 times. Stretch each finger. Wake up those muscles!' },
      { id: 2, title: 'Button Practice', emoji: '🔘', time: '8:00 AM', description: 'Try buttoning one button on shirt. Use both hands. It\'s okay if it takes time.' },
      { id: 3, title: 'Use Spoon/Fork', emoji: '🥄', time: '8:30 AM', description: 'Hold utensil with good grip. Scoop food carefully. Bring to mouth. You\'re doing great!' },
      { id: 4, title: 'Zipper Up and Down', emoji: '🤐', time: '9:00 AM', description: 'Practice zipping jacket. Pull zipper up slowly, then down. Hold fabric at bottom.' },
      { id: 5, title: 'Big Movement Time', emoji: '🤸', time: '9:30 AM', description: 'Jump! Hop! Skip! March! Move your whole body. Big muscles need practice too!' },
      { id: 6, title: 'Pegboard Activity', emoji: '📍', time: '10:30 AM', description: 'Put pegs in holes. Use pincer grasp (thumb and pointer). Take out and do again!' },
      { id: 7, title: 'Stacking Blocks', emoji: '🧱', time: '11:00 AM', description: 'Stack blocks as high as you can. Balance them carefully. Hand-eye coordination!' },
      { id: 8, title: 'Playdough Squeezing', emoji: '🎨', time: '12:00 PM', description: 'Squeeze, roll, and flatten playdough. Strengthens hand muscles!' },
      { id: 9, title: 'Cutting Practice', emoji: '✂️', time: '1:00 PM', description: 'Use safety scissors. Cut along lines on paper. Open, close, cut! Great job!' },
      { id: 10, title: 'Ball Catch', emoji: '⚽', time: '2:00 PM', description: 'Try catching soft ball. Watch it come to you. Hands ready! Catching takes practice!' },
      { id: 11, title: 'Coloring Practice', emoji: '🖍️', time: '3:00 PM', description: 'Hold crayon with good grip. Color inside lines or anywhere! Both help hand control!' },
      { id: 12, title: 'Shoelace Threading', emoji: '👟', time: '3:30 PM', description: 'Practice lacing shoes. Threading lace through holes. Tricky but good for fingers!' },
      { id: 13, title: 'Balance Exercise', emoji: '🧘', time: '4:00 PM', description: 'Stand on one foot for 5 seconds. Then other foot. Balance is important!' },
      { id: 14, title: 'Gentle Stretching', emoji: '🤸‍♀️', time: '7:00 PM', description: 'Stretch arms up high! Touch toes! Twist gently. End day with relaxed muscles.' },
    ],
  },
];

const DailySchedule = () => {
  const navigate = useNavigate();
  const [selectedPreset, setSelectedPreset] = useState<string>('getting-dressed');
  const [showPresetMenu, setShowPresetMenu] = useState(true);
  const [currentTaskIndex, setCurrentTaskIndex] = useState(0);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isCameraOn, setIsCameraOn] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  useEffect(() => {
    // Load tasks from selected preset
    const preset = PRESETS.find(p => p.id === selectedPreset);
    if (preset) {
      const tasksWithCompletion = preset.tasks.map(task => ({
        ...task,
        completed: false,
      }));
      setTasks(tasksWithCompletion);
      setCurrentTaskIndex(0);
    }
  }, [selectedPreset]);

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 320, height: 240 }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOn(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsCameraOn(false);
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const loadPreset = (presetId: string) => {
    setSelectedPreset(presetId);
    setShowPresetMenu(false);
  };

  const currentPreset = PRESETS.find(p => p.id === selectedPreset);

  const currentTask = tasks[currentTaskIndex];
  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercentage = (completedCount / tasks.length) * 100;

  const handleCompleteTask = () => {
    const newTasks = [...tasks];
    newTasks[currentTaskIndex].completed = true;
    setTasks(newTasks);

    // Save to backend
    const completedTask = newTasks[currentTaskIndex];
    saveActivityToBackend(completedTask);

    // Auto-advance to next incomplete task
    setTimeout(() => {
      const nextIncompleteIndex = newTasks.findIndex((t, i) => i > currentTaskIndex && !t.completed);
      if (nextIncompleteIndex !== -1) {
        setCurrentTaskIndex(nextIncompleteIndex);
      } else if (currentTaskIndex < tasks.length - 1) {
        setCurrentTaskIndex(currentTaskIndex + 1);
      }
    }, 500);
  };

  const saveActivityToBackend = async (task: Task) => {
    try {
      // Get child name from localStorage or context
      const childName = localStorage.getItem('selectedChild') || 'Child';
      
      await fetch('https://brainwaveapi.teamuxh.site/api/daily-schedule/activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          child_name: childName,
          preset_type: selectedPreset,
          task_id: task.id,
          task_title: task.title,
          task_emoji: task.emoji,
        }),
      });
    } catch (error) {
      console.error('Failed to save activity:', error);
    }
  };

  const handlePrevious = () => {
    if (currentTaskIndex > 0) {
      setCurrentTaskIndex(currentTaskIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentTaskIndex < tasks.length - 1) {
      setCurrentTaskIndex(currentTaskIndex + 1);
    }
  };

  useEffect(() => {
    // Announce current task for screen readers
    if (currentTask && tasks.length > 0) {
      const announcement = `Task ${currentTaskIndex + 1} of ${tasks.length}: ${currentTask.title}`;
      const ariaLive = document.getElementById('task-announcement');
      if (ariaLive) {
        ariaLive.textContent = announcement;
      }
    }
  }, [currentTaskIndex, currentTask, tasks.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1C1C1E] via-[#000000] to-[#1C1C1E] relative overflow-hidden">
      {/* Screen Reader Announcement */}
      <div id="task-announcement" className="sr-only" role="status" aria-live="polite" aria-atomic="true"></div>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A84FF]/5 to-[#30D158]/5" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0A84FF]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#30D158]/10 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 p-6 border-b border-[#3A3A3C] backdrop-blur-sm bg-[#2C2C2E]/80">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate('/child-interface')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C2C2E] border border-[#3A3A3C] text-white hover:bg-[#3A3A3C] transition-all duration-300"
            aria-label="Go back to child interface"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back</span>
          </button>

          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-[#0A84FF]" />
            <div>
              <h1 className="text-lg font-bold text-white">Daily Schedule</h1>
              <p className="text-xs text-[#8E8E93]">{currentPreset?.name || 'Custom'}</p>
            </div>
          </div>

          <button
            onClick={() => setShowPresetMenu(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2C2C2E] border border-[#3A3A3C] text-white hover:bg-[#3A3A3C] transition-all duration-300"
            aria-label="Change schedule preset"
          >
            <ListChecks className="w-5 h-5" />
            <span className="text-sm font-medium">Change</span>
          </button>
        </div>
      </header>

      {/* Preset Selection Modal */}
      {showPresetMenu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#2C2C2E] rounded-3xl border-2 border-[#3A3A3C] max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-[#2C2C2E] border-b border-[#3A3A3C] p-6 z-10">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Choose Your Schedule</h2>
                  <p className="text-sm text-[#8E8E93]">Pick a schedule that helps you today</p>
                </div>
                {tasks.length > 0 && (
                  <button
                    onClick={() => setShowPresetMenu(false)}
                    className="px-4 py-2 rounded-xl bg-[#3A3A3C] text-white hover:bg-[#48484A] transition-all"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>

            <div className="p-6 grid md:grid-cols-2 gap-4">
              {PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => loadPreset(preset.id)}
                  className="group relative p-6 rounded-2xl bg-[#1C1C1E] border-2 border-[#3A3A3C] hover:border-[#0A84FF] transition-all duration-300 text-left hover:scale-105"
                  style={{
                    borderColor: selectedPreset === preset.id ? preset.color : undefined,
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl flex-shrink-0"
                      style={{ backgroundColor: `${preset.color}20` }}
                    >
                      {preset.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-1">{preset.name}</h3>
                      <p className="text-sm text-[#8E8E93] mb-2">{preset.description}</p>
                      <div className="flex items-center gap-2 text-xs text-[#8E8E93]">
                        <Clock className="w-3 h-3" />
                        <span>{preset.tasks.length} tasks</span>
                      </div>
                    </div>
                  </div>
                  {selectedPreset === preset.id && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle className="w-6 h-6" style={{ color: preset.color }} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Progress Bar */}
      <div className="relative z-10 px-6 pt-4">
        <div className="max-w-4xl mx-auto">
          <div className="h-3 bg-[#2C2C2E] rounded-full overflow-hidden border border-[#3A3A3C]">
            <div
              className="h-full bg-gradient-to-r from-[#0A84FF] to-[#30D158] transition-all duration-500 rounded-full"
              style={{ width: `${progressPercentage}%` }}
              role="progressbar"
              aria-valuenow={completedCount}
              aria-valuemin={0}
              aria-valuemax={tasks.length}
              aria-label={`Completed ${completedCount} out of ${tasks.length} tasks`}
            />
          </div>
          <div className="flex justify-between mt-2 px-1">
            <span className="text-xs text-[#8E8E93]">Start</span>
            <span className="text-xs text-[#8E8E93]">{Math.round(progressPercentage)}% Complete</span>
            <span className="text-xs text-[#8E8E93]">End</span>
          </div>
        </div>
      </div>

      {/* Main Task Card */}
      <main className="relative z-10 container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {tasks.length > 0 && currentTask ? (
            <>
          {/* Task Counter */}
          <div className="text-center mb-6">
            <span className="inline-block px-4 py-2 rounded-full bg-[#2C2C2E] border border-[#3A3A3C] text-[#8E8E93] text-sm font-medium">
              Task {currentTaskIndex + 1} of {tasks.length}
            </span>
          </div>

          {/* Current Task Card */}
          <div 
            className="relative p-8 md:p-12 rounded-3xl bg-[#2C2C2E]/80 backdrop-blur-sm border-2 border-[#3A3A3C] shadow-2xl transition-all duration-500"
            role="article"
            aria-label={`Current task: ${currentTask.title}`}
          >
            {/* Camera Section - Top Right */}
            <div className="absolute top-6 right-6 z-30 flex flex-col items-end gap-3">
              {/* Camera Toggle Button */}
              <button
                onClick={isCameraOn ? stopCamera : startCamera}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border transition-all duration-300 shadow-lg ${
                  isCameraOn
                    ? 'bg-red-500/30 border-red-500/60 hover:bg-red-500/40'
                    : 'bg-[#0A84FF]/30 border-[#0A84FF]/60 hover:bg-[#0A84FF]/40'
                }`}
                aria-label={isCameraOn ? 'Stop camera' : 'Start camera'}
              >
                {isCameraOn ? (
                  <>
                    <CameraOff className="w-5 h-5 text-red-300" />
                    <span className="text-sm font-medium text-red-300">Stop Camera</span>
                  </>
                ) : (
                  <>
                    <Camera className="w-5 h-5 text-[#0A84FF]" />
                    <span className="text-sm font-medium text-[#0A84FF]">Track Me</span>
                  </>
                )}
              </button>

              {/* Camera Preview */}
              {isCameraOn && (
                <div className="relative rounded-xl overflow-hidden border-2 border-[#0A84FF] shadow-2xl bg-black animate-in slide-in-from-top duration-300">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-64 h-48 object-cover block"
                    style={{ transform: 'scaleX(-1)' }}
                    aria-label="Camera preview showing child"
                  />
                  <div className="absolute bottom-2 right-2 px-2 py-1 bg-red-500 rounded-full flex items-center gap-1.5 shadow-lg">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    <span className="text-xs font-bold text-white">REC</span>
                  </div>
                  <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                    <span className="text-xs font-medium text-white">Tracking Child</span>
                  </div>
                </div>
              )}
            </div>

            {/* Task Status Badge */}
            {currentTask.completed && (
              <div className="absolute top-6 left-6 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#30D158]/20 border border-[#30D158]/40 shadow-lg">
                <CheckCircle className="w-4 h-4 text-[#30D158]" />
                <span className="text-xs font-medium text-[#30D158]">Completed</span>
              </div>
            )}

            {/* Emoji Icon */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-[#0A84FF]/20 to-[#30D158]/20 border-4 border-[#3A3A3C] mb-4">
                <span className="text-7xl" role="img" aria-label={currentTask.title}>
                  {currentTask.emoji}
                </span>
              </div>
            </div>

            {/* Task Time */}
            <div className="text-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0A84FF]/10 border border-[#0A84FF]/30">
                <Clock className="w-4 h-4 text-[#0A84FF]" />
                <span className="text-sm font-medium text-[#0A84FF]">{currentTask.time}</span>
              </div>
            </div>

            {/* Task Title */}
            <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
              {currentTask.title}
            </h2>

            {/* Task Description */}
            <p className="text-xl text-[#8E8E93] text-center mb-8 max-w-2xl mx-auto">
              {currentTask.description}
            </p>

            {/* Complete Button */}
            {!currentTask.completed && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={handleCompleteTask}
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-[#30D158] to-[#00C7BE] text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#30D158]/30"
                  aria-label={`Mark ${currentTask.title} as complete`}
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    <span>I Did It! ✨</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentTaskIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentTaskIndex === 0
                  ? 'bg-[#2C2C2E]/50 border border-[#3A3A3C]/50 text-[#8E8E93] cursor-not-allowed'
                  : 'bg-[#2C2C2E] border border-[#3A3A3C] text-white hover:bg-[#3A3A3C] hover:scale-105'
              }`}
              aria-label="Go to previous task"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            <button
              onClick={handleNext}
              disabled={currentTaskIndex === tasks.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                currentTaskIndex === tasks.length - 1
                  ? 'bg-[#2C2C2E]/50 border border-[#3A3A3C]/50 text-[#8E8E93] cursor-not-allowed'
                  : 'bg-[#2C2C2E] border border-[#3A3A3C] text-white hover:bg-[#3A3A3C] hover:scale-105'
              }`}
              aria-label="Go to next task"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Task List Preview */}
          <div className="mt-12 p-6 rounded-2xl bg-[#2C2C2E]/50 backdrop-blur-sm border border-[#3A3A3C]">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span>All Tasks</span>
              <span className="text-sm text-[#8E8E93] font-normal">
                (Tap to jump)
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 max-h-[300px] overflow-y-auto">
              {tasks.map((task, index) => (
                <button
                  key={task.id}
                  onClick={() => setCurrentTaskIndex(index)}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                    index === currentTaskIndex
                      ? 'bg-[#0A84FF]/20 border-2 border-[#0A84FF]'
                      : task.completed
                      ? 'bg-[#30D158]/10 border border-[#30D158]/30'
                      : 'bg-[#2C2C2E] border border-[#3A3A3C] hover:bg-[#3A3A3C]'
                  }`}
                  aria-label={`${task.title}, ${task.completed ? 'completed' : 'not completed'}`}
                  aria-current={index === currentTaskIndex ? 'true' : 'false'}
                >
                  <span className="text-2xl" role="img" aria-hidden="true">
                    {task.emoji}
                  </span>
                  <div className="flex-1 text-left">
                    <div className="text-xs font-medium text-white truncate">
                      {task.title}
                    </div>
                    <div className="text-xs text-[#8E8E93]">{task.time}</div>
                  </div>
                  {task.completed ? (
                    <CheckCircle className="w-4 h-4 text-[#30D158] flex-shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-[#8E8E93] flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Completion Message */}
          {completedCount === tasks.length && (
            <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-[#30D158]/20 to-[#00C7BE]/20 border-2 border-[#30D158]/40 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-3xl font-bold text-white mb-2">
                Amazing Work!
              </h3>
              <p className="text-lg text-[#8E8E93]">
                You completed all your tasks for today! Great job!
              </p>
            </div>
          )}
            </>
          ) : null}
        </div>
      </main>
    </div>
  );
};

export default DailySchedule;
