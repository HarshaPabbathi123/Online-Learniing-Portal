import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, BookOpen, Award, TrendingUp } from 'lucide-react';

interface DashboardStats {
  totalUsers: number;
  totalCourses: number;
  totalEnrollments: number;
  totalStudents: number;
  totalInstructors: number;
}

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/users/dashboard-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of platform statistics and management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalUsers || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100">
              <BookOpen className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalCourses || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100">
              <Award className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Enrollments</p>
              <p className="text-2xl font-bold text-gray-900">{stats?.totalEnrollments || 0}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100">
              <TrendingUp className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Enrollment Rate</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats?.totalCourses && stats?.totalEnrollments 
                  ? Math.round((stats.totalEnrollments / stats.totalCourses) * 100) / 100
                  : 0
                }
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">User Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Students</span>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{
                      width: `${stats?.totalUsers ? (stats.totalStudents / stats.totalUsers) * 100 : 0}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats?.totalStudents || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Instructors</span>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-200 rounded-full h-2 w-32">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{
                      width: `${stats?.totalUsers ? (stats.totalInstructors / stats.totalUsers) * 100 : 0}%`
                    }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-900">{stats?.totalInstructors || 0}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Platform Metrics</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Courses per Instructor</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.totalInstructors && stats.totalInstructors > 0
                  ? Math.round((stats.totalCourses / stats.totalInstructors) * 100) / 100
                  : 0
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Average Enrollments per Student</span>
              <span className="text-sm font-medium text-gray-900">
                {stats?.totalStudents && stats.totalStudents > 0
                  ? Math.round((stats.totalEnrollments / stats.totalStudents) * 100) / 100
                  : 0
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Platform Growth Rate</span>
              <span className="text-sm font-medium text-green-600">+12.5%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Users className="h-6 w-6 text-blue-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Manage Users</div>
            <div className="text-xs text-gray-500">View and manage all users</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <BookOpen className="h-6 w-6 text-green-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Review Courses</div>
            <div className="text-xs text-gray-500">Approve and manage courses</div>
          </button>
          <button className="p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <TrendingUp className="h-6 w-6 text-purple-600 mb-2" />
            <div className="text-sm font-medium text-gray-900">Analytics</div>
            <div className="text-xs text-gray-500">View detailed analytics</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;