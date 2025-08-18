import React from 'react';
import { 
  BookOpen, 
  Plus, 
  Eye, 
  Edit3 
} from 'lucide-react';

interface TrainingPlan {
  id: number;
  name: string;
  duration: string;
  students: number;
  status: string;
  progress: number;
  nextSession: string;
  description: string;
}

interface TrainingPlansProps {
  trainingPlans: TrainingPlan[];
}

const TrainingPlans: React.FC<TrainingPlansProps> = ({ trainingPlans }) => {
  const handleTrainingPlanAction = (planId: number, action: string) => {
    console.log(`${action} training plan ${planId}`);
    // In real app, this would perform the action
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 animate-on-scroll">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          <span>Training Plans Management</span>
        </h3>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Create and Manage Training Programs</h3>
            <button 
              onClick={() => handleTrainingPlanAction(0, 'create')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200 hover:shadow-lg flex items-center"
            >
              <Plus className="h-4 w-4 mr-2" />
              New Training Plan
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPlans.map((plan) => (
              <div key={plan.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 animate-on-scroll">
                <div className="p-4 border-b">
                  <h4 className="text-lg font-semibold">{plan.name}</h4>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Duration:</span>
                      <span className="font-medium">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Students:</span>
                      <span className="font-medium">{plan.students}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Progress:</span>
                      <span className="font-medium">{plan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-purple-500 h-2 rounded-full" 
                        style={{ width: `${plan.progress}%` }}
                      ></div>
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Next:</strong> {plan.nextSession}
                    </div>
                    <div className="flex space-x-2 pt-2">
                      <button
                        onClick={() => handleTrainingPlanAction(plan.id, 'view')}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </button>
                      <button
                        onClick={() => handleTrainingPlanAction(plan.id, 'edit')}
                        className="flex-1 px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingPlans; 