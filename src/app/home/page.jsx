"use client";
import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { mockData } from "@/mock/data";
import { Card } from "@/components/ui/card";
import ListItems from "./ListItems";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const [date, setDate] = useState(new Date());

  const [selectedTab, setSelectedTab] = useState("list1");
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  console.log(data);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      const newData = mockData?.[selectedTab] || [];
      setData(newData);
      setIsLoading(false);
    }, 1000);
  }, [selectedTab]);

  return (
    <div className="flex flex-row flex-wrap gap-4 justify-center items-center">
      <div className="">
        {date && (
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-lg border"
          />
        )}
      </div>
      <Card className="px-6">
        <Tabs
          defaultValue="list1"
          className="w-full flex flex-col gap-4"
          onValueChange={setSelectedTab}
        >
          <TabsList>
            <TabsTrigger value="list1">List-1</TabsTrigger>
            <TabsTrigger value="list2">List-2</TabsTrigger>
            <TabsTrigger value="list3">List-3</TabsTrigger>
            <TabsTrigger value="list4">List-4</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboards</TabsTrigger>
          </TabsList>
          {["list1", "list2", "list3", "list4", "dashboard"].map((item) => (
            <TabsContent value={item} key={item}>
              {item == "dashboard" ? (
                <div>Dashboard</div>
              ) : isLoading ? (
                <div>Loading...</div>
              ) : (
                <ListItems data={data || []} isAdmin={true} />
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  );
}
