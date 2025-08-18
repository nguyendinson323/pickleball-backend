import React from 'react';
import { 
  Users, 
  Plus, 
  Eye, 
  MessageSquare, 
  Edit3 
} from 'lucide-react';

interface Student {
  id: number;
  name: string;
  level: string;
  lastSession: string;
  progress: number;
  nextGoal: string;
  achievements: string[];
  nextSession: string;
  photo: string | null;
}

interface StudentsProps {
  studentProgress: Student[];
}

const Students: React.FC<StudentsProps> = ({ studentProgress }) => {
  const handleStudentAction = (studentId: number, action: string) => {
    console.log(`${action} student ${studentId}`);
    // In real app, this would perform the action
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <Users className="h-5 w-5 text-green-500" />
          <span>Student Progress Tracking</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Monitor Student Development and Achievements</h3>
            <button 
              onClick={() => handleStudentAction(0, 'add')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Student</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Level</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Progress</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Next Goal</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Last Session</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Next Session</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {studentProgress.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-200">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-blue-600 text-white text-xs flex items-center justify-center font-semibold">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium">{student.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        student.level === 'Beginner' ? 'bg-gray-100 text-gray-800' :
                        student.level === 'Intermediate' ? 'bg-blue-100 text-blue-800' : 
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {student.level}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-green-500 h-2 rounded-full" 
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm font-medium">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">{student.nextGoal}</td>
                    <td className="py-3 px-4">{student.lastSession}</td>
                    <td className="py-3 px-4">{student.nextSession}</td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleStudentAction(student.id, 'view')}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </button>
                        <button
                          onClick={() => handleStudentAction(student.id, 'message')}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                        >
                          <MessageSquare className="h-4 w-4 mr-1" />
                          Message
                        </button>
                        <button
                          onClick={() => handleStudentAction(student.id, 'edit')}
                          className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                        >
                          <Edit3 className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Students; 