import React, { useEffect, useState } from 'react'

const emojiMap: Record<string, string> = {
  s: '✂️',
  r: '🪨',
  p: '📄',
};

// Mock Win function - replace with your actual implementation
const Win = (userChoice: string) => {
  const choices = ['s', 'r', 'p'];
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  
  if (userChoice === computerChoice) return { result: 'Draw', computerChoice };
  
  const winConditions: Record<string, string> = {
    's': 'p', // scissors beats paper
    'r': 's', // rock beats scissors
    'p': 'r'  // paper beats rock
  };
  
  const result = winConditions[userChoice] === computerChoice ? 'win' : 'lose';
  return { result, computerChoice };
};

function App() {
  const [chois, setChois] = useState<string>('');
  const [wchois, setWchois] = useState<string>('');
  const [Cchois, setCchois] = useState<string>('');
  const [whoWin, setWhoWin] = useState<string>('');
  const [showVictoryModal, setShowVictoryModal] = useState<boolean>(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [countResult, setCountResult] = useState({
    user: 0,
    computer: 0
  });

  // Play sound effect
  const playSound = (isWin: boolean): HTMLAudioElement | null => {
    try {
      const audio = new Audio();
      audio.src = isWin ? 'female-laugh.wav' : 'hahaha-Peter_De_Lang-1639076107.mp3';
      audio.volume = 0.7;
      audio.play().catch(() => {});
      return audio;
    } catch (error) {
      return null;
    }
  };
  

  useEffect(() => {
    const isUserWin = countResult.user === 3;
    const isComputerWin = countResult.computer === 3;
  
    if (isUserWin || isComputerWin) {
      const winText = isUserWin ? '🎉 You Win the Game!' : '💻 Computer Wins!';
      setWhoWin(winText);
      setShowVictoryModal(true);
  
      const audio = playSound(isUserWin);
      setCurrentAudio(audio);
  
      if (audio) {
        const handleEnded = () => {
          setShowVictoryModal(false);
          setCountResult({ user: 0, computer: 0 });
          setWhoWin('');
          setChois('');
          setWchois('');
          setCchois('');
          setCurrentAudio(null);
        };
  
        audio.addEventListener('ended', handleEnded);
  
        // Cleanup to avoid memory leaks
        return () => {
          audio.removeEventListener('ended', handleEnded);
        };
      }
    }
  }, [countResult]);
  

  const handleChois = (ch: string) => {
    setChois(ch);
    const { result, computerChoice } = Win(ch);
    
    setWchois(emojiMap[ch]);
    setCchois(emojiMap[computerChoice]);

    if (result === 'Draw') return;

    if (result === 'win') {
      setCountResult((prev) => ({
        ...prev,
        user: prev.user + 1,
      }));
    } else {
      setCountResult((prev) => ({
        ...prev,
        computer: prev.computer + 1,
      }));
    }
  };

  const VictoryModal = () => {
    const isUserWin = whoWin.includes('You Win');
    
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-all duration-500 ${showVictoryModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`relative transform transition-all duration-700 ${showVictoryModal ? 'scale-100 rotate-0' : 'scale-0 rotate-180'}`}>
          {/* Victory Box */}
          <div className={`relative p-12 rounded-3xl shadow-2xl border-4 ${
            isUserWin 
              ? 'bg-gradient-to-br from-green-400 to-emerald-600 border-yellow-400' 
              : 'bg-gradient-to-br from-red-500 to-red-700 border-gray-600'
          } min-w-[400px] text-center`}>
            
            {/* Animated Background Effects */}
            <div className={`absolute inset-0 rounded-3xl ${
              isUserWin 
                ? 'bg-gradient-to-r from-yellow-400/20 to-green-400/20' 
                : 'bg-gradient-to-r from-red-600/20 to-gray-800/20'
            } animate-pulse`}></div>
            
            {/* Main Icon */}
            <div className="relative mb-6">
              {isUserWin ? (
                <div className="text-8xl animate-bounce">
                  💪
                </div>
              ) : (
                <div className="text-8xl animate-pulse">
                  🖕
                </div>
              )}
            </div>
            
            {/* Victory Text */}
            <div className="relative">
              <h2 className={`text-4xl font-bold mb-4 ${
                isUserWin ? 'text-white' : 'text-gray-200'
              } animate-pulse`}>
                {isUserWin ? '🎉 VICTORY! 🎉' : '💀 DEFEAT! 💀'}
              </h2>
              
              <p className={`text-2xl font-semibold mb-6 ${
                isUserWin ? 'text-yellow-200' : 'text-red-200'
              }`}>
                {isUserWin 
                  ? '🔥 أنت بطل! واااو! 🔥' 
                  : '😈 هاهاهاها! خسرت! 😈'
                }
              </p>
              
              {/* Score Display */}
              <div className={`text-xl font-bold px-6 py-3 rounded-xl ${
                isUserWin 
                  ? 'bg-yellow-400/30 text-white border-2 border-yellow-400' 
                  : 'bg-red-800/30 text-red-200 border-2 border-red-400'
              }`}>
                Final Score: {countResult.user} - {countResult.computer}
              </div>
            </div>
            
            {/* Decorative Elements */}
            {isUserWin && (
              <>
                <div className="absolute -top-4 -left-4 text-4xl animate-spin-slow">⭐</div>
                <div className="absolute -top-4 -right-4 text-4xl animate-spin-slow">🏆</div>
                <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce">🎊</div>
                <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce">🎉</div>
              </>
            )}
            
            {!isUserWin && (
              <>
                <div className="absolute -top-4 -left-4 text-4xl animate-pulse">💀</div>
                <div className="absolute -top-4 -right-4 text-4xl animate-pulse">👹</div>
                <div className="absolute -bottom-4 -left-4 text-4xl animate-bounce">😈</div>
                <div className="absolute -bottom-4 -right-4 text-4xl animate-bounce">🔥</div>
              </>
            )}
          </div>
          
          {/* Particle Effects */}
          {isUserWin && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-400 rounded-full animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-1 items-center py-20 px-4 w-full bg-gradient-to-tr from-gray-800 via-black to-gray-900 h-screen relative'>
      {/* Victory Modal */}
      <VictoryModal />
      
      <h1 className='text-teal-400 font-bold sm:text-4xl text-2xl mb-8 text-center'>
        Welcome to Rock Paper Scissors
      </h1>
      
      <div className='flex h-full items-center justify-between flex-col text-black w-full max-w-4xl p-6 m-5 rounded-2xl shadow-lg relative'>
        
        {/* Score Board */}
        <div className='h-[80px] p-6 w-full flex justify-between items-center rounded-xl bg-gradient-to-r from-gray-700/30 to-gray-600/30 backdrop-blur-sm border border-gray-600/30'>
          <span className='text-bold text-teal-400 text-2xl font-semibold'>You</span>
          <span className='text-bold text-white text-3xl font-bold bg-teal-500/20 px-4 py-2 rounded-lg'>
            {countResult.user} : {countResult.computer}
          </span>
          <span className='text-bold text-teal-400 text-2xl font-semibold'>Computer</span>
        </div>
        
        {/* Game Choices */}
        <div className='flex items-center p-6 gap-8 justify-center w-full'>
          
          {/* Scissors */}
          <div className='group relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-300'></div>
            <div onClick={() => handleChois('s')} className='relative bg-gradient-to-br from-gray-700 to-gray-800 hover:from-teal-500 hover:to-cyan-500 flex flex-col items-center justify-center p-8 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-600 hover:border-teal-400 min-w-[120px] min-h-[120px]'>
              <div className='text-4xl mb-2'>✂️</div>
              <span className='text-white font-semibold text-lg group-hover:text-gray-900'>Scissors</span>
            </div>
          </div>
          
          {/* Rock */}
          <div className='group relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-300'></div>
            <div onClick={() => handleChois('r')} className='relative bg-gradient-to-br from-gray-700 to-gray-800 hover:from-teal-500 hover:to-cyan-500 flex flex-col items-center justify-center p-8 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-600 hover:border-teal-400 min-w-[120px] min-h-[120px]'>
              <div className='text-4xl mb-2'>🪨</div>
              <span className='text-white font-semibold text-lg group-hover:text-gray-900'>Rock</span>
            </div>
          </div>
          
          {/* Paper */}
          <div className='group relative'>
            <div className='absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 rounded-3xl blur opacity-0 group-hover:opacity-75 transition duration-300'></div>
            <div onClick={() => handleChois('p')} className='relative bg-gradient-to-br from-gray-700 to-gray-800 hover:from-teal-500 hover:to-cyan-500 flex flex-col items-center justify-center p-8 rounded-3xl cursor-pointer transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-600 hover:border-teal-400 min-w-[120px] min-h-[120px]'>
              <div className='text-4xl mb-2'>📄</div>
              <span className='text-white font-semibold text-lg group-hover:text-gray-900'>Paper</span>
            </div>
          </div>
          
        </div>
        
        {/* Battle Area */}
        <div className='w-full bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-2xl p-6 backdrop-blur-sm border border-gray-600/30'>
          <div className='flex justify-between items-center'>
            <div className='text-center'>
              <div className='text-6xl mb-2'>{chois === '' ? '❓' : wchois}</div>
              <span className='text-teal-400 font-semibold'>Your Choice</span>
            </div>
            
            <div className='text-center'>
              <span className='text-white text-2xl font-bold'>VS</span>
            </div>
            
            <div className='text-center'>
              <div className='text-6xl mb-2'>{Cchois === '' ? '❓' : Cchois}</div>
              <span className='text-teal-400 font-semibold'>Computer's Choice</span>
            </div>
          </div>
        </div>
        
      </div>
      
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default App