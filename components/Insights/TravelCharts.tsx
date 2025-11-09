'use client';

import React, { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import '@/components/Insights/TravelCharts.scss';

interface YearlyData {
  year: number;
  trips: number;
  countries: number;
}

interface MonthlyData {
  month: string;
  trips: number;
}

export default function TravelCharts() {
  const [yearRange, setYearRange] = useState('Past 10 Years');
  const [monthRange, setMonthRange] = useState('This Year');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const yearOptions = [
    'Past 15 Years',
    'Past 10 Years',
    'Past 5 Years',
    'Past Year',
    'This Year',
  ];

  const fullTravelData: YearlyData[] = [
    { year: 2011, trips: 1, countries: 1 },
    { year: 2012, trips: 2, countries: 1 },
    { year: 2013, trips: 2, countries: 1 },
    { year: 2014, trips: 3, countries: 2 },
    { year: 2015, trips: 3, countries: 2 },
    { year: 2016, trips: 4, countries: 2 },
    { year: 2017, trips: 4, countries: 3 },
    { year: 2018, trips: 5, countries: 3 },
    { year: 2019, trips: 6, countries: 4 },
    { year: 2020, trips: 5, countries: 4 },
    { year: 2021, trips: 7, countries: 5 },
    { year: 2022, trips: 8, countries: 6 },
    { year: 2023, trips: 7, countries: 5 },
    { year: 2024, trips: 9, countries: 6 },
    { year: 2025, trips: 10, countries: 6 },
  ];

  const fullMonthlyData: MonthlyData[] = [
    { month: 'Jan', trips: 3 },
    { month: 'Feb', trips: 2 },
    { month: 'Mar', trips: 5 },
    { month: 'Apr', trips: 1 },
    { month: 'May', trips: 4 },
    { month: 'Jun', trips: 5 },
    { month: 'Jul', trips: 6 },
    { month: 'Aug', trips: 4 },
    { month: 'Sep', trips: 4 },
    { month: 'Oct', trips: 5 },
    { month: 'Nov', trips: 6 },
    { month: 'Dec', trips: 8 },
  ];

  // --- Filter yearly data dynamically
  const getFilteredTravelData = (): YearlyData[] => {
    const currentYear = 2025;
    switch (yearRange) {
      case 'Past 15 Years':
        return fullTravelData;
      case 'Past 10 Years':
        return fullTravelData.filter((d) => d.year >= currentYear - 9);
      case 'Past 5 Years':
        return fullTravelData.filter((d) => d.year >= currentYear - 4);
      case 'Past Year':
      case 'This Year':
        return fullTravelData.filter((d) => d.year === currentYear);
      default:
        return fullTravelData;
    }
  };

  const travelData = getFilteredTravelData();

  // --- Filter monthly data dynamically
  const getFilteredMonthlyData = (): MonthlyData[] => {
    switch (monthRange) {
      case 'Past 15 Years':
      case 'Past 10 Years':
      case 'Past 5 Years':
        return fullMonthlyData.map((m) => ({
          ...m,
          trips: Math.round(m.trips * 0.8 + Math.random() * 2),
        }));
      case 'Past Year':
        return fullMonthlyData.map((m) => ({
          ...m,
          trips: Math.max(1, Math.round(m.trips * 0.6)),
        }));
      case 'This Year':
      default:
        return fullMonthlyData;
    }
  };

  const monthlyData = getFilteredMonthlyData();

  const handleYearChange = (option: string) => {
    setYearRange(option);
    setShowYearDropdown(false);
  };

  const handleMonthChange = (option: string) => {
    setMonthRange(option);
    setShowMonthDropdown(false);
  };

  // --- Custom tooltips ---
  const LineChartTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className='custom-tooltip line-tooltip'>
          <p className='label'>{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const BarChartTooltip = ({ active, payload, label, coordinate }: any) => {
    if (active && payload && payload.length && coordinate) {
      const barTop = coordinate.y - 60;
      return (
        <div
          className='custom-tooltip bar-tooltip'
          style={{
            position: 'absolute',
            left: coordinate.x - 20,
            top: barTop,
          }}
        >
          <p className='label'>{label}</p>
          <p className='value'>Trips: {payload[0].value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className='travel-charts'>
      {/* ===== Travel Frequency ===== */}
      <div className='chart-card section-to-fade'>
        <div className='chart-header'>
          <h3>Travel Frequency</h3>
          <div
            className='dropdown-header'
            onClick={() => setShowYearDropdown(!showYearDropdown)}
          >
            {yearRange}
            <img
              src='/icons/sort.svg'
              alt='Dropdown'
              className={`arrow ${showYearDropdown ? 'rotated' : ''}`}
            />
            {showYearDropdown && (
              <div className='dropdown-menu'>
                {yearOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-item ${
                      option === yearRange ? 'active' : ''
                    }`}
                    onClick={() => handleYearChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ResponsiveContainer width='100%' height={280}>
          <LineChart
            data={travelData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
            <XAxis
              dataKey='year'
              tick={{ fill: '#475569', fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 12]}
            />
            <Tooltip content={<LineChartTooltip />} />
            <Line
              type='monotone'
              dataKey='countries'
              name='Countries'
              stroke='#002FFF'
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={600}
            />
            <Line
              type='monotone'
              dataKey='trips'
              name='Trips'
              stroke='#A855F7'
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
              animationDuration={600}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* ===== Monthly Travel Pattern ===== */}
      <div className='chart-card section-to-fade'>
        <div className='chart-header'>
          <h3>Monthly Travel Pattern</h3>
          <div
            className='dropdown-header'
            onClick={() => setShowMonthDropdown(!showMonthDropdown)}
          >
            {monthRange}
            <img
              src='/icons/sort.svg'
              alt='Dropdown'
              className={`arrow ${showMonthDropdown ? 'rotated' : ''}`}
            />
            {showMonthDropdown && (
              <div className='dropdown-menu'>
                {yearOptions.map((option) => (
                  <div
                    key={option}
                    className={`dropdown-item ${
                      option === monthRange ? 'active' : ''
                    }`}
                    onClick={() => handleMonthChange(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <ResponsiveContainer width='100%' height={280}>
          <BarChart
            data={monthlyData}
            margin={{ top: 10, right: 20, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray='3 3' stroke='#E2E8F0' />
            <XAxis
              dataKey='month'
              tick={{ fill: '#475569', fontSize: 13 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#475569', fontSize: 13 }}
              axisLine={false}
              tickLine={false}
              domain={[0, 8]}
            />
            <Tooltip
              cursor={{ fill: 'rgba(130, 90, 255, 0.05)' }}
              content={<BarChartTooltip />}
            />
            <Bar
              dataKey='trips'
              barSize={17}
              radius={[2, 2, 0, 0]}
              animationDuration={600}
            >
              {monthlyData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === hoveredIndex ? '#A855F7' : '#94A3B8'}
                  onMouseOver={() => setHoveredIndex(index)}
                  onMouseOut={() => setHoveredIndex(null)}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
