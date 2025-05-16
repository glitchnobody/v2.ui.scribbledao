"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../lib/redux/store";
import {
  increment,
  decrement,
  selectCount,
  selectStatus,
} from "../lib/redux/features/counterSlice";
import { useDataQuery, useDataMutation } from "../lib/api/apiService";

export default function CounterExample() {
  const count = useAppSelector(selectCount);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [newItem, setNewItem] = useState<number>(0);

  // Using React Query for data fetching
  const { data, isLoading, error } = useDataQuery();

  // Using React Query for mutations
  const mutation = useDataMutation();

  const handleAddItem = () => {
    mutation.mutate(newItem);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <h2 className="text-xl font-bold mb-4">Redux Counter Example</h2>

      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          -
        </button>

        <span className="text-2xl font-bold">{count}</span>

        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          +
        </button>
      </div>

      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Status: {status}</p>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-semibold mb-2">React Query Example</h3>

        {isLoading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-red-500">Error loading data</p>
        ) : (
          <div>
            <p className="mb-2">Data from API:</p>
            <ul className="list-disc pl-5 mb-4">
              {data?.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </div>
        )}

        <div className="mt-4">
          <div className="flex gap-2 mb-2">
            <input
              type="number"
              value={newItem}
              onChange={(e) => setNewItem(Number(e.target.value))}
              className="border rounded px-2 py-1 w-20"
            />
            <button
              onClick={handleAddItem}
              disabled={mutation.isPending}
              className="px-3 py-1 bg-blue-500 text-white rounded disabled:bg-blue-300"
            >
              {mutation.isPending ? "Adding..." : "Add Item"}
            </button>
          </div>
          {mutation.isSuccess && (
            <p className="text-green-500 text-sm">Item added successfully!</p>
          )}
          {mutation.isError && (
            <p className="text-red-500 text-sm">Failed to add item</p>
          )}
        </div>
      </div>
    </div>
  );
}
