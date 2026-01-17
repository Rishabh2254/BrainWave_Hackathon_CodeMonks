import { useState, useEffect } from 'react';
import { Activity, TrendingUp, Calendar } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
);

interface SpeechPracticeData {
  _id: string;
  child_name: string;
  score: number;
  total_questions: number;
  date: string;
  created_at: string;
}

const ChildActivityDashboard = () => {
  const [speechData, setSpeechData] = useState<SpeechPracticeData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [childName] = useState('DefaultChild');

  useEffect(() => {
    fetchSpeechData();
  }, [childName]);

  const fetchSpeechData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://brainwaveapi.teamuxh.site/api/speech-practice/child/${childName}`,
        {
          credentials: 'include'
        }
      );

      if (!response.ok) {
        throw new Error('Failed to fetch speech practice data');
      }

      const data = await response.json();
      console.log('Speech practice data:', data, 'for child:', childName);
      setSpeechData(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching speech data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load data');
      setSpeechData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getScorePercentage = (score: number, total: number) => {
    return (score / total) * 100;
  };

  // Get last 7 days of data, newest first
  const recentData = speechData.slice(0, 7).reverse();
  const maxScore = 5; // Maximum possible score

  // Prepare data for Chart.js
  const chartData = {
    labels: recentData.map(data => formatDate(data.date)),
    datasets: [
      {
        label: 'Speech Practice Score',
        data: recentData.map(data => data.score),
        backgroundColor: 'rgba(10, 132, 255, 0.8)',
        borderColor: 'rgba(10, 132, 255, 1)',
        borderWidth: 2,
        borderRadius: 8,
        maxBarThickness: 60,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1C1C1E',
        titleColor: '#FFFFFF',
        bodyColor: '#8E8E93',
        padding: 12,
        borderColor: '#3A3A3C',
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Score: ${context.parsed.y} / 5`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 1,
          color: '#8E8E93',
          font: {
            size: 12,
          },
        },
        grid: {
          color: 'rgba(58, 58, 60, 0.3)',
          drawBorder: false,
        },
      },
      x: {
        ticks: {
          color: '#8E8E93',
          font: {
            size: 12,
          },
        },
        grid: {
          display: false,
        },
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-[#8E8E93] text-lg">Loading activity data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#2C2C2E] rounded-2xl p-8 text-center">
        <div className="text-[#FF453A] text-lg mb-2">Error loading data</div>
        <div className="text-[#8E8E93] text-sm">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Speech Practice Dashboard</h1>
          <p className="text-[#8E8E93] text-sm">Track speech practice progress</p>
        </div>
        <div className="bg-[#0A84FF] rounded-full p-2">
          <Activity className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-[#2C2C2E] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-[#30D158]/20 rounded-lg p-1.5">
              <TrendingUp className="w-4 h-4 text-[#30D158]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">{speechData.length}</div>
          <div className="text-[#8E8E93] text-xs">Sessions</div>
        </div>

        <div className="bg-[#2C2C2E] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-[#0A84FF]/20 rounded-lg p-1.5">
              <Activity className="w-4 h-4 text-[#0A84FF]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {speechData.length > 0
              ? (speechData.reduce((acc, curr) => acc + curr.score, 0) / speechData.length).toFixed(1)
              : '0'}
          </div>
          <div className="text-[#8E8E93] text-xs">Avg Score</div>
        </div>

        <div className="bg-[#2C2C2E] rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="bg-[#FFD60A]/20 rounded-lg p-1.5">
              <Calendar className="w-4 h-4 text-[#FFD60A]" />
            </div>
          </div>
          <div className="text-2xl font-bold text-white">
            {speechData.length > 0 ? speechData[0].score : '0'}
          </div>
          <div className="text-[#8E8E93] text-xs">Latest</div>
        </div>
      </div>

      {/* Speech Practice Score Graph */}
      <div className="bg-[#2C2C2E] rounded-xl p-4">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white mb-1">Speech Practice Progress</h2>
          <p className="text-[#8E8E93] text-xs">Past 7 days</p>
        </div>

        {recentData.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-[#8E8E93] text-sm">No data yet</div>
          </div>
        ) : (
          <div className="h-64">
            <Bar data={chartData} options={chartOptions} />
          </div>
        )}
      </div>

      {/* Recent Activity List */}
      {speechData.length > 0 && (
        <div className="bg-[#2C2C2E] rounded-xl p-4">
          <h2 className="text-lg font-bold text-white mb-3">Recent Activity</h2>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {speechData.slice(0, 5).map((data) => (
              <div
                key={data._id}
                className="flex items-center justify-between p-3 bg-[#1C1C1E] rounded-lg hover:bg-[#2C2C2E] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[#0A84FF]/20 rounded-lg p-2">
                    <Activity className="w-4 h-4 text-[#0A84FF]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">Speech Practice</div>
                    <div className="text-[#8E8E93] text-xs">{formatDate(data.date)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-bold">
                    {data.score}/{data.total_questions}
                  </div>
                  <div className="text-[#8E8E93] text-xs">
                    {getScorePercentage(data.score, data.total_questions).toFixed(0)}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChildActivityDashboard;
