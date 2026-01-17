import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle } from 'lucide-react';

interface Activity {
  _id: string;
  task_title: string;
  task_emoji: string;
  preset_type: string;
  completed_at: string;
}

interface DailyActivityHeatmapProps {
  childName: string;
}

const DailyActivityHeatmap = ({ childName }: DailyActivityHeatmapProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (childName) {
      fetchTodayActivities();
    }
  }, [childName]);

  const fetchTodayActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://brainwaveapi.teamuxh.site/api/daily-schedule/today/${childName}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      
      const data = await response.json();
      setActivities(Array.isArray(data.activities) ? data.activities : []);
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      setActivities([]);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPresetColor = (presetType: string) => {
    const colors: Record<string, string> = {
      'getting-dressed': '#0A84FF',
      'sensory-friendly': '#30D158',
      'communication-practice': '#FF9F0A',
      'transitions-changes': '#FF453A',
      'social-skills': '#BF5AF2',
      'motor-skills': '#00C7BE',
    };
    return colors[presetType] || '#8E8E93';
  };

  const getPresetName = (presetType: string) => {
    const names: Record<string, string> = {
      'getting-dressed': 'Getting Dressed',
      'sensory-friendly': 'Sensory-Friendly',
      'communication-practice': 'Communication',
      'transitions-changes': 'Transitions',
      'social-skills': 'Social Skills',
      'motor-skills': 'Motor Skills',
    };
    return names[presetType] || presetType;
  };

  if (loading) {
    return (
      <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
            <Calendar className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-foreground">Today's Activities</h3>
            <p className="text-sm text-muted-foreground">
              {activities.length} task{activities.length !== 1 ? 's' : ''} completed
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success/10 border border-success/20">
          <CheckCircle className="w-4 h-4 text-success" />
          <span className="text-sm font-medium text-success">{activities.length}</span>
        </div>
      </div>

      {/* Activities Timeline */}
      {activities.length > 0 ? (
        <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
          {activities.map((activity, index) => (
            <div
              key={activity._id}
              className="group relative p-4 rounded-xl bg-background/50 border border-border hover:border-primary/50 transition-all duration-300"
            >
              {/* Timeline connector */}
              {index < activities.length - 1 && (
                <div className="absolute left-8 top-14 w-0.5 h-6 bg-border" />
              )}

              <div className="flex items-start gap-4">
                {/* Emoji Icon */}
                <div
                  className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{
                    backgroundColor: `${getPresetColor(activity.preset_type)}20`,
                  }}
                >
                  {activity.task_emoji}
                </div>

                {/* Task Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-foreground truncate">
                      {activity.task_title}
                    </h4>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground flex-shrink-0">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(activity.completed_at)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-xs font-medium px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${getPresetColor(activity.preset_type)}20`,
                        color: getPresetColor(activity.preset_type),
                      }}
                    >
                      {getPresetName(activity.preset_type)}
                    </span>
                  </div>
                </div>

                {/* Completion Badge */}
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-success/20 border-2 border-success/40 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-success" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted/20 flex items-center justify-center mx-auto mb-4">
            <Calendar className="w-8 h-8 text-muted-foreground" />
          </div>
          <h4 className="text-lg font-semibold text-foreground mb-2">No Activities Yet</h4>
          <p className="text-sm text-muted-foreground">
            {childName} hasn't completed any tasks today
          </p>
        </div>
      )}

      {/* Summary Stats */}
      {activities.length > 0 && (
        <div className="mt-6 pt-6 border-t border-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">{activities.length}</div>
              <div className="text-xs text-muted-foreground">Tasks Done</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">
                {new Set(activities.map(a => a.preset_type)).size}
              </div>
              <div className="text-xs text-muted-foreground">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-success mb-1">100%</div>
              <div className="text-xs text-muted-foreground">Completion</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyActivityHeatmap;
