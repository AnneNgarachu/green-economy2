"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as Slider from "@radix-ui/react-slider";
import { Line } from "react-chartjs-2";
import "@/lib/chartConfig"; // Import chart.js global configuration
import { Zap, Droplet, Trash2, Leaf } from "lucide-react";

interface GoalSetting {
  current: number;
  target: number;
  unit: string;
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Record<string, GoalSetting>>({
    energy: { current: 450, target: 400, unit: "kWh" },
    water: { current: 2000, target: 1800, unit: "L" },
    waste: { current: 120, target: 100, unit: "kg" },
    carbon: { current: 25, target: 20, unit: "tons" },
  });

  const handleSliderChange = (category: string, value: number[]) => {
    setGoals((prev) => ({
      ...prev,
      [category]: { ...prev[category], target: value[0] },
    }));
  };

  const handleInputChange = (category: string, value: string) => {
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setGoals((prev) => ({
        ...prev,
        [category]: { ...prev[category], target: numValue },
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting goals:", goals);
    alert("Goals have been successfully saved!");
  };

  // Calculate savings for summary insights
  const calculateSavings = (current: number, target: number) =>
    current - target;

  // Dynamic Chart Data
  const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Energy Usage (kWh)",
        data: [450, 440, 430, 420, 410, goals.energy.target],
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
      },
      {
        label: "Water Usage (L)",
        data: [2000, 1950, 1900, 1850, 1820, goals.water.target],
        borderColor: "rgb(54, 162, 235)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
    ],
  };

  return (
    <div className="p-6">
      {/* Header Section */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Set Sustainability Goals</h1>
        <p className="text-gray-600">
          Manage your organization’s sustainability efforts by setting and
          tracking actionable goals.
        </p>
      </div>

      {/* Summary Insights */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Summary Insights</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(goals).map(([key, { current, target, unit }]) => (
            <Card key={key}>
              <CardContent>
                <h3 className="text-lg font-semibold capitalize">
                  {key} Savings
                </h3>
                <p className="text-gray-600">
                  You aim to save{" "}
                  <span className="font-bold">
                    {calculateSavings(current, target)} {unit}
                  </span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Progress Overview</h2>
        <div style={{ height: "400px", width: "100%" }}>
          <Line data={chartData} />
        </div>
      </div>

      {/* Goals Section */}
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Energy Goal */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Energy Consumption Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current: {goals.energy.current} kWh</span>
                  <Input
                    type="number"
                    value={goals.energy.target}
                    onChange={(e) =>
                      handleInputChange("energy", e.target.value)
                    }
                    className="w-24"
                  />
                </div>
                <Slider.Root
                  className="relative flex items-center w-full h-4"
                  value={[goals.energy.target]}
                  onValueChange={(value) => handleSliderChange("energy", value)}
                  min={0}
                  max={1000}
                  step={10}
                >
                  <Slider.Track className="relative w-full h-1 bg-gray-300 rounded-full">
                    <Slider.Range className="absolute h-full bg-yellow-500 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-4 h-4 bg-white border-2 border-yellow-500 rounded-full focus:outline-none"
                    aria-label="Energy Target"
                  />
                </Slider.Root>
              </div>
            </CardContent>
          </Card>

          {/* Repeat similar cards for Water, Waste, and Carbon */}
          {/* Water Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-5 w-5 text-blue-500" />
                Water Usage Goal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Current: {goals.water.current} L</span>
                  <Input
                    type="number"
                    value={goals.water.target}
                    onChange={(e) => handleInputChange("water", e.target.value)}
                    className="w-24"
                  />
                </div>
                <Slider.Root
                  className="relative flex items-center w-full h-4"
                  value={[goals.water.target]}
                  onValueChange={(value) => handleSliderChange("water", value)}
                  min={0}
                  max={5000}
                  step={50}
                >
                  <Slider.Track className="relative w-full h-1 bg-gray-300 rounded-full">
                    <Slider.Range className="absolute h-full bg-blue-500 rounded-full" />
                  </Slider.Track>
                  <Slider.Thumb
                    className="block w-4 h-4 bg-white border-2 border-blue-500 rounded-full focus:outline-none"
                    aria-label="Water Target"
                  />
                </Slider.Root>
              </div>
            </CardContent>
          </Card>

          {/* Repeat similar cards for Waste and Carbon */}
        </div>

        <Button type="submit" className="mt-6 bg-green-600 hover:bg-green-700">
          Save Goals
        </Button>
      </form>
    </div>
  );
}
