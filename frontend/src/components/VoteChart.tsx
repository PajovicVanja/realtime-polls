// src/components/VoteChart.tsx
import React, { useEffect } from 'react';
import usePoll from '../hooks/usePoll';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import useSocket from '../hooks/useSocket';

// Register necessary Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface VoteChartProps {
  pollId: string;
}

const VoteChart: React.FC<VoteChartProps> = ({ pollId }) => {
  const { poll, loading, error, refetch } = usePoll(pollId);
  const { socket } = useSocket();

  useEffect(() => {
    if (socket) {
      const handleVoteUpdate = (data: { pollId: string; optionId: string }) => {
        if (data.pollId === pollId) {
          console.log("Vote update received in VoteChart:", data);
          refetch();
        }
      };
  
      socket.on('voteUpdate', handleVoteUpdate);
      return () => {
        socket.off('voteUpdate', handleVoteUpdate);
      };
    }
  }, [socket, pollId, refetch]);
  
  

  if (loading) return <p>Loading chart...</p>;
  if (error || !poll) return <p>Error loading chart data.</p>;

  const labels = poll.options.map(option => option.text);
  const dataValues = poll.options.map(option => option.votes);

  const data = {
    labels,
    datasets: [
      {
        label: 'Votes',
        data: dataValues,
        backgroundColor: 'rgba(52, 152, 219, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' as const },
      title: { display: true, text: 'Poll Results' },
    },
  };

  return (
    <div className="vote-chart">
      <Bar data={data} options={options} />
    </div>
  );
};

export default VoteChart;
