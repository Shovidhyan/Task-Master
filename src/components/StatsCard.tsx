import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 animate-float">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`${color} bg-opacity-20 p-3 rounded-lg backdrop-blur-sm`}>
          <div className={`${color.replace('bg-', 'text-')}`}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}