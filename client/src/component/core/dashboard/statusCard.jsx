
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";


const StatusCard = ({ title, count, icon, color }) => {
  return (
    <Card className="border-1"  style={{ "borderColor": color }}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="text-3xl font-bold" style={{"color":color}}>{count}</span>
          <div className="p-2 rounded-full" style={{ backgroundColor: `${color}20` }}>
            {React.cloneElement(icon , { 
              className: "h-6 w-6", 
              style: { color } 
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatusCard;
