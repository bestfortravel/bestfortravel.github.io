'use client';

import React from 'react';
import '@/components/Insights/TravelInsightsAchievementsSection.scss';

interface Insight {
  emoji: string;
  title: string;
  description: string;
}

interface Achievement {
  icon: string;
  title: string;
  description: string;
  status: string;
}

interface TravelInsightsAchievementsSectionProps {
  insights: Insight[];
  achievements: Achievement[];
}

export default function TravelInsightsAchievementsSection({
  insights,
  achievements,
}: TravelInsightsAchievementsSectionProps) {
  return (
    <div className='insights-achievements-section'>
      {/* === Travel Insights === */}
      <div className='travel-insights-section'>
        <div className='section-header'>
          <h3>Travel Insights</h3>
        </div>
        <div className='insights-list'>
          {insights.map((insight, index) => (
            <div key={index} className='insight-item'>
              <div className='insight-emoji'>{insight.emoji}</div>
              <div className='insight-content'>
                <h4>{insight.title}</h4>
                <p>{insight.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === Travel Achievements === */}
      <div className='achievements-section'>
        <div className='section-header'>
          <h3>Travel Achievements</h3>
        </div>
        <div className='achievements-list'>
          {achievements.map((achievement, index) => (
            <div key={index} className='achievement-item'>
              <img
                src={achievement.icon}
                alt={achievement.title}
                className='achievement-icon'
              />
              <div className='achievement-content'>
                <h4>{achievement.title}</h4>
                <p>{achievement.description}</p>
              </div>
              <div className={`achievement-status ${achievement.status.toLowerCase()}`}>
                {achievement.status}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
