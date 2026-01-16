import { useState } from 'react';
import { Check, Circle, ChevronRight, ChevronLeft, ClipboardList, Package, Play, FileText, Loader2 } from 'lucide-react';

interface MaterialItem {
  id: string;
  name: string;
  description: string;
  checked: boolean;
}

interface TestSubsection {
  id: string;
  name: string;
  description: string;
  timeInSeconds: number;
  completed: boolean;
}

const JebsenTest = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [materials, setMaterials] = useState<MaterialItem[]>([
    { id: '1', name: 'Paper and Pen', description: 'For writing test', checked: false },
    { id: '2', name: 'Playing Cards (5 cards)', description: 'For card turning test', checked: false },
    { id: '3', name: 'Small Objects', description: 'Paper clips, bottle caps, coins (7 items)', checked: false },
    { id: '4', name: 'Spoon and Bowl', description: 'For simulated feeding test', checked: false },
    { id: '5', name: 'Beans/Kidney Beans', description: '15 beans for feeding test', checked: false },
    { id: '6', name: 'Checkers (15 pieces)', description: 'For stacking test', checked: false },
    { id: '7', name: 'Empty Cans (5 cans)', description: 'For large light objects test', checked: false },
    { id: '8', name: 'Weighted Cans (5 cans)', description: '1-pound cans for heavy objects test', checked: false },
    { id: '9', name: 'Stopwatch/Timer', description: 'For timing each test', checked: false },
    { id: '10', name: 'Table and Chair', description: 'Comfortable seating arrangement', checked: false },
  ]);

  const [testSections, setTestSections] = useState<TestSubsection[]>([
    { id: '1', name: 'Writing Test', description: 'Write a standardized 24-letter sentence', timeInSeconds: 0, completed: false },
    { id: '2', name: 'Card Turning', description: 'Turn over 5 playing cards', timeInSeconds: 0, completed: false },
    { id: '3', name: 'Small Common Objects', description: 'Pick up and relocate 7 small items', timeInSeconds: 0, completed: false },
    { id: '4', name: 'Simulated Feeding', description: 'Spoon 15 beans from bowl', timeInSeconds: 0, completed: false },
    { id: '5', name: 'Stacking Checkers', description: 'Stack 15 checkers', timeInSeconds: 0, completed: false },
    { id: '6', name: 'Large Light Objects', description: 'Move 5 empty cans', timeInSeconds: 0, completed: false },
    { id: '7', name: 'Large Heavy Objects', description: 'Move 5 weighted cans', timeInSeconds: 0, completed: false },
  ]);

  const [childInfo, setChildInfo] = useState({
    name: '',
    age: '',
    dominantHand: 'right',
    previousAssessments: '',
    specificConcerns: '',
  });

  const [observations, setObservations] = useState({
    motorSkills: '',
    concentration: '',
    frustrationLevel: '',
    cooperationLevel: '',
    additionalNotes: '',
  });

  const steps = [
    { id: 0, title: 'Child Information', icon: FileText },
    { id: 1, title: 'Material Preparation', icon: Package },
    { id: 2, title: 'Test Execution', icon: Play },
    { id: 3, title: 'Observations', icon: ClipboardList },
    { id: 4, title: 'Results Summary', icon: Check },
  ];

  const toggleMaterial = (id: string) => {
    setMaterials(materials.map(m => 
      m.id === id ? { ...m, checked: !m.checked } : m
    ));
  };

  const updateTestTime = (id: string, time: number) => {
    setTestSections(testSections.map(t => 
      t.id === id ? { ...t, timeInSeconds: time, completed: time > 0 } : t
    ));
  };

  const allMaterialsChecked = materials.every(m => m.checked);
  const allTestsCompleted = testSections.every(t => t.completed);

  const canProceed = () => {
    switch(currentStep) {
      case 0: return childInfo.name && childInfo.age;
      case 1: return allMaterialsChecked;
      case 2: return allTestsCompleted;
      case 3: return observations.motorSkills && observations.concentration;
      default: return true;
    }
  };

  const saveAssessment = async () => {
    setIsSaving(true);
    setSaveStatus('idle');

    const assessmentData = {
      childInfo: {
        name: childInfo.name,
        age: parseInt(childInfo.age),
        dominantHand: childInfo.dominantHand,
        previousAssessments: childInfo.previousAssessments,
        specificConcerns: childInfo.specificConcerns,
      },
      testResults: testSections.map(test => ({
        testId: test.id,
        testName: test.name,
        description: test.description,
        timeInSeconds: test.timeInSeconds,
        completed: test.completed,
      })),
      totalTime: testSections.reduce((sum, t) => sum + t.timeInSeconds, 0),
      observations: {
        motorSkills: observations.motorSkills,
        concentration: observations.concentration,
        frustrationLevel: observations.frustrationLevel,
        cooperationLevel: observations.cooperationLevel,
        additionalNotes: observations.additionalNotes,
      },
      assessmentDate: new Date().toISOString(),
      assessmentType: 'Jebsen Hand Test',
    };

    try {
      const response = await fetch('https://brainwaveapi.teamuxh.site/api/assessments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(assessmentData),
      });

      if (!response.ok) {
        throw new Error('Failed to save assessment');
      }

      const result = await response.json();
      console.log('Assessment saved:', result);
      setSaveStatus('success');
      
      // Reset form after successful save
      setTimeout(() => {
        setCurrentStep(0);
        setChildInfo({
          name: '',
          age: '',
          dominantHand: 'right',
          previousAssessments: '',
          specificConcerns: '',
        });
        setTestSections(testSections.map(t => ({ ...t, timeInSeconds: 0, completed: false })));
        setObservations({
          motorSkills: '',
          concentration: '',
          frustrationLevel: '',
          cooperationLevel: '',
          additionalNotes: '',
        });
        setMaterials(materials.map(m => ({ ...m, checked: false })));
        setSaveStatus('idle');
      }, 2000);
    } catch (error) {
      console.error('Error saving assessment:', error);
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                    isCompleted ? 'bg-[#30D158] text-white' :
                    isActive ? 'bg-[#0A84FF] text-white' :
                    'bg-[#2C2C2E] text-[#8E8E93]'
                  }`}>
                    {isCompleted ? <Check className="w-6 h-6" /> : <StepIcon className="w-6 h-6" />}
                  </div>
                  <span className={`text-xs mt-2 text-center ${
                    isActive ? 'text-white font-medium' : 'text-[#8E8E93]'
                  }`}>
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 flex-1 mx-2 ${
                    isCompleted ? 'bg-[#30D158]' : 'bg-[#2C2C2E]'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-[#1C1C1E] rounded-2xl p-8 border border-[#38383A]">
        {/* Step 0: Child Information */}
        {currentStep === 0 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Child Information</h2>
              <p className="text-[#8E8E93]">Please provide basic information about the child being assessed</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Child's Name *</label>
                <input
                  type="text"
                  value={childInfo.name}
                  onChange={(e) => setChildInfo({ ...childInfo, name: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF]"
                  placeholder="Enter child's name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-white mb-2">Age *</label>
                  <input
                    type="number"
                    value={childInfo.age}
                    onChange={(e) => setChildInfo({ ...childInfo, age: e.target.value })}
                    className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF]"
                    placeholder="Age in years"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Dominant Hand</label>
                  <select
                    value={childInfo.dominantHand}
                    onChange={(e) => setChildInfo({ ...childInfo, dominantHand: e.target.value })}
                    className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white focus:outline-none focus:border-[#0A84FF]"
                  >
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                    <option value="both">Both/Ambidextrous</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Previous Assessments (if any)</label>
                <textarea
                  value={childInfo.previousAssessments}
                  onChange={(e) => setChildInfo({ ...childInfo, previousAssessments: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-24"
                  placeholder="Describe any previous occupational therapy assessments or diagnoses"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Specific Concerns</label>
                <textarea
                  value={childInfo.specificConcerns}
                  onChange={(e) => setChildInfo({ ...childInfo, specificConcerns: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-24"
                  placeholder="Describe specific motor skill concerns or challenges you've observed"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 1: Material Preparation */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Material Preparation</h2>
              <p className="text-[#8E8E93]">Check off each item as you gather it. All materials must be ready before starting the test.</p>
            </div>

            <div className="space-y-3">
              {materials.map((material) => (
                <div
                  key={material.id}
                  onClick={() => toggleMaterial(material.id)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all ${
                    material.checked
                      ? 'bg-[#30D158]/10 border-[#30D158]'
                      : 'bg-[#2C2C2E] border-[#38383A] hover:border-[#48484A]'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      material.checked ? 'bg-[#30D158]' : 'border-2 border-[#48484A]'
                    }`}>
                      {material.checked && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{material.name}</h3>
                      <p className="text-sm text-[#8E8E93] mt-1">{material.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allMaterialsChecked && (
              <div className="bg-[#30D158]/10 border border-[#30D158] rounded-lg p-4">
                <p className="text-[#30D158] font-medium">All materials are ready! You can proceed to the test execution.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Test Execution */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Test Execution</h2>
              <p className="text-[#8E8E93]">Complete each test in order. Record the time in seconds for each activity.</p>
            </div>

            <div className="space-y-3">
              {testSections.map((test, index) => (
                <div
                  key={test.id}
                  className={`rounded-lg border transition-all ${
                    test.completed
                      ? 'bg-[#30D158]/10 border-[#30D158]'
                      : 'bg-[#2C2C2E] border-[#38383A]'
                  }`}
                >
                  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-5">
                    {/* Number Circle */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                      test.completed ? 'bg-[#30D158] text-white' : 'bg-[#000000] text-[#8E8E93] border-2 border-[#48484A]'
                    }`}>
                      {test.completed ? <Check className="w-5 h-5" /> : index + 1}
                    </div>
                    
                    {/* Test Info */}
                    <div className="min-w-0">
                      <h3 className="font-semibold text-white text-base leading-tight">{test.name}</h3>
                      <p className="text-sm text-[#8E8E93] mt-1 leading-snug">{test.description}</p>
                    </div>
                    
                    {/* Time Input */}
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <input
                        type="number"
                        value={test.timeInSeconds || ''}
                        onChange={(e) => updateTestTime(test.id, parseFloat(e.target.value) || 0)}
                        className="w-28 px-4 py-2.5 bg-[#000000] border border-[#38383A] rounded-lg text-white text-center font-mono text-base focus:outline-none focus:ring-2 focus:ring-[#0A84FF] focus:border-transparent"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                      />
                      <span className="text-[#8E8E93] text-sm font-medium w-8">sec</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {allTestsCompleted && (
              <div className="bg-[#30D158]/10 border border-[#30D158] rounded-lg p-4">
                <p className="text-[#30D158] font-medium">All tests completed! Proceed to record your observations.</p>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Observations */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Clinical Observations</h2>
              <p className="text-[#8E8E93]">Record your observations during the test administration</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">Motor Skills Observations *</label>
                <textarea
                  value={observations.motorSkills}
                  onChange={(e) => setObservations({ ...observations, motorSkills: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-24"
                  placeholder="Describe coordination, grip strength, hand-eye coordination, precision..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Concentration Level *</label>
                <textarea
                  value={observations.concentration}
                  onChange={(e) => setObservations({ ...observations, concentration: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-20"
                  placeholder="Ability to focus, attention span during tests..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Frustration/Stress Level</label>
                <textarea
                  value={observations.frustrationLevel}
                  onChange={(e) => setObservations({ ...observations, frustrationLevel: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-20"
                  placeholder="Signs of frustration, anxiety, or emotional responses..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Cooperation Level</label>
                <textarea
                  value={observations.cooperationLevel}
                  onChange={(e) => setObservations({ ...observations, cooperationLevel: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-20"
                  placeholder="Willingness to participate, following instructions..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white mb-2">Additional Notes</label>
                <textarea
                  value={observations.additionalNotes}
                  onChange={(e) => setObservations({ ...observations, additionalNotes: e.target.value })}
                  className="w-full px-4 py-3 bg-[#2C2C2E] border border-[#38383A] rounded-lg text-white placeholder-[#8E8E93] focus:outline-none focus:border-[#0A84FF] h-24"
                  placeholder="Any other relevant observations or behavioral notes..."
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Results Summary */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">Assessment Summary</h2>
              <p className="text-[#8E8E93]">Review the complete assessment results</p>
            </div>

            {/* Child Info Summary */}
            <div className="bg-[#2C2C2E] rounded-lg p-5 border border-[#38383A]">
              <h3 className="font-semibold text-white mb-3">Child Information</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#8E8E93]">Name:</span>
                  <span className="text-white font-medium">{childInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8E93]">Age:</span>
                  <span className="text-white font-medium">{childInfo.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E8E93]">Dominant Hand:</span>
                  <span className="text-white font-medium capitalize">{childInfo.dominantHand}</span>
                </div>
              </div>
            </div>

            {/* Test Results */}
            <div className="bg-[#2C2C2E] rounded-lg p-5 border border-[#38383A]">
              <h3 className="font-semibold text-white mb-3">Test Results (Time in Seconds)</h3>
              <div className="space-y-3">
                {testSections.map((test) => (
                  <div key={test.id} className="flex justify-between items-center">
                    <span className="text-[#8E8E93] text-sm">{test.name}</span>
                    <span className="text-white font-mono font-semibold">{test.timeInSeconds.toFixed(2)}s</span>
                  </div>
                ))}
                <div className="pt-3 border-t border-[#38383A] flex justify-between items-center">
                  <span className="text-white font-semibold">Total Time:</span>
                  <span className="text-[#0A84FF] font-mono font-bold text-lg">
                    {testSections.reduce((sum, t) => sum + t.timeInSeconds, 0).toFixed(2)}s
                  </span>
                </div>
              </div>
            </div>

            {/* Observations Summary */}
            <div className="bg-[#2C2C2E] rounded-lg p-5 border border-[#38383A]">
              <h3 className="font-semibold text-white mb-3">Clinical Observations</h3>
              <div className="space-y-3 text-sm">
                {observations.motorSkills && (
                  <div>
                    <span className="text-[#8E8E93] font-medium">Motor Skills:</span>
                    <p className="text-white mt-1">{observations.motorSkills}</p>
                  </div>
                )}
                {observations.concentration && (
                  <div>
                    <span className="text-[#8E8E93] font-medium">Concentration:</span>
                    <p className="text-white mt-1">{observations.concentration}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-[#0A84FF]/10 border border-[#0A84FF] rounded-lg p-4">
              <p className="text-[#0A84FF] text-sm">
                This assessment has been completed. Please consult with an occupational therapist for professional interpretation of these results.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#2C2C2E] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#3A3A3C] transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed()}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#0A84FF] text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0A84FF]/90 transition-all"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        ) : (
          <button
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#30D158] text-white hover:bg-[#30D158]/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={saveAssessment}
            disabled={isSaving || saveStatus === 'success'}
          >
            {isSaving ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Saving...
              </>
            ) : saveStatus === 'success' ? (
              <>
                <Check className="w-5 h-5" />
                Saved Successfully!
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Save Assessment
              </>
            )}
          </button>
        )}
      </div>

      {/* Loading Bar */}
      {isSaving && (
        <div className="mt-6">
          <div className="bg-[#2C2C2E] rounded-full h-2 overflow-hidden">
            <div className="h-full bg-[#0A84FF] animate-pulse rounded-full" style={{ width: '100%' }} />
          </div>
          <p className="text-center text-[#8E8E93] text-sm mt-2">Saving assessment...</p>
        </div>
      )}

      {/* Success Message */}
      {saveStatus === 'success' && !isSaving && (
        <div className="mt-6 bg-[#30D158]/10 border border-[#30D158] rounded-lg p-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="bg-[#30D158] rounded-full p-2">
              <Check className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-[#30D158] font-semibold">Assessment Saved Successfully!</p>
              <p className="text-[#8E8E93] text-sm mt-1">Your assessment has been securely saved. Resetting form...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Message */}
      {saveStatus === 'error' && !isSaving && (
        <div className="mt-6 bg-[#FF453A]/10 border border-[#FF453A] rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="bg-[#FF453A] rounded-full p-2 w-9 h-9 flex items-center justify-center">
              <span className="text-white font-bold text-lg">!</span>
            </div>
            <div>
              <p className="text-[#FF453A] font-semibold">Failed to Save Assessment</p>
              <p className="text-[#8E8E93] text-sm mt-1">Please check your connection and try again.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JebsenTest;
