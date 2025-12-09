import { useState, useEffect } from 'react';
import { ChevronLeft, Mic, Square, Volume2, FileText, Code, Pause, X } from 'lucide-react';

interface VisitLiveScreenProps {
  onBack: () => void;
}

export function VisitLiveScreen({ onBack }: VisitLiveScreenProps) {
  const [isRecording, setIsRecording] = useState(true);
  const [isPaused, setIsPaused] = useState(false);
  const [recordingTime, setRecordingTime] = useState(186); // 3:06 elapsed
  const [transcriptLines, setTranscriptLines] = useState([
    { time: '00:00', speaker: 'Dr. Lee', text: 'Good afternoon Mrs. Garcia, how are you feeling today?' },
    { time: '00:04', speaker: 'Maria Garcia', text: "I've been better, doctor. My right eye has been bothering me quite a bit." },
    { time: '00:11', speaker: 'Dr. Lee', text: 'I see that in your chart. Can you tell me more about what you\'re experiencing?' },
    { time: '00:17', speaker: 'Maria Garcia', text: "Well, everything in the center of my vision is blurry. And I'm seeing these wavy lines when I try to read." },
    { time: '00:27', speaker: 'Dr. Lee', text: 'When did you first notice these symptoms?' },
    { time: '00:30', speaker: 'Maria Garcia', text: 'About two weeks ago. It started mild but has gotten progressively worse.' },
    { time: '00:38', speaker: 'Dr. Lee', text: 'Any pain, redness, or sensitivity to light?' },
    { time: '00:42', speaker: 'Maria Garcia', text: "No, just the vision changes. It's making it really hard to do my crossword puzzles." },
    { time: '00:49', speaker: 'Dr. Lee', text: "I understand. Let me take a look at your eyes. I'm going to use the ophthalmoscope first." },
    { time: '01:15', speaker: 'Dr. Lee', text: "Okay, I can see some changes in your right eye. There's fluid accumulation in the macula, and I'm seeing signs of neovascularization." },
    { time: '01:27', speaker: 'Maria Garcia', text: 'What does that mean?' },
    { time: '01:30', speaker: 'Dr. Lee', text: 'It means you have what we call wet age-related macular degeneration, or wet AMD. New blood vessels are growing under the retina and leaking fluid.' },
    { time: '01:42', speaker: 'Maria Garcia', text: 'Is that serious?' },
    { time: '01:44', speaker: 'Dr. Lee', text: "It's something we need to treat, but we have good options. Let me check your visual acuity more thoroughly." },
    { time: '02:15', speaker: 'Dr. Lee', text: "Your right eye is testing at 20/80, which is reduced from your last visit. Your left eye is still 20/30." },
    { time: '02:26', speaker: 'Dr. Lee', text: "I'd like to do some imaging to confirm the diagnosis and see the extent of the fluid. We'll do an OCT scan." },
    { time: '02:38', speaker: 'Maria Garcia', text: 'Okay, and then what happens?' },
    { time: '02:41', speaker: 'Dr. Lee', text: 'If the imaging confirms wet AMD with choroidal neovascularization, we\'ll likely start you on anti-VEGF injections. They\'re very effective at stopping the' },
  ]);

  // Simulate new transcript lines appearing
  useEffect(() => {
    if (!isRecording || isPaused) return;

    const timer = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isRecording, isPaused]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStopRecording = () => {
    setIsRecording(false);
  };

  const handlePauseRecording = () => {
    setIsPaused(!isPaused);
  };

  return (
    <div className="h-full flex flex-col bg-[#f5f5f7]">
      <div className="flex-1 overflow-auto">
        <div className="max-w-[1600px] mx-auto px-8 py-8">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[13px] text-[#6a7282] hover:text-[#101828] transition-colors mb-4"
          >
            <ChevronLeft className="size-4" />
            Back to Visits
          </button>

          {/* Patient header */}
          <div className="mb-6">
            <div className="flex items-center justify-between">
              {/* Left: Patient info */}
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-[20px] font-semibold text-[#101828] tracking-[-0.02em]">
                    Maria Garcia
                  </h1>
                  <span className="text-[14px] text-[#6a7282]">68F</span>
                  <span className="text-[14px] text-[#6a7282]">•</span>
                  <span className="text-[14px] text-[#4a5565]">Dr. Lee</span>
                  <span className="text-[14px] text-[#6a7282]">•</span>
                  <span className="text-[14px] text-[#4a5565]">Today, 2:30 PM</span>
                  <span className="text-[14px] text-[#6a7282]">•</span>
                  <span className="text-[14px] text-[#4a5565]">Medicare</span>
                </div>
                <p className="text-[13px] text-[#6a7282]">Follow-up visit • Vision changes</p>
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            
            {/* Left side: Transcript (60% width) */}
            <div className="flex-1 space-y-6">
              
              {/* Live transcript card */}
              <div className="bg-white border border-gray-200 rounded-lg">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Volume2 className="size-5 text-[#6a7282]" />
                      <h3 className="text-[14px] font-semibold text-[#101828]">
                        Live transcript
                      </h3>
                    </div>
                    <span className="text-[12px] text-[#6a7282]">{transcriptLines.length} segments</span>
                  </div>
                  
                  {/* Recording controls */}
                  {isRecording && (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center">
                          <div className="absolute size-3 bg-red-500 rounded-full animate-ping opacity-75" />
                          <div className="relative size-2 bg-red-600 rounded-full" />
                        </div>
                        <span className="text-[13px] font-medium text-red-900">Recording</span>
                        <span className="text-[13px] font-mono text-red-700">{formatTime(recordingTime)}</span>
                        {isPaused && (
                          <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded text-[11px] font-medium ml-2">
                            Paused
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handlePauseRecording}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-[#101828] rounded-lg text-[12px] font-medium hover:bg-gray-50 transition-colors"
                        >
                          <Pause className="size-3.5" />
                          {isPaused ? 'Resume' : 'Pause'}
                        </button>
                        <button
                          onClick={onBack}
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-[#101828] rounded-lg text-[12px] font-medium hover:bg-gray-50 transition-colors"
                        >
                          <X className="size-3.5" />
                          Cancel
                        </button>
                        <button
                          onClick={handleStopRecording}
                          className="flex items-center gap-1.5 px-4 py-1.5 bg-[#101828] text-white rounded-lg text-[12px] font-medium hover:bg-[#1f2937] transition-colors"
                        >
                          <Square className="size-3.5" />
                          Stop recording
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="px-6 py-4">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {transcriptLines.map((line, idx) => (
                      <div key={idx} className="flex gap-3">
                        <div className="flex-shrink-0 w-12 text-[11px] font-mono text-[#99A1AF] pt-0.5">
                          {line.time}
                        </div>
                        <div className="flex-1">
                          <div className="text-[11px] font-medium text-[#6a7282] uppercase tracking-wider mb-1">
                            {line.speaker}
                          </div>
                          <div className="text-[13px] text-[#101828] leading-relaxed">
                            {line.text}
                            {idx === transcriptLines.length - 1 && isRecording && (
                              <span className="inline-block ml-1 w-1 h-4 bg-blue-600 animate-pulse" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {!isRecording && (
                  <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-[12px] text-[#6a7282]">
                        Recording complete. Processing transcript for note generation...
                      </p>
                      <button className="px-4 py-2 bg-[#101828] text-white rounded-lg text-[12px] font-medium hover:bg-[#1f2937] transition-colors">
                        Generate note
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Manual notes */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-[14px] font-semibold text-[#101828] mb-4">
                  Manual notes
                </h3>
                <div>
                  <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                    Add notes during the visit
                  </label>
                  <textarea
                    placeholder="Type any additional notes here..."
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    rows={6}
                  />
                  <p className="text-[11px] text-[#6a7282] mt-2">
                    These notes will be available when reviewing the visit.
                  </p>
                </div>
              </div>
            </div>

            {/* Right side: Empty states for note summary and codes (40% width) */}
            <div className="w-[480px] space-y-6">
              
              {/* Info card about the process */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5">
                <h4 className="text-[13px] font-semibold text-blue-900 mb-3">
                  How it works
                </h4>
                <div className="space-y-2 text-[12px] text-blue-800">
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 size-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-semibold text-[10px]">1</span>
                    <p>Record your patient conversation naturally</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 size-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-semibold text-[10px]">2</span>
                    <p>Stop recording when the visit is complete</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 size-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-semibold text-[10px]">3</span>
                    <p>AI generates the clinical note and suggests codes</p>
                  </div>
                  <div className="flex gap-2">
                    <span className="flex-shrink-0 size-5 rounded-full bg-blue-200 text-blue-900 flex items-center justify-center font-semibold text-[10px]">4</span>
                    <p>Review, edit, and approve before sending to EHR</p>
                  </div>
                </div>
              </div>
              
              {/* Note summary - Manual entry */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="size-5 text-[#6a7282]" />
                  <h3 className="text-[14px] font-semibold text-[#101828]">
                    Clinical note summary
                  </h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                      Chief Complaint
                    </label>
                    <textarea
                      placeholder="Enter chief complaint..."
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                      HPI
                    </label>
                    <textarea
                      placeholder="Enter history of present illness..."
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                      Exam Findings
                    </label>
                    <textarea
                      placeholder="Enter physical exam findings..."
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                      Assessment & Plan
                    </label>
                    <textarea
                      placeholder="Enter assessment and plan..."
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={3}
                    />
                  </div>
                  <p className="text-[11px] text-[#6a7282]">
                    AI will auto-populate these fields after recording. You can also add or edit manually.
                  </p>
                </div>
              </div>

              {/* Diagnoses - Manual entry */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="size-5 text-[#6a7282]" />
                  <h3 className="text-[14px] font-semibold text-[#101828]">
                    Diagnoses (ICD-10)
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                      Add diagnosis codes
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter ICD-10 code (e.g., H35.32)"
                        className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2.5 bg-[#101828] text-white rounded-lg text-[12px] font-medium hover:bg-[#1f2937] transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <textarea
                      placeholder="Or describe the diagnosis and AI will suggest codes..."
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                  <p className="text-[11px] text-[#6a7282]">
                    AI will suggest ICD-10 codes after recording. You can also add codes manually.
                  </p>
                </div>
              </div>

              {/* Procedures - Manual entry */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Code className="size-5 text-[#6a7282]" />
                  <h3 className="text-[14px] font-semibold text-[#101828]">
                    Procedures (CPT/HCPCS)
                  </h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] text-[#6a7282] uppercase tracking-wider mb-2">
                      Add procedure codes
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Enter CPT code (e.g., 92014)"
                        className="flex-1 px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      />
                      <button className="px-4 py-2.5 bg-[#101828] text-white rounded-lg text-[12px] font-medium hover:bg-[#1f2937] transition-colors">
                        Add
                      </button>
                    </div>
                  </div>
                  <div>
                    <textarea
                      placeholder="Or describe the procedure and AI will suggest codes..."
                      className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-[13px] text-[#101828] placeholder:text-[#99A1AF] resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                      rows={2}
                    />
                  </div>
                  <p className="text-[11px] text-[#6a7282]">
                    AI will suggest CPT codes after recording. You can also add codes manually.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom sticky bar */}
      <div className="bg-white border-t border-gray-200 px-8 py-4">
        <div className="flex items-center justify-between max-w-[1600px] mx-auto">
          <div className="flex items-center gap-3">
            {isRecording ? (
              <>
                <div className="flex items-center gap-2">
                  <div className="relative flex items-center justify-center">
                    <div className="absolute size-2 bg-red-500 rounded-full animate-ping opacity-75" />
                    <div className="relative size-1.5 bg-red-600 rounded-full" />
                  </div>
                  <span className="text-[12px] text-[#6a7282]">
                    Recording in progress • {formatTime(recordingTime)}
                  </span>
                </div>
              </>
            ) : (
              <span className="text-[12px] text-[#6a7282]">
                Recording complete • Processing...
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            {isRecording ? (
              <button
                onClick={handleStopRecording}
                className="flex items-center gap-2 px-5 py-2 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors"
              >
                <Square className="size-4" />
                Stop & process
              </button>
            ) : (
              <button className="px-5 py-2 bg-[#101828] text-white rounded-lg text-[13px] font-medium hover:bg-[#1f2937] transition-colors">
                Continue to review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}