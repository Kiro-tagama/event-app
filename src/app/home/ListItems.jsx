"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon, EditIcon, TrashIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function ListItems({ data = [], isAdmin = false }) {
  const [filteredData, setFilteredData] = useState(data || []);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setFilteredData(data || []);
  }, [data]);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    if (!data || !Array.isArray(data)) return;

    setFilteredData(
      data.filter(
        (item) =>
          item?.date?.toLowerCase().includes(searchTerm) ||
          item?.description?.toLowerCase().includes(searchTerm)
      )
    );
  };

  if (!mounted) {
    return (
      <div className="space-y-4">
        <Input
          placeholder="Search"
          className="w-full"
          startIcon={<SearchIcon size={16} />}
          disabled
        />
        <ScrollArea className="flex flex-col gap-2 h-[300px] w-full">
          <div className="text-center text-muted-foreground">Loading...</div>
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search"
        className="w-full"
        startIcon={<SearchIcon size={16} />}
        onChange={handleSearch}
      />
      <ScrollArea className="flex flex-col gap-2 h-[300px] w-full">
        {filteredData && filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div key={item?.id || index} className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                  <p>{item?.date || "No date"}</p>
                  <p>{item?.description || "No description"}</p>
                </div>
                <div className="flex flex-row gap-2">
                  {isAdmin && (
                    <>
                      <Button variant="outline">
                        <EditIcon size={16} />
                      </Button>
                      <Button variant="outline">
                        <TrashIcon size={16} />
                      </Button>
                    </>
                  )}
                </div>
              </div>
              {filteredData.length - 1 !== index && <hr className="my-2" />}
            </div>
          ))
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No items found
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
