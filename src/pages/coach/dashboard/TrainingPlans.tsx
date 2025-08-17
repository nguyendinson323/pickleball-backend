import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <BookOpen className="h-5 w-5 text-purple-500" />
          <span>Training Plans Management</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Create and Manage Training Programs</h3>
            <Button onClick={() => handleTrainingPlanAction(0, 'create')}>
              <Plus className="h-4 w-4 mr-2" />
              New Training Plan
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainingPlans.map((plan) => (
              <Card key={plan.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <p className="text-sm text-gray-600">{plan.description}</p>
                </CardHeader>
                <CardContent>
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
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTrainingPlanAction(plan.id, 'view')}
                        className="flex-1"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleTrainingPlanAction(plan.id, 'edit')}
                        className="flex-1"
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrainingPlans; 