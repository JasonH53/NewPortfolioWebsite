"use client"

import { useState, useEffect, useRef } from 'react';

export default function LeetCodeStats({ username = 'STTRAFE' }) {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const canvasRef = useRef(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch('/api/leetcode');
                if (response.ok) {
                    const data = await response.json();
                    if (!data.error) {
                        setStats(data);
                    }
                }
            } catch (error) {
                console.error('Failed to fetch LeetCode stats:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    // Draw the rating chart
    useEffect(() => {
        if (!stats?.history || stats.history.length === 0 || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;

        // Set canvas size
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        const width = rect.width;
        const height = rect.height;
        const padding = { top: 20, right: 15, bottom: 30, left: 10 };

        const history = stats.history;
        const ratings = history.map(h => h.rating);
        const minRating = Math.min(...ratings) - 50;
        const maxRating = Math.max(...ratings) + 50;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate points
        const points = history.map((h, i) => ({
            x: padding.left + (i / (history.length - 1 || 1)) * (width - padding.left - padding.right),
            y: padding.top + (1 - (h.rating - minRating) / (maxRating - minRating)) * (height - padding.top - padding.bottom),
            rating: h.rating,
            date: h.date
        }));

        // Draw gradient fill under the line
        if (points.length > 1) {
            const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
            gradient.addColorStop(0, 'rgba(255, 165, 0, 0.3)');
            gradient.addColorStop(1, 'rgba(255, 165, 0, 0.02)');

            ctx.beginPath();
            ctx.moveTo(points[0].x, height - padding.bottom);
            points.forEach(p => ctx.lineTo(p.x, p.y));
            ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
            ctx.closePath();
            ctx.fillStyle = gradient;
            ctx.fill();
        }

        // Draw the line
        ctx.beginPath();
        ctx.strokeStyle = '#FFA500';
        ctx.lineWidth = 2;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        points.forEach((p, i) => {
            if (i === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
        });
        ctx.stroke();

        // Draw points
        points.forEach((p, i) => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
            ctx.fillStyle = i === points.length - 1 ? '#ffffff' : '#FFA500';
            ctx.fill();
            if (i === points.length - 1) {
                ctx.strokeStyle = '#FFA500';
                ctx.lineWidth = 2;
                ctx.stroke();
            }
        });

        // Draw current rating label on last point
        if (points.length > 0) {
            const lastPoint = points[points.length - 1];
            ctx.font = '12px Inter, sans-serif';
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.textAlign = 'right';
            ctx.fillText(lastPoint.rating.toString(), lastPoint.x - 10, lastPoint.y - 8);
        }

        // Draw x-axis labels (dates)
        ctx.font = '10px Inter, sans-serif';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.textAlign = 'center';

        if (history.length > 0) {
            ctx.fillText(history[0].date, padding.left + 20, height - 8);
            if (history.length > 1) {
                ctx.fillText(history[history.length - 1].date, width - padding.right - 20, height - 8);
            }
        }

    }, [stats]);

    if (loading) {
        return (
            <div className="leetcode-stats-card loading">
                <div className="loading-shimmer"></div>
            </div>
        );
    }

    if (!stats) {
        return null;
    }

    return (
        <>
            <style jsx>{`
                .leetcode-stats-card {
                    background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
                    border-radius: 10px;
                    padding: 1.25rem;
                    width: 100%;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                }

                .leetcode-stats-card.loading {
                    height: 180px;
                }

                .loading-shimmer {
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, 
                        rgba(255,255,255,0.03) 0%, 
                        rgba(255,255,255,0.08) 50%, 
                        rgba(255,255,255,0.03) 100%);
                    background-size: 200% 100%;
                    animation: shimmer 1.5s infinite;
                    border-radius: 6px;
                }

                @keyframes shimmer {
                    0% { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }

                .stats-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    margin-bottom: 1rem;
                }

                .stats-left {
                    display: flex;
                    gap: 2rem;
                }

                .stat-item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.15rem;
                }

                .stat-label {
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                    letter-spacing: 0.02em;
                }

                .stat-value {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #ffffff;
                }

                .stat-value.rating {
                    color: #FFA500;
                }

                .stat-value.small {
                    font-size: 1rem;
                }

                .stat-value .muted {
                    color: rgba(255, 255, 255, 0.4);
                    font-size: 0.75rem;
                }

                .stats-right {
                    text-align: right;
                }

                .top-percent {
                    font-size: 1rem;
                    font-weight: 600;
                    color: #4CAF50;
                }

                .top-label {
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.5);
                    text-transform: uppercase;
                }

                .chart-container {
                    width: 100%;
                    height: 100px;
                    margin-top: 0.5rem;
                }

                .chart-canvas {
                    width: 100%;
                    height: 100%;
                }

                @media (max-width: 500px) {
                    .leetcode-stats-card {
                        padding: 1rem;
                    }

                    .stats-header {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        gap: 0.75rem;
                    }

                    .stats-left {
                        display: contents;
                    }

                    .stat-item {
                        min-width: 0;
                    }

                    .stat-label {
                        font-size: 0.6rem;
                    }

                    .stat-value {
                        font-size: 1.1rem;
                    }

                    .stat-value.small {
                        font-size: 0.85rem;
                    }

                    .stat-value .muted {
                        font-size: 0.65rem;
                    }

                    .stats-right {
                        text-align: left;
                    }

                    .top-percent {
                        font-size: 1.1rem;
                    }

                    .top-label {
                        font-size: 0.6rem;
                    }

                    .chart-container {
                        height: 80px;
                    }
                }
            `}</style>

            <div className="leetcode-stats-card">
                <div className="stats-header">
                    <div className="stats-left">
                        <div className="stat-item">
                            <span className="stat-label">Contest Rating</span>
                            <span className="stat-value rating">{stats.rating}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Global Ranking</span>
                            <span className="stat-value small">
                                {stats.globalRanking?.toLocaleString()}
                                <span className="muted">/{stats.totalParticipants?.toLocaleString()}</span>
                            </span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Attended</span>
                            <span className="stat-value small">{stats.attendedContestsCount}</span>
                        </div>
                        <div className="stat-item">
                            <span className="top-label">Top</span>
                            <span className="top-percent">{stats.topPercentage}%</span>
                        </div>
                    </div>
                </div>

                <div className="chart-container">
                    <canvas ref={canvasRef} className="chart-canvas"></canvas>
                </div>
            </div>
        </>
    );
}
